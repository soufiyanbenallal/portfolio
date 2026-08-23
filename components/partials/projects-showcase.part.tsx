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
import { SharedElement } from "@/components/motion/page-transition.motion";
import { DURATIONS, EASINGS, swapVariants } from "@/lib/motion.config";
import type { ProjectDetailType } from "@/types";

const FEATURED = projectsData.slice(0, 4);

/* -------------------------------------------------------------------- *
 * Pinned meta panel — swaps content as the deck advances
 * -------------------------------------------------------------------- */

type ShowcaseAsidePropsType = {
  activeIndex: number;
  progress: MotionValue<number>;
};

function ShowcaseAside({ activeIndex, progress }: ShowcaseAsidePropsType) {
  const project = FEATURED[activeIndex];
  const railScale = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div className="pointer-events-none absolute left-0 top-1/2 z-40 hidden w-[32%] -translate-y-1/2 pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:block">
      <div className="flex flex-col gap-6">
        <span className="text-label text-gray-50">Selected work</span>

        {/* Counter and copy are keyed on the active index, so each advance
            plays a real exit/enter pair rather than mutating text in place. */}
        <div className="relative h-[26px] overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={project.id}
              variants={swapVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 font-mono text-lg text-black"
            >
              {String(activeIndex + 1).padStart(2, "0")}
              <span className="text-gray-40">
                {" / "}
                {String(FEATURED.length).padStart(2, "0")}
              </span>
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="relative h-[132px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
              transition={{ duration: DURATIONS.base, ease: EASINGS.entrance }}
              className="absolute inset-0 flex flex-col gap-3"
            >
              <h3 className="text-h3-lg text-black">{project.title}</h3>
              <p className="max-w-[280px] text-body-m text-gray-60">
                {project.tagline}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress rail — the only continuous element in the panel, so the
            reader can tell how much of the deck is left. */}
        <div className="h-px w-[70%] max-w-[220px] bg-gray-30">
          <motion.div
            className="h-full origin-left bg-black"
            style={{ scaleX: railScale }}
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- *
 * The card itself
 * -------------------------------------------------------------------- */

type ShowcaseCardPropsType = {
  project: ProjectDetailType;
  index: number;
  isActive: boolean;
};

function ShowcaseCard({ project, index, isActive }: ShowcaseCardPropsType) {
  return (
    <div className="flex w-full justify-center px-4 lg:justify-end lg:pr-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]">
      <Link
        href={`/projects/${project.slug}`}
        transitionTypes={["nav-forward"]}
        tabIndex={isActive ? 0 : -1}
        data-cursor="project"
        data-cursor-text="View case"
        className="group block w-full max-w-[560px] lg:max-w-[600px]"
      >
        <div className="rounded-[24px] border border-gray-30 bg-white p-3.5 card-shadow-3d">
          {/* The morph target. The same name on the detail page's hero makes
              the browser animate one image between routes. */}
          <SharedElement name={`project-media-${project.slug}`}>
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-[16px] bg-gray-10">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 92vw, 600px"
                priority={index === 0}
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
          </SharedElement>

          <div className="flex items-end justify-between gap-6 px-1 pb-1 pt-4">
            <div className="flex min-w-0 flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-[17px] font-medium tracking-tight text-black">
                  {project.title}
                </span>
                <span className="font-mono text-[11px] text-gray-40">/</span>
                <span className="truncate text-[13px] font-medium text-gray-60">
                  {project.typeOfWork}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                {project.stats.slice(0, 2).map((stat) => (
                  <span
                    key={stat.label}
                    className="font-mono text-[11px] text-gray-50"
                  >
                    <span className="text-black">{stat.value}</span> {stat.label}
                  </span>
                ))}
              </div>
            </div>

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-30 text-black transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white">
              <Icons.ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

/* -------------------------------------------------------------------- *
 * Section
 * -------------------------------------------------------------------- */

export function ProjectsShowcasePart() {
  return (
    <section
      id="projects"
      className="relative w-full border-t border-gray-30 bg-gray-5"
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

      {/* The rig. Every card is a page of the same deck: the incoming card
          rises while the outgoing one falls back in Z behind it. */}
      <StickyCardStack
        items={FEATURED}
        scrollPerCard={0.52}
        className="lg:-mt-8"
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
