"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { PERSPECTIVE, SPRINGS, SCROLL_OFFSETS } from "@/lib/motion.config";
import { useIsDesktop, useReducedMotionSafe } from "@/hooks/use-media-query.hook";
import { cn } from "@/lib/utils";

/* ==================================================================== *
 * SECTION DOCK
 * --------------------------------------------------------------------
 * "Scale the section down, wrap it into a card, dock it on the left, then
 * run the detail cards past it."
 *
 * The panel starts full-bleed and is reduced to a card by two synchronised
 * transforms rather than by animating layout:
 *
 *   clip-path  shrinks the *visible window* from the whole stage down to
 *              the docked card's rectangle, and rounds its corners
 *   scale      shrinks the *content* by exactly the same factor, about the
 *              docked card's centre
 *
 * Because both use the same ratio (`DOCK.scale`) and the same origin, the
 * content lands perfectly inside the window — the section is not cropped,
 * it is genuinely scaled down into a card. Neither property touches layout,
 * so the whole move stays on the compositor.
 *
 * Geometry is expressed in percentages of the stage, which is what keeps it
 * correct at every viewport without breakpoint-specific pixel maths.
 * ==================================================================== */

/** Docked card rectangle, as percentages of the pinned stage. */
const DOCK = {
  left: 4,
  right: 50,
  radius: 24,
  /** Fraction of the section's scroll spent docking before items begin. */
  dockPhase: 0.24,

  get width() {
    return 100 - this.left - this.right;
  },
  /** Uniform scale that maps the full stage onto the docked card. */
  get scale() {
    return this.width / 100;
  },
  /**
   * The card is as tall as it is wide *relative to the stage*, because the
   * content scale is uniform — anything else would squash the panel.
   */
  get verticalInset() {
    return (100 - this.width) / 2;
  },
  /**
   * Transform origin is the scale's fixed point, not the target's centre.
   * Solving `origin + k·(50 − origin) = targetCentre` for the origin is what
   * lands the scaled content exactly inside the clip window.
   */
  get originX() {
    const targetCentre = this.left + this.width / 2;
    return (targetCentre - this.scale * 50) / (1 - this.scale);
  },
} as const;

export type SectionDockItemStateType = {
  index: number;
  isActive: boolean;
  progress: MotionValue<number>;
};

export type SectionDockPropsType<T> = {
  /** Full-bleed visual that scales down into the docked card. */
  panel: React.ReactNode;
  /**
   * Crisp chrome drawn over the docked card at 1:1 scale. The panel itself is
   * shrunk to 46%, so anything that must stay legible belongs here.
   */
  panelOverlay?: (state: { dockProgress: MotionValue<number> }) => React.ReactNode;
  items: readonly T[];
  renderItem: (item: T, state: SectionDockItemStateType) => React.ReactNode;
  /** Viewport heights of scroll per detail card. */
  scrollPerItem?: number;
  className?: string;
  id?: string;
  /** Rendered above the detail column, fades in once docked. */
  header?: React.ReactNode;
};

type DetailCardPropsType = {
  index: number;
  total: number;
  progress: MotionValue<number>;
  isActive: boolean;
  children: React.ReactNode;
};

/**
 * One detail card. Swings in around its left edge from behind the plane,
 * holds while active, then lifts away — so the column reads as pages being
 * turned against the docked panel rather than a list scrolling past.
 */
function DetailCard({
  index,
  total,
  progress,
  isActive,
  children,
}: DetailCardPropsType) {
  const span = (1 - DOCK.dockPhase) / total;
  const start = DOCK.dockPhase + index * span;
  const enter = start + span * 0.28;
  const exit = start + span * 0.78;
  const end = start + span;

  const opacity = useTransform(
    progress,
    [start, enter, exit, end],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [start, enter, exit, end],
    ["42%", "0%", "0%", "-26%"],
  );
  const rotateY = useTransform(progress, [start, enter, exit, end], [-26, 0, 0, 16]);
  const rotateX = useTransform(progress, [start, enter, exit, end], [10, 0, 0, -8]);
  const scale = useTransform(progress, [start, enter, exit, end], [0.92, 1, 1, 0.94]);

  return (
    <motion.div
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 will-change-transform"
      style={{
        opacity,
        y,
        rotateX,
        rotateY,
        scale,
        transformPerspective: PERSPECTIVE.base,
        transformOrigin: "left center",
        pointerEvents: isActive ? "auto" : "none",
      }}
      aria-hidden={!isActive}
    >
      {children}
    </motion.div>
  );
}

