"use client";

import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import { MotionConfig } from "motion/react";
import { usePortfolioStore } from "@/lib/portfolio.store";
import { EASINGS, SCROLL } from "@/lib/motion.config";

/* ==================================================================== *
 * SMOOTH SCROLL — the one clock every scroll animation reads from
 * --------------------------------------------------------------------
 * Lenis is the *only* smoothing layer. It performs real window scrolls, so
 * everything downstream simply follows the scroll position:
 *
 *   • Motion's `useScroll` (hero deck, quote, text illumination) reads it
 *     on every frame with no glue;
 *   • GSAP ScrollTrigger (the services showcase) listens to the same
 *     native scroll events — which is why GSAP is not imported here. It
 *     loads on demand, on desktop only, inside the showcase itself, and
 *     stays out of every page's start-up bundle.
 *
 * Reduced motion is honoured by Lenis itself (`respectReducedMotion`, on by
 * default): scroll becomes 1:1 and programmatic scrolls jump instantly.
 * Touch keeps native momentum — smoothing it fights the OS.
 * ==================================================================== */

const LENIS_OPTIONS: LenisOptions = {
  autoRaf: true,
  lerp: SCROLL.lerp,
  smoothWheel: true,
  wheelMultiplier: SCROLL.wheelMultiplier,
  syncTouch: false,
  // Same-page `#anchor` links glide through Lenis, clearing the floating nav.
  anchors: { offset: SCROLL.anchorOffset },
  stopInertiaOnNavigate: true,
};

/**
 * Lives *inside* <ReactLenis> so `useLenis()` resolves once the instance
 * exists (ReactLenis creates it in an effect, after its first render).
 */
function ScrollClockBridge() {
  const lenis = useLenis();
  const isModalOpen = usePortfolioStore((state) => state.isContactOpen);

  // Dialogs lock `body` overflow, but Lenis drives the scroll itself and
  // would keep gliding the page underneath. Pause it for the duration.
  useEffect(() => {
    if (!lenis) return;
    if (isModalOpen) lenis.stop();
    else lenis.start();
  }, [lenis, isModalOpen]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <ScrollClockBridge />
      {/* Drops transform/layout animation for OS-level reduced motion while
          keeping opacity; scroll rigs additionally flatten themselves. */}
      <MotionConfig reducedMotion="user" transition={{ duration: 0.5, ease: EASINGS.entrance }}>
        {children}
      </MotionConfig>
    </ReactLenis>
  );
}
