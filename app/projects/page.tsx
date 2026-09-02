"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { projectsData } from "@/data/projects.data";
import { Container } from "@/components/shared/container.shared";
import { ProjectCardPart } from "@/components/partials/project-card.part";
import { TextReveal } from "@/components/motion/text-reveal.motion";
import { Reveal } from "@/components/motion/reveal.motion";
import { PageTransition } from "@/components/motion/page-transition.motion";
import { SPRINGS, DURATIONS, EASINGS } from "@/lib/motion.config";
import type { ProjectCategoryType } from "@/types";

const CATEGORIES: ProjectCategoryType[] = ["All", "Design", "Development", "Branding"];

/**
 * Work archive.
 *
 * Filtering is a layout animation, not a re-render: surviving cards keep
 * their identity and slide to their new grid position while removed ones
 * scale away. That continuity is what tells the reader the grid was filtered
 * rather than replaced.
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
      <div className="w-full">
        <Container className="flex flex-col gap-12 pt-32 pb-24">
          <div className="border-gray-30 flex flex-col justify-between gap-6 border-b pb-8 md:flex-row md:items-end">
            <div>
              <span className="text-label mb-2 block text-gray-50">Work archive</span>
              <TextReveal
                as="h1"
                by="word"
                text="My most recent work."
                trigger="mount"
                className="text-4xl font-medium tracking-tight text-black sm:text-5xl md:text-6xl"
              />
              <p className="mt-3 max-w-lg text-sm text-gray-50">
                Self-directed concept builds exploring product, brand, and engineering problems —
                not paid client engagements. For real shipping work, see the{" "}
                <Link href="/#github" className="text-black underline underline-offset-4">
                  GitHub projects
                </Link>{" "}
                section on the homepage.
              </p>
            </div>

            <LayoutGroup id="project-filters">
              <div
                role="group"
                aria-label="Filter projects by category"
                className="flex flex-wrap items-center gap-2"
              >
                {CATEGORIES.map((category) => {
                  const isSelected = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      aria-pressed={isSelected}
                      className={`relative cursor-pointer rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                        isSelected
                          ? "text-white"
                          : "border-gray-30 text-gray-60 hover:bg-gray-10 border bg-white hover:text-black"
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="project-filter-pill"
                          transition={SPRINGS.indicator}
                          className="absolute inset-0 rounded-full bg-black"
                        />
                      )}
                      <span className="relative">{category}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>

          <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 28, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
                  transition={{
                    duration: DURATIONS.base,
                    delay: Math.min(index * 0.04, 0.24),
                    ease: EASINGS.entrance,
                  }}
                >
                  <ProjectCardPart project={project} priority={index < 2} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <Reveal preset="fadeUp">
              <p className="text-body-l py-16 text-center text-gray-50">
                No projects in this category yet.
              </p>
            </Reveal>
          )}
        </Container>
      </div>
    </PageTransition>
  );
}