export function SectionDock<T>({
  panel,
  panelOverlay,
  items,
  renderItem,
  scrollPerItem = 0.48,
  className,
  id,
  header,
}: SectionDockPropsType<T>) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotionSafe();
  const isDesktop = useIsDesktop();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: SCROLL_OFFSETS.pinned,
  });
  const progress = useSpring(scrollYProgress, SPRINGS.scroll);

  /* -- Docking transforms: window shrinks, content scales by the same ratio -- */
  const dockRange = [0, DOCK.dockPhase];

  const insetTop = useTransform(progress, dockRange, [0, DOCK.verticalInset]);
  const insetRight = useTransform(progress, dockRange, [0, DOCK.right]);
  const insetBottom = useTransform(progress, dockRange, [0, DOCK.verticalInset]);
  const insetLeft = useTransform(progress, dockRange, [0, DOCK.left]);
  const radius = useTransform(progress, dockRange, [0, DOCK.radius]);

  const clipPath = useMotionTemplate`inset(${insetTop}% ${insetRight}% ${insetBottom}% ${insetLeft}% round ${radius}px)`;
  const panelScale = useTransform(progress, dockRange, [1, DOCK.scale]);

  /** 0 → 1 across the docking phase only. Drives chrome that appears on dock. */
  const dockProgress = useTransform(progress, dockRange, [0, 1]);
  const detailOpacity = useTransform(
    progress,
    [DOCK.dockPhase * 0.6, DOCK.dockPhase],
    [0, 1],
  );

  useMotionValueEvent(progress, "change", (value) => {
    if (value < DOCK.dockPhase) {
      setActiveIndex((current) => (current === 0 ? current : 0));
      return;
    }
    const span = (1 - DOCK.dockPhase) / items.length;
    const next = Math.min(
      items.length - 1,
      Math.floor((value - DOCK.dockPhase) / span),
    );
    setActiveIndex((current) => (current === next ? current : next));
  });

  /* -- Fallback: reduced motion, and every viewport below `md` -- */
  if (prefersReducedMotion || !isDesktop) {
    return (
      <section id={id} className={cn("relative w-full", className)}>
        {header}
        {/* The panel is a full composition, not a thumbnail — it needs real
            height here or its type scale collapses. */}
        <div className="relative min-h-[62vh] w-full overflow-hidden rounded-2xl border border-gray-30">
          {panel}
        </div>
        <div className="mt-8 flex flex-col gap-4">
          {items.map((item, index) => (
            <div key={index}>
              {renderItem(item, { index, isActive: true, progress })}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn("relative w-full", className)}
      style={{ height: `${(items.length * scrollPerItem + 1.1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* The section, scaling down into its card */}
        <motion.div
          className="absolute inset-0 z-10 will-change-[clip-path]"
          style={{ clipPath }}
        >
          <motion.div
            className="h-full w-full"
            style={{
              scale: panelScale,
              transformOrigin: `${DOCK.originX}% 50%`,
            }}
          >
            {panel}
          </motion.div>
        </motion.div>

        {/* Crisp chrome over the docked card, unaffected by the panel scale */}
        {panelOverlay && (
          <div
            className="pointer-events-none absolute z-20"
            style={{
              left: `${DOCK.left}%`,
              right: `${DOCK.right}%`,
              top: `${DOCK.verticalInset}%`,
              bottom: `${DOCK.verticalInset}%`,
            }}
          >
            {panelOverlay({ dockProgress })}
          </div>
        )}

        {/* Detail column */}
        <motion.div
          className="absolute inset-y-0 z-30 flex flex-col justify-center"
          style={{
            left: `${100 - DOCK.right + 3}%`,
            right: "4%",
            opacity: detailOpacity,
            perspective: PERSPECTIVE.base,
          }}
        >
          {header && <div className="absolute inset-x-0 top-[14%]">{header}</div>}

          <div className="relative h-[62%] w-full">
            {items.map((item, index) => (
              <DetailCard
                key={index}
                index={index}
                total={items.length}
                progress={progress}
                isActive={activeIndex === index}
              >
                {renderItem(item, {
                  index,
                  isActive: activeIndex === index,
                  progress,
                })}
              </DetailCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
