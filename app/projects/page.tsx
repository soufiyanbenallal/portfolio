"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { projectsData } from "@/data/projects.data";
import { Section } from "@/components/shared/section.shared";
import { ChapterHead } from "@/components/shared/chapter.shared";
import { WorkCard } from "@/components/shared/work-card.shared";
import { PageTransition } from "@/components/motion/page-transition.motion";
import { DURATIONS, EASINGS, SPRINGS } from "@/lib/motion.config";
import { cn } from "@/lib/utils";
import type { ProjectCategoryType } from "@/types";

const CATEGORIES: ProjectCategoryType[] = ["All", "Shopify", "Design systems", "Tooling"];

/**
 * Work archive. Filtering is a layout animation, not a re-render: surviving
 * cards keep their identity and slide to their new place while removed ones
 * fade away — the reader sees the grid filtered, not replaced.
 */
export default function ProjectsIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategoryType>("All");

  const filteredProjects = useMemo(
    () =>
      selectedCategory === "All"
        ? projectsData
        : projectsData.filter((project) => project.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <PageTransition>
      <Section as="div" seam={false}>
        <ChapterHead
          as="h1"
          eyebrow="Work"
          title={["Built and published.", "Open any of it."]}
          lede={
            <>
              Everything here is public — packages on npm and GitHub, and tools running on this site —
              and each one links to the real thing. More code lives in the{" "}
              <Link href="/#github" className="text-ink underline underline-offset-4">
                GitHub section
              </Link>{" "}
              of the homepage.
            </>
          }
          action={
            <LayoutGroup id="project-filters">
              <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((category) => {
                  const isSelected = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      aria-pressed={isSelected}
                      className={cn(
                        "relative h-8 cursor-pointer rounded-full px-3 text-[13px] font-medium transition-colors",
                        isSelected ? "text-white" : "border-line-2 bg-surface text-ink-muted hover:text-ink border"
                      )}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="project-filter"
                          transition={SPRINGS.indicator}
                          className="bg-ink absolute inset-0 rounded-full"
                        />
                      )}
                      <span className="relative">{category}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          }
        />

        <motion.div
          layout
          className="dots border-line grid grid-cols-1 gap-6 border-t px-4 py-10 sm:px-10 md:grid-cols-2 lg:py-14"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: DURATIONS.base, delay: Math.min(index * 0.04, 0.2), ease: EASINGS.entrance }}
              >
                <WorkCard project={project} priority={index < 2} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>
    </PageTransition>
  );
}
