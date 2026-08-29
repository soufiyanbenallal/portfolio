"use client";

import React, { useState } from "react";
import type { UsageLimitBannerPropsType } from "./types";

export function UsageLimitBanner({
  title,
  resourceName,
  currentUsage,
  maxLimit,
  unit = "",
  upgradeUrl,
  onUpgrade,
  dismissable = false,
  onDismiss,
  className = "",
}: UsageLimitBannerPropsType) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const percentage = maxLimit > 0 ? Math.min(100, Math.round((currentUsage / maxLimit) * 100)) : 0;
  const isCritical = percentage >= 90;
  const isWarning = percentage >= 75 && percentage < 90;

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
      return;
    }
    if (upgradeUrl) {
      window.open(upgradeUrl, "_blank");
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  const tone = isCritical ? "critical" : isWarning ? "warning" : "info";
  const defaultTitle = isCritical
    ? `You've reached ${percentage}% of your ${resourceName.toLowerCase()} limit`
    : `You've used ${percentage}% of your ${resourceName.toLowerCase()} limit`;

  return (
    <div
      className={`rounded-xl border p-4 sm:p-5 transition-all ${
        isCritical
          ? "border-destructive/30 bg-destructive/5 dark:bg-destructive/10"
          : isWarning
            ? "border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/10"
            : "border-border bg-card"
      } ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left info & progress */}
        <div className="space-y-2.5 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-foreground">
              {title || defaultTitle}
            </h4>
            <s-badge tone={tone}>
              {percentage}% Used
            </s-badge>
          </div>

          <p className="text-xs text-muted-foreground">
            {currentUsage.toLocaleString()} / {maxLimit.toLocaleString()} {unit}{" "}
            {resourceName.toLowerCase()} consumed this billing cycle.
          </p>

          {/* Meter progress bar */}
          <div className="w-full max-w-md h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isCritical
                  ? "bg-destructive"
                  : isWarning
                    ? "bg-amber-500"
                    : "bg-primary"
              }`}
              style={{ width: `${percentage}%` }}
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          <s-button variant="primary" onClick={handleUpgrade}>
            Upgrade Plan →
          </s-button>

          {dismissable && (
            <button
              type="button"
              onClick={handleDismiss}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss limit banner"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export * from "./types";
