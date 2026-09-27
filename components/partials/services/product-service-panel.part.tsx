"use client";

import React from "react";
import { DarkServicePoster, KitDefs, Node, useSvgId, type PosterChapterType } from "./service-kit.part";
import type { ServiceItemType } from "@/types";

/* ==================================================================== *
 * PRODUCT — panel
 * --------------------------------------------------------------------
 * Motif: the blueprint. A product drawn as an exploded isometric stack —
 * interface over services over data — on an isometric construction
 * lattice, with square nodes on every vertex and dashed explode lines
 * between the layers. Hatch marks the layers that hold weight; the
 * interface layer carries a small drawn UI in the same projection.
 * ==================================================================== */

const COS30 = Math.cos(Math.PI / 6);
const SIN30 = 0.5;
const CX = 360;
const HALF_W = 200; // half-width of a plate's top face
const HALF_H = HALF_W * Math.tan(Math.PI / 6); // isometric half-height
const THICK = 16;
const LEVELS = [170, 320, 470] as const;

type PlateVariantType = "interface" | "services" | "data";

const point = (x: number, y: number) => `${x.toFixed(1)},${y.toFixed(1)}`;

function Plate({ id, cy, variant }: { id: string; cy: number; variant: PlateVariantType }) {
  const left = CX - HALF_W;
  const right = CX + HALF_W;
  const top = cy - HALF_H;
  const bottom = cy + HALF_H;

  const face = [point(left, cy), point(CX, top), point(right, cy), point(CX, bottom)].join(" ");
  const sideLeft = [
    point(left, cy),
    point(CX, bottom),
    point(CX, bottom + THICK),
    point(left, cy + THICK),
  ].join(" ");
  const sideRight = [
    point(CX, bottom),
    point(right, cy),
    point(right, cy + THICK),
    point(CX, bottom + THICK),
  ].join(" ");

  const isInterface = variant === "interface";
  const edge = isInterface ? "var(--svc-hue)" : "var(--color-line-3)";

  return (
    <g>
      <polygon points={sideLeft} fill="var(--color-line)" stroke={edge} strokeWidth={1} />
      <polygon points={sideRight} fill="var(--color-raised)" stroke={edge} strokeWidth={1} />
      <polygon
        points={face}
        fill={isInterface ? `url(#${id}-face-hue)` : "var(--color-surface)"}
        stroke={edge}
        strokeWidth={isInterface ? 1.5 : 1}
      />
      {variant === "services" && <polygon points={face} fill={`url(#${id}-hatch-hue)`} />}
      {variant === "data" && <polygon points={face} fill={`url(#${id}-hatch)`} />}

      {/* A small UI drawn in the plane of the interface layer. */}
      {isInterface && (
        <g transform={`matrix(${COS30} ${SIN30} ${-COS30} ${SIN30} ${CX} ${top})`}>
          <rect x={26} y={30} width={96} height={10} rx={3} fill="var(--svc-hue)" opacity={0.55} />
          <rect x={26} y={54} width={170} height={6} rx={3} fill="var(--color-line-3)" />
          <rect x={26} y={68} width={130} height={6} rx={3} fill="var(--color-line-2)" />
          <rect
            x={26}
            y={96}
            width={80}
            height={96}
            rx={6}
            fill="var(--color-surface)"
            stroke="var(--color-line-2)"
          />
          <rect
            x={118}
            y={96}
            width={80}
            height={96}
            rx={6}
            fill="var(--color-surface)"
            stroke="var(--color-line-2)"
          />
          <rect
            x={36}
            y={160}
            width={40}
            height={14}
            rx={3}
            fill="var(--color-ink)"
            opacity={0.8}
          />
        </g>
      )}

      <Node x={left} y={cy} accent={isInterface} />
      <Node x={CX} y={top} accent={isInterface} />
      <Node x={right} y={cy} accent={isInterface} />
      <Node x={CX} y={bottom} accent={isInterface} />
    </g>
  );
}

const PLATE_LABELS: Array<{ title: string; sub: string }> = [
  { title: "INTERFACE", sub: "React · TypeScript" },
  { title: "SERVICES", sub: "Node.js · Laravel · REST" },
  { title: "DATA", sub: "MySQL · Supabase" },
];

function BlueprintMotif({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const id = useSvgId();
  const rise = 780 * Math.tan(Math.PI / 6);
  const lattice = Array.from({ length: 22 }, (_, i) => -760 + i * 84);

  return (
    <svg
      viewBox="0 0 780 660"
      className={className ?? "absolute top-1/2 right-[5%] h-[102%] -translate-y-1/2"}
      style={{
        ...style,
        maskImage: "radial-gradient(ellipse 68% 66% at 50% 50%, #000 60%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 68% 66% at 50% 50%, #000 60%, transparent 100%)",
      }}
    >
      <KitDefs id={id} />

      {/* Isometric construction lattice. */}
      <g stroke="var(--svc-hue)" strokeOpacity={0.16} strokeWidth={1} strokeDasharray="3 7">
        {lattice.map((b) => (
          <React.Fragment key={b}>
            <line x1={0} y1={b} x2={780} y2={b + rise} />
            <line x1={0} y1={b + rise} x2={780} y2={b} />
          </React.Fragment>
        ))}
      </g>

      {/* Explode lines: where each layer sits over the one below. */}
      <g stroke="var(--color-line-3)" strokeWidth={1} strokeDasharray="4 4">
        <line x1={CX - HALF_W} y1={LEVELS[0]} x2={CX - HALF_W} y2={LEVELS[2] + THICK} />
        <line x1={CX + HALF_W} y1={LEVELS[0]} x2={CX + HALF_W} y2={LEVELS[2] + THICK} />
        <line x1={CX} y1={LEVELS[0] + HALF_H} x2={CX} y2={LEVELS[2] + HALF_H + THICK + 40} />
      </g>

      <Plate id={id} cy={LEVELS[2]} variant="data" />
      <Plate id={id} cy={LEVELS[1]} variant="services" />
      <Plate id={id} cy={LEVELS[0]} variant="interface" />

      {LEVELS.map((cy, level) => (
        <g key={cy}>
          <line
            x1={CX + HALF_W + 8}
            y1={cy}
            x2={CX + HALF_W + 26}
            y2={cy}
            stroke="var(--color-line-3)"
            strokeDasharray="2 3"
          />
          <text
            x={CX + HALF_W + 34}
            y={cy + 1}
            className="font-mono"
            fontSize={12}
            letterSpacing="0.08em"
            fill={level === 0 ? "var(--svc-deep)" : "var(--color-ink-2)"}
          >
            {PLATE_LABELS[level].title}
          </text>
          <text
            x={CX + HALF_W + 34}
            y={cy + 17}
            className="font-mono"
            fontSize={10}
            fill="var(--color-ink-faint)"
          >
            {PLATE_LABELS[level].sub}
          </text>
        </g>
      ))}
    </svg>
  );
}

/**
 * Product's poster: the blueprint on a dark ground. The drawing is
 * 780 × 660; it takes most of a wide panel and the full width of a
 * docked one.
 */
export function ProductServicePoster({
  service,
  index,
  total,
  chapters,
}: {
  service: ServiceItemType;
  index: number;
  total: number;
  chapters?: readonly PosterChapterType[];
}) {
  return (
    <DarkServicePoster
      service={service}
      index={index}
      total={total}
      chapters={chapters}
      meta="React · TypeScript · Node.js · Laravel"
      motif={<BlueprintMotif className="h-full w-full" />}
      motifAspect={780 / 660}
      motifWidth="min(108cqh, 96cqw)"
    />
  );
}
