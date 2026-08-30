import React, { useRef, useState, useEffect } from "react";

export type UploadedFileType = {
  id: string;
  url: string;
  alt: string;
  fileStatus: string;
};

export type UploadingFileType = {
  file: File;
  previewUrl: string;
  status: "pending" | "uploading" | "done" | "error";
  error?: string;
};

export type MediaUploaderPropsType = {
  onUploadComplete: (files: UploadedFileType[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  folder?: string;
};

const MAX_PIXELS = 25000000; // 25 MP

async function checkImageResolution(file: File): Promise<{ valid: boolean; reason?: string }> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = function () {
      const pixels = img.width * img.height;
      if (pixels > MAX_PIXELS) {
        resolve({
          valid: false,
          reason: `${file.name}: Exceeds maximum image resolution of 25 MP`,
        });
      } else {
        resolve({ valid: true });
      }
    };
    img.onerror = function () {
      resolve({
        valid: false,
        reason: `${file.name}: Could not read image dimensions`,
      });
    };
    img.src = URL.createObjectURL(file);
  });
}

async function uploadFileToS3(file: File, folder?: string): Promise<UploadedFileType> {
  const headers: Record<string, string> = {
    "File-Name": file.name,
    "File-Content-Type": file.type,
  };
  if (folder) {
    headers["S3-Folder"] = folder;
  }
  const response = await fetch("/api/s3/upload", {
    method: "POST",
    headers,
    body: file,
  });
  if (!response.ok) {
    throw new Error(`${file.name}: Failed to upload to S3`);
  }
  const data = await response.json();
  return {
    id: data.url,
    url: data.url,
    alt: file.name,
    fileStatus: "READY",
  };
}

export const MediaUploader = ({
  onUploadComplete,
  multiple = false,
  disabled = false,
  children,
  folder,
}: MediaUploaderPropsType): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFileType[]>([]);

  useEffect(() => {
    return () => {
      uploadingFiles.forEach((uf) => URL.revokeObjectURL(uf.previewUrl));
    };
  }, [uploadingFiles]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    setError(null);

    const previews: UploadingFileType[] = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      status: "pending",
    }));
    setUploadingFiles(previews);

    const results = await Promise.all(files.map(checkImageResolution));
    const validFiles: File[] = [];
    const errorMessages: string[] = [];
    results.forEach((result, idx) => {
      if (result.valid) {
        validFiles.push(files[idx]);
      } else if (result.reason) {
        errorMessages.push(result.reason);
        setUploadingFiles((prev) =>
          prev.map((uf, i) => (i === idx ? { ...uf, status: "error", error: result.reason } : uf))
        );
      }
    });

    if (errorMessages.length > 0) {
      setError(errorMessages.join("\n"));
    }
    if (validFiles.length === 0) {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    try {
      const uploadedFiles = await Promise.all(
        validFiles.map(async (file) => {
          setUploadingFiles((prev) =>
            prev.map((uf) => (uf.file === file ? { ...uf, status: "uploading" } : uf))
          );
          try {
            const uploaded = await uploadFileToS3(file, folder);
            setUploadingFiles((prev) =>
              prev.map((uf) => (uf.file === file ? { ...uf, status: "done" } : uf))
            );
            return uploaded;
          } catch (err: any) {
            setError(
              (prev) => (prev ? prev + "\n" : "") + (err.message || `${file.name}: Upload failed`)
            );
            setUploadingFiles((prev) =>
              prev.map((uf) =>
                uf.file === file ? { ...uf, status: "error", error: err.message } : uf
              )
            );
            return null;
          }
        })
      );
      const successfulUploads = uploadedFiles.filter(Boolean) as UploadedFileType[];
      if (successfulUploads.length > 0) {
        onUploadComplete(successfulUploads);
      }
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
      setTimeout(() => {
        setUploadingFiles([]);
      }, 2000);
    }
  };

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled || uploading}
      />
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          if (!disabled && !uploading) inputRef.current?.click();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        className={`inline-block ${
          disabled || uploading ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        }`}
      >
        {children ? (
          children
        ) : (
          <s-button disabled={disabled || uploading} loading={uploading}>
            {uploading ? "Uploading..." : "Upload Image"}
          </s-button>
        )}
      </div>

      {uploadingFiles.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {uploadingFiles.map((uf, idx) => (
            <div
              key={idx}
              className="border-border bg-muted/40 relative h-16 w-16 overflow-hidden rounded-lg border"
            >
              <img
                src={uf.previewUrl}
                alt={uf.file.name}
                className={`h-full w-full object-cover ${
                  uf.status === "done" ? "opacity-100" : "opacity-70"
                }`}
              />
              {uf.status === "uploading" && (
                <div className="bg-background/60 absolute inset-0 flex items-center justify-center">
                  <s-spinner size="base" />
                </div>
              )}
              {uf.status === "error" && (
                <div className="bg-destructive/80 text-destructive-foreground absolute inset-0 flex items-center justify-center p-1 text-center text-[10px] font-bold">
                  Error
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {error && <div className="text-destructive pt-1 text-xs font-medium">{error}</div>}
    </div>
  );
};

export default MediaUploader;
