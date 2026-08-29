"use client";

import React from "react";
import Link from "next/link";
import { PolarisPreviewRenderer } from "./polaris-preview-renderer.part";
import { AutoFitIframePreview } from "./auto-fit-iframe-preview.part";
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
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xs transition-all duration-200 hover:border-primary/40 hover:shadow-md"
    >
      {/* ── Top Dotted Canvas: Auto-Fitted Iframe Live Component Preview ── */}
      <div className="relative h-48 w-full overflow-hidden bg-background border-b border-border/80 [background-image:radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:12px_12px]">
        <AutoFitIframePreview title={component.name} padding={14}>
          <PolarisPreviewRenderer renderKey={renderKey} />
        </AutoFitIframePreview>
      </div>

      {/* ── Bottom Meta Box ── */}
      <div className="flex flex-1 flex-col justify-between p-4 bg-card">
        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
            {component.name}
          </h4>
          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {component.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PolarisOverviewCardPart;
