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
  className?: string;
};

// Compatibility alias
export type AutoFitIframePreviewProps = AutoFitIframePreviewPropsType;

/**
 * Scaler component that runs inside the iframe.
 * Dynamically measures unscaled content vs. iframe viewport dimensions
 * and calculates exact scale = Math.min(viewportW / contentW, viewportH / contentH, 1).
 */
function AutoFitScaler({
  children,
  padding = 12,
}: {
  children: ReactNode;
  padding?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [ready, setReady] = useState(false);

  const calculateScale = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    // Viewport dimensions
    const viewportWidth = container.clientWidth || window.innerWidth;
    const viewportHeight = container.clientHeight || window.innerHeight;

    // Content unscaled dimensions
    const contentWidth = Math.max(content.scrollWidth, content.offsetWidth, 1);
    const contentHeight = Math.max(content.scrollHeight, content.offsetHeight, 1);

    const availableWidth = Math.max(1, viewportWidth - padding * 2);
    const availableHeight = Math.max(1, viewportHeight - padding * 2);

    // Exact scale formula: small stays 1, large scales down proportionally
    const newScale = Math.min(
      availableWidth / contentWidth,
      availableHeight / contentHeight,
      1
    );

    setScale(newScale);
    setReady(true);
  }, [padding]);

  useEffect(() => {
    calculateScale();

    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    // RAF & settlement checks
    const rafId = requestAnimationFrame(calculateScale);
    const settleTimeout = setTimeout(calculateScale, 150);

    const resizeObserver = new ResizeObserver(() => {
      calculateScale();
    });

    resizeObserver.observe(container);
    resizeObserver.observe(content);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(settleTimeout);
      resizeObserver.disconnect();
    };
  }, [calculateScale]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        pointerEvents: "none",
        opacity: ready ? 1 : 0,
        transition: "opacity 0.15s ease-out",
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          willChange: "transform",
          transition: "transform 0.15s ease-out",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          ref={contentRef}
          style={{
            display: "inline-block",
            width: "max-content",
            boxSizing: "border-box",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Complete style-isolated iframe preview component.
 * Injects parent stylesheets + Polaris Web Components runtime into iframe
 * and automatically scales any complex/wide component to fit the card viewport.
 */
export function AutoFitIframePreview({
  children,
  title = "Component Preview",
  padding = 14,
  interactive = false,
  className = "",
}: AutoFitIframePreviewPropsType) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const setupIframe = () => {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) return;

      // 1. Sync theme class (light / dark)
      doc.documentElement.className = document.documentElement.className;

      // 2. Base reset & font styling inside iframe
      let baseStyle = doc.getElementById("iframe-base-reset");
      if (!baseStyle) {
        baseStyle = doc.createElement("style");
        baseStyle.id = "iframe-base-reset";
        baseStyle.textContent = `
          html, body {
            margin: 0;
            padding: 0;
            background: transparent;
            overflow: hidden;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            font-family: var(--font-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
            color: var(--foreground, #0f172a);
            -webkit-font-smoothing: antialiased;
          }
          *, *::before, *::after {
            box-sizing: border-box;
          }
        `;
        doc.head.appendChild(baseStyle);
      }

      // 3. Clone all parent stylesheets (<link rel="stylesheet">)
      const parentLinks = document.querySelectorAll<HTMLLinkElement>(
        'link[rel="stylesheet"]'
      );
      parentLinks.forEach((link) => {
        if (!doc.querySelector(`link[href="${link.href}"]`)) {
          const newLink = doc.createElement("link");
          newLink.rel = "stylesheet";
          newLink.href = link.href;
          doc.head.appendChild(newLink);
        }
      });

      // 4. Clone all parent inline <style> tags (Tailwind tokens & theme rules)
      const parentStyles = document.querySelectorAll<HTMLStyleElement>("style");
      parentStyles.forEach((style, idx) => {
        if (style.id === "iframe-base-reset") return;
        const selector = `style[data-parent-style-idx="${idx}"]`;
        if (!doc.querySelector(selector)) {
          const newStyle = doc.createElement("style");
          newStyle.textContent = style.textContent;
          newStyle.setAttribute("data-parent-style-idx", String(idx));
          doc.head.appendChild(newStyle);
        }
      });

      // 5. Load Polaris Web Components CDN script inside iframe
      if (!doc.querySelector('script[src*="polaris.js"]')) {
        const polarisScript = doc.createElement("script");
        polarisScript.src = "https://cdn.shopify.com/shopifycloud/polaris.js";
        polarisScript.async = true;
        doc.head.appendChild(polarisScript);
      }

      // 6. Create mount root element
      let mount = doc.getElementById("preview-mount-root");
      if (!mount) {
        mount = doc.createElement("div");
        mount.id = "preview-mount-root";
        mount.style.position = "absolute";
        mount.style.inset = "0";
        mount.style.width = "100%";
        mount.style.height = "100%";
        mount.style.overflow = "hidden";
        doc.body.appendChild(mount);
      }

      setMountNode(mount);
    };

    if (iframe.contentDocument?.readyState === "complete") {
      setupIframe();
    } else {
      iframe.addEventListener("load", setupIframe);
      return () => iframe.removeEventListener("load", setupIframe);
    }
  }, []);

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ pointerEvents: interactive ? "auto" : "none" }}
    >
      <iframe
        ref={iframeRef}
        title={title}
        tabIndex={-1}
        aria-hidden={!interactive}
        className="w-full h-full border-none block bg-transparent"
        srcDoc="<!DOCTYPE html><html><head></head><body><div id='preview-mount-root'></div></body></html>"
      />
      {mountNode &&
        createPortal(
          <AutoFitScaler padding={padding}>{children}</AutoFitScaler>,
          mountNode
        )}
    </div>
  );
}

export default AutoFitIframePreview;
