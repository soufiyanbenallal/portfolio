"use client";

import React from "react";
import type { SetupGuideStepItemType } from "../SetupGuide";

export type SetupGuideItemPropsType = {
  step: SetupGuideStepItemType;
  isOpen: boolean;
  onToggleOpen: () => void;
};

export function SetupGuideItem({
  step,
  isOpen,
  onToggleOpen,
}: SetupGuideItemPropsType) {
  const isCompleted = step.status === "completed";

  return (
    <s-box padding="base" borderWidth="base" borderRadius="base" background="base">
      <s-stack direction="block" gap="small-200">
        {/* Header Row */}
        <s-stack direction="inline" justifyContent="space-between" alignItems="center">
          <s-stack direction="inline" gap="small-200" alignItems="center">
            <s-checkbox
              checked={isCompleted}
              onChange={() => step.onToggleComplete?.(step.id, !isCompleted)}
              label=""
            />
            <s-clickable onClick={onToggleOpen}>
              <s-text type="strong">
                {step.title}
              </s-text>
            </s-clickable>
            {step.badgeLabel && <s-badge tone="info">{step.badgeLabel}</s-badge>}
            {step.status === "optional" && <s-text tone="neutral">Optional</s-text>}
          </s-stack>

          <s-stack direction="inline" gap="small-200" alignItems="center">
            {step.estimatedTime && <s-text tone="neutral">{step.estimatedTime}</s-text>}
            <s-button
              variant="secondary"
              onClick={onToggleOpen}
              icon={isOpen ? "chevron-up" : "chevron-down"}
            />
          </s-stack>
        </s-stack>

        {/* Expanded Content */}
        {isOpen && (
          <s-box paddingBlockStart="small-200">
            <s-stack direction="block" gap="small-200">
              <s-paragraph>{step.description}</s-paragraph>

              {(step.primaryAction || step.secondaryAction) && (
                <s-stack direction="inline" gap="small-200" alignItems="center">
                  {step.primaryAction && (
                    <s-button
                      variant={step.primaryAction.primary !== false ? "primary" : "secondary"}
                      onClick={step.primaryAction.onClick}
                      disabled={step.primaryAction.disabled}
                    >
                      {step.primaryAction.label}
                    </s-button>
                  )}
                  {step.secondaryAction && (
                    <s-button
                      variant="secondary"
                      onClick={step.secondaryAction.onClick}
                      disabled={step.secondaryAction.disabled}
                    >
                      {step.secondaryAction.label}
                    </s-button>
                  )}
                </s-stack>
              )}
            </s-stack>
          </s-box>
        )}
      </s-stack>
    </s-box>
  );
}
