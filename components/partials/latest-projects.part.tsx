"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, LayoutGroup } from "motion/react";
import { projectsData } from "@/data/projects.data";
import { Icons } from "@/components/ui/social-icons.ui";
import { ProjectCardPart } from "@/components/partials/project-card.part";
import { useProjectScrollTransition } from "@/hooks/use-project-scroll-transition.hook";
import { Container } from "@/components/shared/container.shared";
import { EASINGS } from "@/lib/motion.config";

export function LatestProjectsPart() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuredProjects = projectsData.slice(0, 4);

  // Hook connecting 4 project cards to scroll progress with spring physics
  const { cards, isMobile } = useProjectScrollTransition({
    targetRef: sectionRef,
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full  bg-[#fafafa] border-t border-[#dedede] select-none overflow-visible"
    >
      <Container className="flex flex-col gap-10 md:gap-14 py-16 md:py-24 lg:py-32">

        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#dedede] pb-6">
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASINGS.standard }}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-[#828282] block mb-1">
              Selected Portfolio
            </span>
            <h2
              className="font-medium tracking-[-0.03em] text-black"
              style={{ fontSize: "clamp(24px,3vw,32px)", lineHeight: "1.15" }}
            >
              Latest Projects
            </h2>
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs font-mono text-[#828282]"
          >
            04 / {projectsData.length.toString().padStart(2, "0")} Cases
          </motion.span>
        </div>

        {/* ── 2-Column Project Grid with Scroll-Driven Shared-Element Transition ── */}
        <LayoutGroup id="latest-projects-group">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {featuredProjects.map((project, index) => {
              const motionTransform = isMobile ? undefined : cards[index];

              return (
                <div key={project.id} className="relative w-full">
                  <ProjectCardPart
                    project={project}
                    layoutId={`project-${project.id}`}
                    motionTransform={motionTransform}
                    isInteractive={true}
                    priority={index === 0}
                  />
                </div>
              );
            })}
          </div>
        </LayoutGroup>

        {/* ── View All Projects Link ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center pt-4"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-black group relative py-1"
          >
            <span>View all my projects</span>
            <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full" />
          </Link>
        </motion.div>

      </Container>
    </section>
  );
}
