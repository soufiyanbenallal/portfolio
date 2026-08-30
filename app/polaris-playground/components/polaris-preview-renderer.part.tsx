"use client";

import React from "react";
// ── Domain Block Examples ──
import { SetupGuideExample } from "./examples/SetupGuideExample";
import Onboarding from "~/components/Onboarding/Onboarding";
import { PlanPricingMatrixExample } from "./examples/PlanPricingMatrixExample";
import { AppReviewPromptExample } from "./examples/AppReviewPromptExample";
import { TimelineExample } from "./examples/TimelineExample";
import { DataTableExample } from "./examples/DataTableExample";
import { AiRecommendationsExample } from "./examples/AiRecommendationsExample";

// ── UI Kit Examples ──
import { StatsSectionExample } from "./examples/StatsSectionExample";
import { DismissableBannerExample } from "./examples/DismissableBannerExample";
import { SectionCardExample } from "./examples/SectionCardExample";
import { TabsExample } from "./examples/TabsExample";
import { CheckBoxExample } from "./examples/CheckBoxExample";
import { SelectExample } from "./examples/SelectExample";
import { ToggleExample } from "./examples/ToggleExample";
import { RangeExample } from "./examples/RangeExample";
import { InputExample } from "./examples/InputExample";
import { StatsCard } from "~/components/ui/stats/StatsCard";

export type PolarisPreviewRendererPropsType = {
  renderKey: string;
};

export function PolarisPreviewRenderer({ renderKey }: PolarisPreviewRendererPropsType) {
  switch (renderKey) {
    // ── Onboarding Blocks ──
    case "onboarding-example":
    case "onboarding":
      return <Onboarding />;

    case "setup-guide-example":
    case "setup-guide":
      return <SetupGuideExample />;

    // ── Billing Blocks ──
    case "plan-pricing-matrix-example":
    case "plan-pricing-matrix":
      return <PlanPricingMatrixExample />;

    // ── Feedback & Engagement Blocks ──
    case "app-review-prompt-example":
    case "app-review-prompt":
      return <AppReviewPromptExample />;

    // ── Standalone App Components ──
    case "timeline-example":
    case "timeline":
      return <TimelineExample />;

    // ── Table Blocks ──
    case "data-table-example":
    case "data-table":
      return <DataTableExample />;

    // ── Recommendations ──
    case "ai-recommendations-example":
    case "ai-recommendations":
      return <AiRecommendationsExample />;

    // ── Stats ──
    case "stats-section-example":
    case "stats-section":
      return <StatsSectionExample />;

    case "stats-card-example":
    case "stats-card":
      return (
        <s-box padding="base">
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
        </s-box>
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

    default:
      return (
        <s-box padding="base">
          <s-text tone="neutral">Component preview: {renderKey}</s-text>
        </s-box>
      );
  }
}
