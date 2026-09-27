"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SharedElement } from "@/components/motion/page-transition.motion";
import { Icons } from "@/components/ui/social-icons.ui";
import { cn } from "@/lib/utils";
import type { ProjectDetailType } from "@/types";

/**
 * A project as a window: the rendered cover, and a footer strip split from
 * it by a hairline. The one object in the Line Grid allowed a real shadow —
 * it floats over a canvas. No glare, no tilt, no blur: depth comes from the
 * deck's own transforms.
 */
export function WorkCard({
  project,
  focusable = true,
  priority = false,
  className,
}: {
  project: ProjectDetailType;
  focusable?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      transitionTypes={["nav-forward"]}
      tabIndex={focusable ? 0 : -1}
      data-cursor="project"
      data-cursor-text="View project"
      className={cn("group block w-full rounded-card outline-none", className)}
    >
      <div
        className="bg-surface overflow-hidden rounded-card"
        style={{
          boxShadow:
            "0 0 0 1px var(--color-line-2), 0 1px 0 var(--color-line), 0 32px 64px -32px rgb(17 17 19 / 0.22)",
        }}
      >
        <SharedElement name={`project-media-${project.slug}`}>
          <div className="bg-raised relative aspect-16/10 w-full overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={`${project.title} — ${project.typeOfWork}`}
              fill
              sizes="(max-width: 1024px) 92vw, 720px"
              // Next 16: `priority` is deprecated — eager + high fetch priority
              // is the recommended hint for the page's LCP image.
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              className="ease-entrance object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </SharedElement>

        <div className="border-line flex items-center justify-between gap-4 border-t px-4 py-3">
          <div className="flex min-w-0 flex-col gap-1">
            <span className="flex min-w-0 items-baseline gap-2">
              <span className="text-ink truncate text-[15px] font-medium tracking-[-0.01em]">
                {project.title}
              </span>
              <span className="text-ink-faint truncate text-[13px]">{project.typeOfWork}</span>
            </span>
            <span className="flex flex-wrap gap-1.5">
              {project.stats.slice(0, 2).map((stat) => (
                <span
                  key={stat.label}
                  className="border-line-2 text-ink-muted rounded-[6px] border px-1.5 py-0.5 font-mono text-[10.5px]"
                >
                  <span className="text-ink">{stat.value}</span> {stat.label}
                </span>
              ))}
            </span>
          </div>

          <span className="border-line-2 text-ink group-hover:bg-ink flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 group-hover:border-transparent group-hover:text-white">
            <Icons.ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
