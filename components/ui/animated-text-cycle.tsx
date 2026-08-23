"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

export type AnimatedTextCyclePropsType = {
  words: string[];
  interval?: number;
  className?: string;
};

export default function AnimatedTextCycle({
  words,
  interval = 3500,
  className = "",
}: AnimatedTextCyclePropsType) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState<string | number>("auto");
  const measureRef = useRef<HTMLDivElement>(null);

  // Get the width of the current word
  useEffect(() => {
    if (measureRef.current) {
      const elements = measureRef.current.children;
      if (elements.length > currentIndex) {
        // Add a small buffer (4px) to prevent text wrapping
        const newWidth = elements[currentIndex].getBoundingClientRect().width;
        setWidth(`${Math.ceil(newWidth + 4)}px`);
      }
    }
  }, [currentIndex, words]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, words.length]);

  // Container animation for the whole word
  const containerVariants = {
    hidden: {
      y: -16,
      opacity: 0,
      filter: "blur(6px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.45,
        ease: "easeOut" as const,
      },
    },
    exit: {
      y: 16,
      opacity: 0,
      filter: "blur(6px)",
      transition: {
        duration: 0.35,
        ease: "easeIn" as const,
      },
    },
  };

  return (
    <>
      {/* Hidden measurement div with all words rendered */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none"
        style={{ visibility: "hidden" }}
      >
        {words.map((word, i) => (
          <span key={i} className={`inline-block ${className}`}>
            {word}
          </span>
        ))}
      </div>

      {/* Visible animated word */}
      <motion.span
        className="relative inline-block align-top"
        animate={{
          width,
          transition: {
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 1.2,
          },
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={`inline-block ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ whiteSpace: "nowrap" }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
}

export { AnimatedTextCycle };
