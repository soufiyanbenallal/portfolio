import { useCallback, useState } from "react";
import { useUpdateState } from "~/commons/utils/state/hooks/useUpdateState";

export type DropzonePropsType = {
  icon_path: string;
};

export const Dropzone = ({ icon_path }: DropzonePropsType): JSX.Element => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleUpdateIcon = useUpdateState();

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      setError(null);

      try {
        const response = await fetch("/api/s3/upload", {
          method: "POST",
          body: file,
          headers: {
            "Content-Type": file.type || "application/octet-stream",
            "File-Name": file.name,
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          handleUpdateIcon(icon_path, responseData.url);
        } else {
          setError("Upload failed. Please try another image.");
        }
      } catch (err) {
        setError("Error uploading file.");
      } finally {
        setUploading(false);
      }
    },
    [handleUpdateIcon, icon_path]
  );

  return (
    <div className="space-y-2">
      {error && <p className="text-destructive text-xs">{error}</p>}
      <label className="border-border hover:border-primary bg-muted/20 flex h-14 w-14 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors">
        <span className="text-muted-foreground text-xs font-bold">{uploading ? "..." : "+"}</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </label>
    </div>
  );
};

export default Dropzone;
