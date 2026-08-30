"use client";

import React from "react";
// ── Domain Block Examples ──
import { SetupGuideExample } from "./examples/SetupGuideExample";
import { ThemeEmbedStatusExample } from "./examples/ThemeEmbedStatusExample";
import { OnboardingExample } from "./examples/OnboardingExample";
import { PlanPricingMatrixExample } from "./examples/PlanPricingMatrixExample";
import { UsageLimitBannerExample } from "./examples/UsageLimitBannerExample";
import { DestructiveActionModalExample } from "./examples/DestructiveActionModalExample";
import { ResourceFilterToolbarExample } from "./examples/ResourceFilterToolbarExample";
import { AppReviewPromptExample } from "./examples/AppReviewPromptExample";
import { FeedbackCardExample } from "./examples/FeedbackCardExample";
import { TimelineExample } from "./examples/TimelineExample";
import { TutorialButtonExample } from "./examples/TutorialButtonExample";
import { DataTableExample } from "./examples/DataTableExample";

// ── UI Kit Examples ──
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

export function PolarisPreviewRenderer({ renderKey }: PolarisPreviewRendererPropsType) {
  switch (renderKey) {
    // ── Onboarding Blocks ──
    case "onboarding-example":
    case "onboarding":
      return <OnboardingExample />;

    case "setup-guide-example":
    case "setup-guide":
      return <SetupGuideExample />;

    case "theme-embed-status-example":
    case "theme-embed-status":
      return <ThemeEmbedStatusExample />;

    // ── Billing Blocks ──
    case "plan-pricing-matrix-example":
    case "plan-pricing-matrix":
      return <PlanPricingMatrixExample />;

    case "usage-limit-banner-example":
    case "usage-limit-banner":
      return <UsageLimitBannerExample />;

    // ── Actions & Workflow Blocks ──
    case "destructive-action-modal-example":
    case "destructive-action-modal":
      return <DestructiveActionModalExample />;

    case "resource-filter-toolbar-example":
    case "resource-filter-toolbar":
      return <ResourceFilterToolbarExample />;

    // ── Feedback & Engagement Blocks ──
    case "app-review-prompt-example":
    case "app-review-prompt":
      return <AppReviewPromptExample />;

    case "feedback-card-example":
    case "feedback-card":
      return <FeedbackCardExample />;

    // ── Standalone App Components ──
    case "timeline-example":
    case "timeline":
      return <TimelineExample />;

    case "tutorial-button-example":
    case "tutorial-button":
      return <TutorialButtonExample />;

    // ── Table Blocks ──
    case "data-table-example":
    case "data-table":
      return <DataTableExample />;

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

    // ── Typography ──
    case "info-tooltip-example":
    case "info-tooltip":
      return <InfoTooltipExample />;

    default:
      return (
        <s-box padding="base">
          <s-text tone="neutral">Component preview: {renderKey}</s-text>
        </s-box>
      );
  }
}
