"use client";

import React from "react";
import { Timeline } from "@/app/kits/polaris/Timeline";

export function TimelineExample() {
  const events = [
    {
      timestamp: new Date().toISOString(),
      timelineEvent: "Theme App Extension auto-activated on Dawn theme",
      tone: "success",
    },
    {
      timestamp: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
      timelineEvent: "Synchronized 240 product catalog feeds with Shopify Admin API",
      tone: "base",
    },
    {
      timestamp: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
      timelineEvent: "Merchant upgraded subscription to Growth Plan ($29/mo)",
      tone: "success",
      url: "#billing",
    },
    {
      timestamp: new Date(Date.now() - 3600 * 1000 * 28).toISOString(),
      timelineEvent: "Klaviyo integration API key connected",
      tone: "base",
    },
    {
      timestamp: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
      timelineEvent: "App installed by store owner",
      tone: "success",
    },
  ];

  return (
    <s-page>
      <s-box padding="base" borderWidth="base" borderRadius="base" background="base">
        <s-stack direction="block" gap="base">
          <s-heading>Store Activity Audit Trail</s-heading>
          <Timeline items={events} />
        </s-stack>
      </s-box>
    </s-page>
  );
}
