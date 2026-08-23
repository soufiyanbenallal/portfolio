"use client";

import React, { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import { useReducedMotionSafe } from "@/hooks/use-media-query.hook";
import { PERSPECTIVE, SPRINGS } from "@/lib/motion.config";
import { cn } from "@/lib/utils";

export type Tilt3DPropsType = {
  children: React.ReactNode;
  className?: string;
  /** Maximum rotation in degrees at the corners of the element. */
  intensity?: number;
  /** Perspective depth. Lower values exaggerate the effect. */
  perspective?: number;
  /** Lift towards the viewer on hover. */
  lift?: number;
  /** Specular sheen that tracks the pointer. Off for text-heavy surfaces. */
  glare?: boolean;
  /** Children marked with `data-depth` float above the card surface. */
  scaleOnHover?: number;
};

/**
 * Pointer-driven 3D tilt.
 *
 * Rotation is derived from the pointer's normalised position inside the
 * element (−0.5 → 0.5 on each axis) and smoothed through a spring, so the
 * card keeps moving for a beat after the pointer stops. The Y rotation is
 * inverted relative to X because a card tilting *towards* the pointer is the
 * physical reading; tilting away feels like the surface is repelling you.
 *
 * `transformStyle: preserve-3d` is set on the surface so nested elements can
 * opt into real depth with `translateZ` instead of faking it with shadows.
 */
export function Tilt3D({
  children,
  className,
  intensity = 9,
  perspective = PERSPECTIVE.base,
  lift = 18,
  glare = false,
  scaleOnHover = 1,
}: Tilt3DPropsType) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotionSafe();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  // Hover state lives in MotionValues rather than React state on purpose:
  // `useSpring` only re-targets when its source is a MotionValue, and this
  // way hovering a card never triggers a React render at all.
  const hoverLift = useMotionValue(0);
  const hoverScale = useMotionValue(1);
  const hoverGlare = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [intensity, -intensity]),
    SPRINGS.tilt,
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-intensity, intensity]),
    SPRINGS.tilt,
  );
  const translateZ = useSpring(hoverLift, SPRINGS.tilt);
  const scale = useSpring(hoverScale, SPRINGS.tilt);
  const glareOpacity = useSpring(hoverGlare, { stiffness: 200, damping: 30 });

  const glareX = useTransform(pointerX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(pointerY, [-0.5, 0.5], ["0%", "100%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.55), rgba(255,255,255,0) 55%)`;

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || event.pointerType !== "mouse") return;
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [prefersReducedMotion, pointerX, pointerY],
  );

  const handlePointerEnter = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || event.pointerType !== "mouse") return;
      hoverLift.set(lift);
      hoverScale.set(scaleOnHover);
      hoverGlare.set(1);
    },
    [prefersReducedMotion, lift, scaleOnHover, hoverLift, hoverScale, hoverGlare],
  );

  const handlePointerLeave = useCallback(() => {
    hoverLift.set(0);
    hoverScale.set(1);
    hoverGlare.set(0);
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY, hoverLift, hoverScale, hoverGlare]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn("relative", className)}
      style={{ perspective }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          translateZ,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full"
      >
        {children}

        {glare && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] mix-blend-overlay"
            style={{ background: glareBackground, opacity: glareOpacity }}
          />
        )}
      </motion.div>
    </div>
  );
}
