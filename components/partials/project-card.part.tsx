"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Icons } from "@/components/ui/social-icons.ui";
import type { ProjectItemType } from "@/types";
import type { CardMotionTransformType } from "@/hooks/use-project-scroll-transition.hook";

type ProjectCardPartPropsType = {
  project: ProjectItemType;
  layoutId?: string;
  isInteractive?: boolean;
  motionTransform?: CardMotionTransformType;
  className?: string;
  priority?: boolean;
};

export function ProjectCardPart({
  project,
  layoutId,
  isInteractive = true,
  motionTransform,
  className,
  priority = false,
}: ProjectCardPartPropsType) {
  const cardInner = (
    <div
      className="relative w-full rounded-[20px] bg-white border border-[#dedede] p-3.5 transition-all duration-300 overflow-hidden group"
      style={{
        boxShadow:
          "0 1px 2px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.03), 0 12px 24px rgba(0,0,0,0.04)",
      }}
    >
      {/* 4:3 Ratio Image Container */}
      <div className="relative w-full aspect-[4/3] rounded-[14px] overflow-hidden bg-[#f7f7f7]">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          priority={priority}
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Hover overlay badge for interactive cards */}
        {isInteractive && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-black text-xs font-semibold shadow-lg scale-95 group-hover:scale-100 transition-transform duration-300">
              <span>View Case Study</span>
              <Icons.ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        )}
      </div>

      {/* Metadata Bar */}
      <div className="pt-4 pb-1 px-1 flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-medium text-black tracking-tight group-hover:text-[#545454] transition-colors">
              {project.title}
            </span>
            <span className="text-[11px] text-[#b8b8b8] font-mono">/</span>
            <span className="text-[12px] text-[#545454] font-medium">
              {project.typeOfWork}
            </span>
          </div>
          <span className="text-[12px] text-[#828282] line-clamp-1">
            {project.tagline}
          </span>
        </div>

        <div className="w-8 h-8 rounded-full border border-[#dedede] flex items-center justify-center text-black group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300 shrink-0">
          <Icons.ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      layoutId={layoutId}
      style={
        motionTransform
          ? {
              x: motionTransform.x,
              y: motionTransform.y,
              scale: motionTransform.scale,
              rotate: motionTransform.rotate,
              transformPerspective: 1200,
            }
          : undefined
      }
      transition={{
        duration: 0.6,
        ease: [0.68, 0, 0.22, 0.83],
      }}
      className={className}
    >
      {isInteractive ? (
        <Link
          href={`/projects/${project.slug}`}
          className="block w-full h-full"
        >
          {cardInner}
        </Link>
      ) : (
        cardInner
      )}
    </motion.div>
  );
}
