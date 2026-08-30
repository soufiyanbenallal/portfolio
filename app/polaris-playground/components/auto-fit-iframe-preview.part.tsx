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
        height: 100%;
        min-height: 100%;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        color: #202223;
        -webkit-font-smoothing: antialiased;
      }
      body {
        display: flex;
        flex-direction: column;
      }
      *, *::before, *::after {
        box-sizing: border-box;
      }
      #preview-mount-root {
        width: 100%;
        flex: 1 1 auto;
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
 * - Overview mode (autoScale=true): Renders inside virtual desktop viewport and centers rendered component vertically.
 * - Single component mode (autoScale=false): Automatically sizes iframe height to full rendered content (min-height 480px / min-h-120).
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
  const [contentHeight, setContentHeight] = useState(480);

function isModuleSelector(selector: string): boolean {
  if (!selector) return false;
  // Reject global resets and tag-only rules
  if (
    selector.startsWith("*") ||
    selector.startsWith("html") ||
    selector.startsWith("body") ||
    selector.startsWith(":root") ||
    selector.startsWith(":host") ||
    selector.includes("@layer")
  ) {
    return false;
  }

  // Reject generic bare element tags
  if (/^[a-z0-9-]+(\s*,\s*[a-z0-9-]+)*$/i.test(selector)) {
    return false;
  }

  // Next.js CSS Modules generate class names with format: [file]_[class]__[hash] or _[class]_[hash]
  // Must contain class with underscore separator
  const classMatches = selector.match(/\.([a-zA-Z0-9_-]+)/g);
  if (!classMatches) return false;

  return classMatches.some((cls) => cls.includes("_"));
}

function syncModuleStylesOnlyToIframe(iframe: HTMLIFrameElement | null) {
  if (!iframe) return;
  try {
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc || !doc.head) return;

    // Extract ONLY CSS Module rules and their animations (NO global Tailwind / resets)
    let combinedModuleCss = "";
    const sheets = Array.from(document.styleSheets);

    for (const sheet of sheets) {
      try {
        // Skip global stylesheet links (e.g. Tailwind / globals.css)
        if (sheet.href && (sheet.href.includes("globals") || sheet.href.includes("tailwind"))) {
          continue;
        }

        const rules = Array.from(sheet.cssRules || []);
        for (const rule of rules) {
          if (rule instanceof CSSKeyframesRule) {
            // Keep module keyframes (fadeInDown, pop, scaleIn, pingRing, confettiFall, spin)
            combinedModuleCss += rule.cssText + "\n";
          } else if (rule instanceof CSSMediaRule) {
            const innerRules = Array.from(rule.cssRules || []);
            const validInner = innerRules
              .filter((r) => r instanceof CSSStyleRule && isModuleSelector(r.selectorText))
              .map((r) => r.cssText)
              .join("\n");
            if (validInner) {
              combinedModuleCss += `@media ${rule.conditionText} {\n${validInner}\n}\n`;
            }
          } else if (rule instanceof CSSStyleRule && isModuleSelector(rule.selectorText)) {
            combinedModuleCss += rule.cssText + "\n";
          }
        }
      } catch {
        // Cross-origin sheet access restriction, safe to ignore
      }
    }

    let customStyleTag = doc.getElementById("__injected_css_modules__") as HTMLStyleElement | null;
    if (!customStyleTag) {
      customStyleTag = doc.createElement("style");
      customStyleTag.id = "__injected_css_modules__";
      doc.head.appendChild(customStyleTag);
    }
    if (customStyleTag.textContent !== combinedModuleCss) {
      customStyleTag.textContent = combinedModuleCss;
    }
  } catch {
    // ignore
  }
}

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

      if (autoScale) {
        doc.body.style.height = "100%";
        doc.body.style.display = "flex";
        doc.body.style.flexDirection = "column";
        mount.style.flex = "1 1 auto";
        mount.style.display = "flex";
        mount.style.flexDirection = "column";
        mount.style.justifyContent = "center";
      } else {
        doc.body.style.height = "auto";
        doc.body.style.display = "block";
        mount.style.flex = "none";
        mount.style.display = "block";
      }

      syncModuleStylesOnlyToIframe(iframe);
      setMountNode(mount);
    } catch {
      // ignore
    }
  }, [padding, autoScale]);

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

  // Continuously sync module styles to iframe head while blocking all global parent styles
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    syncModuleStylesOnlyToIframe(iframe);

    const observer = new MutationObserver(() => {
      syncModuleStylesOnlyToIframe(iframeRef.current);
    });

    observer.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [mountNode]);

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

  // Measure content height dynamically in interactive single-component mode
  useEffect(() => {
    if (autoScale) return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    const measureHeight = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc || !doc.body) return;
        const mount = doc.getElementById("preview-mount-root");
        if (!mount) return;

        const measured = Math.max(
          mount.scrollHeight,
          mount.offsetHeight,
          doc.body.scrollHeight,
          doc.documentElement.scrollHeight,
          480
        );

        if (measured > 0) {
          setContentHeight((prev) => (Math.abs(prev - measured) > 4 ? measured : prev));
        }
      } catch {
        // ignore
      }
    };

    measureHeight();

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    const win = doc?.defaultView || window;
    const RO = win.ResizeObserver || window.ResizeObserver;

    let ro: ResizeObserver | null = null;
    const mount = doc?.getElementById("preview-mount-root");
    if (RO && mount) {
      ro = new RO(() => {
        measureHeight();
      });
      ro.observe(mount);
    }

    const t1 = setTimeout(measureHeight, 50);
    const t2 = setTimeout(measureHeight, 150);
    const t3 = setTimeout(measureHeight, 350);
    const t4 = setTimeout(measureHeight, 800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      ro?.disconnect();
    };
  }, [autoScale, mountNode]);

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
      className={`relative w-full ${className}`}
      style={{
        minHeight: "480px",
        height: `${contentHeight}px`,
        pointerEvents: interactive ? "auto" : "none",
        transition: "height 0.15s ease-out",
      }}
    >
      <iframe
        ref={iframeRef}
        title={title}
        tabIndex={interactive ? 0 : -1}
        aria-hidden={!interactive}
        onLoad={updateMountNode}
        className="w-full border-none block bg-transparent"
        style={{
          width: "100%",
          height: `${contentHeight}px`,
          minHeight: "480px",
          display: "block",
        }}
        srcDoc={IFRAME_SRCDOC}
      />
      {mountNode && createPortal(children, mountNode)}
    </div>
  );
}

export default AutoFitIframePreview;
