"use client";

import React, { useState } from "react";
import { SetupGuide, type SetupGuideStepItemType } from "@/app/kits/polaris/blocks/onboarding/SetupGuide/SetupGuide";

export function SetupGuideExample() {
  const [steps, setSteps] = useState<SetupGuideStepItemType[]>([
    {
      id: "step-1",
      title: "Activate the Theme App Extension",
      description: "Enable the app embed inside your live Shopify theme so widgets appear correctly on product pages.",
      status: "completed",
      estimatedTime: "2 mins",
      badgeLabel: "Required",
      primaryAction: {
        label: "Open Theme Editor",
        onClick: () => alert("Opening Shopify Theme Editor..."),
      },
    },
    {
      id: "step-2",
      title: "Customize Announcement Bar & Colors",
      description: "Match your store branding by configuring background colors, banner copy, countdown timers, and typography.",
      status: "in_progress",
      estimatedTime: "3 mins",
      primaryAction: {
        label: "Configure Banner",
        onClick: () => alert("Navigating to Banner Settings..."),
      },
      secondaryAction: {
        label: "Preview",
        onClick: () => alert("Previewing banner..."),
      },
    },
    {
      id: "step-3",
      title: "Connect Customer Email Marketing",
      description: "Sync collected subscribers automatically with Klaviyo, Mailchimp, or Shopify Customers.",
      status: "not_started",
      estimatedTime: "5 mins",
      badgeLabel: "Recommended",
      primaryAction: {
        label: "Connect Integration",
        onClick: () => alert("Opening Integrations dialog..."),
      },
    },
    {
      id: "step-4",
      title: "Set Up Custom Shipping Rules",
      description: "Optionally create country-specific free shipping bars and tier thresholds.",
      status: "optional",
      estimatedTime: "2 mins",
      primaryAction: {
        label: "Manage Rules",
        onClick: () => alert("Managing shipping rules..."),
      },
    },
  ]);

  const handleToggleComplete = (stepId: string, completed: boolean) => {
    setSteps((prev) =>
      prev.map((s) =>
        s.id === stepId
          ? { ...s, status: completed ? "completed" : "not_started" }
          : s
      )
    );
  };

  const stepsWithHandler = steps.map((s) => ({
    ...s,
    onToggleComplete: handleToggleComplete,
  }));

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <SetupGuide
        title="Get Started with Your Store App"
        subtitle="Complete these recommended steps to maximize conversions and publish your widgets."
        steps={stepsWithHandler}
        collapsible
        dismissable
        onDismiss={() => alert("Setup guide dismissed")}
      />
    </div>
  );
}
