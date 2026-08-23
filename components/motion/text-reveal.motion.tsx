"use client";

import React, { useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import { useReducedMotionSafe } from "@/hooks/use-media-query.hook";
import { MOTION_ELEMENTS, type MotionTagType } from "@/components/motion/motion-elements";
import { cn } from "@/lib/utils";
import {
  DURATIONS,
  EASINGS,
  PERSPECTIVE,
  VIEWPORT,
  maskLineVariants,
  maskWordVariants,
} from "@/lib/motion.config";

/* ==================================================================== *
 * TEXT REVEAL
 * --------------------------------------------------------------------
 * Splitting text is the highest-leverage animation in an editorial layout,
 * so it gets a proper primitive rather than being re-implemented per section.
 *
 * Accessibility contract, enforced by every component here: the readable
 * string is exposed on the wrapper, and every split fragment is
 * `aria-hidden`. Splitting must never cost semantics.
 * ==================================================================== */

type SplitModeType = "line" | "word" | "char";

export type TextRevealPropsType = {
  /** A single string, or an array of explicit lines. */
  text: string | string[];
  as?: MotionTagType;
  by?: SplitModeType;
  className?: string;
  /** Applied per line — handy for two-tone headlines. */
  fragmentClassName?: string | ((lineIndex: number) => string | undefined);
  delay?: number;
  stagger?: number;
  /** `inView` waits for the element to scroll in; `mount` fires immediately. */
  trigger?: "inView" | "mount";
  once?: boolean;
};

type SplitLineType = {
  fragments: string[];
  /** Index of this line's first fragment within the whole block. */
  offset: number;
};

/**
 * Masked reveal. Each fragment sits inside an `overflow-hidden` box and starts
 * fully below it, rotated away on the X axis, so the text reads as a physical
 * strip turning towards the reader rather than a fade.
 */
export function TextReveal({
  text,
  as = "span",
  by = "line",
  className,
  fragmentClassName,
  delay = 0,
  stagger,
  trigger = "inView",
  once = true,
}: TextRevealPropsType) {
  const MotionComponent = MOTION_ELEMENTS[as];
  const stepDelay = stagger ?? (by === "char" ? 0.022 : by === "word" ? 0.05 : 0.09);

  const lines = useMemo(
    () => (Array.isArray(text) ? text : [text]),
    [text],
  );
  const readableText = lines.join(" ");

  // Fragment indices are numbered across the whole block, so the stagger reads
  // as one continuous sweep even when the text spans several lines. Offsets
  // are precomputed rather than accumulated during render — mutating a
  // counter inside JSX desynchronises on re-render.
  const splitLines = useMemo<SplitLineType[]>(() => {
    const perLine = lines.map((line) =>
      by === "line" ? [line] : by === "word" ? line.split(" ") : Array.from(line),
    );
    return perLine.map((fragments, index) => ({
      fragments,
      offset: perLine
        .slice(0, index)
        .reduce((total, previous) => total + previous.length, 0),
    }));
  }, [lines, by]);

  // Variants carry their own transition, which always beats a `transition`
  // prop — so the per-fragment delay is computed inside the variant via
  // `custom`, not passed alongside it.
  const variants = useMemo<Variants>(() => {
    const base = by === "line" ? maskLineVariants : maskWordVariants;
    return {
      initial: base.initial,
      animate: (index: number) => ({
        ...(base.animate as Record<string, unknown>),
        transition: {
          duration: by === "line" ? DURATIONS.slower : DURATIONS.slow,
          ease: EASINGS.editorial,
          delay: delay + index * stepDelay,
        },
      }),
    };
  }, [by, delay, stepDelay]);

  const resolveFragmentClass = (lineIndex: number) =>
    typeof fragmentClassName === "function"
      ? fragmentClassName(lineIndex)
      : fragmentClassName;

  return (
    <MotionComponent
      className={className}
      initial="initial"
      animate={trigger === "mount" ? "animate" : undefined}
      whileInView={trigger === "inView" ? "animate" : undefined}
      viewport={{ ...VIEWPORT, once }}
      aria-label={readableText}
    >
      {splitLines.map((line, lineIndex) => (
        <span
          key={lineIndex}
          aria-hidden="true"
          // A single-line reveal must stay inline so it can sit mid-sentence
          // beside other content — forcing `block` here pushes whatever
          // follows (a rotating word, a link) onto its own line.
          className={cn(
            splitLines.length > 1 ? "block" : "inline",
            by !== "line" && "whitespace-pre-wrap",
          )}
        >
          {line.fragments.map((fragment, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-bottom"
              style={{
                perspective: PERSPECTIVE.near,
                // The clip box is the line box, which stops at the baseline —
                // so descenders (g, y, p) get sliced off. Growing the box
                // downwards and pulling it back up by the same amount extends
                // the clip without moving the text or changing the layout.
                paddingBottom: "0.2em",
                marginBottom: "-0.2em",
              }}
            >
              <motion.span
                className={cn("inline-block", resolveFragmentClass(lineIndex))}
                variants={variants}
                custom={line.offset + i}
                style={{ transformOrigin: "50% 100%" }}
              >
                {fragment}
                {by === "word" && i < line.fragments.length - 1 ? " " : null}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </MotionComponent>
  );
}

/* -------------------------------------------------------------------- *
 * SCROLL-DIMMED TEXT
 * -------------------------------------------------------------------- */

type ScrollWordPropsType = {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  dimClassName: string;
};

function ScrollWord({
  word,
  index,
  total,
  progress,
  dimClassName,
}: ScrollWordPropsType) {
  // Each word owns a narrow slice of the scroll range, overlapping its
  // neighbours so the highlight sweeps rather than steps.
  const start = index / total;
  const end = (index + 1.6) / total;

  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  const blur = useTransform(progress, [start, end], [4, 0]);
  const filter = useTransform(blur, (value) => `blur(${value.toFixed(2)}px)`);

  return (
    <motion.span
      className={cn("inline-block", dimClassName)}
      style={{ opacity, filter }}
    >
      {word}
      &nbsp;
    </motion.span>
  );
}

export type ScrollDimmedTextPropsType = {
  text: string;
  className?: string;
  dimClassName?: string;
  as?: MotionTagType;
};

/**
 * Long-form copy that illuminates word by word as it crosses the viewport.
 * The scroll range is deliberately short, so the sentence finishes lighting up
 * well before it leaves the screen — otherwise the reader is left waiting on
 * the tail of a paragraph they have already read.
 */
export function ScrollDimmedText({
  text,
  className,
  dimClassName = "",
  as = "p",
}: ScrollDimmedTextPropsType) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotionSafe();
  const words = useMemo(() => text.split(" "), [text]);
  const MotionComponent = MOTION_ELEMENTS[as];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  if (prefersReducedMotion) {
    return <MotionComponent className={className}>{text}</MotionComponent>;
  }

  return (
    <MotionComponent
      ref={ref as React.Ref<never>}
      className={cn("flex flex-wrap", className)}
    >
      {words.map((word, index) => (
        <ScrollWord
          key={`${word}-${index}`}
          word={word}
          index={index}
          total={words.length}
          progress={scrollYProgress}
          dimClassName={dimClassName}
        />
      ))}
    </MotionComponent>
  );
}
