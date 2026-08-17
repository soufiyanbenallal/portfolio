"use client";

import { useSyncExternalStore, RefObject } from "react";
import { useScroll, useTransform, useSpring, MotionValue } from "motion/react";

export type CardMotionTransformType = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  rotate: MotionValue<number>;
};

export type DeviceModeType = "desktop" | "desktop-sm" | "tablet" | "mobile";

// External store for prefers-reduced-motion
const subscribeReducedMotion = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};
const getReducedMotionSnapshot = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getReducedMotionServerSnapshot = () => false;

// External store for viewport mode
const subscribeViewport = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};
const getViewportSnapshot = (): DeviceModeType => {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 992) return "tablet";
  if (w < 1200) return "desktop-sm";
  return "desktop";
};
const getViewportServerSnapshot = (): DeviceModeType => "desktop";

export type UseProjectScrollTransitionOptionsType = {
  containerRef?: RefObject<HTMLElement | null>;
  targetRef?: RefObject<HTMLElement | null>;
};

export function useProjectScrollTransition(
  options: UseProjectScrollTransitionOptionsType = {},
) {
  const deviceMode = useSyncExternalStore(
    subscribeViewport,
    getViewportSnapshot,
    getViewportServerSnapshot,
  );

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const isMobile = deviceMode === "mobile" || prefersReducedMotion;

  // Track scroll progress from when Hero is in view (progress = 0) to when Latest Projects is reached (progress = 1)
  const { scrollYProgress } = useScroll({
    target: options.targetRef || options.containerRef,
    offset: ["start end", "start start"],
  });

  // Spring physics: stiffness 1000, damping 130, mass 1
  const smoothProgress = useSpring(scrollYProgress);

  // Responsive offsets based on breakpoint
  const getOffsets = () => {
    if (deviceMode === "tablet") {
      return {
        card1: { x: 400, y: -775, scale: 0.6, rotate: 10 },
        card2: { x: 90, y: -775, scale: 0.6, rotate: 15 },
        card3: { x: 380, y: -1050, scale: 0.6, rotate: -5 },
        card4: { x: 50, y: -1010, scale: 0.6, rotate: 5 },
      };
    }
    if (deviceMode === "desktop-sm") {
      return {
        card1: { x: 530, y: -825, scale: 0.7, rotate: 10 },
        card2: { x: 105, y: -830, scale: 0.7, rotate: 15 },
        card3: { x: 460, y: -1185, scale: 0.7, rotate: -5 },
        card4: { x: 30, y: -1150, scale: 0.7, rotate: 5 },
      };
    }
    // Desktop >= 1200px
    return {
      card1: { x: 530, y: -1250, scale: 0.5, rotate: 10 },
      card2: { x: 80, y: -1250, scale: 0.5, rotate: 15 },
      card3: { x: 500, y: -1700, scale: 0.5, rotate: -5 },
      card4: { x: 130, y: -1670, scale: 0.5, rotate: 5 },
    };
  };

  const offsets = getOffsets();

  // Interpolate from hero fanned stack values (at scroll 0) to natural grid values (at scroll 1)
  const card1X = useTransform(smoothProgress, [0, 0.95], [offsets.card1.x, 0]);
  const card1Y = useTransform(smoothProgress, [0, 0.95], [offsets.card1.y, 0]);
  const card1Scale = useTransform(
    smoothProgress,
    [0, 0.95],
    [offsets.card1.scale, 1],
  );
  const card1Rotate = useTransform(
    smoothProgress,
    [0, 0.95],
    [offsets.card1.rotate, 0],
  );

  const card2X = useTransform(smoothProgress, [0, 0.95], [offsets.card2.x, 0]);
  const card2Y = useTransform(smoothProgress, [0, 0.95], [offsets.card2.y, 0]);
  const card2Scale = useTransform(
    smoothProgress,
    [0, 0.95],
    [offsets.card2.scale, 1],
  );
  const card2Rotate = useTransform(
    smoothProgress,
    [0, 0.95],
    [offsets.card2.rotate, 0],
  );

  const card3X = useTransform(smoothProgress, [0, 0.95], [offsets.card3.x, 0]);
  const card3Y = useTransform(smoothProgress, [0, 0.95], [offsets.card3.y, 0]);
  const card3Scale = useTransform(
    smoothProgress,
    [0, 0.95],
    [offsets.card3.scale, 1],
  );
  const card3Rotate = useTransform(
    smoothProgress,
    [0, 0.95],
    [offsets.card3.rotate, 0],
  );

  const card4X = useTransform(smoothProgress, [0, 0.95], [offsets.card4.x, 0]);
  const card4Y = useTransform(smoothProgress, [0, 0.95], [offsets.card4.y, 0]);
  const card4Scale = useTransform(
    smoothProgress,
    [0, 0.95],
    [offsets.card4.scale, 1],
  );
  const card4Rotate = useTransform(
    smoothProgress,
    [0, 0.95],
    [offsets.card4.rotate, 0],
  );

  const cards: CardMotionTransformType[] = [
    { x: card1X, y: card1Y, scale: card1Scale, rotate: card1Rotate },
    { x: card2X, y: card2Y, scale: card2Scale, rotate: card2Rotate },
    { x: card3X, y: card3Y, scale: card3Scale, rotate: card3Rotate },
    { x: card4X, y: card4Y, scale: card4Scale, rotate: card4Rotate },
  ];

  return {
    scrollYProgress: smoothProgress,
    deviceMode,
    isMobile,
    cards,
  };
}
