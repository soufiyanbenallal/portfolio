"use client";

import React, { useState, type ReactNode } from "react";
import { SetupGuideProgress } from "./partials/SetupGuideProgress.part";
import { SetupGuideItem } from "./partials/SetupGuideItem.part";

export type SetupGuideStepStatusType =
  | "completed"
  | "in_progress"
  | "not_started"
  | "optional";

export type SetupGuideActionType = {
  label: string;
  url?: string;
  onClick?: () => void;
  primary?: boolean;
  external?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

export type SetupGuideStepItemType = {
  id: string;
  title: string;
  description: ReactNode;
  status: SetupGuideStepStatusType;
  badgeLabel?: string;
  illustrationUrl?: string;
  estimatedTime?: string;
  primaryAction?: SetupGuideActionType;
  secondaryAction?: SetupGuideActionType;
  onToggleComplete?: (stepId: string, completed: boolean) => void;
};

export type SetupGuidePropsType = {
  title?: string;
  subtitle?: string;
  steps: SetupGuideStepItemType[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  dismissable?: boolean;
  onDismiss?: () => void;
  className?: string;
};


export function SetupGuide({
  title = "Setup Guide",
  subtitle = "Complete these steps to get your app fully configured and live on your store.",
  steps,
  collapsible = true,
  defaultCollapsed = false,
  dismissable = false,
  onDismiss,
}: SetupGuidePropsType) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [openStepId, setOpenStepId] = useState<string | null>(() => {
    const firstIncomplete = steps.find((s) => s.status !== "completed");
    return firstIncomplete ? firstIncomplete.id : steps[0]?.id ?? null;
  });

  const completedCount = steps.filter((s) => s.status === "completed").length;
  const totalCount = steps.length;

  const toggleStep = (stepId: string) => {
    setOpenStepId((curr) => (curr === stepId ? null : stepId));
  };

  return (
    <s-section>
      <s-box padding="base" borderWidth="base" borderRadius="base" background="base">
        <s-stack direction="block" gap="base">
          {/* Header */}
          <s-stack direction="inline" justifyContent="space-between" alignItems="center">
            <s-stack direction="block" gap="none">
              <s-heading>{title}</s-heading>
              {subtitle && <s-text tone="neutral">{subtitle}</s-text>}
            </s-stack>

            <s-stack direction="inline" gap="small-200" alignItems="center">
              <SetupGuideProgress completedCount={completedCount} totalCount={totalCount} />

              {collapsible && (
                <s-button
                  variant="secondary"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  icon={isCollapsed ? "chevron-down" : "chevron-up"}
                />
              )}

              {dismissable && onDismiss && (
                <s-button variant="secondary" onClick={onDismiss} icon="x" />
              )}
            </s-stack>
          </s-stack>

          {/* Step Accordion List */}
          {!isCollapsed && (
            <s-stack direction="block" gap="small-200">
              {steps.map((step) => (
                <SetupGuideItem
                  key={step.id}
                  step={step}
                  isOpen={openStepId === step.id}
                  onToggleOpen={() => toggleStep(step.id)}
                />
              ))}
            </s-stack>
          )}
        </s-stack>
      </s-box>
    </s-section>
  );
}

export default SetupGuide;
