"use client";

import React from "react";
import { StatsSectionExample } from "./examples/StatsSectionExample";
import { DismissableBannerExample } from "./examples/DismissableBannerExample";
import { SectionCardExample } from "./examples/SectionCardExample";
import { TabsExample } from "./examples/TabsExample";
import { InfoTooltipExample } from "./examples/InfoTooltipExample";
import { CheckBoxExample } from "./examples/CheckBoxExample";
import { SelectExample } from "./examples/SelectExample";
import { ToggleExample } from "./examples/ToggleExample";
import { RangeExample } from "./examples/RangeExample";
import { InputExample } from "./examples/InputExample";
import { StatsCard } from "@/app/kits/polaris/ui/stats/StatsCard";

export type PolarisPreviewRendererPropsType = {
  renderKey: string;
};

export function PolarisPreviewRenderer({
  renderKey,
}: PolarisPreviewRendererPropsType) {
  switch (renderKey) {
    // ── Stats ──
    case "stats-section-example":
    case "stats-section":
      return <StatsSectionExample />;

    case "stats-card-example":
    case "stats-card":
      return (
        <div className="w-full max-w-sm p-4">
          <StatsCard
            id="single-stat"
            title="Total Revenue"
            value="$42,850.00"
            description="vs. last month"
            icon="cart-sale"
            iconTone="success"
            badge={{ value: "+12.4%", tone: "success", dir: "up" }}
            sparklineData={[15, 18, 22, 28, 26, 34, 38, 42]}
            sparklineStroke="#10b981"
          />
        </div>
      );

    // ── Feedbacks ──
    case "dismissable-banner-example":
    case "dismissable-banner":
      return <DismissableBannerExample />;

    // ── Layouts ──
    case "section-card-example":
    case "section-card":
      return <SectionCardExample />;

    case "tabs-example":
    case "tabs":
      return <TabsExample />;

    // ── Forms ──
    case "input-example":
    case "input":
      return <InputExample />;

    case "select-example":
    case "select":
      return <SelectExample />;

    case "checkbox-example":
    case "checkbox":
      return <CheckBoxExample />;

    case "toggle-example":
    case "toggle":
      return <ToggleExample />;

    case "range-example":
    case "range":
      return <RangeExample />;

    // ── Typography ──
    case "info-tooltip-example":
    case "info-tooltip":
      return <InfoTooltipExample />;

    default:
      return (
        <div className="flex items-center justify-center p-8 text-center text-xs text-muted-foreground">
          Component preview: <code className="ml-1 font-mono text-foreground">{renderKey}</code>
        </div>
      );
  }
}
