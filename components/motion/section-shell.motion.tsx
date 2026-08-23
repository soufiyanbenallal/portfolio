"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "motion/react";
import { useReducedMotionSafe } from "@/hooks/use-media-query.hook";
import { SPRINGS, SCROLL_OFFSETS } from "@/lib/motion.config";
import { cn } from "@/lib/utils";

/* ==================================================================== *
 * SECTION SHELL
 * --------------------------------------------------------------------
 * The connective tissue between sections. Every homepage section is
 * wrapped in one, which is what makes twelve different animation ideas
 * read as a single continuous document.
 *
 * Two moves, both scroll-linked:
 *
 *   arriving  the section rises as a rounded card and *unwraps* — corners
 *             flatten to zero and it scales to full bleed as it settles.
 *             Sections literally become the page as you reach them.
 *
 *   leaving   an overlay darkens and the surface recedes slightly, as if
 *             the next section were casting a shadow while sliding over.
 *             The dim is an overlay rather than a filter so it is safe
 *             above `position: sticky` children.
 * ==================================================================== */

export type SectionTonType = "canvas" | "paper" | "ink";

export type SectionShellPropsType = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  contentClassName?: string;
  tone?: SectionTonType;
  /**
   * Set for sections that pin their own content. Suppresses the wrapper
   * transform, which would otherwise become the containing block for the
   * sticky children inside and break the pin.
   */
  pinned?: boolean;
  /** Hairline rule along the top edge, the house divider. */
  divider?: boolean;
  /**
   * How dark the section goes as the next one arrives over it. 0 disables.
   * Kept low deliberately — this is a shadow being cast, and anything heavier
   * reads as a modal scrim rather than depth.
   */
  dim?: number;
};

const TONE_CLASS: Record<SectionTonType, string> = {
  canvas: "bg-gray-5",
  paper: "bg-white",
  ink: "bg-black text-white",
};

export function SectionShell({
  children,
  id,
  className,
  contentClassName,
  tone = "paper",
  pinned = false,
  divider = true,
  dim = 0.26,
}: SectionShellPropsType) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotionSafe();

  const { scrollYProgress: arriving } = useScroll({
    target: ref,
    offset: SCROLL_OFFSETS.entering,
  });
  const { scrollYProgress: leaving } = useScroll({
    target: ref,
    offset: SCROLL_OFFSETS.leaving,
  });

  const smoothArriving = useSpring(arriving, SPRINGS.scroll);

  // Unwrap: 24px corners and a 4% inset flatten out over the approach,
  // so the section is fully "page" by the time it is readable.
  const radius = useTransform(smoothArriving, [0.3, 0.88], [24, 0]);
  const scale = useTransform(smoothArriving, [0.3, 0.88], [0.96, 1]);
  const borderRadius = useMotionTemplate`${radius}px ${radius}px 0px 0px`;

  // Dark sections need far less dimming before they read as "behind".
  const dimOpacity = useTransform(leaving, [0.45, 1], [0, tone === "ink" ? dim * 0.4 : dim]);

  const shouldAnimate = !prefersReducedMotion && !pinned;

  return (
    <motion.section
      id={id}
      ref={ref}
      className={cn(
        "relative w-full",
        // `overflow: hidden` makes this a scroll container, which silently
        // disables `position: sticky` inside it — so pinned sections opt out.
        !pinned && "overflow-hidden",
        shouldAnimate && "will-change-transform",
        TONE_CLASS[tone],
        divider && tone !== "ink" && "border-t border-gray-30",
        className,
      )}
      style={
        shouldAnimate
          ? { scale, borderRadius, transformOrigin: "50% 0%" }
          : undefined
      }
    >
      <div className={cn("relative z-10", contentClassName)}>{children}</div>

      {/* Shadow cast by the arriving section. Overlay, never a filter. */}
      {!prefersReducedMotion && dim > 0 && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 bg-black"
          style={{ opacity: dimOpacity }}
        />
      )}
    </motion.section>
  );
}
