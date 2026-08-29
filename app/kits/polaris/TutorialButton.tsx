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


export function TutorialButton({
  compact = false,
  currentPath: propCurrentPath,
  videos = DEFAULT_TUTORIAL_VIDEOS,
}: TutorialButtonPropsType): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pathname, setPathname] = useState("/");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(propCurrentPath || window.location.pathname);
    }
    setMounted(true);
  }, [propCurrentPath]);

  if (!mounted) return null;

  const videoConfig =
    videos[pathname] || videos["*"] || videos["default"] || { disabled: true };

  if (videoConfig.disabled) return null;

  const handleClick = () => {
    if (videoConfig.externalUrl) {
      window.open(videoConfig.externalUrl, "_blank");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <s-button
        variant="primary"
        onClick={handleClick}
        icon="play"
      >
        {compact ? "Tutorial" : videoConfig.title || "Watch Tutorial"}
      </s-button>

      {isOpen && (
        <s-modal
          id="tutorial-video-modal"
          heading={videoConfig.title || "Tutorial Video"}
          onHide={() => setIsOpen(false)}
        >
          <s-box padding="base">
            <s-stack direction="block" gap="base">
              <iframe
                style={{ width: "100%", aspectRatio: "16/9", border: "none", borderRadius: "8px" }}
                src={`https://www.youtube.com/embed/${videoConfig.videoId}?autoplay=1`}
                title={videoConfig.title || "Tutorial Video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <s-stack direction="inline" justifyContent="end">
                <s-button variant="secondary" onClick={() => setIsOpen(false)}>
                  Close
                </s-button>
              </s-stack>
            </s-stack>
          </s-box>
        </s-modal>
      )}
    </>
  );
}

export default TutorialButton;
