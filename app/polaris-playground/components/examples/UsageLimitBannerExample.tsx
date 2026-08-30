"use client";

import React, { useState } from "react";
import { UsageLimitBanner } from "@/app/kits/polaris/blocks/billing/UsageLimitBanner/UsageLimitBanner";

export function UsageLimitBannerExample() {
  const [usage, setUsage] = useState(8800);
  const limit = 10000;

  return (
    <s-page>
      <s-stack direction="block" gap="base">
        <s-stack direction="inline" justifyContent="space-between" alignItems="center">
          <s-text tone="neutral">Simulate usage quota change:</s-text>
          <s-stack direction="inline" gap="small-200" alignItems="center">
            <s-button variant="secondary" onClick={() => setUsage(6500)}>
              65% (Normal)
            </s-button>
            <s-button variant="secondary" onClick={() => setUsage(8800)}>
              88% (Warning)
            </s-button>
            <s-button variant="secondary" onClick={() => setUsage(9600)}>
              96% (Critical)
            </s-button>
          </s-stack>
        </s-stack>

        <UsageLimitBanner
          resourceName="Monthly Tracked Orders"
          currentUsage={usage}
          maxLimit={limit}
          dismissable
          onUpgrade={() => alert("Redirecting to Plan upgrade page...")}
          onDismiss={() => alert("Banner dismissed")}
        />
      </s-stack>
    </s-page>
  );
}
