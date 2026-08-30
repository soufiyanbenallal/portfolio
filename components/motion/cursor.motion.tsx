"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { SPRINGS, EASINGS, DURATIONS } from "@/lib/motion.config";
import { useMediaQuery, useReducedMotionSafe } from "@/hooks/use-media-query.hook";
import type { CursorModeType } from "@/types";

/* ==================================================================== *
 * CURSOR
 * --------------------------------------------------------------------
 * Progressive enhancement, never a replacement: the native cursor is left
 * alone, and this rides on top of it. It is off entirely for coarse
 * pointers and for reduced motion.
 *
 * Elements opt in declaratively with `data-cursor="project"` and an
 * optional `data-cursor-text`. That keeps every card, link and rail free of
 * cursor wiring — one delegated listener resolves the mode by walking up
 * from the event target.
 * ==================================================================== */

const MODE_STYLE: Record<
  CursorModeType,
  { size: number; background: string; color: string; mix: string }
> = {
  default: { size: 10, background: "#000000", color: "#ffffff", mix: "normal" },
  project: { size: 84, background: "#000000", color: "#ffffff", mix: "normal" },
  article: { size: 72, background: "#ffffff", color: "#000000", mix: "normal" },
  grow: { size: 44, background: "#000000", color: "#ffffff", mix: "difference" },
};

export function Cursor() {
  const prefersReducedMotion = useReducedMotionSafe();
  const hasFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");

  const [mode, setMode] = useState<CursorModeType>("default");
  const [label, setLabel] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRINGS.pointer);
  const springY = useSpring(y, SPRINGS.pointer);

  const isEnabled = hasFinePointer && !prefersReducedMotion;

  useEffect(() => {
    if (!isEnabled) return;

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setIsVisible(true);

      const target = (event.target as HTMLElement | null)?.closest?.(
        "[data-cursor]"
      ) as HTMLElement | null;

      if (target) {
        setMode((target.dataset.cursor as CursorModeType) ?? "default");
        setLabel(target.dataset.cursorText ?? "");
      } else {
        setMode("default");
        setLabel("");
      }
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
    };
  }, [isEnabled, x, y]);

  if (!isEnabled) return null;

  const style = MODE_STYLE[mode];

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-9999 flex items-center justify-center rounded-full"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        mixBlendMode: style.mix as React.CSSProperties["mixBlendMode"],
      }}
      animate={{
        width: style.size,
        height: style.size,
        backgroundColor: style.background,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: DURATIONS.fast, ease: EASINGS.entrance }}
    >
      <AnimatePresence mode="wait">
        {label && (
          <motion.span
            key={label}
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.9 }}
            transition={{ duration: DURATIONS.instant }}
            className="px-2 text-center text-[10px] font-semibold tracking-widest whitespace-nowrap uppercase"
            style={{ color: style.color }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
