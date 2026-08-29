"use client";

import React from "react";
import { usePolarisPlaygroundStore } from "@/lib/polaris-playground.store";

export function PolarisFeedbackDemoPart() {
  const propsConfig = usePolarisPlaygroundStore((state) => state.propsConfig);

  return (
    <div className="w-full rounded-2xl border border-gray-30 bg-white p-6 shadow-sm overflow-x-auto">
      <s-page heading="Feedback & Status" inlineSize="base">
        <s-section heading="Dynamic Banner & Badge Preview">
          <s-stack direction="block" gap="base">
            <s-banner
              heading="Configured Alert Banner"
              tone={propsConfig.bannerTone}
              dismissible={propsConfig.bannerDismissible}
            >
              This banner dynamically reacts to the tone selected in the control panel below.
            </s-banner>

            <s-stack direction="inline" gap="base" alignItems="center">
              <s-text type="strong">Active Status Badge:</s-text>
              <s-badge tone={propsConfig.badgeTone}>
                Selected Tone: {propsConfig.badgeTone}
              </s-badge>
            </s-stack>
          </s-stack>
        </s-section>

        <s-section heading="System Tones Palette">
          <s-stack direction="inline" gap="base" alignItems="center">
            <s-badge tone="success" icon="check-circle">Fulfilled (Success)</s-badge>
            <s-badge tone="warning" icon="clock">Unfulfilled (Warning)</s-badge>
            <s-badge tone="critical" icon="alert-triangle">Overdue (Critical)</s-badge>
            <s-badge tone="info">Pre-order (Info)</s-badge>
            <s-badge tone="auto">Archived (Auto)</s-badge>
          </s-stack>
        </s-section>

        <s-section heading="Chips & Spinners">
          <s-stack direction="block" gap="base">
            <s-stack direction="inline" gap="base" alignItems="center">
              <s-chip color="base" accessibilityLabel="Category Tag">Footwear</s-chip>
              <s-clickable-chip color="strong" removable accessibilityLabel="Active Filter">
                In Stock Only
              </s-clickable-chip>
            </s-stack>
            <s-stack direction="inline" gap="base" alignItems="center">
              <s-spinner size="base" accessibilityLabel="Loading data"></s-spinner>
              <s-text color="subdued">Syncing real-time changes with Shopify Admin...</s-text>
            </s-stack>
          </s-stack>
        </s-section>
      </s-page>
    </div>
  );
}
