"use client";

import React from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

/**
 * Reading progress, drawn as a line: a 1px accent stroke along the top edge
 * of the viewport, filling in as the page is read.
 *
 * Driven by a stiff spring rather than raw scroll so it settles for a beat
 * after a flick instead of stopping dead the instant the wheel does.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 35,
    restDelta: 0.001,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.012], [0, 1]);

  return (
    <motion.div
      aria-hidden="true"
      className="bg-brand pointer-events-none fixed inset-x-0 top-0 z-60 h-px origin-left"
      style={{ scaleX, opacity }}
    />
  );
}
