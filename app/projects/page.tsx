"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { projectsData } from "@/data/projects.data";
import { Icons } from "@/components/ui/social-icons.ui";
import { Container } from "@/components/shared/container.shared";
import type { ProjectCategoryType } from "@/types";

const categories: ProjectCategoryType[] = ["All", "Design", "Development", "Branding"];

export default function ProjectsIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategoryType>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full pt-32 pb-24">
      <Container className="flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-30 pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-gray-50 block mb-2">
              Work Archive
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-black">
              My most recent work.
            </h1>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-black text-white"
                    : "bg-white border border-gray-30 text-gray-60 hover:bg-gray-10 hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="group"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="block rounded-[20px] bg-white border border-gray-30 p-4 card-shadow hover:card-shadow-hover transition-all duration-300 overflow-hidden"
                >
                  <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-gray-10">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-mono font-medium text-black">
                      {project.year}
                    </div>
                  </div>

                  <div className="pt-4 pb-1 px-1 flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-lg font-medium text-black tracking-tight group-hover:text-gray-60 transition-colors">
                          {project.title}
                        </span>
                        <span className="text-xs text-gray-40 font-mono">/</span>
                        <span className="text-xs text-gray-50 font-medium">
                          {project.typeOfWork}
                        </span>
                      </div>
                      <span className="text-xs text-gray-50 line-clamp-1">
                        {project.tagline}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full border border-gray-30 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white group-hover:border-black transition-all shrink-0">
                      <Icons.ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </div>
  );
}
