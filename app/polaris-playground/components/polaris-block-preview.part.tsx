"use client";

import React, { useState, useMemo } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  Copy,
  Check,
  ChevronRight,
  ChevronDown,
  FolderOpen,
  FileCode2,
  Terminal,
} from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { PolarisPreviewRenderer } from "./polaris-preview-renderer.part";
import type { PolarisExampleItemType } from "../data/polaris-docs.data";

export type BlockFileItemType = {
  name: string;
  path: string;
  content: string;
  language?: string;
};

export type PolarisBlockPreviewPropsType = {
  example: PolarisExampleItemType;
  componentSlug: string;
  componentName: string;
  defaultInstallCommand?: string;
  files?: BlockFileItemType[];
};

type ViewportModeType = "desktop" | "tablet" | "mobile";

export function PolarisBlockPreviewPart({
  example,
  componentSlug,
  componentName,
  defaultInstallCommand,
  files: customFiles,
}: PolarisBlockPreviewPropsType) {
  // Default tab view is Preview
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const [viewport, setViewport] = useState<ViewportModeType>("desktop");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    example: true,
    ui: true,
  });

  // Normalize component filename (e.g. "Button" -> "Button.tsx", "Clickable chip" -> "ClickableChip.tsx")
  const primaryFileName = useMemo(() => {
    const pascal = componentName
      .replace(/[^a-zA-Z0-9]/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("");
    return `${pascal || "Component"}.tsx`;
  }, [componentName]);

  // Clean files list
  const files: BlockFileItemType[] = useMemo(() => {
    if (customFiles && customFiles.length > 0) return customFiles;

    return [
      {
        name: primaryFileName,
        path: `ui/${primaryFileName}`,
        content: `// ${primaryFileName}`,
        language: "tsx",
      },
    ];
  }, [customFiles, primaryFileName]);

  const [selectedFilePath, setSelectedFilePath] = useState<string>("");

  const activeFile = useMemo(() => {
    return files.find((f) => f.path === selectedFilePath) || files[0];
  }, [files, selectedFilePath]);

  // Group files dynamically by top-level folder (e.g. "example" and "ui")
  const folderGroups = useMemo(() => {
    const map = new Map<string, BlockFileItemType[]>();

    files.forEach((file) => {
      const parts = file.path.split("/");
      const folderName = parts.length > 1 ? parts[0] : "ui";
      if (!map.has(folderName)) {
        map.set(folderName, []);
      }
      map.get(folderName)!.push(file);
    });

    return Array.from(map.entries()).map(([folder, folderFiles]) => ({
      folder,
      files: folderFiles,
    }));
  }, [files]);

  const toggleFolder = (folder: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folder]: prev[folder] === undefined ? false : !prev[folder],
    }));
  };

  const installCommand =
    defaultInstallCommand || `npx shadcn@latest add ${componentSlug}`;

  const handleCopyCode = () => {
    if (!activeFile) return;
    navigator.clipboard.writeText(activeFile.content);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(installCommand);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const language = getPrismLanguage(activeFile?.path || "");

  return (
    <div className="flex flex-col gap-3 py-4">
      {/* ── Top Action Toolbar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        {/* Left: Preview / Code Segmented Toggle & Title */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-lg bg-gray-100 p-1 text-xs font-medium text-gray-600 border border-gray-200/80">
            <button
              type="button"
              onClick={() => setViewMode("preview")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-all cursor-pointer ${
                viewMode === "preview"
                  ? "bg-white text-gray-900 shadow-xs font-semibold"
                  : "hover:text-gray-900"
              }`}
            >
              Preview
            </button>
            <button
              type="button"
              onClick={() => setViewMode("code")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-all cursor-pointer ${
                viewMode === "code"
                  ? "bg-white text-gray-900 shadow-xs font-semibold"
                  : "hover:text-gray-900"
              }`}
            >
              Code
            </button>
          </div>

          <span className="hidden h-4 w-px bg-gray-300 sm:inline-block" />

          <span className="text-sm font-medium text-gray-700 truncate max-w-md">
            {example.title}
          </span>
        </div>

        {/* Right: Viewports & Install Command Pill */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Viewport controls (active in Preview mode) */}
          <div className="flex items-center rounded-lg border border-gray-200 bg-white p-0.5 text-gray-600 shadow-xs">
            <button
              type="button"
              onClick={() => {
                setViewMode("preview");
                setViewport("desktop");
              }}
              title="Desktop view"
              className={`rounded-md p-1.5 transition-colors cursor-pointer ${
                viewport === "desktop" && viewMode === "preview"
                  ? "bg-gray-100 text-gray-900 font-semibold"
                  : "hover:text-gray-900"
              }`}
            >
              <Monitor className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode("preview");
                setViewport("tablet");
              }}
              title="Tablet view"
              className={`rounded-md p-1.5 transition-colors cursor-pointer ${
                viewport === "tablet" && viewMode === "preview"
                  ? "bg-gray-100 text-gray-900 font-semibold"
                  : "hover:text-gray-900"
              }`}
            >
              <Tablet className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode("preview");
                setViewport("mobile");
              }}
              title="Mobile view"
              className={`rounded-md p-1.5 transition-colors cursor-pointer ${
                viewport === "mobile" && viewMode === "preview"
                  ? "bg-gray-100 text-gray-900 font-semibold"
                  : "hover:text-gray-900"
              }`}
            >
              <Smartphone className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setRefreshKey((k) => k + 1)}
              title="Refresh preview"
              className="rounded-md p-1.5 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <RotateCw className="size-3.5" />
            </button>
          </div>

          {/* Install command copy button */}
          <button
            type="button"
            onClick={handleCopyInstall}
            className="group flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 font-mono text-xs text-gray-800 shadow-xs hover:border-gray-300 hover:bg-gray-50 active:translate-y-px transition-all cursor-pointer"
            title="Copy install command"
          >
            <Terminal className="size-3.5 text-gray-500 group-hover:text-gray-800" />
            <span className="truncate max-w-[200px] sm:max-w-[280px]">
              {installCommand}
            </span>
            {copiedInstall ? (
              <Check className="size-3.5 text-emerald-600 ml-1" />
            ) : (
              <Copy className="size-3.5 text-gray-400 group-hover:text-gray-700 ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* ── Main Container matching the Image ── */}
      {viewMode === "preview" ? (
        /* Preview Canvas (Default) */
        <div className="flex min-h-[360px] w-full items-center justify-center overflow-x-auto rounded-xl border border-gray-200 bg-[#FAFAFA] p-6 shadow-xs [background-image:radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:14px_14px]">
          <div
            key={refreshKey}
            className={`transition-all duration-300 flex items-center justify-center ${
              viewport === "desktop"
                ? "w-full"
                : viewport === "tablet"
                  ? "w-[768px] rounded-xl border border-gray-300 bg-white p-6 shadow-md"
                  : "w-[390px] rounded-2xl border-2 border-gray-400 bg-white p-6 shadow-lg"
            }`}
          >
            <PolarisPreviewRenderer renderKey={example.renderKey} />
          </div>
        </div>
      ) : (
        /* Code Mode: Multi-folder File Explorer & Syntax Colored Code Viewer */
        <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs md:grid-cols-12 min-h-[380px]">
          {/* Left Column: Multi-folder Files Tree (e.g. example/ and ui/) */}
          <div className="border-b border-gray-200 bg-white p-3 md:col-span-3 md:border-b-0 md:border-r ">
            <div className="pb-2 text-xs font-semibold text-gray-400 px-2 select-none">
              Files
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              {folderGroups.map((group) => {
                const isOpen = openFolders[group.folder] ?? true;
                return (
                  <div key={group.folder} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => toggleFolder(group.folder)}
                      className="flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-left text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer select-none"
                    >
                      {isOpen ? (
                        <ChevronDown className="size-3 text-gray-400 shrink-0" />
                      ) : (
                        <ChevronRight className="size-3 text-gray-400 shrink-0" />
                      )}
                      <FolderOpen className="size-3.5 text-blue-500 shrink-0" />
                      <span className="truncate font-semibold text-gray-800">
                        {group.folder}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="flex flex-col space-y-0.5 pl-5 pt-0.5">
                        {group.files.map((file) => {
                          const isSelected = activeFile?.path === file.path;
                          return (
                            <button
                              key={file.path}
                              type="button"
                              onClick={() => setSelectedFilePath(file.path)}
                              className={`flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-left transition-colors cursor-pointer select-none ${
                                isSelected
                                  ? "bg-gray-100 text-gray-900 font-semibold shadow-2xs"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              }`}
                            >
                              <FileCode2 className="size-3.5 text-gray-400 shrink-0" />
                              <span className="truncate">{file.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Code Viewer with File Header & Syntax Highlighting */}
          <div className="flex flex-col md:col-span-9 bg-white">
            {/* Top file path banner */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5">
              <div className="flex items-center gap-2 font-mono text-xs text-gray-800">
                <span className="rounded bg-gray-900 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-white">
                  {getFileBadge(activeFile?.path || "")}
                </span>
                <span className="font-medium text-gray-800 truncate">
                  {activeFile?.path}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-600 hover:border-gray-300 hover:bg-gray-50 active:translate-y-px transition-all cursor-pointer"
                title="Copy file content"
              >
                {copiedCode ? (
                  <>
                    <Check className="size-3.5 text-emerald-600" />
                    <span className="text-[11px] text-emerald-600 font-medium">
                      Copied
                    </span>
                  </>
                ) : (
                  <Copy className="size-3.5 text-gray-500" />
                )}
              </button>
            </div>

            {/* Syntax Highlighted Code content with line numbers */}
            <div className="flex flex-1 overflow-x-auto py-2 px-4 bg-white">
              <Highlight
                theme={{
                  ...themes.github,
                  plain: {
                    ...themes.github.plain,
                    backgroundColor: "#ffffff",
                  },
                }}
                code={(activeFile?.content || "").trim()}
                language={language}
              >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre
                    className="flex-1 overflow-x-auto font-mono text-xs leading-relaxed"
                    style={{
                      ...style,
                      backgroundColor: "#ffffff",
                    }}
                  >
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })} className="table-row">
                        <span className="table-cell select-none pr-4 text-right text-gray-400 font-normal">
                          {i + 1}
                        </span>
                        <span className="table-cell text-gray-900">
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </span>
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getPrismLanguage(filePath: string): string {
  if (filePath.endsWith(".tsx") || filePath.endsWith(".jsx")) return "tsx";
  if (filePath.endsWith(".ts")) return "typescript";
  if (filePath.endsWith(".module.css") || filePath.endsWith(".css")) return "css";
  if (filePath.endsWith(".html")) return "html";
  if (filePath.endsWith(".json")) return "json";
  return "tsx";
}

function getFileBadge(filePath: string): string {
  if (filePath.endsWith(".module.css")) return "CSS";
  if (filePath.endsWith(".css")) return "CSS";
  if (filePath.endsWith(".tsx")) return "TSX";
  if (filePath.endsWith(".ts")) return "TS";
  if (filePath.endsWith(".jsx")) return "JSX";
  if (filePath.endsWith(".html")) return "HTML";
  if (filePath.endsWith(".json")) return "JSON";
  return "FILE";
}
