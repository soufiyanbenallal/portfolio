"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type TextCycleUiPropsType = {
  words: string[];
  interval?: number;
  className?: string;
};

export function TextCycleUi({
  words = ["design", "build", "create"],
  interval = 2500,
  className,
}: TextCycleUiPropsType) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className={cn("inline-flex relative overflow-hidden h-[1.15em] align-middle px-1", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.68, 0, 0.22, 0.83] }}
          className="inline-block font-medium text-white italic underline decoration-white/40 underline-offset-8"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
