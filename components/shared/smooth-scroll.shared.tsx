"use client";

import React, { useMemo } from "react";
import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";
import { EASINGS } from "@/lib/motion.config";

/**
 * Global motion root.
 *
 * Two responsibilities, deliberately kept together so there is exactly one
 * place that decides "how does this site move":
 *
 *  1. Lenis owns the scroll position. Every scroll-linked animation in the
 *     app reads from `useScroll`, which listens to real scroll events — and
 *     Lenis performs real scrolls — so the two stay in sync without glue.
 *
 *  2. `MotionConfig reducedMotion="user"` makes every `motion` component in
 *     the tree drop transform/layout animation when the OS asks for reduced
 *     motion, while keeping opacity changes. Scroll-linked rigs additionally
 *     check `useReducedMotion()` themselves and flatten to a static layout.
 */
export function SmoothScrollShared({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  const lenisOptions = useMemo(
    () =>
      prefersReducedMotion
        ? // Keep Lenis mounted (anchor scrolling still routes through it) but
          // hand the pixel-for-pixel scroll straight back to the browser.
          { lerp: 1, smoothWheel: false, syncTouch: false, duration: 0 }
        : {
            lerp: 0.09,
            duration: 1.1,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.6,
            // Touch devices keep native inertia — smoothing them fights the OS.
            syncTouch: false,
          },
    [prefersReducedMotion],
  );

  return (
    <ReactLenis root options={lenisOptions}>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: 0.5, ease: EASINGS.entrance }}
      >
        {children}
      </MotionConfig>
    </ReactLenis>
  );
}
