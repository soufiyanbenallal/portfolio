"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { useIsDesktop, useReducedMotionSafe } from "@/hooks/use-media-query.hook";
import { PERSPECTIVE, SPRINGS, SCROLL_OFFSETS } from "@/lib/motion.config";
import { cn } from "@/lib/utils";

/* ==================================================================== *
 * STICKY CARD STACK
 * --------------------------------------------------------------------
 * Unified 30% Sticky Aside / 70% Project Column showcase stage.
 *
 * A tall spacer gives the section its scroll budget; inside it a viewport-
 * height stage is pinned. The stage is split into:
 *   - 30% Left Column: Pinned metadata aside with active project info.
 *   - 70% Right Column: 3D project showcase cards with reveal points.
 *
 * Reveal points progression:
 *   waiting   — parked below the fold (y: 90%), opacity: 0, tilted away
 *   entering  — rises smoothly into place between (index - 0.5) and index
 *   active    — flat, centered, full scale (1.0), 100% opacity, crisp z-index
 *   receding  — pushes back into depth, fades out as next card rises
 * ==================================================================== */

export type StickyCardStackRenderPropsType = {
  index: number;
  isActive: boolean;
  progress: MotionValue<number>;
};

export type StickyCardStackPropsType<T> = {
  items: readonly T[];
  children: (item: T, state: StickyCardStackRenderPropsType) => React.ReactNode;
  /** Viewport heights of scroll allocated per card. */
  scrollPerCard?: number;
  className?: string;
  stageClassName?: string;
  /** Rendered inside the 30% pinned aside on the left. */
  aside?: (state: {
    activeIndex: number;
    progress: MotionValue<number>;
  }) => React.ReactNode;
  onActiveChange?: (index: number) => void;
};

type StackedCardPropsType = {
  index: number;
  total: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
  isActive: boolean;
};

function StackedCard({
  index,
  total,
  progress,
  children,
  isActive,
}: StackedCardPropsType) {
  const isFirst = index === 0;
  const isLast = index === total - 1;

  // Reveal points:
  // [entryStart, activeStart, activeHold, exitEnd]
  const stops = [index - 0.6, index, index + 0.3, index + 0.85];

  const y = useTransform(progress, stops, [
    isFirst ? "0%" : "70%",
    "0%",
    "0%",
    isLast ? "0%" : "-12%",
  ]);

  const scale = useTransform(progress, stops, [
    isFirst ? 1 : 0.92,
    1,
    1,
    isLast ? 1 : 0.9,
  ]);

  const rotateX = useTransform(progress, stops, [
    isFirst ? 0 : -10,
    0,
    0,
    isLast ? 0 : 8,
  ]);

  const opacity = useTransform(progress, stops, [
    isFirst ? 1 : 0,
    1,
    1,
    isLast ? 1 : 0,
  ]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center will-change-transform"
      style={{
        y,
        scale,
        rotateX,
        opacity,
        zIndex: isActive ? 20 : 10 + index,
        transformPerspective: PERSPECTIVE.far,
        transformOrigin: "50% 100%",
        pointerEvents: isActive ? "auto" : "none",
      }}
      aria-hidden={!isActive}
    >
      {children}
    </motion.div>
  );
}

export function StickyCardStack<T>({
  items,
  children,
  scrollPerCard = 0.6,
  className,
  stageClassName,
  aside,
  onActiveChange,
}: StickyCardStackPropsType<T>) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotionSafe();
  const isDesktop = useIsDesktop();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: SCROLL_OFFSETS.pinned,
  });

  const smoothProgress = useSpring(scrollYProgress, SPRINGS.scroll);

  const cardProgress = useTransform(
    smoothProgress,
    [0, 1],
    [0, Math.max(items.length - 1, 1)],
  );

  useMotionValueEvent(cardProgress, "change", (value) => {
    const next = Math.min(items.length - 1, Math.max(0, Math.round(value)));
    setActiveIndex((current) => {
      if (current === next) return current;
      onActiveChange?.(next);
      return next;
    });
  });

  /* Responsive Fallback: stacked list for mobile or reduced motion */
  if (prefersReducedMotion || !isDesktop) {
    return (
      <div className={cn("flex flex-col gap-10", className)}>
        {aside && (
          <div className="w-full">
            {aside({ activeIndex: 0, progress: smoothProgress })}
          </div>
        )}
        <div className="flex flex-col gap-8">
          {items.map((item, index) => (
            <div key={index} className="w-full">
              {children(item, { index, isActive: true, progress: smoothProgress })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className={cn("relative w-full border-x border-gray-30", className)}
      style={{ height: `${items.length * scrollPerCard * 100 + 100}vh` }}
    >
      <div
        className={cn(
          "sticky top-0 flex h-screen w-full items-center overflow-hidden",
          stageClassName,
        )}
      >
        {/* ── 30% Sticky Aside (Left) + 70% Project Cards Column (Right) ── */}
        <div className="mx-auto flex h-full w-full max-w-7xl items-center px-6 lg:px-8">
          {/* Left Column: 30% width */}
          <div className="relative z-30 flex h-full w-[30%] shrink-0 items-center">
            {aside?.({ activeIndex, progress: smoothProgress })}
          </div>

          {/* Right Column: 70% width */}
          <div
            className="relative h-full w-[70%] overflow-visible"
            style={{ perspective: PERSPECTIVE.far }}
          >
            {items.map((item, index) => (
              <StackedCard
                key={index}
                index={index}
                total={items.length}
                progress={cardProgress}
                isActive={activeIndex === index}
              >
                {children(item, {
                  index,
                  isActive: activeIndex === index,
                  progress: cardProgress,
                })}
              </StackedCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
