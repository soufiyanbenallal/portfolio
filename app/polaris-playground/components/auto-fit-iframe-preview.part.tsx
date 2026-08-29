"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

export type AutoFitIframePreviewPropsType = {
  children: ReactNode;
  title?: string;
  padding?: number;
  interactive?: boolean;
  autoScale?: boolean;
  virtualWidth?: number;
  className?: string;
};

// Compatibility alias
export type AutoFitIframePreviewProps = AutoFitIframePreviewPropsType;

const IFRAME_SRCDOC = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="https://cdn.shopify.com/shopifycloud/polaris.js"></script>
    <style>
      html, body {
        margin: 0;
        padding: 0;
        background: transparent;
        width: 100%;
        min-height: 100%;
        height: 100%;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        color: #202223;
        -webkit-font-smoothing: antialiased;
      }
      *, *::before, *::after {
        box-sizing: border-box;
      }
      #preview-mount-root {
        width: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
      }
    </style>
  </head>
  <body>
    <div id="preview-mount-root"></div>
  </body>
</html>`;

/**
 * Complete style-isolated iframe preview component.
 * Renders components inside a real virtual desktop viewport (1000px wide),
 * vertically centered inside the card canvas.
 */
export function AutoFitIframePreview({
  children,
  title = "Component Preview",
  padding = 16,
  interactive = false,
  autoScale = true,
  virtualWidth = 1000,
  className = "",
}: AutoFitIframePreviewPropsType) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [scale, setScale] = useState(0.35);
  const [containerHeight, setContainerHeight] = useState(192);

  const updateMountNode = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc || !doc.body) return;

      let mount = doc.getElementById("preview-mount-root");
      if (!mount) {
        mount = doc.createElement("div");
        mount.id = "preview-mount-root";
        doc.body.appendChild(mount);
      }

      mount.style.padding = `${padding}px`;
      setMountNode(mount);
    } catch {
      // ignore
    }
  }, [padding]);

  // Dynamically calculate scale based on container width vs virtual desktop width
  const updateScale = useCallback(() => {
    if (!autoScale) return;
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth || 340;
    const currentHeight = container.clientHeight || 192;
    setContainerHeight(currentHeight);

    const newScale = containerWidth / virtualWidth;
    setScale(newScale);
  }, [autoScale, virtualWidth]);

  useEffect(() => {
    updateMountNode();
  }, [updateMountNode]);

  useEffect(() => {
    if (!autoScale) return;

    updateScale();
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [autoScale, updateScale]);

  if (autoScale) {
    // Virtual desktop height scaled to exactly fill the card height
    const virtualHeight = Math.round(containerHeight / Math.max(0.1, scale));

    return (
      <div
        ref={containerRef}
        className={`relative w-full h-full overflow-hidden ${className}`}
        style={{ pointerEvents: interactive ? "auto" : "none" }}
      >
        <iframe
          ref={iframeRef}
          title={title}
          tabIndex={interactive ? 0 : -1}
          aria-hidden={!interactive}
          onLoad={updateMountNode}
          className="border-none block bg-transparent"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${virtualWidth}px`,
            height: `${virtualHeight}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            pointerEvents: interactive ? "auto" : "none",
          }}
          srcDoc={IFRAME_SRCDOC}
        />
        {mountNode && createPortal(children, mountNode)}
      </div>
    );
  }

  // Interactive full-size / responsive canvas (single component view)
  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ pointerEvents: interactive ? "auto" : "none" }}
    >
      <iframe
        ref={iframeRef}
        title={title}
        tabIndex={interactive ? 0 : -1}
        aria-hidden={!interactive}
        onLoad={updateMountNode}
        className="w-full h-full border-none block bg-transparent"
        srcDoc={IFRAME_SRCDOC}
      />
      {mountNode && createPortal(children, mountNode)}
    </div>
  );
}

export default AutoFitIframePreview;
