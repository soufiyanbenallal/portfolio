"use client";

import React, { useId, useMemo } from "react";
import { useLenis } from "lenis/react";
import { useActiveSection } from "@/hooks/use-active-section.hook";
import { SCROLL } from "@/lib/motion.config";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceItemType } from "@/types";

/* ==================================================================== *
 * SERVICE KIT
 * --------------------------------------------------------------------
 * The shared vocabulary of the three services:
 *
 *   • Detail parts — the kicker and the dots-canvas figure the story uses.
 *   • Dark poster — the full-screen opening each service docks from, with
 *     its chapter index.
 *   • SVG primitives — the light-mode take on glossy integration tiles,
 *     square nodes, hatches and arrowheads, all coloured through the Line
 *     Grid tokens and the service's own `--svc-*` palette.
 *
 * Each service composes these in its own files, with its own motif and
 * its own illustration.
 * ==================================================================== */

/* -------------------------------------------------------------------- *
 * Detail parts
 * -------------------------------------------------------------------- */

export function DetailKicker({ service }: { service: ServiceItemType }) {
  return (
    <span className="text-label flex items-center gap-2 text-(--svc-deep)">
      <span className="h-1.5 w-1.5 bg-(--svc-hue)" aria-hidden="true" />
      {service.kicker}
      <span className="text-ink-faint">/ {service.title}</span>
    </span>
  );
}

/** An illustration sits on a dots canvas — it is the live object of the detail. */
export function DetailFigure({
  children,
  label,
  className,
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <figure className={cn("relative", className)} aria-label={label}>
      <div className="dots fade-edges pointer-events-none absolute -inset-3" aria-hidden="true" />
      <div className="relative">{children}</div>
    </figure>
  );
}

/* -------------------------------------------------------------------- *
 * Dark poster — the full-screen opening of every service section
 * -------------------------------------------------------------------- */

export type PosterChapterType = { id: string; label: string };

/**
 * Docked-only chapter index. Grows in with `--dock` (set by the showcase
 * rig), tracks the chapter being read in the right column, and jumps to
 * any of them. Hidden entirely outside the rig (phones, reduced motion).
 */
