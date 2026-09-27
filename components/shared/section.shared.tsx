import React from "react";
import { cn } from "@/lib/utils";

/* ==================================================================== *
 * SECTION — the Line Grid shell every top-level block is built from
 * --------------------------------------------------------------------
 *   <section class="seam">        1px seam across the viewport, fading out
 *     <div class="frame">         the rails: one 1200px column, left + right
 *       …                         nodes appear where seam meets rail
 *
 * Sections stack with no margin between them, so the rails run unbroken
 * from the nav to the footer. That only holds if every top-level block is
 * a Section — which is why pages compose them, and partials render only
 * what goes *inside* the frame.
 *
 * Never nest a Section inside another one: a second frame draws a second
 * pair of rails 1px inside the first.
 * ==================================================================== */

type SectionTagType = "section" | "div" | "header" | "footer" | "article";

export type SectionPropsType = {
  children: React.ReactNode;
  id?: string;
  as?: SectionTagType;
  /** Classes on the full-bleed outer element (position, z-index, background). */
  className?: string;
  /** Classes on the frame itself (background, spine-grid, min-height). */
  frameClassName?: string;
  /** Top seam + nodes. Off only for the first block under the nav. */
  seam?: boolean;
  /** Hatch the page margins either side of the frame. Hero product shots only. */
  hatchedMargins?: boolean;
  /** Run the accent beam along this seam. Use once per page. */
  beam?: boolean;
  /**
   * Clip horizontal overflow at the rails. Applied to an inner wrapper, not
   * the frame, so the nodes (which sit 3px outside the frame) still draw.
   * `overflow: clip` never creates a scroll container, so sticky
   * descendants keep pinning to the viewport.
   */
  clip?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

export function Section({
  children,
  id,
  as: Tag = "section",
  className,
  frameClassName,
  seam = true,
  hatchedMargins = false,
  beam = false,
  clip = false,
  ...aria
}: SectionPropsType) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative w-full",
        seam && "seam",
        hatchedMargins && "margins-hatched",
        className
      )}
      {...aria}
    >
      <div className={cn("frame", hatchedMargins && "bg-bg", frameClassName)}>
        {beam && seam && <span className="beam" aria-hidden="true" />}
        {clip ? <div className="relative overflow-x-clip">{children}</div> : children}
      </div>
    </Tag>
  );
}

/**
 * Reserved space between major blocks: a 40px hatched strip inside the
 * frame. Two to four per page — never between every section.
 */
export function Band({ className }: { className?: string }) {
  return (
    <div className={cn("seam relative w-full", className)} aria-hidden="true">
      <div className="frame band hatch" />
    </div>
  );
}
