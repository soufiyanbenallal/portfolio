"use client";

import React from "react";
import type { SetupGuideStepItemType } from "../types";

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

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    step.onToggleComplete?.(step.id, !isCompleted);
  };

  return (
    <div
      className={`border rounded-lg transition-colors duration-150 ${
        isOpen ? "bg-card border-border shadow-xs" : "bg-card/50 border-border/60 hover:bg-card"
      }`}
    >
      {/* Header Row */}
      <div
        role="button"
        tabIndex={0}
        onClick={onToggleOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggleOpen();
          }
        }}
        className="w-full text-left p-3.5 flex items-center justify-between gap-3 cursor-pointer select-none focus:outline-hidden"
      >
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={handleCheckboxClick}
            aria-label={isCompleted ? "Mark incomplete" : "Mark complete"}
            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
              isCompleted
                ? "bg-primary border-primary text-primary-foreground"
                : "border-muted-foreground/50 hover:border-primary"
            }`}
          >
            {isCompleted && (
              <svg className="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          <span
            className={`text-sm font-medium truncate ${
              isCompleted ? "line-through text-muted-foreground" : "text-foreground"
            }`}
          >
            {step.title}
          </span>

          {step.badgeLabel && (
            <s-badge tone="info">
              {step.badgeLabel}
            </s-badge>
          )}

          {step.status === "optional" && (
            <span className="text-xs text-muted-foreground font-normal">Optional</span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {step.estimatedTime && (
            <span className="text-xs text-muted-foreground hidden sm:inline-block">
              {step.estimatedTime}
            </span>
          )}
          <svg
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Expanded Content */}
      {isOpen && (
        <div className="px-3.5 pb-4 pt-1 border-t border-border/40 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-xs text-muted-foreground leading-relaxed max-w-xl">
              {step.description}
            </div>

            {step.illustrationUrl && (
              <img
                src={step.illustrationUrl}
                alt=""
                className="w-16 h-16 object-contain rounded-md shrink-0 hidden sm:block"
              />
            )}
          </div>

          {(step.primaryAction || step.secondaryAction) && (
            <div className="flex items-center gap-2 pt-1">
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
            </div>
          )}
        </div>
      )}
    </div>
  );
}
