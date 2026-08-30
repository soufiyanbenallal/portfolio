"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotionSafe } from "@/hooks/use-media-query.hook";
import { SCROLL_OFFSETS } from "@/lib/motion.config";
import { cn } from "@/lib/utils";

/* ==================================================================== *
 * SECTION SHELL
 * ==================================================================== */

export type SectionTonType = "canvas" | "paper" | "ink";

export type SectionShellPropsType = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  contentClassName?: string;
  tone?: SectionTonType;
  /**
   * Set for sections that pin their own content. Suppresses the wrapper
   * transform, which would otherwise become the containing block for the
   * sticky children inside and break the pin.
   */
  pinned?: boolean;
  /** Hairline rule along the top edge, the house divider. */
  divider?: boolean;
  /**
   * How dark the section goes as the next one arrives over it. 0 disables.
   * Kept low deliberately — this is a shadow being cast, and anything heavier
   * reads as a modal scrim rather than depth.
   */
  dim?: number;
};

const TONE_CLASS: Record<SectionTonType, string> = {
  canvas: "bg-transparent",
  paper: "bg-white",
  ink: "bg-black text-white",
};

export function SectionShell({
  children,
  id,
  className,
  contentClassName,
  tone = "paper",
  pinned = false,
  divider = true,
}: SectionShellPropsType) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        !pinned && "overflow-hidden",
        TONE_CLASS[tone],
        divider && tone !== "ink" && "border-gray-30 border-t",
        className
      )}
    >
      <div className={cn("relative z-10", contentClassName)}>{children}</div>
    </section>
  );
}
