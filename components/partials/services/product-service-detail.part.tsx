"use client";

import React from "react";
import { Database, Monitor, Plug, Server, Webhook } from "lucide-react";
import { KitDefs, Label, Node, Port, Tile, useSvgId } from "./service-kit.part";
import { ServiceStory, getStoryChapters } from "./service-story.part";
import type { ServiceItemType } from "@/types";

/* ==================================================================== *
 * PRODUCT — detail
 * --------------------------------------------------------------------
 * Illustration: the request path. Interface → API → data, left to right,
 * with integrations feeding the API from above and a dashed CI/CD loop
 * running underneath — the part of the system nobody sees but everything
 * depends on.
 * ==================================================================== */

const TILE = 64;
const MID_Y = 106;
const COLUMNS = [72, 300, 528] as const;

function ArchitectureIllustration() {
  const id = useSvgId();
  const top = MID_Y - TILE / 2;
  const [ui, api, data] = COLUMNS;

  return (
    <svg
      viewBox="0 0 600 236"
      preserveAspectRatio="xMinYMid meet"
      className="h-auto max-h-[min(230px,26vh)] w-full"
      role="img"
      aria-label="Request path from a React interface through a Node.js or Laravel API to a MySQL or Supabase database, with integrations and a CI/CD loop"
    >
      <KitDefs id={id} />

      {/* Request path: the first hop is live. */}
      <path
        d={`M ${ui + TILE / 2 + 4} ${MID_Y} H ${api - TILE / 2 - 6}`}
        stroke="var(--svc-hue)"
        strokeWidth={1.5}
        markerEnd={`url(#${id}-arrow-hue)`}
      />
      <path
        d={`M ${api + TILE / 2 + 4} ${MID_Y} H ${data - TILE / 2 - 6}`}
        stroke="var(--color-line-3)"
        strokeWidth={1.25}
        markerEnd={`url(#${id}-arrow)`}
      />
      <Port x={ui + TILE / 2 + 4} y={MID_Y} accent />
      <Port x={api + TILE / 2 + 4} y={MID_Y} />

      {/* Integrations feed the API from above. */}
      <path
        d={`M ${api} 46 V ${top - 6}`}
        stroke="var(--color-line-3)"
        strokeWidth={1.25}
        strokeDasharray="3 3"
        markerEnd={`url(#${id}-arrow)`}
      />
      <Tile id={id} x={api - 20} y={6} size={40} icon={Plug} />
      <Label x={api + 34} y={22} title="Integrations" sub="REST · Webhooks" />

      <Tile id={id} x={ui - TILE / 2} y={top} size={TILE} icon={Monitor} accent />
      <Tile id={id} x={api - TILE / 2} y={top} size={TILE} icon={Server} lit />
      <Tile id={id} x={data - TILE / 2} y={top} size={TILE} icon={Database} />

      <Label x={ui} y={top + TILE + 24} title="Interface" sub="React · TypeScript" anchor="middle" />
      <Label x={api} y={top + TILE + 24} title="API" sub="Node.js · Laravel" anchor="middle" />
      <Label x={data} y={top + TILE + 24} title="Data" sub="MySQL · Supabase" anchor="middle" />

      {/* CI/CD: the loop underneath everything. */}
      <path
        d={`M ${data} 190 V 206 Q ${data} 220 ${data - 14} 220 H ${ui + 14} Q ${ui} 220 ${ui} 206 V 194`}
        fill="none"
        stroke="var(--color-line-3)"
        strokeWidth={1.25}
        strokeDasharray="4 4"
        markerEnd={`url(#${id}-arrow)`}
      />
      <rect x={api - 70} y={212} width={140} height={16} fill="var(--color-bg)" />
      <text
        x={api}
        y={224}
        textAnchor="middle"
        className="font-mono"
        fontSize={9}
        letterSpacing="0.08em"
        fill="var(--color-ink-faint)"
      >
        CI/CD · REVIEW · DEPLOY
      </text>
    </svg>
  );
}

/* -------------------------------------------------------------------- *
 * Capability vectors — one small drawing per thing I build
 * -------------------------------------------------------------------- */

/** SaaS: the same product, three tenants — the front one is live. */
function TenantsVector() {
  const id = useSvgId();
  const windows = [
    { x: 18, y: 22, live: false },
    { x: 38, y: 13, live: false },
    { x: 58, y: 4, live: true },
  ];
  return (
    <svg viewBox="0 0 160 76" className="h-full w-auto" aria-hidden="true">
      <KitDefs id={id} />
      {windows.map((w) => (
        <g key={w.x} transform={`translate(${w.x} ${w.y})`}>
          <rect
            width={84}
            height={52}
            rx={6}
            fill={`url(#${id}-${w.live ? "face-hue" : "face"})`}
            stroke={w.live ? `url(#${id}-edge)` : "var(--color-line-2)"}
            filter={`url(#${id}-lift)`}
          />
          <line x1={0} y1={12} x2={84} y2={12} stroke="var(--color-line)" />
          {[6, 11, 16].map((cx) => (
            <rect key={cx} x={cx - 1.5} y={4.5} width={3} height={3} fill="var(--color-line-3)" />
          ))}
          {w.live && (
            <>
              <rect x={8} y={20} width={34} height={5} rx={2} fill="var(--svc-hue)" opacity={0.7} />
              <rect x={8} y={30} width={56} height={4} rx={2} fill="var(--color-line-2)" />
              <rect x={8} y={38} width={44} height={4} rx={2} fill="var(--color-line-2)" />
            </>
          )}
        </g>
      ))}
    </svg>
  );
}

