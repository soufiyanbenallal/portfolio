"use client";

import React from "react";
import { ArrowLink } from "@/components/ui/arrow-link.ui";
import { HeroCopy } from "./hero-copy.part";
import { WorkCard } from "@/components/shared/work-card.shared";
import type { ProjectDetailType } from "@/types";

/**
 * Small screens and reduced motion: the same statement, then the work as a
 * plain list — no pinned rig, nothing to scrub through.
 */
export function HeroMobile({ projects }: { projects: ProjectDetailType[] }) {
  return (
    <div className="w-full">
      <section id="hero" className="px-4 pt-[calc(var(--nav-clear)+1rem)] pb-14 sm:px-10">
        <HeroCopy />
      </section>

      <section id="projects" aria-labelledby="work-title" className="border-line-2 border-t">
        <div className="flex items-end justify-between gap-4 px-4 pt-10 pb-6 sm:px-10">
          <div className="flex flex-col gap-2">
            <span className="text-label text-ink-faint">Selected work</span>
            <h2 id="work-title" className="text-h2-sm text-ink">
              Built and published. <span className="text-ink-soft">Open any of it.</span>
            </h2>
          </div>
        </div>
        <div className="dots grid grid-cols-1 gap-6 px-4 pb-12 sm:grid-cols-2 sm:px-10">
          {projects.map((project, index) => (
            <WorkCard key={project.id} project={project} priority={index === 0} />
          ))}
        </div>
        <div className="border-line border-t px-4 py-5 sm:px-10">
          <ArrowLink href="/projects">All projects</ArrowLink>
        </div>
      </section>
    </div>
  );
}
