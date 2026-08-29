"use client";

import React, { useState, useEffect } from "react";

export type TutorialVideoConfigType = {
  title?: string;
  videoId?: string;
  externalUrl?: string;
  disabled?: boolean;
};

const DEFAULT_TUTORIAL_VIDEOS: Record<string, TutorialVideoConfigType> = {
  default: {
    title: "Quick Setup Guide",
    videoId: "dQw4w9WgXcQ",
    disabled: false,
  },
};

export type TutorialButtonPropsType = {
  compact?: boolean;
  collapsible?: boolean;
  currentPath?: string;
  videos?: Record<string, TutorialVideoConfigType>;
};

// Compatibility alias
export type TutorialButtonProps = TutorialButtonPropsType;

export function TutorialButton({
  compact = false,
  collapsible = true,
  currentPath: propCurrentPath,
  videos = DEFAULT_TUTORIAL_VIDEOS,
}: TutorialButtonPropsType): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pathname, setPathname] = useState("/");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(propCurrentPath || window.location.pathname);
      if (collapsible) {
        const saved = localStorage.getItem("tutorialButtonCollapsed");
        if (saved) {
          try {
            setIsCollapsed(JSON.parse(saved));
          } catch {
            // ignore
          }
        }
      }
    }
    setMounted(true);
  }, [collapsible, propCurrentPath]);

  const toggleCollapse = (e: React.MouseEvent) => {
    if (!collapsible) return;
    e.stopPropagation();
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (typeof window !== "undefined") {
      localStorage.setItem("tutorialButtonCollapsed", JSON.stringify(newState));
    }
  };

  if (!mounted) return null;

  const videoConfig =
    videos[pathname] || videos["*"] || videos["default"] || { disabled: true };

  if (videoConfig.disabled) return null;

  const isActuallyCollapsed = collapsible && isCollapsed;

  return (
    <>
      <div
        className={`fixed bottom-4 left-4 z-50 flex items-center gap-2 p-2 rounded-xl bg-card border border-border text-foreground shadow-lg cursor-pointer transition-all hover:bg-muted/80 ${
          isActuallyCollapsed ? "max-w-[50px]" : "max-w-[280px]"
        }`}
        onClick={() => {
          if (isActuallyCollapsed) {
            setIsCollapsed(false);
            if (typeof window !== "undefined") {
              localStorage.setItem("tutorialButtonCollapsed", "false");
            }
            return;
          }

          if (videoConfig.externalUrl) {
            window.open(videoConfig.externalUrl, "_blank");
          } else {
            setIsOpen(true);
          }
        }}
      >
        <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
          ▶
        </div>

        {!compact && !isActuallyCollapsed && (
          <span className="text-xs font-semibold truncate">
            {videoConfig.title || "Watch Tutorial"}
          </span>
        )}

        {collapsible && (
          <button
            type="button"
            onClick={toggleCollapse}
            className="text-muted-foreground hover:text-foreground text-xs px-1"
          >
            {isActuallyCollapsed ? "→" : "✕"}
          </button>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-full max-w-2xl rounded-2xl border border-border bg-card p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">
                {videoConfig.title || "Tutorial"}
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full border-none"
                src={`https://www.youtube.com/embed/${videoConfig.videoId}?autoplay=1`}
                title={videoConfig.title || "Tutorial Video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TutorialButton;
