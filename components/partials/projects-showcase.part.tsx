"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, type MotionValue, useTransform } from "motion/react";
import { projectsData } from "@/data/projects.data";
import { Icons } from "@/components/ui/social-icons.ui";
import { Container } from "@/components/shared/container.shared";
import { StickyCardStack } from "@/components/motion/sticky-card-stack.motion";
import { TextReveal } from "@/components/motion/text-reveal.motion";
import { Reveal } from "@/components/motion/reveal.motion";
import { Tilt3D } from "@/components/motion/tilt-3d.motion";
import { SharedElement } from "@/components/motion/page-transition.motion";
import { DURATIONS, EASINGS, swapVariants } from "@/lib/motion.config";
import type { ProjectDetailType } from "@/types";

const FEATURED = projectsData.slice(0, 4);

/* -------------------------------------------------------------------- *
 * 30% Pinned Meta Panel — Swaps content as the deck advances
 * -------------------------------------------------------------------- */

export type ShowcaseAsidePropsType = {
  activeIndex: number;
  progress: MotionValue<number>;
};

function ShowcaseAside({ activeIndex, progress }: ShowcaseAsidePropsType) {
  const project = FEATURED[activeIndex] ?? FEATURED[0];
  const railScale = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div className="flex w-full flex-col justify-center py-6 pr-6 lg:pr-8 select-none">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2.5">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
          <span className="text-[11px] font-mono font-medium uppercase tracking-[0.2em] text-slate-700">
            Selected work
          </span>
        </div>

        {/* Counter keyed on active index */}
        <div className="relative h-[32px] overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.id}
              variants={swapVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 flex items-center font-mono text-2xl font-semibold text-black"
            >
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="text-gray-40 mx-1.5 font-light">/</span>
              <span className="text-gray-50 text-lg">
                {String(FEATURED.length).padStart(2, "0")}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Project Title & Tagline with smooth morph */}
        <div className="relative min-h-[130px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
              transition={{ duration: DURATIONS.base, ease: EASINGS.entrance }}
              className="absolute inset-0 flex flex-col gap-2.5"
            >
              <div className="flex items-center gap-2">
                <h3 className="text-2xl lg:text-3xl font-semibold text-black tracking-tight">
                  {project.title}
                </h3>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-mono text-[11px] font-medium text-slate-700 border border-slate-300">
                  {project.category}
                </span>
              </div>
              <p className="text-sm lg:text-base text-slate-700 leading-relaxed max-w-[280px]">
                {project.tagline}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Key stats pill strip */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.stats.slice(0, 2).map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg bg-white/80 px-2.5 py-1 text-xs border border-slate-200 shadow-sm backdrop-blur-xs"
            >
              <span className="font-semibold text-black">{stat.value}</span>{" "}
              <span className="text-slate-600">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Progress rail */}
        <div className="flex flex-col gap-1.5 pt-2">
          <div className="h-1.5 w-full max-w-[200px] rounded-full bg-slate-200 overflow-hidden">
            <motion.div
              className="h-full origin-left bg-black rounded-full"
              style={{ scaleX: railScale }}
            />
          </div>
          <span className="font-mono text-[11px] font-medium text-slate-600">
            Scroll to explore
          </span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- *
 * 70% Project Showcase Card — Rich 3D, view transitions, and stats
 * -------------------------------------------------------------------- */

export type ShowcaseCardPropsType = {
  project: ProjectDetailType;
  index: number;
  isActive: boolean;
};

function ShowcaseCard({ project, index, isActive }: ShowcaseCardPropsType) {
  return (
    <div className="flex h-full w-full items-center justify-center p-2 lg:p-4">
      <Tilt3D intensity={5} lift={10} className="w-full max-w-[760px]">
        <Link
          href={`/projects/${project.slug}`}
          transitionTypes={["nav-forward"]}
          tabIndex={isActive ? 0 : -1}
          data-cursor="project"
          data-cursor-text="View case"
          className="group block w-full outline-none select-none"
        >
          <div className="rounded-[24px] border border-gray-30 bg-white p-4 card-shadow-3d transition-shadow duration-300 hover:card-shadow-hover">
            {/* The morph target for view transition */}
            <SharedElement name={`project-media-${project.slug}`}>
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-[18px] bg-gray-10">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 92vw, 760px"
                  priority={index === 0}
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="inline-flex scale-95 items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-black shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-100">
                    <span>View case study</span>
                    <Icons.ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </span>
              </div>
            </SharedElement>

            <div className="flex items-end justify-between gap-6 px-1.5 pb-1 pt-4">
              <div className="flex min-w-0 flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="truncate text-lg font-medium tracking-tight text-black transition-colors group-hover:text-gray-60">
                    {project.title}
                  </span>
                  <span className="font-mono text-xs text-gray-40">/</span>
                  <span className="truncate text-sm font-medium text-gray-60">
                    {project.typeOfWork}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  {project.stats.slice(0, 2).map((stat) => (
                    <span
                      key={stat.label}
                      className="font-mono text-xs text-gray-50"
                    >
                      <span className="font-semibold text-black">{stat.value}</span>{" "}
                      {stat.label}
                    </span>
                  ))}
                </div>
              </div>

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-30 text-black transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white">
                <Icons.ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
      </Tilt3D>
    </div>
  );
}

/* -------------------------------------------------------------------- *
 * Section Root
 * -------------------------------------------------------------------- */

export function ProjectsShowcasePart() {
  return (
    <section
      id="projects"
      className="relative w-full border-t border-gray-30"
    >
      <Container className="flex flex-col gap-6 pb-4 pt-16 md:pt-24">
        <div className="flex flex-col items-start justify-between gap-4 border-b border-gray-30 pb-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-label mb-1 block text-gray-50">
              Selected portfolio
            </span>
            <TextReveal
              as="h2"
              by="word"
              text="Latest projects"
              className="text-h2-sm text-black"
            />
          </div>
          <Reveal preset="fade" delay={0.2}>
            <span className="font-mono text-xs text-gray-50">
              {String(FEATURED.length).padStart(2, "0")} /{" "}
              {String(projectsData.length).padStart(2, "0")} cases
            </span>
          </Reveal>
        </div>
      </Container>

      {/* ── Connected 30% Sticky Aside / 70% Project Column Showcase ── */}
      <StickyCardStack
        items={FEATURED}
        scrollPerCard={0.6}
        aside={({ activeIndex, progress }) => (
          <ShowcaseAside activeIndex={activeIndex} progress={progress} />
        )}
      >
        {(project, { index, isActive }) => (
          <ShowcaseCard project={project} index={index} isActive={isActive} />
        )}
      </StickyCardStack>

      <Container className="flex justify-center pb-16 md:pb-24">
        <Reveal preset="fadeUp">
          <Link
            href="/projects"
            transitionTypes={["nav-forward"]}
            className="group relative inline-flex items-center gap-2 py-1 text-sm font-medium text-black"
          >
            <span>View all my projects</span>
            <Icons.ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
