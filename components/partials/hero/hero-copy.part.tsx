"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { AvailabilityBadgeUi } from "@/components/ui/badge.ui";
import { TextReveal } from "@/components/motion/text-reveal.motion";
import { Magnetic } from "@/components/motion/magnetic.motion";
import { CAL_LINK } from "@/components/shared/cal-embed.shared";
import { DURATIONS, EASINGS } from "@/lib/motion.config";
import { ChevronsDownIcon } from "lucide-react";

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DURATIONS.slow, delay, ease: EASINGS.entrance },
});

/**
 * The opening statement. Two-tone headline (claim in ink, the consequence
 * in faint), one sentence of who and how taken from the resume, then the
 * two actions — book a call, or scroll into the work.
 */
export function HeroCopy() {
  return (
    <div className="flex max-w-[560px] flex-col gap-6">
      <motion.div {...enter(0.05)}>
        <AvailabilityBadgeUi text="Available for new projects" />
      </motion.div>

      <h1 className="text-h1 text-ink" style={{ fontSize: "clamp(44px, 5.2vw, 72px)" }}>
        <TextReveal
          as="span"
          by="word"
          text="I build the software"
          trigger="mount"
          delay={0.12}
          className="block"
        />
        <TextReveal
          as="span"
          by="word"
          text="businesses run on."
          trigger="mount"
          delay={0.28}
          className="text-ink-soft block"
        />
      </h1>

      <motion.p
        {...enter(0.5)}
        className="text-ink-muted max-w-[480px] text-[17px] leading-relaxed"
      >
        <span className="text-ink font-medium">
          Senior full-stack developer and technical lead.
        </span>{" "}
        Shopify apps and themes, SaaS products and AI features — built with React, TypeScript,
        Node.js and Laravel.
      </motion.p>

      <motion.div {...enter(0.62)} className="flex flex-wrap items-center gap-2 pt-1">
        <Magnetic strength={0.4} innerStrength={0.25}>
          <button
            type="button"
            data-cal-link={CAL_LINK}
            data-cal-config='{"layout":"month_view"}'
            data-cursor="grow"
            className="group btn-primary inline-flex h-11 cursor-pointer items-center py-2 pr-4 pl-2 text-sm font-medium"
          >
            <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20">
              <Image
                src="/images/profile.jpeg"
                alt=""
                fill
                sizes="28px"
                className="object-cover"
                loading="eager"
              />
            </span>
            <span className="w-0 text-center text-xs leading-none text-white/70 opacity-0 transition-all duration-300 group-hover:w-6 group-hover:opacity-100">
              +
            </span>
            <span className="flex h-7 w-0 shrink-0 -translate-x-7 scale-0 items-center justify-center rounded-full bg-white text-[10px] font-bold tracking-tight text-black transition-all duration-300 group-hover:w-7 group-hover:translate-x-0 group-hover:scale-100">
              You
            </span>
            <span className="pl-3 whitespace-nowrap">Book a call with me</span>
          </button>
        </Magnetic>

        <a
          href="#projects"
          className="btn-secondary inline-flex h-11 items-center gap-2 px-4 text-sm font-medium"
        >
          See the work
          <ChevronsDownIcon aria-hidden="true" className="size-3.5" />
        </a>
      </motion.div>

      <motion.p {...enter(0.74)} className="text-ink-faint font-mono text-[11px] tracking-[0.03em]">
        Full Stack Developer at Ader Solutions · Meknes, Morocco
      </motion.p>
    </div>
  );
}
