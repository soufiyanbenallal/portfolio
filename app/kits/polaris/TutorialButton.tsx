import { useState, useEffect } from "react";
import { useLocation } from "react-router";

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
  videos?: Record<string, TutorialVideoConfigType>;
};

// Compatibility alias
export type TutorialButtonProps = TutorialButtonPropsType;

export function TutorialButton({
  compact = false,
  collapsible = true,
  videos = DEFAULT_TUTORIAL_VIDEOS,
}: TutorialButtonPropsType): JSX.Element | null {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (collapsible && typeof window !== "undefined") {
      const saved = localStorage.getItem("tutorialButtonCollapsed");
      if (saved) {
        setIsCollapsed(JSON.parse(saved));
      }
    }
    setMounted(true);
  }, [collapsible]);

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

  const currentPath = location.pathname;
  const videoConfig = videos[currentPath] || videos["*"] || videos["default"] || { disabled: true };

  if (videoConfig.disabled) return null;

  const isActuallyCollapsed = collapsible && isCollapsed;

  return (
    <>
      <div
        className={`fixed bottom-3 left-3 z-50 flex items-center gap-2 p-2 rounded-xl bg-card border border-border text-foreground shadow-lg cursor-pointer transition-all hover:bg-muted/80 ${
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
        <s-modal
          id="tutorial-video-modal"
          heading={videoConfig.title || "Tutorial"}
          onHide={() => setIsOpen(false)}
        >
          <div className="p-4 w-full aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full border-none"
              src={`https://www.youtube.com/embed/${videoConfig.videoId}?autoplay=1`}
              title={videoConfig.title || "Tutorial Video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </s-modal>
      )}
    </>
  );
}

export default TutorialButton;
