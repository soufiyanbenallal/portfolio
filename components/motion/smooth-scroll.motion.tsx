"use client";

import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import { MotionConfig } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolioStore } from "@/lib/portfolio.store";
import { EASINGS, SCROLL } from "@/lib/motion.config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ==================================================================== *
 * SMOOTH SCROLL — the one clock every scroll animation reads from
 * --------------------------------------------------------------------
 * The homepage runs two animation engines against the scrollbar: Motion's
 * `useScroll` (hero deck, quote, text illumination) and GSAP ScrollTrigger
 * (services rig). If each smooths the scroll on its own, they drift apart
 * and the page feels like it is dragging through syrup in some sections
 * and snapping in others. So:
 *
 *  1. Lenis is the *only* smoothing layer. It performs real window scrolls,
 *     so Motion's `useScroll` picks them up with no glue.
 *  2. GSAP's ticker drives Lenis' frame loop (`autoRaf: false`), and every
 *     Lenis frame pushes a `ScrollTrigger.update()` — so pinned/scrubbed GSAP
 *     timelines advance on exactly the same frame as the Motion values.
 *  3. The rigs themselves apply only a light, stiff spring on top (see
 *     `SPRINGS.scroll`), enough to absorb frame jitter without adding lag.
 *
 * Reduced motion is honoured by Lenis itself (`respectReducedMotion`, on by
 * default): scroll becomes 1:1 and programmatic scrolls jump instantly.
 * Touch keeps native momentum — smoothing it fights the OS.
 * ==================================================================== */

const LENIS_OPTIONS: LenisOptions = {
  autoRaf: false,
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
  const isModalOpen = usePortfolioStore((state) => state.isContactOpen || state.isBookingOpen);

  useEffect(() => {
    if (!lenis) return;

    const tick = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    // GSAP's lag smoothing would stall Lenis after a long frame, then jump.
    gsap.ticker.lagSmoothing(0);

    // Web fonts swap in after first paint and change section heights, which
    // leaves every ScrollTrigger start/end a few pixels stale.
    let isCancelled = false;
    document.fonts?.ready.then(() => {
      if (!isCancelled) ScrollTrigger.refresh();
    });

    return () => {
      isCancelled = true;
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tick);
    };
  }, [lenis]);

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
