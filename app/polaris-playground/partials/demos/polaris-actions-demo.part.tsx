"use client";

import React from "react";
import { usePolarisPlaygroundStore } from "@/lib/polaris-playground.store";

export function PolarisActionsDemoPart() {
  const propsConfig = usePolarisPlaygroundStore((state) => state.propsConfig);

  return (
    <div className="w-full rounded-2xl border border-gray-30 bg-white p-6 shadow-sm overflow-x-auto">
      <s-page heading="Action Components" inlineSize="base">
        <s-section heading="Interactive Configured Button">
          <s-stack direction="block" gap="base">
            <s-text>This button reflects the real-time controls in the tweak panel below:</s-text>
            <s-button-group gap="base">
              <s-button
                variant={propsConfig.buttonVariant}
                tone={propsConfig.buttonTone}
                loading={propsConfig.buttonLoading}
                disabled={propsConfig.buttonDisabled}
              >
                Configured Dynamic Button
              </s-button>
            </s-button-group>
          </s-stack>
        </s-section>

        <s-section heading="Button Variants & Hierarchy">
          <s-stack direction="block" gap="base">
            <s-text>Standard action buttons with different hierarchy weights:</s-text>
            <s-button-group gap="base">
              <s-button variant="primary">Primary Action</s-button>
              <s-button variant="secondary">Secondary Action</s-button>
              <s-button variant="tertiary">Tertiary Action</s-button>
              <s-button variant="auto">Auto Action</s-button>
            </s-button-group>
          </s-stack>
        </s-section>

        <s-section heading="Button Tones & States">
          <s-stack direction="block" gap="base">
            <s-button-group gap="base">
              <s-button variant="primary" tone="auto">Default Auto</s-button>
              <s-button variant="primary" tone="critical">Critical Action</s-button>
              <s-button variant="secondary" tone="critical">Delete Item</s-button>
              <s-button variant="primary" disabled>Disabled State</s-button>
              <s-button variant="primary" loading>Saving...</s-button>
            </s-button-group>
          </s-stack>
        </s-section>

        <s-section heading="Clickable & Links">
          <s-grid gridTemplateColumns="1fr 1fr" gap="base">
            <s-clickable href="#action" padding="base" background="subdued">
              <s-stack direction="block" gap="base">
                <s-heading>Interactive Card Area</s-heading>
                <s-text color="subdued">Click anywhere in this container</s-text>
              </s-stack>
            </s-clickable>
            <s-box padding="base" background="subdued">
              <s-link href="https://shopify.dev" tone="auto">
                Visit Shopify Developer Portal
              </s-link>
            </s-box>
          </s-grid>
        </s-section>
      </s-page>
    </div>
  );
}
