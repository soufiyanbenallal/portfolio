"use client";

import React, { useEffect, useRef } from "react";
import { useMediaQuery, useReducedMotionSafe } from "@/hooks/use-media-query.hook";
import { cn } from "@/lib/utils";

/* ==================================================================== *
 * SERVICE SHOWCASE
 * --------------------------------------------------------------------
 * A service as a full section, in two movements:
 *
 *   1. Arrival — the panel fills the whole viewport, edge to edge, over
 *      the frame and its rails. The first ~70% of a screen of scroll
 *      shrinks it into its place in the grid: the frame's left column,
 *      aligned to the rails, clear of the floating nav.
 *   2. Reading — the panel stays docked in that column while the right
 *      column scrolls natively: the long explanation is ordinary page
 *      content, read at the reader's own pace. When it ends, the section
 *      ends, the panel leaves with it, and the next service begins.
 *
 * The panel animates its box (left / top / width / height), not a scale:
 * its poster is laid out in container units, so it re-composes as it
 * changes shape instead of being squashed or cropped. The panel is its own
 * size container, so each frame's layout stays inside it.
 *
 * GSAP is imported on demand, only when the rig is on: phones and
 * reduced-motion visitors never download it, and on desktop it loads after
 * first paint instead of in the start-up bundle. All showcases share the
 * one module promise.
 *
 * Render inside a <Section> — the docked slot lines up with that frame.
 * Below 1024×640, or with reduced motion: the panel, then the text.
 * ==================================================================== */

type ScrollEngineType = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
};

let scrollEngine: Promise<ScrollEngineType> | null = null;

/** GSAP + ScrollTrigger, fetched once and shared by every showcase. */
function loadScrollEngine() {
  scrollEngine ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    }
  );
  return scrollEngine;
}

/** Scroll, as a fraction of the viewport height, spent docking the panel. */
const DOCK_DISTANCE = 0.7;
/** Corner radius once docked, in px. */
const DOCK_RADIUS = 24;

export type ServiceShowcasePropsType = {
  /** Full-viewport poster that docks into the left column. Must fill its parent. */
  panel: React.ReactNode;
  /** The long-form explanation, scrolled natively in the right column. */
  children: React.ReactNode;
  className?: string;
};

export function ServiceShowcase({ panel, children, className }: ServiceShowcasePropsType) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotionSafe();
  const hasRoom = useMediaQuery("(min-width: 1024px) and (min-height: 640px)");
  const rigEnabled = hasRoom && !prefersReducedMotion;

  useEffect(() => {
    if (!rigEnabled) return;
    const root = rootRef.current;
    const panelEl = panelRef.current;
    const slot = slotRef.current;
    if (!root || !panelEl || !slot) return;

    let isCancelled = false;
    let cleanup: (() => void) | undefined;

    loadScrollEngine().then(({ gsap, ScrollTrigger }) => {
      if (isCancelled) return;

      // The docked box, in the pinned layer's coordinates. The layer spans
      // the viewport from x = 0, so the slot's viewport x is its layer x;
      // its y inside the pinned column is constant (the nav clearance).
      const target = () => ({
        left: slot.getBoundingClientRect().left,
        top: slot.offsetTop,
        width: slot.offsetWidth,
        height: slot.offsetHeight,
      });

      const tween = gsap.fromTo(
        panelEl,
        {
          left: 0,
          top: 0,
          width: () => document.documentElement.clientWidth,
          height: () => window.innerHeight,
          borderRadius: 0,
          // 0 → 1 as the panel docks: the poster grows its docked-only UI
          // (chapter index, divider) from this, with no React re-render.
          "--dock": 0,
        },
        {
          left: () => target().left,
          top: () => target().top,
          width: () => target().width,
          height: () => target().height,
          borderRadius: DOCK_RADIUS,
          "--dock": 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${window.innerHeight * DOCK_DISTANCE}`,
            // Lenis already smooths the scroll; a numeric scrub would add lag.
            scrub: true,
            invalidateOnRefresh: true,
            // Docked-only controls take pointer input only once settled.
            onUpdate: (self) => panelEl.toggleAttribute("data-docked", self.progress > 0.92),
          },
        }
      );

      // Fonts that swap in after first paint change section heights; the
      // trigger's start/end must be measured against the settled layout.
      document.fonts?.ready.then(() => {
        if (!isCancelled) ScrollTrigger.refresh();
      });

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => {
      isCancelled = true;
      cleanup?.();
    };
  }, [rigEnabled]);

  if (!rigEnabled) {
    return (
      <div className={cn("w-full", className)}>
        <div className="relative aspect-4/5 w-full overflow-hidden sm:aspect-16/10">{panel}</div>
        <div>{children}</div>
      </div>
    );
  }

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      {/* Pinned layer: the full viewport, escaping the frame, above the grid. */}
      <div className="pointer-events-none sticky top-0 z-20 ml-[calc(50%-50vw)] h-screen w-screen">
        <div
          ref={panelRef}
          data-rig=""
          className="group/panel ring-line-2 pointer-events-auto absolute overflow-hidden shadow-[0_30px_80px_-40px_rgb(17_17_19/0.45)] ring-1 will-change-[left,top,width,height]"
          style={{ left: 0, top: 0, width: "100%", height: "100%" }}
        >
          {panel}
        </div>
      </div>

      {/* The grid the panel docks into, pulled up under the pinned layer. */}
      <div className="relative -mt-[100vh] grid grid-cols-12">
        <div className="relative col-span-5">
          <div className="sticky top-0 h-screen pt-(--nav-clear) pr-6 pb-8 pl-10">
            {/* The dock's canvas: the docked window is a live object on dots. */}
            <div className="dots fade-edges pointer-events-none absolute inset-0" aria-hidden="true" />
            <div ref={slotRef} className="relative h-full w-full" aria-hidden="true" />
          </div>
        </div>

        <div className="border-line relative col-span-7 border-l">
          {/* The first screen belongs to the arriving panel. */}
          <div className="h-screen" aria-hidden="true" />
          {children}
        </div>
      </div>
    </div>
  );
}
