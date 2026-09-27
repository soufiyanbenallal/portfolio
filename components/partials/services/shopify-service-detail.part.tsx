"use client";

import React from "react";
import { AppWindow, LayoutTemplate, ShoppingBag, Webhook } from "lucide-react";
import { KitDefs, Label, Node, Port, Tile, useSvgId } from "./service-kit.part";
import { ServiceStory, getStoryChapters } from "./service-story.part";
import type { ServiceItemType } from "@/types";

/* ==================================================================== *
 * SHOPIFY — detail
 * --------------------------------------------------------------------
 * Illustration: the store as a hub. One Shopify store branching out to
 * the three things built on it — an admin app, a theme, and webhook
 * integrations — along rounded connectors, with the app route lit and
 * an event travelling it.
 * ==================================================================== */

const HUB = { x: 24, y: 77, size: 96 };
const BRANCH = { x: 336, size: 60 };
const ROWS = [46, 125, 204] as const;

function ShopifyHubIllustration() {
  const id = useSvgId();
  const hubRight = HUB.x + HUB.size;
  const hubMidY = HUB.y + HUB.size / 2;

  // Horizontal, then a rounded S-bend — the reference's connector shape.
  const branch = (targetY: number) => {
    if (targetY === hubMidY) return `M ${hubRight} ${hubMidY} H ${BRANCH.x}`;
    const dir = targetY < hubMidY ? -1 : 1;
    return [
      `M ${hubRight} ${hubMidY}`,
      "H 206",
      `Q 226 ${hubMidY} 226 ${hubMidY + dir * 20}`,
      `V ${targetY - dir * 20}`,
      `Q 226 ${targetY} 246 ${targetY}`,
      `H ${BRANCH.x}`,
    ].join(" ");
  };

  return (
    <svg
      viewBox="0 0 600 250"
      preserveAspectRatio="xMinYMid meet"
      className="h-auto max-h-[min(230px,26vh)] w-full"
      role="img"
      aria-label="A Shopify store connected to an admin app, a theme and webhook integrations"
    >
      <KitDefs id={id} />

      {/* Connectors: the app route is live. */}
      <path d={branch(ROWS[1])} fill="none" stroke="var(--color-line-3)" strokeWidth={1.25} />
      <path d={branch(ROWS[2])} fill="none" stroke="var(--color-line-3)" strokeWidth={1.25} />
      <path d={branch(ROWS[0])} fill="none" stroke="var(--svc-hue)" strokeWidth={1.5} />

      {/* An event in flight on the live route. */}
      <circle cx={290} cy={ROWS[0]} r={9} fill="var(--svc-hue)" opacity={0.14} />
      <circle cx={290} cy={ROWS[0]} r={3} fill="var(--svc-hue)" />

      <Port x={hubRight + 4} y={hubMidY} accent />
      <Node x={226} y={hubMidY} />

      <Tile id={id} x={HUB.x} y={HUB.y} size={HUB.size} icon={ShoppingBag} accent />
      <text
        x={HUB.x + HUB.size / 2}
        y={HUB.y + HUB.size + 24}
        textAnchor="middle"
        className="font-mono"
        fontSize={10}
        letterSpacing="0.08em"
        fill="var(--color-ink-faint)"
      >
        STORE
      </text>

      <Tile id={id} x={BRANCH.x} y={ROWS[0] - 30} size={BRANCH.size} icon={AppWindow} lit />
      <Tile id={id} x={BRANCH.x} y={ROWS[1] - 30} size={BRANCH.size} icon={LayoutTemplate} />
      <Tile id={id} x={BRANCH.x} y={ROWS[2] - 30} size={BRANCH.size} icon={Webhook} />

      <Label x={BRANCH.x + BRANCH.size + 18} y={ROWS[0] - 2} title="Admin app" sub="Shopify API · Polaris" />
      <Label x={BRANCH.x + BRANCH.size + 18} y={ROWS[1] - 2} title="Theme" sub="Liquid · Online Store 2.0" />
      <Label x={BRANCH.x + BRANCH.size + 18} y={ROWS[2] - 2} title="Integrations" sub="Webhooks · third-party APIs" />
    </svg>
  );
}

/* -------------------------------------------------------------------- *
 * Capability vectors
 * -------------------------------------------------------------------- */

/** Custom apps: an admin app — nav rail, a settings card, a live toggle. */
function AdminAppVector() {
  const id = useSvgId();
  return (
    <svg viewBox="0 0 160 76" className="h-full w-auto" aria-hidden="true">
      <KitDefs id={id} />
      <g transform="translate(18 6)">
        <rect width={124} height={64} rx={7} fill={`url(#${id}-face)`} stroke="var(--color-line-2)" filter={`url(#${id}-lift)`} />
        <line x1={28} y1={0} x2={28} y2={64} stroke="var(--color-line)" />
        {[12, 22, 32, 42].map((y, index) => (
          <rect key={y} x={7} y={y} width={index === 1 ? 15 : 12} height={3.5} rx={1.75} fill={index === 1 ? "var(--svc-hue)" : "var(--color-line-3)"} />
        ))}
        <g transform="translate(38 10)">
          <rect width={78} height={44} rx={5} fill={`url(#${id}-face-hue)`} stroke={`url(#${id}-edge)`} />
          <rect x={8} y={9} width={30} height={4} rx={2} fill="var(--color-ink-2)" opacity={0.7} />
          <rect x={8} y={19} width={44} height={3} rx={1.5} fill="var(--color-line-3)" />
          <rect x={52} y={28} width={18} height={9} rx={4.5} fill="var(--svc-hue)" />
          <circle cx={65.5} cy={32.5} r={3} fill="var(--color-surface)" />
          <rect x={8} y={29} width={24} height={7} rx={2.5} fill="none" stroke="var(--color-line-3)" />
        </g>
      </g>
    </svg>
  );
}

