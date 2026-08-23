"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/components/ui/social-icons.ui";
import { Tilt3D } from "@/components/motion/tilt-3d.motion";
import { SharedElement } from "@/components/motion/page-transition.motion";
import { cn } from "@/lib/utils";
import type { ProjectItemType } from "@/types";

export type ProjectCardPartPropsType = {
  project: ProjectItemType;
  className?: string;
  priority?: boolean;
  /**
   * Only one card per page may claim a given view-transition name. Grids that
   * repeat a project already shown elsewhere on the page opt out.
   */
  withSharedElement?: boolean;
  /** Shallow tilt is right for dense grids; off for compact rails. */
  tilt?: boolean;
};

/**
 * The canonical project card.
 *
 * Used by the work archive and the related-projects rail. The thumbnail is a
 * view-transition participant, so opening a case study morphs this exact
 * image into the detail hero instead of replacing the page under the reader.
 */
export function ProjectCardPart({
  project,
  className,
  priority = false,
  withSharedElement = true,
  tilt = true,
}: ProjectCardPartPropsType) {
  const media = (
    <div className="relative aspect-4/3 w-full overflow-hidden rounded-[14px] bg-gray-10">
      <Image
        src={project.thumbnail}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, 500px"
        priority={priority}
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="inline-flex scale-95 items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-black shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-100">
          <span>View case study</span>
          <Icons.ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </span>
    </div>
  );

  const card = (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={["nav-forward"]}
      data-cursor="project"
      data-cursor-text="View case"
      className={cn("group block h-full w-full", className)}
    >
      <div className="h-full overflow-hidden rounded-[20px] border border-gray-30 bg-white p-3.5 card-shadow transition-shadow duration-300 hover:card-shadow-hover">
        {withSharedElement ? (
          <SharedElement name={`project-media-${project.slug}`}>{media}</SharedElement>
        ) : (
          media
        )}

        <div className="flex items-center justify-between gap-4 px-1 pb-1 pt-4">
          <div className="flex min-w-0 flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="truncate text-[15px] font-medium tracking-tight text-black transition-colors group-hover:text-gray-60">
                {project.title}
              </span>
              <span className="font-mono text-[11px] text-gray-40">/</span>
              <span className="truncate text-[12px] font-medium text-gray-60">
                {project.typeOfWork}
              </span>
            </div>
            <span className="line-clamp-1 text-[12px] text-gray-50">
              {project.tagline}
            </span>
          </div>

          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-30 text-black transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white">
            <Icons.ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );

  if (!tilt) return card;

  return (
    <Tilt3D intensity={6} lift={12} className="h-full">
      {card}
    </Tilt3D>
  );
}
