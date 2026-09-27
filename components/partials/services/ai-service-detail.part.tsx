"use client";

import React from "react";
import { Clock, MessageSquare, Plug, ShieldCheck, Sparkles, Webhook, type LucideIcon } from "lucide-react";
import { Caption, KitDefs, Port, Tile, useSvgId } from "./service-kit.part";
import { ServiceStory, getStoryChapters } from "./service-story.part";
import type { ServiceItemType } from "@/types";

/* ==================================================================== *
 * AI — detail
 * --------------------------------------------------------------------
 * Illustration: the automation loop. Three triggers — a webhook, a
 * schedule, an event — each routed along its own rounded connector down
 * into the step that handles it, and a dashed feedback path returning
 * results and logs to the start. The webhook route is the live one.
 * ==================================================================== */

type TriggerType = { icon: LucideIcon; strong: string; quiet: string; target: number; label: string };

// Nearest trigger routes farthest — the connectors nest instead of crossing.
const AGENTS = [340, 448, 556] as const;
const TRIGGERS: TriggerType[] = [
  { icon: Webhook, strong: "WEBHOOK", quiet: "ORDER CREATED", target: AGENTS[2], label: "SYNC" },
  { icon: Clock, strong: "SCHEDULE", quiet: "DAILY SUMMARY", target: AGENTS[1], label: "REPORT" },
  { icon: MessageSquare, strong: "EVENT", quiet: "NEW TICKET", target: AGENTS[0], label: "TRIAGE" },
];

const ROW = { x: 18, width: 216, height: 38, gap: 8, top: 18 };
const BOX = { size: 72, top: 176, inset: 8 };

/** Lit cells of each step's 4×4 status matrix. */
const MATRICES: Record<number, number[]> = {
  [AGENTS[0]]: [0, 1, 4, 5, 6, 9, 10, 15],
  [AGENTS[1]]: [0, 1, 2, 3, 4, 8, 12],
  [AGENTS[2]]: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
};