function PosterChapterIndex({ chapters }: { chapters: readonly PosterChapterType[] }) {
  const ids = useMemo(() => chapters.map((chapter) => chapter.id), [chapters]);
  const active = useActiveSection(ids);
  const lenis = useLenis();

  const jump = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -24, duration: SCROLL.jumpDuration });
    else target.scrollIntoView({ block: "start" });
  };

  return (
    <nav
      aria-label="In this section"
      className="pointer-events-none hidden flex-col overflow-hidden group-data-docked/panel:pointer-events-auto group-data-rig/panel:flex"
      style={{ maxHeight: "calc(var(--dock, 0) * 240px)", opacity: "var(--dock, 0)" }}
    >
      <div className="dash-x mt-[max(16px,3cqi)] mb-2" aria-hidden="true" />
      {chapters.map((chapter, index) => {
        const isActive = chapter.id === active;
        return (
          <button
            key={chapter.id}
            type="button"
            onClick={() => jump(chapter.id)}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "relative flex cursor-pointer items-center gap-3 py-2 pl-3 text-left transition-colors",
              isActive ? "text-ink" : "text-ink-faint hover:text-ink-2"
            )}
          >
            <span
              className={cn(
                "absolute inset-y-1.5 left-0 w-px transition-colors duration-300",
                isActive ? "bg-(--svc-hue)" : "bg-line-2"
              )}
              aria-hidden="true"
            />
            <span className={cn("text-[10px] tabular-nums", isActive && "text-(--svc-deep)")}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[12.5px] tracking-[-0.005em]">{chapter.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export type DarkServicePosterPropsType = {
  service: ServiceItemType;
  /** Position of this service in the sequence (0-based), and the count. */
  index: number;
  total: number;
  /** Mono meta line, top right. */
  meta: string;
  /** The service's signature drawing; it should fill its box (h-full w-full). */
  motif: React.ReactNode;
  /** Drawing's aspect ratio (width / height). */
  motifAspect: number;
  /**
   * The drawing's width as a CSS expression in container units. Different
   * drawings want different room in a wide panel versus a tall one.
   */
  motifWidth: string;
  /** The story's chapters, indexed on the panel once it docks. */
  chapters?: readonly PosterChapterType[];
  className?: string;
};

/**
 * A service's poster on a dark ground, sized in container units on both
 * axes. The drawing's position is a continuous function of the panel's
 * shape: to the right and centred when the panel is wide, lifted into the
 * space above the title when it narrows into a docked portrait window —
 * so docking re-composes the poster instead of cropping it, with no jump
 * at any aspect ratio.
 */
export function DarkServicePoster({
  service,
  index,
  total,
  meta,
  motif,
  motifAspect,
  motifWidth,
  chapters = [],
  className,
}: DarkServicePosterPropsType) {
  // Once docked (`--dock` → 1), the title block and chapter index take the
  // bottom ~300px, so the drawing is bounded by the height left above them
  // and centred in that space. Before docking the bound is inert, so the
  // full-screen poster is unaffected; in between, it moves continuously.
  const width = `min(${motifWidth}, calc((100cqh - 360px) * ${motifAspect} + (1 - var(--dock, 0)) * 4000px))`;
  return (
    <div
      className={cn(
        "svc-poster surface-dark relative h-full w-full overflow-hidden bg-(--svc-tint)",
        className
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute"
          style={{
            width,
            aspectRatio: String(motifAspect),
            left: `max(50cqw, 100cqw - 0.55 * ${width})`,
            top: "calc(50cqh - max(0px, (100cqh - 100cqw) * 0.4) * (1 - var(--dock, 0)) - 120px * var(--dock, 0))",
            transform: "translate(-50%, -50%)",
          }}
        >
          {motif}
        </div>
        {/* The type sits at the bottom-left: the ground rises to meet it. */}
        <div className="absolute inset-0 bg-linear-to-t from-(--svc-tint) from-8% via-(--svc-tint)/70 via-28% to-transparent to-60%" />
      </div>

      <div className="relative flex h-full flex-col justify-between p-[max(20px,4.5cqi)]">
        <div className="flex items-start justify-between gap-6">
          <span className="flex items-center gap-[max(8px,1.1cqi)]">
            {/* Position in the sequence, drawn as squares — no numerals. */}
            <span className="flex gap-1" aria-hidden="true">
              {Array.from({ length: total }, (_, square) => (
                <span
                  key={square}
                  className={cn(
                    "h-[max(5px,0.55cqi)] w-[max(5px,0.55cqi)] border",
                    square === index ? "border-(--svc-hue) bg-(--svc-hue)" : "border-line-3"
                  )}
                />
              ))}
            </span>
            <span className="font-mono text-[max(10px,1cqi)] tracking-[0.08em] text-(--svc-deep) uppercase">
              {service.kicker}
            </span>
          </span>
          <span className="text-ink-faint hidden font-mono text-[max(10px,0.95cqi)] tracking-[0.04em] sm:block">
            {meta}
          </span>
        </div>

        <div className="max-w-[min(100%,max(56cqi,380px))]">
          <h3 className="text-ink text-[clamp(34px,7cqi,104px)] leading-[0.98] font-medium tracking-[-0.045em] text-balance">
            {service.title}
          </h3>
          <p className="text-ink-muted mt-[max(12px,1.6cqi)] max-w-[40ch] text-[max(14px,1.6cqi)] leading-snug">
            {service.summary}
          </p>
          {chapters.length > 0 && <PosterChapterIndex chapters={chapters} />}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- *
 * SVG primitives
 * -------------------------------------------------------------------- */

/** `useId` output is not a valid bare fragment id (`:r1:`); strip it. */
export function useSvgId() {
  return `svc${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
}

/**
 * Shared defs. Every illustration renders these once and references them
 * by `${id}-name`, so two instances on one page never collide.
 */
export function KitDefs({ id }: { id: string }) {
  return (
    <defs>
      {/* Light tile face: paper white falling to a cool grey. */}
      <linearGradient id={`${id}-face`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" style={{ stopColor: "var(--color-surface)" }} />
        <stop offset="1" style={{ stopColor: "var(--color-raised)" }} />
      </linearGradient>
      {/* Tinted face for the active object. */}
      <linearGradient id={`${id}-face-hue`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" style={{ stopColor: "var(--color-surface)" }} />
        <stop offset="1" style={{ stopColor: "var(--svc-soft)" }} />
      </linearGradient>
      {/* An edge that glows in the hue on the side facing its connection. */}
      <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" style={{ stopColor: "var(--svc-hue)", stopOpacity: 0.7 }} />
        <stop offset="0.65" style={{ stopColor: "var(--color-line-2)" }} />
      </linearGradient>
      <radialGradient id={`${id}-glow`}>
        <stop offset="0" style={{ stopColor: "var(--svc-hue)", stopOpacity: 0.22 }} />
        <stop offset="1" style={{ stopColor: "var(--svc-hue)", stopOpacity: 0 }} />
      </radialGradient>
      <pattern
        id={`${id}-hatch`}
        width="7"
        height="7"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <line x1="0" y1="0" x2="0" y2="7" stroke="var(--color-line-2)" strokeWidth="1" />
      </pattern>
      <pattern
        id={`${id}-hatch-hue`}
        width="6"
        height="6"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(-45)"
      >
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="6"
          stroke="var(--svc-hue)"
          strokeOpacity="0.45"
          strokeWidth="1"
        />
      </pattern>
      <marker
        id={`${id}-arrow`}
        viewBox="0 0 8 8"
        refX="6"
        refY="4"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M1 1.2 L7 4 L1 6.8 Z" fill="var(--color-ink-faint)" />
      </marker>
      <marker
        id={`${id}-arrow-hue`}
        viewBox="0 0 8 8"
        refX="6"
        refY="4"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M1 1.2 L7 4 L1 6.8 Z" fill="var(--svc-hue)" />
      </marker>
      <filter id={`${id}-lift`} x="-40%" y="-40%" width="180%" height="180%">
        <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#111113" floodOpacity="0.07" />
      </filter>
    </defs>
  );
}

export type TilePropsType = {
  id: string;
  x: number;
  y: number;
  size: number;
  icon: LucideIcon;
  /** The live / connected object: tinted face, hue edge and glyph. */
  accent?: boolean;
  /** Edge lit on the side facing a connection, like a socket. */
  lit?: boolean;
  opacity?: number;
};

/** A glossy integration tile — light-mode cousin of the reference's dark tiles. */
export function Tile({
  id,
  x,
  y,
  size,
  icon: Icon,
  accent = false,
  lit = false,
  opacity,
}: TilePropsType) {
  const radius = size * 0.24;
  const glyph = size * 0.42;
  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      <rect
        width={size}
        height={size}
        rx={radius}
        fill={`url(#${id}-${accent ? "face-hue" : "face"})`}
        stroke={accent || lit ? `url(#${id}-edge)` : "var(--color-line-2)"}
        strokeWidth={1}
        filter={`url(#${id}-lift)`}
      />
      {/* Top-edge highlight: the gloss that reads as a physical key. */}
      <path
        d={`M ${radius} 1.5 H ${size - radius}`}
        stroke="var(--kit-gloss, #ffffff)"
        strokeWidth={1}
        strokeLinecap="round"
      />
      <Icon
        x={(size - glyph) / 2}
        y={(size - glyph) / 2}
        width={glyph}
        height={glyph}
        stroke={accent ? "var(--svc-hue)" : "var(--color-ink-muted)"}
        strokeWidth={1.5}
        absoluteStrokeWidth
      />
    </g>
  );
}

/** 5×5 square node where lines meet — the Line Grid's crossing marker. */
export function Node({ x, y, accent = false }: { x: number; y: number; accent?: boolean }) {
  return (
    <rect
      x={x - 2.5}
      y={y - 2.5}
      width={5}
      height={5}
      fill={accent ? "var(--svc-hue)" : "var(--color-bg)"}
      stroke={accent ? "var(--svc-hue)" : "var(--color-line-3)"}
      strokeWidth={1}
    />
  );
}

/** Round port where a connector leaves an object. */
export function Port({ x, y, accent = false }: { x: number; y: number; accent?: boolean }) {
  return <circle cx={x} cy={y} r={2.5} fill={accent ? "var(--svc-hue)" : "var(--color-line-3)"} />;
}

/** Mono caption: a strong word and a quiet one, like the reference's rows. */
export function Caption({
  x,
  y,
  strong,
  quiet,
  anchor = "start",
  size = 10,
}: {
  x: number;
  y: number;
  strong: string;
  quiet?: string;
  anchor?: "start" | "middle" | "end";
  size?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className="font-mono"
      fontSize={size}
      letterSpacing="0.06em"
    >
      <tspan fill="var(--color-ink-2)">{strong}</tspan>
      {quiet && <tspan fill="var(--color-ink-faint)">{` ${quiet}`}</tspan>}
    </text>
  );
}

/** Two-line label beside an object: a sans title and a mono sub-line. */
export function Label({
  x,
  y,
  title,
  sub,
  anchor = "start",
}: {
  x: number;
  y: number;
  title: string;
  sub: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <g>
      <text
        x={x}
        y={y}
        textAnchor={anchor}
        fontSize={13}
        fontWeight={500}
        fill="var(--color-ink-2)"
      >
        {title}
      </text>
      <text
        x={x}
        y={y + 16}
        textAnchor={anchor}
        className="font-mono"
        fontSize={10}
        fill="var(--color-ink-faint)"
      >
        {sub}
      </text>
    </g>
  );
}
