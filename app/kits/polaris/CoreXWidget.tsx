import { useEffect } from "react";
import { normalizeCoreXBaseUrl } from "~/commons/utils/constants/corex";

/** Minimal shape of the browser-global the widget exposes (see corex-widget loader.js). */
interface CoreXChatApi {
  onReady?: (cb: () => void) => void;
  identify?: (data: { shop: string; email?: string; name?: string }) => void;
  startRecording?: () => void;
}

declare global {
  interface Window {
    CoreXChat?: CoreXChatApi;
    /** Set once the widget <script> has been injected — guards double-inject. */
    __coreXWidgetInjected?: boolean;
  }
}

interface CoreXWidgetProps {
  /** Public widget key (cwk_…) — browser-safe, NOT the secret ingestion token. */
  widgetKey: string;
  /**
   * CoreX origin. Optional — defaults to the fleet-wide origin. Pass only to
   * point at a local CoreX in development.
   */
  baseUrl?: string;
  /**
   * The CoreX product handle for this app — NOT the Shopify app handle. The two
   * are derived independently (CoreX from the App Store listing title, the app
   * from its own slug) and drift apart, e.g. `theme-maestro-scheduler` here vs
   * `maestro-theme-scheduler` in CoreX. Prefer `coreXAppId`, which cannot drift.
   */
  app?: string;
  /**
   * Numeric Shopify App ID (the one CoreX shows on the app card). This is the
   * reliable join key: a listing rename moves the handle but never the ID, so
   * CoreX resolves on it first. Pass it wherever you can.
   */
  coreXAppId?: string;
  /** The merchant's myshopify domain — attributes the session to their store. */
  shop: string;
  email?: string | null;
  name?: string | null;
  /**
   * Force session recording on (needs the Session Replay addon enabled in
   * CoreX). Chat + booking come from the widget's own CoreX settings.
   */
  record?: boolean;
}

/** How long to keep polling for `window.CoreXChat` before giving up (ms). */
const READY_TIMEOUT_MS = 10_000;
const READY_POLL_MS = 300;

/** Defer non-critical work to browser idle time (falls back to a macrotask). */
function onIdle(cb: () => void): () => void {
  const ric = (
    window as unknown as {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    }
  ).requestIdleCallback;
  if (ric) {
    const id = ric(cb);
    return () =>
      (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
  }
  const id = setTimeout(cb, 200);
  return () => clearTimeout(id);
}

/**
 * Mounts the CoreX embeddable widget (live chat + session replay + booking) in
 * the embedded app. The <script> is a page singleton — injected once (deferred
 * to idle so it never competes with app paint), then the merchant is identified
 * whenever their identity changes.
 *
 * The public widget key is browser-safe (distinct from the secret X-CoreX-Token
 * used server-side). The widget key alone switches the feature on: the origin
 * defaults to the fleet-wide one, so only a local CoreX needs `baseUrl`.
 * No-op when widgetKey is unset. Renders no DOM — the visible UI is the vendor
 * iframe injected by widget.js.
 */
export default function CoreXWidget({
  widgetKey,
  baseUrl,
  app,
  coreXAppId,
  shop,
  email,
  name,
  record = true,
}: CoreXWidgetProps) {
  const base = normalizeCoreXBaseUrl(baseUrl);

  // 1) Inject the widget script exactly once per page, on idle.
  useEffect(() => {
    if (!widgetKey || typeof window === "undefined") return;
    if (window.__coreXWidgetInjected || document.querySelector("script[data-corex-widget]")) {
      window.__coreXWidgetInjected = true;
      return;
    }
    return onIdle(() => {
      if (window.__coreXWidgetInjected) return;
      const s = document.createElement("script");
      s.async = true;
      s.src = `${base}/widget.js`;
      s.setAttribute("data-corex-key", widgetKey);
      // Send whichever identifiers we have. Never substitute a guess for a
      // missing one: a wrong handle that happens to match ANOTHER app files this
      // app's recordings under that one, which is worse than not attributing.
      if (app) s.setAttribute("data-corex-app", app);
      if (coreXAppId) s.setAttribute("data-corex-app-id", coreXAppId);
      s.setAttribute("data-corex-base", base);
      s.setAttribute("data-corex-widget", "1");
      document.body.appendChild(s);
      window.__coreXWidgetInjected = true;
      if (!app && !coreXAppId && process.env.NODE_ENV !== "production") {
        console.warn(
          "[corex] neither `coreXAppId` nor `app` was passed — chat works, but " +
            "recordings and conversations will not attribute to any app."
        );
      }
      // Left in place on unmount — the widget is a singleton for the app session.
    });
  }, [widgetKey, base, app, coreXAppId]);

  // 2) (Re)identify + record whenever identity changes, once the widget is ready.
  useEffect(() => {
    if (!widgetKey || !shop || typeof window === "undefined") return;
    let cancelled = false;

    // Run against CoreXChat if it's booted; returns false until it exists so we
    // can poll (the script loads async and may already be loaded on remount).
    const run = (): boolean => {
      const cx = window.CoreXChat;
      if (!cx?.onReady) return false;
      cx.onReady(() => {
        if (cancelled) return;
        try {
          cx.identify?.({
            shop,
            email: email ?? undefined,
            name: name ?? undefined,
          });
          if (record) cx.startRecording?.();
        } catch {
          /* best-effort — never break the app */
        }
      });
      return true;
    };

    if (run()) return () => void (cancelled = true);

    const poll = setInterval(() => {
      if (cancelled || run()) clearInterval(poll);
    }, READY_POLL_MS);
    const stop = setTimeout(() => clearInterval(poll), READY_TIMEOUT_MS);
    return () => {
      cancelled = true;
      clearInterval(poll);
      clearTimeout(stop);
    };
  }, [widgetKey, base, shop, email, name, record]);

  return null;
}