function WorkflowIllustration() {
  const id = useSvgId();

  return (
    <svg
      viewBox="0 0 610 276"
      preserveAspectRatio="xMinYMid meet"
      className="h-auto max-h-[min(230px,26vh)] w-full"
      role="img"
      aria-label="Three triggers — a webhook, a schedule and an event — each routed to an automated step, with results fed back"
    >
      <KitDefs id={id} />

      {/* Trigger panel. */}
      <rect x={8} y={8} width={236} height={150} rx={12} fill="var(--color-raised)" stroke="var(--color-line)" />

      {TRIGGERS.map((trigger, row) => {
        const y = ROW.top + row * (ROW.height + ROW.gap);
        const midY = y + ROW.height / 2;
        const isLive = row === 0;
        const Icon = trigger.icon;
        const route = [
          `M 262 ${midY}`,
          `H ${trigger.target - 18}`,
          `Q ${trigger.target} ${midY} ${trigger.target} ${midY + 18}`,
          `V ${BOX.top - 8}`,
        ].join(" ");

        return (
          <g key={trigger.strong}>
            <path
              d={route}
              fill="none"
              stroke={isLive ? "var(--svc-hue)" : "var(--color-line-3)"}
              strokeWidth={isLive ? 1.5 : 1.25}
              markerEnd={`url(#${id}-${isLive ? "arrow-hue" : "arrow"})`}
            />
            <Port x={258} y={midY} accent={isLive} />

            <rect
              x={ROW.x}
              y={y}
              width={ROW.width}
              height={ROW.height}
              rx={7}
              fill={isLive ? `url(#${id}-face-hue)` : "var(--color-surface)"}
              stroke={isLive ? `url(#${id}-edge)` : "var(--color-line-2)"}
            />
            <Icon
              x={ROW.x + 12}
              y={midY - 7}
              width={14}
              height={14}
              stroke={isLive ? "var(--svc-hue)" : "var(--color-ink-faint)"}
              strokeWidth={1.5}
              absoluteStrokeWidth
            />
            <Caption x={ROW.x + 36} y={midY + 3.5} strong={trigger.strong} quiet={trigger.quiet} size={10} />
          </g>
        );
      })}

      {/* Automated steps. */}
      {AGENTS.map((cx) => {
        const x = cx - BOX.size / 2;
        const inner = BOX.size - BOX.inset * 2;
        const lit = MATRICES[cx];
        const trigger = TRIGGERS.find((item) => item.target === cx);
        const isLive = cx === AGENTS[2];
        return (
          <g key={cx}>
            <rect
              x={x}
              y={BOX.top}
              width={BOX.size}
              height={BOX.size}
              rx={10}
              fill="none"
              stroke={isLive ? "var(--svc-hue)" : "var(--color-line-3)"}
              strokeOpacity={isLive ? 0.6 : 1}
              strokeDasharray="4 4"
            />
            <rect
              x={x + BOX.inset}
              y={BOX.top + BOX.inset}
              width={inner}
              height={inner}
              rx={7}
              fill="var(--color-surface)"
              stroke="var(--color-line-2)"
            />
            {Array.from({ length: 16 }, (_, cell) => (
              <circle
                key={cell}
                cx={x + BOX.inset + 9 + (cell % 4) * 5}
                cy={BOX.top + BOX.inset + 9 + Math.floor(cell / 4) * 5}
                r={1.2}
                fill={
                  lit.includes(cell)
                    ? isLive
                      ? "var(--svc-hue)"
                      : "var(--color-ink-2)"
                    : "var(--color-line-3)"
                }
              />
            ))}
            <text
              x={x + BOX.inset + 8}
              y={BOX.top + BOX.size - BOX.inset - 8}
              className="font-mono"
              fontSize={8.5}
              letterSpacing="0.08em"
              fill={isLive ? "var(--svc-deep)" : "var(--color-ink-faint)"}
            >
              {trigger?.label}
            </text>
          </g>
        );
      })}

      {/* Feedback: results and logs return to where the work started. */}
      <path
        d={`M ${AGENTS[2]} 248 V 256 Q ${AGENTS[2]} 266 ${AGENTS[2] - 10} 266 H 136 Q 126 266 126 256 V 166`}
        fill="none"
        stroke="var(--color-line-3)"
        strokeWidth={1.25}
        strokeDasharray="4 4"
        markerEnd={`url(#${id}-arrow)`}
      />
      <path d={`M ${AGENTS[1]} 248 V 256 Q ${AGENTS[1]} 266 ${AGENTS[1] - 10} 266`} fill="none" stroke="var(--color-line-3)" strokeWidth={1.25} strokeDasharray="4 4" />
      <path d={`M ${AGENTS[0]} 248 V 256 Q ${AGENTS[0]} 266 ${AGENTS[0] - 10} 266`} fill="none" stroke="var(--color-line-3)" strokeWidth={1.25} strokeDasharray="4 4" />
      <rect x={168} y={258} width={112} height={16} fill="var(--color-bg)" />
      <text x={224} y={270} textAnchor="middle" className="font-mono" fontSize={9} letterSpacing="0.08em" fill="var(--color-ink-faint)">
        RESULTS · LOGS
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------- *
 * Capability vectors
 * -------------------------------------------------------------------- */

/** AI features: text being written inside the product, caret still moving. */
function GenerateVector() {
  const id = useSvgId();
  return (
    <svg viewBox="0 0 160 76" className="h-full w-auto" aria-hidden="true">
      <KitDefs id={id} />
      <g transform="translate(16 8)">
        <rect width={104} height={60} rx={6} fill={`url(#${id}-face)`} stroke="var(--color-line-2)" filter={`url(#${id}-lift)`} />
        <line x1={0} y1={13} x2={104} y2={13} stroke="var(--color-line)" />
        <rect x={8} y={5} width={26} height={3.5} rx={1.75} fill="var(--color-line-3)" />
        {[22, 31].map((y) => (
          <rect key={y} x={8} y={y} width={80} height={3.5} rx={1.75} fill="var(--color-line-3)" />
        ))}
        <rect x={8} y={40} width={50} height={3.5} rx={1.75} fill="var(--svc-hue)" opacity={0.75} />
        <rect x={61} y={37.5} width={1.5} height={9} fill="var(--svc-hue)" />
      </g>
      <Tile id={id} x={110} y={24} size={36} icon={Sparkles} accent />
    </svg>
  );
}

/** Automation: a trigger starting a chain of steps that ends done. */
function TriggerChainVector() {
  const id = useSvgId();
  const steps = [66, 94, 122];
  return (
    <svg viewBox="0 0 160 76" className="h-full w-auto" aria-hidden="true">
      <KitDefs id={id} />
      <path d="M 50 38 H 144" stroke="var(--color-line-3)" strokeWidth={1.1} />
      <path d="M 50 38 H 94" stroke="var(--svc-hue)" strokeWidth={1.4} />
      <Tile id={id} x={10} y={18} size={40} icon={Clock} accent />
      {steps.map((x, index) => (
        <rect
          key={x}
          x={x - 7}
          y={31}
          width={14}
          height={14}
          rx={3}
          fill={index < 2 ? `url(#${id}-face-hue)` : "var(--color-surface)"}
          stroke={index < 2 ? "var(--svc-hue)" : "var(--color-line-3)"}
        />
      ))}
      <path d="M 90 38 L 93 41 L 98 35" fill="none" stroke="var(--svc-hue)" strokeWidth={1.4} />
      <path d="M 62 38 L 65 41 L 70 35" fill="none" stroke="var(--svc-hue)" strokeWidth={1.4} />
      <circle cx={122} cy={38} r={2} fill="var(--color-line-3)" />
      <text x={66} y={60} className="font-mono" fontSize={7} letterSpacing="0.06em" fill="var(--color-ink-faint)">
        STEP 2 OF 3
      </text>
    </svg>
  );
}

/** Integrations: the product in the middle, the APIs a workflow reaches. */
function IntegrationsVector() {
  const id = useSvgId();
  const ends = [
    [24, 14],
    [24, 62],
    [136, 14],
    [136, 62],
  ] as const;
  return (
    <svg viewBox="0 0 160 76" className="h-full w-auto" aria-hidden="true">
      <KitDefs id={id} />
      {ends.map(([x, y], index) => (
        <line
          key={`${x}-${y}`}
          x1={80}
          y1={38}
          x2={x}
          y2={y}
          stroke={index === 2 ? "var(--svc-hue)" : "var(--color-line-3)"}
          strokeWidth={index === 2 ? 1.4 : 1}
          strokeDasharray={index === 2 ? undefined : "3 3"}
        />
      ))}
      {ends.map(([x, y], index) => (
        <rect
          key={`n-${x}-${y}`}
          x={x - 7}
          y={y - 7}
          width={14}
          height={14}
          rx={3}
          fill={index === 2 ? `url(#${id}-face-hue)` : `url(#${id}-face)`}
          stroke={index === 2 ? "var(--svc-hue)" : "var(--color-line-2)"}
        />
      ))}
      <Tile id={id} x={60} y={18} size={40} icon={Plug} accent />
    </svg>
  );
}

/** Guardrails: structured output checked against its schema before it acts. */
function SchemaCheckVector() {
  const id = useSvgId();
  const rows = [
    { y: 18, w: 40, ok: true },
    { y: 30, w: 52, ok: true },
    { y: 42, w: 34, ok: true },
    { y: 54, w: 46, ok: false },
  ];
  return (
    <svg viewBox="0 0 160 76" className="h-full w-auto" aria-hidden="true">
      <KitDefs id={id} />
      <g transform="translate(16 4)">
        <rect width={96} height={68} rx={6} fill={`url(#${id}-face)`} stroke="var(--color-line-2)" filter={`url(#${id}-lift)`} />
        <text x={8} y={11} className="font-mono" fontSize={9} fill="var(--color-ink-faint)">{"{"}</text>
        {rows.map((row) => (
          <g key={row.y}>
            <rect x={14} y={row.y - 2} width={row.w} height={3.5} rx={1.75} fill={row.ok ? "var(--color-line-3)" : "var(--svc-hue)"} opacity={row.ok ? 1 : 0.8} />
            <rect
              x={80}
              y={row.y - 3.5}
              width={7}
              height={7}
              fill={row.ok ? "var(--svc-hue)" : "var(--color-bg)"}
              stroke={row.ok ? "var(--svc-hue)" : "var(--color-line-3)"}
            />
          </g>
        ))}
      </g>
      <Tile id={id} x={116} y={22} size={32} icon={ShieldCheck} accent />
    </svg>
  );
}

const CAPABILITY_VECTORS = [GenerateVector, TriggerChainVector, IntegrationsVector, SchemaCheckVector];

/* -------------------------------------------------------------------- *
 * The AI story
 * -------------------------------------------------------------------- */

export const AI_CHAPTERS = getStoryChapters("ai", "How a workflow runs");

export function AiServiceStory({ service, next }: { service: ServiceItemType; next?: ServiceItemType }) {
  return (
    <ServiceStory
      service={service}
      next={next}
      chapters={AI_CHAPTERS}
      figure={<WorkflowIllustration />}
      vectors={CAPABILITY_VECTORS}
      close={["Repetitive work slowing the team?", "Let's automate it."]}
    />
  );
}