/** Interfaces: a component tree, one branch rendering. */
function ComponentTreeVector() {
  const id = useSvgId();
  const children = [12, 38, 64];
  return (
    <svg viewBox="0 0 160 76" className="h-full w-auto" aria-hidden="true">
      <KitDefs id={id} />
      {children.map((y, index) => (
        <path
          key={y}
          d={`M 36 38 H 52 Q 60 38 60 ${y < 38 ? y + 8 : y > 38 ? y - 8 : 38} V ${y} H 74`}
          fill="none"
          stroke={index === 1 ? "var(--svc-hue)" : "var(--color-line-3)"}
          strokeWidth={index === 1 ? 1.4 : 1.1}
        />
      ))}
      <rect x={10} y={26} width={26} height={24} rx={5} fill={`url(#${id}-face-hue)`} stroke={`url(#${id}-edge)`} />
      <path d="M 18 34 L 23 38 L 18 42 M 25 42 H 29" stroke="var(--svc-hue)" strokeWidth={1.3} fill="none" />
      {children.map((y, index) => (
        <g key={y} transform={`translate(74 ${y - 8})`}>
          <rect
            width={60}
            height={16}
            rx={4}
            fill={index === 1 ? `url(#${id}-face-hue)` : `url(#${id}-face)`}
            stroke={index === 1 ? `url(#${id}-edge)` : "var(--color-line-2)"}
          />
          <rect x={6} y={6} width={index === 1 ? 30 : 22} height={4} rx={2} fill={index === 1 ? "var(--svc-hue)" : "var(--color-line-3)"} opacity={index === 1 ? 0.8 : 1} />
        </g>
      ))}
      <Node x={60} y={38} accent />
    </svg>
  );
}

/** Services: a request travelling from a service to an integration. */
function ServicesVector() {
  const id = useSvgId();
  return (
    <svg viewBox="0 0 160 76" className="h-full w-auto" aria-hidden="true">
      <KitDefs id={id} />
      <path d="M 58 38 H 100" stroke="var(--svc-hue)" strokeWidth={1.4} markerEnd={`url(#${id}-arrow-hue)`} />
      <path d="M 100 48 H 58" stroke="var(--color-line-3)" strokeWidth={1.1} strokeDasharray="3 3" markerEnd={`url(#${id}-arrow)`} />
      <Port x={60} y={38} accent />
      <text x={79} y={31} textAnchor="middle" className="font-mono" fontSize={7} letterSpacing="0.08em" fill="var(--svc-deep)">
        POST
      </text>
      <Tile id={id} x={14} y={18} size={40} icon={Server} accent />
      <Tile id={id} x={106} y={18} size={40} icon={Webhook} lit />
    </svg>
  );
}

/** Architecture: a system graph with the critical path traced. */
function ArchitectureVector() {
  const nodes = {
    a: [16, 38],
    b: [58, 14],
    c: [58, 62],
    d: [100, 38],
    e: [144, 22],
    f: [144, 56],
  } as const;
  const edges: Array<[keyof typeof nodes, keyof typeof nodes, boolean]> = [
    ["a", "b", true],
    ["a", "c", false],
    ["b", "d", true],
    ["c", "d", false],
    ["d", "e", true],
    ["d", "f", false],
  ];
  const path = new Set(["a", "b", "d", "e"]);
  return (
    <svg viewBox="0 0 160 76" className="h-full w-auto" aria-hidden="true">
      {edges.map(([from, to, live]) => (
        <line
          key={`${from}${to}`}
          x1={nodes[from][0]}
          y1={nodes[from][1]}
          x2={nodes[to][0]}
          y2={nodes[to][1]}
          stroke={live ? "var(--svc-hue)" : "var(--color-line-3)"}
          strokeWidth={live ? 1.4 : 1}
          strokeDasharray={live ? undefined : "3 3"}
        />
      ))}
      {Object.entries(nodes).map(([key, [x, y]]) => (
        <rect
          key={key}
          x={x - 4}
          y={y - 4}
          width={8}
          height={8}
          fill={path.has(key) ? "var(--svc-hue)" : "var(--color-bg)"}
          stroke={path.has(key) ? "var(--svc-hue)" : "var(--color-line-3)"}
        />
      ))}
    </svg>
  );
}

const CAPABILITY_VECTORS = [TenantsVector, ComponentTreeVector, ServicesVector, ArchitectureVector];

/* -------------------------------------------------------------------- *
 * The product story
 * -------------------------------------------------------------------- */

export const PRODUCT_CHAPTERS = getStoryChapters("product", "How the layers connect");

export function ProductServiceStory({ service, next }: { service: ServiceItemType; next?: ServiceItemType }) {
  return (
    <ServiceStory
      service={service}
      next={next}
      chapters={PRODUCT_CHAPTERS}
      figure={<ArchitectureIllustration />}
      vectors={CAPABILITY_VECTORS}
      close={["Have a product to build?", "Let's map it out."]}
    />
  );
}
