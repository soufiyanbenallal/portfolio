"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
import { useReducedMotionSafe } from "@/hooks/use-media-query.hook";
import { SPRINGS, SCROLL_OFFSETS } from "@/lib/motion.config";
import { cn } from "@/lib/utils";

export type ParallaxPropsType = {
  children: React.ReactNode;
  className?: string;
  /** Pixels of travel across the full viewport pass. Negative moves against the scroll. */
  distance?: number;
  /** Optional depth cue: how much the layer scales across the pass. */
  zoom?: number;
  /** Rotation on the X axis, in degrees, for layers that should lie back. */
  rotate?: number;
  /** Element the parallax is measured against. Defaults to the layer itself. */
  containerRef?: React.RefObject<HTMLElement | null>;
};

/**
 * Depth layer. Moves at a different rate to the page across its viewport pass,
 * which is what stops flat sections from feeling like a slideshow of blocks.
 *
 * Travel is deliberately capped at small distances — parallax that outruns the
 * scroll turns into motion sickness rather than depth.
 */
export function Parallax({
  children,
  className,
  distance = 60,
  zoom = 0,
  rotate = 0,
  containerRef,
}: ParallaxPropsType) {
  const localRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: containerRef ?? localRef,
    offset: SCROLL_OFFSETS.throughViewport,
  });
  const progress = useSpring(scrollYProgress, SPRINGS.scroll);

  const y = useTransform(progress, [0, 1], [distance, -distance]);
  const scale = useTransform(progress, [0, 0.5, 1], [1 - zoom, 1, 1 - zoom]);
  const rotateX = useTransform(progress, [0, 1], [rotate, -rotate]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={localRef}
      className={cn("will-change-transform", className)}
      style={{
        y,
        scale: zoom ? scale : undefined,
        rotateX: rotate ? rotateX : undefined,
      }}
    >
      {children}
    </motion.div>
  );
}