/** Themes: an Online Store 2.0 page with one section lifted out to edit. */
function ThemeSectionsVector() {
  const id = useSvgId();
  return (
    <svg viewBox="0 0 160 76" className="h-full w-auto" aria-hidden="true">
      <KitDefs id={id} />
      <g transform="translate(16 4)">
        <rect width={62} height={68} rx={6} fill={`url(#${id}-face)`} stroke="var(--color-line-2)" filter={`url(#${id}-lift)`} />
        <rect x={6} y={7} width={50} height={16} rx={3} fill="var(--color-raised)" stroke="var(--color-line)" />
        {/* The empty slot the lifted section came from. */}
        <rect x={6} y={27} width={50} height={16} rx={3} fill="none" stroke="var(--svc-hue)" strokeOpacity={0.6} strokeDasharray="3 2" />
        {[6, 23, 40].map((x) => (
          <rect key={x} x={x} y={47} width={14} height={14} rx={2.5} fill="var(--color-raised)" stroke="var(--color-line)" />
        ))}
      </g>
      <path d="M 74 39 C 88 39, 90 30, 100 30" fill="none" stroke="var(--svc-hue)" strokeWidth={1.2} strokeDasharray="3 2" />
      <g transform="translate(98 20)">
        <rect width={52} height={20} rx={4} fill={`url(#${id}-face-hue)`} stroke={`url(#${id}-edge)`} filter={`url(#${id}-lift)`} />
        <rect x={7} y={6} width={22} height={3.5} rx={1.75} fill="var(--svc-hue)" />
        <rect x={7} y={12} width={34} height={3} rx={1.5} fill="var(--color-line-3)" />
      </g>
    </svg>
  );
}

/** Webhooks: the store's events fanning out to the topics a system listens to. */
function StoreEventsVector() {
  const id = useSvgId();
  const topics = [
    { y: 14, label: "ORDERS", live: true },
    { y: 38, label: "PRODUCTS", live: false },
    { y: 62, label: "CUSTOMERS", live: false },
  ];
  return (
    <svg viewBox="0 0 160 76" className="h-full w-auto" aria-hidden="true">
      <KitDefs id={id} />
      {topics.map((topic) => (
        <path
          key={topic.label}
          d={`M 50 38 H 60 Q 68 38 68 ${topic.y < 38 ? topic.y + 8 : topic.y > 38 ? topic.y - 8 : 38} V ${topic.y} H 88`}
          fill="none"
          stroke={topic.live ? "var(--svc-hue)" : "var(--color-line-3)"}
          strokeWidth={topic.live ? 1.4 : 1.1}
        />
      ))}
      <Tile id={id} x={10} y={18} size={40} icon={ShoppingBag} accent />
      {topics.map((topic) => (
        <g key={topic.label}>
          <Node x={90} y={topic.y} accent={topic.live} />
          <text x={98} y={topic.y + 2.5} className="font-mono" fontSize={7} letterSpacing="0.06em" fill={topic.live ? "var(--svc-deep)" : "var(--color-ink-faint)"}>
            {topic.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Merchant SaaS: plan columns, the middle one chosen. */
function PlansVector() {
  const id = useSvgId();
  const plans = [
    { x: 18, h: 54, live: false },
    { x: 62, h: 66, live: true },
    { x: 106, h: 54, live: false },
  ];
  return (
    <svg viewBox="0 0 160 76" className="h-full w-auto" aria-hidden="true">
      <KitDefs id={id} />
      {plans.map((plan) => (
        <g key={plan.x} transform={`translate(${plan.x} ${72 - plan.h})`}>
          <rect
            width={38}
            height={plan.h}
            rx={5}
            fill={`url(#${id}-${plan.live ? "face-hue" : "face"})`}
            stroke={plan.live ? `url(#${id}-edge)` : "var(--color-line-2)"}
            filter={`url(#${id}-lift)`}
          />
          <rect x={6} y={7} width={plan.live ? 20 : 14} height={4} rx={2} fill={plan.live ? "var(--svc-hue)" : "var(--color-ink-faint)"} opacity={plan.live ? 1 : 0.6} />
          {[18, 26, 34].map((y) => (
            <g key={y}>
              <rect x={6} y={y} width={3} height={3} fill={plan.live ? "var(--svc-hue)" : "var(--color-line-3)"} />
              <rect x={12} y={y} width={18} height={3} rx={1.5} fill="var(--color-line-2)" />
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

const CAPABILITY_VECTORS = [AdminAppVector, ThemeSectionsVector, StoreEventsVector, PlansVector];

/* -------------------------------------------------------------------- *
 * The Shopify story
 * -------------------------------------------------------------------- */

export const SHOPIFY_CHAPTERS = getStoryChapters("shopify", "How a store connects");

export function ShopifyServiceStory({ service, next }: { service: ServiceItemType; next?: ServiceItemType }) {
  return (
    <ServiceStory
      service={service}
      next={next}
      chapters={SHOPIFY_CHAPTERS}
      figure={<ShopifyHubIllustration />}
      vectors={CAPABILITY_VECTORS}
      close={["Running a Shopify store?", "Let's make it do more."]}
    />
  );
}
