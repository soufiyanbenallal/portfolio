"use client";

import React from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

/**
 * Reading-progress rail pinned to the very top of the viewport.
 *
 * Driven by a spring rather than raw scroll so it keeps travelling for a beat
 * after a flick — a bar that stops dead the instant the wheel stops reads as
 * broken. It fades in only once the reader has actually committed to the page.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.012, 0.98, 1], [0, 1, 1, 0.4]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-black"
      style={{ scaleX, opacity }}
    />
  );
}
