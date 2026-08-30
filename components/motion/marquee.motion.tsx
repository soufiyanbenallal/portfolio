"use client";

import React, { useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useVelocity,
  useAnimationFrame,
  wrap,
} from "motion/react";
import { useReducedMotionSafe } from "@/hooks/use-media-query.hook";
import { cn } from "@/lib/utils";

export type MarqueePropsType = {
  children: React.ReactNode;
  /** Percent of the track travelled per second at rest. */
  baseVelocity?: number;
  className?: string;
  trackClassName?: string;
  /** Scroll velocity is added to the base speed, and can reverse direction. */
  reactToScroll?: boolean;
  /** Degrees of shear at peak scroll velocity. Sells the inertia; keep it small. */
  skew?: number;
  pauseOnHover?: boolean;
  /** Soft edges so items dissolve rather than clip at the bounds. */
  fade?: boolean;
};

/**
 * Velocity-reactive marquee.
 *
 * At rest the track drifts at `baseVelocity`. Scrolling adds to that speed and
 * — past a threshold — flips the direction, so the strip appears to be dragged
 * by the page itself. A small shear at high velocity does the rest.
 *
 * The children are rendered twice and the track wraps at −50%, which is what
 * makes the loop seamless without measuring anything.
 */
export function Marquee({
  children,
  baseVelocity = 3,
  className,
  trackClassName,
  reactToScroll = true,
  skew = 2,
  pauseOnHover = true,
  fade = true,
}: MarqueePropsType) {
  const prefersReducedMotion = useReducedMotionSafe();
  const [isPaused, setIsPaused] = useState(false);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1600], [0, 4], {
    clamp: false,
  });
  const skewValue = useTransform(smoothVelocity, [-2000, 0, 2000], [skew, 0, -skew], {
    clamp: true,
  });

  const x = useTransform(baseX, (value) => `${wrap(-50, 0, value)}%`);
  const directionRef = useRef(1);

  useAnimationFrame((_time, delta) => {
    if (prefersReducedMotion || isPaused) return;

    let moveBy = directionRef.current * baseVelocity * (delta / 1000);

    if (reactToScroll) {
      const factor = velocityFactor.get();
      if (factor < 0) directionRef.current = -1;
      else if (factor > 0) directionRef.current = 1;
      moveBy += directionRef.current * moveBy * Math.abs(factor);
    }

    baseX.set(baseX.get() + moveBy);
  });

  const pause = useCallback(() => pauseOnHover && setIsPaused(true), [pauseOnHover]);
  const resume = useCallback(() => pauseOnHover && setIsPaused(false), [pauseOnHover]);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        fade && "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
      onPointerEnter={pause}
      onPointerLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
    >
      <motion.div
        className={cn("flex w-max flex-nowrap will-change-transform", trackClassName)}
        style={{
          x: prefersReducedMotion ? 0 : x,
          skewX: prefersReducedMotion ? 0 : skewValue,
        }}
      >
        {/* Both halves must be identically wrapped: the -50% wrap point assumes
            the track is exactly two equal copies of the content. */}
        <div className="flex flex-nowrap items-center">{children}</div>
        <div aria-hidden="true" className="flex flex-nowrap items-center">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
