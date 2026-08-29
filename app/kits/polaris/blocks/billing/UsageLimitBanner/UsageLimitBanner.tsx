"use client";

import React, { useState } from "react";

export type UsageLimitBannerPropsType = {
  title?: string;
  resourceName: string;
  currentUsage: number;
  maxLimit: number;
  unit?: string;
  upgradeUrl?: string;
  onUpgrade?: () => void;
  dismissable?: boolean;
  onDismiss?: () => void;
  className?: string;
};


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
    <s-banner
      tone={tone}
      heading={title || defaultTitle}
      dismissible={dismissable}
      onDismiss={handleDismiss}
    >
      <s-stack direction="block" gap="base">
        <s-paragraph>
          {currentUsage.toLocaleString()} / {maxLimit.toLocaleString()} {unit}{" "}
          {resourceName.toLowerCase()} consumed this billing cycle ({percentage}% used).
        </s-paragraph>

        <s-stack direction="inline" gap="small-200" alignItems="center">
          <s-button variant="primary" onClick={handleUpgrade}>
            Upgrade Plan →
          </s-button>
        </s-stack>
      </s-stack>
    </s-banner>
  );
}

export default UsageLimitBanner;
