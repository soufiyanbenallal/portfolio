"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { projectsData } from "@/data/projects.data";

type HeroProjectStackPartPropsType = {
  isMobileOnly?: boolean;
};

export function HeroProjectStackPart({
  isMobileOnly = false,
}: HeroProjectStackPartPropsType) {
  const featured = projectsData.slice(0, 4);

  // Mobile static fanned stack configurations
  const mobileStackConfigs = [
    { rotate: "4deg", scale: 0.95, zIndex: 4, x: "0px", y: "0px" },
    { rotate: "-6deg", scale: 0.9, zIndex: 3, x: "-12px", y: "-10px" },
    { rotate: "8deg", scale: 0.85, zIndex: 2, x: "12px", y: "-20px" },
    { rotate: "-2deg", scale: 0.8, zIndex: 1, x: "-6px", y: "-30px" },
  ];

  return (
    <div
      aria-hidden="true"
      className={`${
        isMobileOnly ? "block md:hidden mt-8" : "hidden md:block"
      } relative w-full max-w-[480px] lg:max-w-[560px] h-[340px] sm:h-[400px] lg:h-[460px] pointer-events-none select-none`}
    >
      {/* For mobile view: static layered editorial cards */}
      {isMobileOnly && (
        <div className="relative w-full h-full flex items-center justify-center">
          {featured.map((project, idx) => {
            const config = mobileStackConfigs[idx] || mobileStackConfigs[0];
            return (
              <motion.div
                key={`mobile-hero-${project.id}`}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: config.scale, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                style={{
                  zIndex: config.zIndex,
                  transform: `translate(${config.x}, ${config.y}) rotate(${config.rotate})`,
                }}
                className="absolute w-[280px] sm:w-[320px] rounded-[18px] bg-white border border-[#dedede] p-3 shadow-xl overflow-hidden"
              >
                <div className="relative w-full aspect-[4/3] rounded-[12px] overflow-hidden bg-[#f7f7f7]">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    sizes="320px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="pt-2 px-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-black">{project.title}</span>
                  <span className="text-[#828282] font-mono">{project.typeOfWork}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
