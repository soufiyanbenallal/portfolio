"use client";

import React, { type ReactNode } from "react";
import { InfoTooltip } from "@/app/kits/polaris/ui/typography/InfoTooltip";

export function InfoTooltipExample(): ReactNode {
  return (
    <div className="w-full max-w-md space-y-4 rounded-xl border border-border bg-card p-6">
      <div className="space-y-3">
        <InfoTooltip
          label="API Rate Limit Threshold"
          tooltip="Maximum number of GraphQL Admin API cost points allowed per minute."
        />

        <InfoTooltip
          label="Estimated Fulfillment Time"
          tooltip="Average days elapsed from payment capture to shipping carrier scan."
        />

        <InfoTooltip
          label="Webhook Delivery Retry Window"
          tooltip="Duration before unacknowledged HTTP webhook payloads are dropped."
        />
      </div>
    </div>
  );
}

export default InfoTooltipExample;
