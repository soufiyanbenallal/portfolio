"use client";

import React, { type ReactNode } from "react";
import { InfoTooltip } from "@/app/kits/polaris/ui/typography/InfoTooltip";

export function InfoTooltipExample(): ReactNode {
  return (
    <s-page>
      <s-box padding="base" borderWidth="base" borderRadius="base" background="base">
        <s-stack direction="block" gap="base">
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
        </s-stack>
      </s-box>
    </s-page>
  );
}

export default InfoTooltipExample;
