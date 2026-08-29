"use client";

import React from "react";

export function PolarisLayoutDemoPart() {
  return (
    <div className="w-full rounded-2xl border border-gray-30 bg-white p-6 shadow-sm overflow-x-auto">
      <s-page heading="Layout & Structure" inlineSize="base">
        <s-section heading="Responsive Grid & Box Hierarchy">
          <s-stack direction="block" gap="base">
            <s-text>Responsive grid dividing elements cleanly into proportional columns:</s-text>
            <s-grid gridTemplateColumns="1fr 1fr" gap="base">
              <s-box padding="base" background="subdued" border="base" borderRadius="base">
                <s-heading>Primary Column (1fr)</s-heading>
                <s-paragraph>Container built with s-box providing standard Polaris padding.</s-paragraph>
              </s-box>
              <s-box padding="base" background="subdued" border="base" borderRadius="base">
                <s-heading>Secondary Column (1fr)</s-heading>
                <s-paragraph>Adapts automatically to available container width.</s-paragraph>
              </s-box>
            </s-grid>
            <s-divider direction="inline"></s-divider>
            <s-text color="subdued">Inline divider separating content blocks.</s-text>
          </s-stack>
        </s-section>
      </s-page>
    </div>
  );
}
