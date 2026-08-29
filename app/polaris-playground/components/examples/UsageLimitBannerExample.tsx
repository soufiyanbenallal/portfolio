"use client";

import React, { useState } from "react";
import { UsageLimitBanner } from "@/app/kits/polaris/blocks/billing/UsageLimitBanner/UsageLimitBanner";

export function UsageLimitBannerExample() {
  const [usage, setUsage] = useState(8800);
  const limit = 10000;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between text-xs text-muted-foreground pb-2">
        <span>Simulate usage quota change:</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setUsage(6500)}
            className="text-primary hover:underline font-semibold"
          >
            65% (Normal)
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setUsage(8800)}
            className="text-amber-600 dark:text-amber-400 hover:underline font-semibold"
          >
            88% (Warning)
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setUsage(9600)}
            className="text-destructive hover:underline font-semibold"
          >
            96% (Critical)
          </button>
        </div>
      </div>

      <UsageLimitBanner
        resourceName="Monthly Tracked Orders"
        currentUsage={usage}
        maxLimit={limit}
        dismissable
        onUpgrade={() => alert("Redirecting to Plan upgrade page...")}
        onDismiss={() => alert("Banner dismissed")}
      />
    </div>
  );
}
