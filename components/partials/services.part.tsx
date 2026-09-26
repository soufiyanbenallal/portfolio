"use client";

import React from "react";
import { Layout, Rocket, Compass, Play, Box, Palette, type LucideIcon } from "lucide-react";
import { servicesData } from "@/data/services.data";
import { techStackData } from "@/data/tech-stack.data";
import {
  ServiceStack,
  type ServiceStackItemStateType,
} from "@/components/motion/service-stack.motion";
import { Icons } from "@/components/ui/social-icons.ui";
import type { ServiceItemType } from "@/types";

/* ==================================================================== *
 * SERVICES
 * --------------------------------------------------------------------
 * The section that folds itself away, then deals its cards.
 *
 * Act 1: it opens as a full-bleed black statement panel. As you scroll,
 * that whole panel docks into a card on the left — the section you just
 * read, reduced to a thumbnail of itself.
 *
 * Act 2: the service cards advance through a real 3D deck stacked behind
 * the docked panel — each one rising into the active slot, holding, then
 * peeling forward and away as the next rises to take its place, with a
 * few upcoming cards visible receding in the queue. One GSAP timeline,
 * scrubbed by scroll position, owns both acts so they never drift apart.
 * ==================================================================== */

const SERVICE_ICONS: Record<string, LucideIcon | undefined> = {
  layout: Layout,
  rocket: Rocket,
  compass: Compass,
  play: Play,
  box: Box,
  palette: Palette,
};

function ServiceIcon({ iconName, className }: { iconName: string; className?: string }) {
  const LucideMark = SERVICE_ICONS[iconName];
  if (LucideMark) return <LucideMark className={className} strokeWidth={1.6} />;
  if (iconName === "framer") return <Icons.Framer className={className} />;
  return null;
}

function ServicesPanel() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-black px-[6%] py-[8%] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/3 -right-1/4 h-[120%] w-[60%] rounded-full bg-white/[0.06] blur-3xl"
      />

      <div className="relative flex items-center justify-between">
        <span className="text-label text-white/45">What I do</span>
        <span className="font-mono text-[clamp(11px,0.9vw,13px)] text-white/45">
          {String(servicesData.length).padStart(2, "0")} services
        </span>
      </div>

      <h2
        className="relative max-w-[16ch] leading-[1.02] font-medium tracking-[-0.03em]"
        style={{ fontSize: "clamp(34px, 6.4vw, 92px)" }}
      >
        Services that <em className="text-white/35 not-italic">supercharge</em> your business.
      </h2>

      <div className="relative flex flex-wrap items-center gap-[0.6vw]">
        {techStackData.map((tool) => (
          <span
            key={tool.id}
            className="rounded-full border border-white/15 px-[1.2vw] py-[0.5vw] text-[clamp(10px,1.05vw,15px)] font-medium text-white/70"
          >
            {tool.name}
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- *
 * Detail card
 * -------------------------------------------------------------------- */

type ServiceDetailCardPropsType = {
  service: ServiceItemType;
  index: number;
  total: number;
};

function ServiceDetailCard({ service, index, total }: ServiceDetailCardPropsType) {
  return (
    <article className="border-gray-30 card-shadow-3d rounded-panel w-full border bg-white p-8 lg:p-10">
      <div className="border-gray-20 flex items-start justify-between gap-6 border-b pb-6">
        <span className="border-gray-20 bg-gray-5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-black">
          <ServiceIcon iconName={service.iconName} className="h-4.5 w-4.5" />
        </span>
        <div className="flex flex-col items-end gap-2">
          {service.isPrimary && (
            <span className="rounded-full bg-black px-3 py-1 text-[10px] font-semibold tracking-widest text-white uppercase">
              Core
            </span>
          )}
          <span className="text-gray-40 font-mono text-sm">
            {String(index + 1).padStart(2, "0")}
            <span className="text-gray-30">/{String(total).padStart(2, "0")}</span>
          </span>
        </div>
      </div>

      <h3 className="text-h3-lg pt-6 text-black">{service.title}</h3>
      <p className="text-body-l text-gray-60 pt-3">{service.description}</p>

      <ul className="flex flex-col gap-3 pt-7">
        {service.deliverables.map((deliverable) => (
          <li key={deliverable} className="text-body-m flex items-center gap-3 text-black">
            <span className="border-gray-30 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
              <Icons.Check className="h-3 w-3" />
            </span>
            {deliverable}
          </li>
        ))}
      </ul>
    </article>
  );
}

/* -------------------------------------------------------------------- *
 * Section
 * -------------------------------------------------------------------- */

export function ServicesPart() {
  return (
    <div className="relative z-10 w-full border-t bg-white px-3 md:px-0">
      <ServiceStack
        id="services"
        items={servicesData}
        scrollPerItem={0.85}

        panel={<ServicesPanel />}
        renderItem={(service: ServiceItemType, { index }: ServiceStackItemStateType) => (
          <ServiceDetailCard service={service} index={index} total={servicesData.length} />
        )}
      />
      <ServiceStack
        id="services"
        items={servicesData}
        scrollPerItem={0.85}
        panel={<ServicesPanel />}
        renderItem={(service: ServiceItemType, { index }: ServiceStackItemStateType) => (
          <ServiceDetailCard service={service} index={index} total={servicesData.length} />
        )}
      />
      <ServiceStack
        id="services"
        items={servicesData}
        scrollPerItem={0.85}
        panel={<ServicesPanel />}
        renderItem={(service: ServiceItemType, { index }: ServiceStackItemStateType) => (
          <ServiceDetailCard service={service} index={index} total={servicesData.length} />
        )}
      />
    </div>
  );
}
