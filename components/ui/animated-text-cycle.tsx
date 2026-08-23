"use client";

import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotionSafe } from "@/hooks/use-media-query.hook";
import { PERSPECTIVE, DURATIONS, EASINGS } from "@/lib/motion.config";

export type AnimatedTextCyclePropsType = {
  words: string[];
  interval?: number;
  className?: string;
};

/**
 * Rotating word inside a headline.
 *
 * The word rolls on the X axis like a physical reel rather than cross-fading,
 * which is what stops it reading as a glitch mid-sentence. The container
 * animates its own width to the incoming word so the rest of the line never
 * jumps — measured off-screen from a hidden copy of every word, so the
 * measurement itself is never visible.
 *
 * Under reduced motion the word still changes, it just cuts instead of rolling.
 */
export default function AnimatedTextCycle({
  words,
  interval = 3200,
  className = "",
}: AnimatedTextCyclePropsType) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState<string | number>("auto");
  const measureRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotionSafe();

  const measure = useCallback(() => {
    const element = measureRef.current?.children[currentIndex];
    if (!element) return;
    setWidth(`${Math.ceil(element.getBoundingClientRect().width + 4)}px`);
  }, [currentIndex]);

  useEffect(() => {
    measure();
    // Web fonts land after first paint and change every measurement with them.
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    if (!document.fonts) return;
    document.fonts.ready.then(measure);
  }, [measure]);

  useEffect(() => {
    const timer = window.setInterval(
      () => setCurrentIndex((index) => (index + 1) % words.length),
      interval,
    );
    return () => window.clearInterval(timer);
  }, [interval, words.length]);

  return (
    <>
      <span
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none absolute opacity-0"
        style={{ visibility: "hidden" }}
      >
        {words.map((word, i) => (
          <span key={i} className={`inline-block ${className}`}>
            {word}
          </span>
        ))}
      </span>

      <motion.span
        className="relative inline-block overflow-hidden align-top"
        style={{
          perspective: PERSPECTIVE.near,
          // Same descender allowance as TextReveal: the roll needs to be
          // clipped, but not at the baseline, or every "g" loses its tail.
          paddingBottom: "0.2em",
          marginBottom: "-0.2em",
        }}
        animate={{ width }}
        transition={{ type: "spring", stiffness: 160, damping: 18, mass: 1 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={`inline-block ${className}`}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { rotateX: -80, y: "-55%", opacity: 0 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { rotateX: 0, y: "0%", opacity: 1 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { rotateX: 80, y: "55%", opacity: 0 }
            }
            transition={{ duration: DURATIONS.base, ease: EASINGS.editorial }}
            style={{ whiteSpace: "nowrap", transformOrigin: "50% 50%" }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
}

export { AnimatedTextCycle };
