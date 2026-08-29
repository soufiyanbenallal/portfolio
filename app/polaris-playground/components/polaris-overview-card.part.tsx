"use client";

import React from "react";
import Link from "next/link";
import { PolarisPreviewRenderer } from "./polaris-preview-renderer.part";
import type { PolarisDocComponentType } from "../data/polaris-docs.data";

export type PolarisOverviewCardPropsType = {
  component: PolarisDocComponentType;
};

export function PolarisOverviewCardPart({
  component,
}: PolarisOverviewCardPropsType) {
  const renderKey = component.examples[0]?.renderKey || component.slug;

  return (
    <Link
      href={`/polaris-playground/${component.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs transition-all duration-200 hover:border-gray-300 hover:shadow-md"
    >
      {/* ── Top Dotted Canvas: Scaled Live Component Preview ── */}
      <div className="relative flex h-44 w-full items-center justify-center overflow-hidden bg-[#FAFAFA] border-b border-gray-100 [background-image:radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:12px_12px] p-2">
        <div className="pointer-events-none select-none w-[560px] max-w-none origin-center scale-[0.46] sm:scale-[0.5] flex items-center justify-center transition-transform duration-200 group-hover:scale-[0.52]">
          <PolarisPreviewRenderer renderKey={renderKey} />
        </div>
      </div>

      {/* ── Bottom Light Meta Box ── */}
      <div className="flex flex-1 flex-col justify-between p-4 bg-white">
        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {component.name}
          </h4>
          <p className="line-clamp-2 text-xs leading-relaxed text-gray-500">
            {component.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PolarisOverviewCardPart;
