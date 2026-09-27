"use client";

import React from "react";
import { AppWindow, Sparkles } from "lucide-react";
import { DarkServicePoster, KitDefs, useSvgId, type PosterChapterType } from "./service-kit.part";
import type { ServiceItemType } from "@/types";

/* ==================================================================== *
 * AI — panel
 * --------------------------------------------------------------------
 * Motif: the signal. Your product on one side, a model on the other, and
 * the conversation between them drawn as interfering waves inside a soft
 * field — one clear carrier wave and its fainter harmonics. The model's
 * side of each node catches the hue, like the reference.
 * ==================================================================== */

const LEFT = { cx: 150, cy: 260, r: 70 };
const RIGHT = { cx: 680, cy: 260, r: 100 };

const WAVES = [
  { d: "M 220 260 C 280 150, 350 150, 400 260 S 520 370, 580 260", opacity: 0.95, width: 2 },
  { d: "M 220 260 C 300 330, 350 360, 410 260 S 510 170, 580 260", opacity: 0.5, width: 1.5 },
  { d: "M 220 260 C 270 220, 330 300, 390 252 S 500 222, 580 260", opacity: 0.38, width: 1.25 },
  { d: "M 220 260 C 290 380, 370 140, 430 260 S 530 330, 580 260", opacity: 0.26, width: 1.25 },
  { d: "M 220 260 C 300 240, 340 285, 400 262 S 510 246, 580 260", opacity: 0.2, width: 1 },
] as const;

function SignalMotif({ className }: { className?: string }) {
  const id = useSvgId();
  return (
    <svg viewBox="0 0 820 520" className={className}>
      <KitDefs id={id} />

      {/* The field the exchange happens in. */}
      <ellipse cx={410} cy={260} rx={340} ry={200} fill="none" stroke="var(--color-line-2)" />
      <ellipse cx={410} cy={260} rx={270} ry={150} fill={`url(#${id}-glow)`} stroke="var(--svc-hue)" strokeOpacity={0.14} />

      {WAVES.map((wave) => (
        <path
          key={wave.d}
          d={wave.d}
          fill="none"
          stroke="var(--svc-hue)"
          strokeOpacity={wave.opacity}
          strokeWidth={wave.width}
          strokeLinecap="round"
        />
      ))}

      {/* Tokens in transit on the carrier wave. */}
      {[
        [262, 196],
        [334, 176],
        [470, 330],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={8} fill="var(--svc-hue)" opacity={0.12} />
          <circle cx={x} cy={y} r={3} fill="var(--svc-hue)" />
        </g>
      ))}

      {/* Your product — its right side, facing the model, catches the hue. */}
      <circle cx={LEFT.cx} cy={LEFT.cy} r={LEFT.r} fill={`url(#${id}-face)`} stroke="var(--color-line-2)" filter={`url(#${id}-lift)`} />
      <circle
        cx={LEFT.cx}
        cy={LEFT.cy}
        r={LEFT.r}
        fill="none"
        stroke={`url(#${id}-edge)`}
        strokeWidth={1.5}
        transform={`rotate(180 ${LEFT.cx} ${LEFT.cy})`}
      />
      <AppWindow
        x={LEFT.cx - 24}
        y={LEFT.cy - 24}
        width={48}
        height={48}
        stroke="var(--color-ink-muted)"
        strokeWidth={1.5}
        absoluteStrokeWidth
      />

      {/* The model. */}
      <circle cx={RIGHT.cx} cy={RIGHT.cy} r={RIGHT.r} fill={`url(#${id}-face-hue)`} stroke="var(--color-line-2)" filter={`url(#${id}-lift)`} />
      <circle cx={RIGHT.cx} cy={RIGHT.cy} r={RIGHT.r} fill="none" stroke={`url(#${id}-edge)`} strokeWidth={1.5} />
      <Sparkles
        x={RIGHT.cx - 32}
        y={RIGHT.cy - 32}
        width={64}
        height={64}
        stroke="var(--svc-hue)"
        strokeWidth={1.5}
        absoluteStrokeWidth
      />

      <text x={LEFT.cx} y={LEFT.cy + LEFT.r + 30} textAnchor="middle" className="font-mono" fontSize={12} letterSpacing="0.08em" fill="var(--color-ink-faint)">
        YOUR PRODUCT
      </text>
      <text x={RIGHT.cx} y={RIGHT.cy + RIGHT.r + 30} textAnchor="middle" className="font-mono" fontSize={12} letterSpacing="0.08em" fill="var(--svc-deep)">
        MODEL
      </text>
    </svg>
  );
}

/**
 * AI's poster: the signal on a dark ground. The drawing is wide (820 × 520),
 * so a wide panel gives it 60% of its width and a docked one all of it —
 * the clamp moves continuously between the two as the panel changes shape.
 */
export function AiServicePoster({
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
      meta="LLM APIs · Webhooks · Node.js · Laravel"
      motif={<SignalMotif className="h-full w-full" />}
      motifAspect={820 / 520}
      motifWidth="min(145cqh, clamp(60cqw, 60cqw + (100cqh - 100cqw) * 1.2, 96cqw))"
    />
  );
}
