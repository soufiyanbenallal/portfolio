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
 * The card-to-card scroll rig. A tall spacer gives the section its scroll
 * budget; inside it a viewport-height stage is pinned, and every card is
 * absolutely positioned within that stage.
 *
 * Each card maps the *shared* progress value onto its own three-phase
 * timeline:
 *
 *   waiting   — parked below the fold, tilted away from the viewer
 *   active    — flat, centred, full scale
 *   receding  — pushed back in Z, lifted, dimmed and blurred behind the
 *               card that replaced it
 *
 * Because the phases overlap, at any moment you see the incoming card
 * rising while the outgoing one settles into the deck behind it — which is
 * what makes it read as one continuous deck rather than a slideshow.
 * ==================================================================== */

export type StickyCardStackRenderPropsType = {
  index: number;
  isActive: boolean;
  progress: MotionValue<number>;
};

export type StickyCardStackPropsType<T> = {
  items: readonly T[];
  children: (item: T, state: StickyCardStackRenderPropsType) => React.ReactNode;
  /** Viewport heights of scroll allocated per card. Lower feels snappier. */
  scrollPerCard?: number;
  className?: string;
  stageClassName?: string;
  /** Rendered inside the pinned stage, behind the cards. Receives progress. */
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
  // `progress` is in *card units*: it reads 0 when card 0 is settled, 1 when
  // card 1 is, and so on. Every stop below is therefore an absolute card
  // position, which is what keeps the phases aligned no matter how many cards
  // the deck holds.
  const stops = [index - 1, index, index + 0.35, index + 1];

  // The first card has no entrance — it is already on screen when the stage
  // pins. The last has no exit — there is nothing arriving to replace it, and
  // a card that recedes into nothing at the end reads as a rendering fault.
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const y = useTransform(progress, stops, [
    isFirst ? "0%" : "80%",
    "0%",
    "0%",
    isLast ? "0%" : "-12%",
  ]);

  const scale = useTransform(progress, stops, [
    isFirst ? 1 : 0.9,
    1,
    1,
    isLast ? 1 : 0.88,
  ]);

  const rotateX = useTransform(progress, stops, [
    isFirst ? 0 : -14,
    0,
    0,
    isLast ? 0 : 10,
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
        // Later cards sit in front; receding cards fall behind naturally
        // because the stack is drawn in order.
        zIndex: index,
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
  scrollPerCard = 0.52,
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

  // Raw scroll progress is stepwise on trackpads; the spring turns it into a
  // continuous value so the 3D transforms never judder.
  const smoothProgress = useSpring(scrollYProgress, SPRINGS.scroll);

  // Remap 0..1 onto card units: 0 = first card settled, N-1 = last card
  // settled. Mapping to `items.length` instead would spend the final slice of
  // scroll with the last card already gone and nothing to replace it.
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

  // Falls back to an honest vertical list for reduced motion and for every
  // viewport below `md`. A pinned deck on a phone costs several screens of
  // scroll to show four cards a plain list shows at a glance, and the
  // 3D staging is invisible at that width anyway.
  if (prefersReducedMotion || !isDesktop) {
    return (
      <div className={cn("flex flex-col gap-8", className)}>
        {aside?.({ activeIndex: 0, progress: smoothProgress })}
        {items.map((item, index) => (
          <div key={index}>
            {children(item, { index, isActive: true, progress: smoothProgress })}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className={cn("relative w-full border-x", className)}
      style={{ height: `${items.length * scrollPerCard * 100 + 100}vh` }}
    >
      <div
        className={cn(
          "sticky top-0 flex h-screen w-full items-center overflow-hidden",
          stageClassName,
        )}
      >
        {aside?.({ activeIndex, progress: smoothProgress })}

        <div
          className="relative h-full w-full"
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
  );
}
