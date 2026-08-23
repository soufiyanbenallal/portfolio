"use client";

import { useSyncExternalStore, useCallback } from "react";

/**
 * SSR-safe media query subscription.
 *
 * `useSyncExternalStore` is used rather than `useState` + `useEffect` because
 * it gives React an explicit server snapshot, which keeps the first client
 * render identical to the server render — no hydration mismatch, and no
 * one-frame flash of the wrong layout.
 *
 * The server snapshot is always `false`, so components must be written so the
 * `false` branch is the safe, layout-stable one (typically: the mobile /
 * non-animated fallback).
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (typeof window === "undefined") return () => {};
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", onStoreChange);
      return () => mediaQueryList.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Tailwind's `md` breakpoint and up — where the heavy scroll rigs switch on. */
export const useIsDesktop = () => useMediaQuery("(min-width: 768px)");

/** Wide desktop — where full 3D staging has room to breathe. */
export const useIsWide = () => useMediaQuery("(min-width: 1200px)");

/**
 * Hydration-safe reduced-motion preference.
 *
 * Motion's own `useReducedMotion` seeds `useState` from the live media query,
 * which returns `null` on the server and the real value on the client — so any
 * component that renders a *different tree* for reduced motion produces a
 * hydration mismatch (React error #418) for users who have it enabled.
 *
 * `useSyncExternalStore` fixes that: React uses the server snapshot for the
 * hydration pass, then re-renders with the real value. Use motion's hook when
 * you only need to soften values; use this one whenever the preference changes
 * what is rendered.
 */
export const useReducedMotionSafe = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");
