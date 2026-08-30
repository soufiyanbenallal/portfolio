"use client";

import React, { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useReducedMotionSafe } from "@/hooks/use-media-query.hook";
import { SPRINGS } from "@/lib/motion.config";
import { cn } from "@/lib/utils";

export type MagneticPropsType = {
  children: React.ReactNode;
  className?: string;
  /** How far the shell travels towards the pointer, as a fraction of the offset. */
  strength?: number;
  /**
   * How far the *content* travels on top of the shell. The small parallax
   * between the two is what makes this read as leaning rather than sliding.
   */
  innerStrength?: number;
  /** Widens the catch area without an extra hit-testing layer. */
  padding?: number;
  /**
   * Both wrapper layers are inline by default so a magnet sits inside a line
   * of text. Full-width children (a block button) need both to stretch, or
   * `w-100%` on the child resolves against a shrink-to-fit box.
   */
  fullWidth?: boolean;
};

/**
 * Magnetic pointer attraction for buttons and links.
 *
 * Pointer tracking is attached to the element itself rather than the window,
 * so there is no global listener running for every magnet on the page. Coarse
 * pointers are excluded: a magnet that only reacts on touch-down reads as a bug.
 */
export function Magnetic({
  children,
  className,
  strength = 0.32,
  innerStrength = 0.14,
  padding = 0,
  fullWidth = false,
}: MagneticPropsType) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotionSafe();

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  const shellX = useSpring(offsetX, SPRINGS.magnetic);
  const shellY = useSpring(offsetY, SPRINGS.magnetic);

  const ratio = strength === 0 ? 0 : innerStrength / strength;
  const innerX = useSpring(
    useTransform(offsetX, (value) => value * ratio),
    { ...SPRINGS.magnetic, stiffness: 170, damping: 20 }
  );
  const innerY = useSpring(
    useTransform(offsetY, (value) => value * ratio),
    { ...SPRINGS.magnetic, stiffness: 170, damping: 20 }
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || event.pointerType !== "mouse") return;
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      offsetX.set((event.clientX - (rect.left + rect.width / 2)) * strength);
      offsetY.set((event.clientY - (rect.top + rect.height / 2)) * strength);
    },
    [prefersReducedMotion, strength, offsetX, offsetY]
  );

  const handleRelease = useCallback(() => {
    offsetX.set(0);
    offsetY.set(0);
  }, [offsetX, offsetY]);

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handleRelease}
      onPointerCancel={handleRelease}
      style={{ x: shellX, y: shellY, padding: padding || undefined }}
      className={cn("relative", fullWidth ? "flex w-full" : "inline-flex", className)}
    >
      <motion.span
        style={{ x: innerX, y: innerY }}
        className={fullWidth ? "flex w-full" : "inline-flex"}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}
