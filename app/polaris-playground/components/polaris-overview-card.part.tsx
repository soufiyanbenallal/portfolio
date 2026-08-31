"use client";

import React from "react";
import Link from "next/link";
import { PolarisPreviewRenderer } from "./polaris-preview-renderer.part";
import { AutoFitIframePreview } from "./auto-fit-iframe-preview.part";
import type { PolarisDocComponentType } from "../data/polaris-docs.data";

export type PolarisOverviewCardPropsType = {
  component: PolarisDocComponentType;
};

export function PolarisOverviewCardPart({ component }: PolarisOverviewCardPropsType) {
  const renderKey = component.examples[0]?.renderKey || component.slug;

  return (
    <Link
      href={`/polaris-playground/${component.slug}`}
      className="group border-border bg-card hover:border-primary/40 flex flex-col overflow-hidden rounded-xl border shadow-xs transition-all duration-200 hover:shadow-md"
    >
      {/* ── Top Dotted Canvas: Auto-Fitted Iframe Live Component Preview ── */}
      <div className="border-border/80 relative h-48 w-full overflow-hidden border-b bg-gray-100 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-size-[6px_6px]">
        <AutoFitIframePreview title={component.name} padding={14}>
          <PolarisPreviewRenderer renderKey={renderKey} />
        </AutoFitIframePreview>
      </div>

      {/* ── Bottom Meta Box ── */}
      <div className="bg-card flex flex-1 flex-col justify-between p-4">
        <div className="flex flex-col gap-1">
          <h4 className="text-foreground group-hover:text-primary text-sm font-semibold transition-colors">
            {component.name}
          </h4>
          <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
            {component.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PolarisOverviewCardPart;
