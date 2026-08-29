"use client";

import React from "react";
import { usePolarisPlaygroundStore } from "@/lib/polaris-playground.store";

export function PolarisDashboardDemoPart() {
  const propsConfig = usePolarisPlaygroundStore((state) => state.propsConfig);

  return (
    <div className="w-full rounded-2xl border border-gray-30 bg-white p-6 shadow-sm overflow-x-auto">
      <s-page heading="Acme Commerce Dashboard" inlineSize="base">
        <s-banner
          heading="Welcome to Shopify App Home"
          tone={propsConfig.bannerTone}
          dismissible={propsConfig.bannerDismissible}
        >
          You are previewing native Polaris Web Components powered by @shopify/polaris-types.
        </s-banner>

        <s-section heading="Overview & Metrics">
          <s-grid gridTemplateColumns="1fr 1fr 1fr" gap="base">
            <s-box padding="base" background="subdued" border="base" borderRadius="base">
              <s-heading>Gross Sales</s-heading>
              <s-text type="strong" tone="success">$124,500.00</s-text>
            </s-box>
            <s-box padding="base" background="subdued" border="base" borderRadius="base">
              <s-heading>Total Orders</s-heading>
              <s-text type="strong">1,420</s-text>
            </s-box>
            <s-box padding="base" background="subdued" border="base" borderRadius="base">
              <s-heading>Active Syncs</s-heading>
              <s-badge tone={propsConfig.badgeTone}>Operational</s-badge>
            </s-box>
          </s-grid>
        </s-section>

        <s-section heading="Recent Products">
          <s-table variant="auto">
            <s-table-header-row>
              <s-table-header listSlot="primary">Product Name</s-table-header>
              <s-table-header>SKU</s-table-header>
              <s-table-header listSlot="labeled" format="currency">Price</s-table-header>
              <s-table-header>Status</s-table-header>
            </s-table-header-row>
            <s-table-body>
              <s-table-row>
                <s-table-cell>Ergonomic Desk Chair</s-table-cell>
                <s-table-cell>FUR-CHR-01</s-table-cell>
                <s-table-cell>$320.00</s-table-cell>
                <s-table-cell><s-badge tone="success">In Stock</s-badge></s-table-cell>
              </s-table-row>
              <s-table-row>
                <s-table-cell>Mechanical Keyboard</s-table-cell>
                <s-table-cell>ACC-KB-99</s-table-cell>
                <s-table-cell>$149.00</s-table-cell>
                <s-table-cell><s-badge tone="warning">Low Stock</s-badge></s-table-cell>
              </s-table-row>
              <s-table-row>
                <s-table-cell>4K Monitor Arm</s-table-cell>
                <s-table-cell>ACC-ARM-04</s-table-cell>
                <s-table-cell>$89.00</s-table-cell>
                <s-table-cell><s-badge tone="critical">Out of Stock</s-badge></s-table-cell>
              </s-table-row>
            </s-table-body>
          </s-table>
        </s-section>
      </s-page>
    </div>
  );
}
