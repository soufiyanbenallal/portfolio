"use client";

import React, { useState } from "react";
import type { SetupGuidePropsType } from "./types";
import { SetupGuideProgress } from "./partials/SetupGuideProgress.part";
import { SetupGuideItem } from "./partials/SetupGuideItem.part";

export function SetupGuide({
  title = "Setup Guide",
  subtitle = "Complete these steps to get your app fully configured and live on your store.",
  steps,
  collapsible = true,
  defaultCollapsed = false,
  dismissable = false,
  onDismiss,
  className = "",
}: SetupGuidePropsType) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [openStepId, setOpenStepId] = useState<string | null>(() => {
    // Open the first incomplete step by default
    const firstIncomplete = steps.find((s) => s.status !== "completed");
    return firstIncomplete ? firstIncomplete.id : steps[0]?.id ?? null;
  });

  const completedCount = steps.filter((s) => s.status === "completed").length;
  const totalCount = steps.length;

  const toggleStep = (stepId: string) => {
    setOpenStepId((curr) => (curr === stepId ? null : stepId));
  };

  return (
    <div
      className={`rounded-xl border border-border bg-card shadow-xs overflow-hidden transition-all duration-200 ${className}`}
    >
      {/* Header */}
      <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-foreground tracking-tight">{title}</h3>
          </div>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-4 self-end md:self-auto">
          <SetupGuideProgress completedCount={completedCount} totalCount={totalCount} />

          {collapsible && (
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              aria-label={isCollapsed ? "Expand setup guide" : "Collapse setup guide"}
            >
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isCollapsed ? "-rotate-90" : "rotate-0"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}

          {dismissable && onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              aria-label="Dismiss setup guide"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Step Accordion List */}
      {!isCollapsed && (
        <div className="p-4 sm:p-5 space-y-2.5 bg-background/50">
          {steps.map((step) => (
            <SetupGuideItem
              key={step.id}
              step={step}
              isOpen={openStepId === step.id}
              onToggleOpen={() => toggleStep(step.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export * from "./types";
