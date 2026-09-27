"use client";

import React from "react";
import { AnimatePresence, motion, useTransform, type MotionValue } from "motion/react";
import { DURATIONS, EASINGS } from "@/lib/motion.config";
import { STAGES, ramp } from "./work-deck.timeline";
import { cn } from "@/lib/utils";
import type { ProjectDetailType } from "@/types";

/**
 * The showcase's label column: which project is at the front of the deck,
 * what it is, and how far through the deck the reader is — drawn as a line
 * filling in, like every other progress on the page.
 */
export function WorkAside({
  projects,
  activeIndex,
  progress,
  onSelect,
}: {
  projects: ProjectDetailType[];
  activeIndex: number;
  progress: MotionValue<number>;
  onSelect: (index: number) => void;
}) {
  const project = projects[activeIndex] ?? projects[0];
  const railProgress = useTransform(progress, ramp([STAGES.gatherEnd, STAGES.spreadStart], [0, 1]));

  return (
    <div className="flex w-full flex-col gap-6 pr-8 select-none">
      <div className="flex items-center">
        {/* Steps as squares — the position in the deck, and a way to jump. */}
        <span className="flex items-center gap-1.5">
          {projects.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`Show ${item.title}`}
              aria-current={index === activeIndex}
              className={cn(
                "h-2 cursor-pointer border transition-all duration-300",
                index === activeIndex
                  ? "bg-ink border-ink w-5"
                  : "border-line-3 hover:border-ink-faint w-2 bg-transparent"
              )}
            />
          ))}
        </span>
      </div>

      <div className="relative min-h-[172px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: DURATIONS.fast, ease: EASINGS.entrance }}
            className="absolute inset-0 flex flex-col gap-3"
          >
            <span className="text-ink-faint font-mono text-[11px] tracking-[0.04em]">
              {project.client} · {project.year}
            </span>
            <h3 className="text-ink text-[28px] leading-[1.1] font-medium tracking-[-0.035em]">
              {project.title}
            </h3>
            <p className="text-ink-muted max-w-[300px] text-[14px] leading-relaxed">
              {project.tagline}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <dl className="border-line divide-line max-w-[280px] divide-y border-y text-[12px]">
        {project.stats.map((stat) => (
          <div key={stat.label} className="flex justify-between py-2">
            <dt className="text-ink-muted">{stat.label}</dt>
            <dd className="text-ink font-mono tabular-nums">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex max-w-[280px] flex-col gap-2">
        <div className="bg-line-2 relative h-px w-full">
          <motion.div
            className="bg-ink absolute inset-y-0 left-0 w-full origin-left"
            style={{ scaleX: railProgress }}
          />
        </div>
        <span className="text-ink-faint font-mono text-[11px]">Scroll through the work</span>
      </div>
    </div>
  );
}
