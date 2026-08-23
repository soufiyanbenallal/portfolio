"use client";

import React from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { servicesData } from "@/data/services.data";
import { techStackData } from "@/data/tech-stack.data";
import { SectionDock } from "@/components/motion/section-dock.motion";
import { Icons } from "@/components/ui/social-icons.ui";
import type { ServiceItemType } from "@/types";

/* ==================================================================== *
 * SERVICES
 * --------------------------------------------------------------------
 * The section that folds itself away.
 *
 * It opens as a full-bleed black statement panel. As you scroll, that whole
 * panel scales down and wraps into a card docked on the left — so what you
 * are looking at is not a new element, it is the section you just read,
 * reduced to a thumbnail of itself. The service detail cards then run past
 * it one at a time, hinging in from the right.
 *
 * The card keeps the heading legible at 46% because the panel is composed
 * of a few very large elements. Anything at body size would be unreadable
 * once docked, which is why the crisp chrome — border, label, counter —
 * is drawn separately at 1:1 by `panelOverlay`.
 * ==================================================================== */

function ServicesPanel() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-black px-[6%] py-[8%] text-white">
      <div className="flex items-center justify-between">
        <span className="text-label text-white/45">What I do</span>
        <span className="font-mono text-[clamp(11px,0.9vw,13px)] text-white/45">
          {String(servicesData.length).padStart(2, "0")} services
        </span>
      </div>

      <h2
        className="max-w-[16ch] font-medium leading-[1.02] tracking-[-0.03em]"
        style={{ fontSize: "clamp(34px, 6.4vw, 92px)" }}
      >
        Services that{" "}
        <em className="not-italic text-white/35">supercharge</em> your business.
      </h2>

      <div className="flex flex-wrap items-center gap-[0.6vw]">
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

/** Crisp chrome over the docked card. Adds the frame, never duplicates copy. */
function ServicesPanelOverlay({
  dockProgress,
}: {
  dockProgress: MotionValue<number>;
}) {
  const opacity = useTransform(dockProgress, [0.55, 1], [0, 1]);

  return (
    <motion.div
      className="relative h-full w-full rounded-[24px] ring-1 ring-inset ring-white/15"
      style={{ opacity }}
    >
      <span className="absolute -top-7 left-0 text-label text-gray-50">
        The offer
      </span>
      <span className="absolute -bottom-7 right-0 font-mono text-[11px] text-gray-50">
        Scroll to browse
      </span>
    </motion.div>
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
    <article className="w-full rounded-[24px] border border-gray-30 bg-white p-8 card-shadow-3d lg:p-10">
      <div className="flex items-start justify-between gap-6 border-b border-gray-20 pb-6">
        <span className="font-mono text-sm text-gray-40">
          {String(index + 1).padStart(2, "0")}
          <span className="text-gray-30">/{String(total).padStart(2, "0")}</span>
        </span>
        {service.isPrimary && (
          <span className="rounded-full bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
            Core
          </span>
        )}
      </div>

      <h3 className="pt-6 text-h3-lg text-black">{service.title}</h3>
      <p className="pt-3 text-body-l text-gray-60">{service.description}</p>

      <ul className="flex flex-col gap-3 pt-7">
        {service.deliverables.map((deliverable) => (
          <li
            key={deliverable}
            className="flex items-center gap-3 text-body-m text-black"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-30">
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
    <div className="relative w-full border-t border-gray-30 bg-gray-5 px-3 md:px-0">
      <SectionDock
        id="services"
        items={servicesData}
        scrollPerItem={0.72}
        panel={<ServicesPanel />}
        panelOverlay={({ dockProgress }) => (
          <ServicesPanelOverlay dockProgress={dockProgress} />
        )}
        renderItem={(service, { index }) => (
          <ServiceDetailCard
            service={service}
            index={index}
            total={servicesData.length}
          />
        )}
      />
    </div>
  );
}
