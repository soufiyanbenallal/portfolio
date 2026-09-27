import React from "react";
import { cn } from "@/lib/utils";

/* ==================================================================== *
 * CHAPTER — the Line Grid spine layout
 * --------------------------------------------------------------------
 *   | label column (232px) | content                        |
 *   | label · summary      | head, then cells / rows        |
 *   | hatch (reserved)     |                                |
 *
 * The spine sits at the same x in every chapter, and a node marks where
 * the section's seam crosses it. Below 1024px the label column becomes a
 * strip across the top. Render inside a <Section>.
 * ==================================================================== */

export type ChapterPropsType = {
  /** Mono label at the top of the spine column ("About", "FAQ"). */
  label: string;
  /** One line under the label, desktop only. */
  summary?: string;
  /** Colour the label with the page accent — for the chapters that open a topic. */
  accent?: boolean;
  /** Hatch the empty rest of the label column (reserved space). */
  hatch?: boolean;
  /** Keep the label pinned while the content scrolls past. */
  sticky?: boolean;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export function Chapter({
  label,
  summary,
  accent = false,
  hatch = true,
  sticky = true,
  children,
  className,
  contentClassName,
}: ChapterPropsType) {
  return (
    <div className={cn("spine-grid relative", className)}>
      <span className="node spine-node hidden lg:block" aria-hidden="true" />

      <div className="spine bg-surface relative px-4 py-6 sm:px-10 lg:border-b-0 lg:px-6 lg:py-12">
        <div
          className={cn("relative z-10", sticky && "lg:sticky lg:top-[calc(var(--nav-h)+3rem)]")}
        >
          <div className={cn("text-label", accent ? "text-brand" : "text-ink-faint")}>{label}</div>
          {summary && (
            <p className="text-ink-faint mt-3 hidden max-w-45 text-[12px] leading-relaxed lg:block">
              {summary}
            </p>
          )}
        </div>
      </div>

      <div className={cn("min-w-0", contentClassName)}>{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------- *
 * Head — the heading row every section opens with
 * -------------------------------------------------------------------- */

export type ChapterHeadPropsType = {
  /** Two-tone title: the claim in ink, its consequence in faint. */
  title: readonly [string, string?];
  /** Mono eyebrow — for sections without a spine column to carry the label. */
  eyebrow?: string;
  lede?: React.ReactNode;
  /** Right-aligned slot on the baseline: a link, a button. */
  action?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
};

export function ChapterHead({
  title,
  eyebrow,
  lede,
  action,
  as: Heading = "h2",
  id,
  className,
}: ChapterHeadPropsType) {
  const [lead, tail] = title;
  return (
    <div
      className={cn(
        "flex flex-col gap-6 px-4 py-12 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:py-16",
        className
      )}
    >
      <div className="flex max-w-2xl flex-col gap-3">
        {eyebrow && <span className="text-label text-ink-faint">{eyebrow}</span>}
        <Heading id={id} className="text-h2-sm text-ink">
          {lead}
          {tail && <span className="text-ink-soft"> {tail}</span>}
        </Heading>
        {lede && <div className="text-ink-muted max-w-xl text-[15px] leading-relaxed">{lede}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
