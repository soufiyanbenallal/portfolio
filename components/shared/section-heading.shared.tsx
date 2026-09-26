"use client";

import React from "react";
import { TextReveal } from "@/components/motion/text-reveal.motion";
import { Reveal } from "@/components/motion/reveal.motion";
import { cn } from "@/lib/utils";

export type SectionHeadingPropsType = {
  /** Mono eyebrow above the title ("Open source", "Thoughts & insights"). */
  eyebrow?: string;
  /** One string, or explicit lines for a two-tone statement heading. */
  title: string | string[];
  /** Renders the first line in gray-40 — the house two-tone treatment (GUIDE.MD §E). */
  mutedFirstLine?: boolean;
  /** Right-aligned slot on the baseline: a link, a stat cluster, a counter. */
  action?: React.ReactNode;
  /** Hairline under the heading row. */
  divider?: boolean;
  as?: "h2" | "h3";
  className?: string;
  titleClassName?: string;
};

/**
 * Every homepage section opens with the same heading row: optional eyebrow,
 * a `text-h2-sm` title that reveals word by word (or line by line for
 * multi-line statements), and an optional baseline-aligned action.
 *
 * Centralising it is what keeps nine sections reading as one document —
 * same size, same eyebrow, same entrance timing, same gap to the content.
 */
export function SectionHeading({
  eyebrow,
  title,
  mutedFirstLine = false,
  action,
  divider = false,
  as = "h2",
  className,
  titleClassName,
}: SectionHeadingPropsType) {
  const isMultiLine = Array.isArray(title) && title.length > 1;

  return (
    <div
      className={cn(
        "flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-6",
        divider && "border-gray-30 border-b pb-6",
        className
      )}
    >
      <div className="flex max-w-160 flex-col gap-2">
        {eyebrow && (
          <Reveal preset="fade" as="span" className="text-label block text-gray-50">
            {eyebrow}
          </Reveal>
        )}
        <TextReveal
          as={as}
          by={isMultiLine ? "line" : "word"}
          text={title}
          className={cn("text-h2-sm text-black", titleClassName)}
          fragmentClassName={
            mutedFirstLine ? (index) => (index === 0 ? "text-gray-40" : "text-black") : undefined
          }
        />
      </div>

      {action && (
        <Reveal preset="fade" delay={0.2} className="shrink-0">
          {action}
        </Reveal>
      )}
    </div>
  );
}
