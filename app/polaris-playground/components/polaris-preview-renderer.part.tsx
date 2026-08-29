"use client";

import React from "react";

export type PolarisPreviewRendererPropsType = {
  renderKey: string;
};

export function PolarisPreviewRenderer({
  renderKey,
}: PolarisPreviewRendererPropsType) {
  switch (renderKey) {
    case "clickable-custom":
      return (
        <div className="flex flex-col items-center justify-center gap-3 p-4">
          <s-clickable padding="base">
            <span className="text-sm font-medium text-black">Create Store</span>
          </s-clickable>
          <s-clickable
            border="base"
            padding="base"
            background="subdued"
            borderRadius="base"
          >
            <span className="text-sm font-medium text-black">View Shipping Settings</span>
          </s-clickable>
        </div>
      );

    case "clickable-url":
      return (
        <div className="flex items-center justify-center p-6">
          <s-clickable href="https://shopify.com">
            <span className="text-sm font-medium text-blue-600 hover:underline">
              Visit Shopify
            </span>
          </s-clickable>
        </div>
      );

    case "clickable-submit":
      return (
        <div className="flex items-center justify-center p-6">
          <s-clickable type="submit" padding="base" background="subdued" borderRadius="base">
            <span className="text-sm font-medium text-black">Submit Application Form</span>
          </s-clickable>
        </div>
      );

    case "button-variants":
      return (
        <div className="flex flex-wrap items-center justify-center gap-3 p-6">
          <s-button variant="secondary">Cancel</s-button>
          <s-button variant="tertiary" tone="critical">Delete</s-button>
          <s-button variant="primary">Add product</s-button>
        </div>
      );

    case "button-states":
      return (
        <div className="flex flex-wrap items-center justify-center gap-3 p-6">
          <s-button variant="primary" icon="save">Save changes</s-button>
          <s-button variant="primary" loading>Updating...</s-button>
          <s-button variant="secondary" disabled>Disabled</s-button>
        </div>
      );

    case "link-standard":
      return (
        <div className="flex items-center justify-center p-6">
          <s-link href="https://snowdevil.myshopify.com" tone="auto">
            snowdevil.myshopify.com
          </s-link>
        </div>
      );

    case "menu-standard":
      return (
        <div className="flex flex-col items-center justify-center gap-2 p-6">
          <s-button variant="secondary">More actions ▾</s-button>
        </div>
      );

    case "button-group-standard":
      return (
        <div className="flex items-center justify-center p-6">
          <s-button-group gap="base">
            <s-button variant="secondary">Cancel</s-button>
            <s-button variant="primary">Save</s-button>
          </s-button-group>
        </div>
      );

    case "clickable-chip-standard":
      return (
        <div className="flex items-center justify-center p-6">
          <s-clickable-chip color="strong" removable accessibilityLabel="Filter: Out of stock">
            Out of stock
          </s-clickable-chip>
        </div>
      );

    case "badge-tones":
      return (
        <div className="flex flex-wrap items-center justify-center gap-2 p-6">
          <s-badge tone="success">Fulfilled</s-badge>
          <s-badge tone="info">Draft</s-badge>
          <s-badge tone="success">Active</s-badge>
          <s-badge tone="warning">Open</s-badge>
          <s-badge tone="warning">On hold</s-badge>
          <s-badge tone="critical">Action required</s-badge>
        </div>
      );

    case "banner-standard":
      return (
        <div className="flex flex-col gap-3 w-full max-w-md p-4">
          <s-banner heading="3 of 5 variants created." tone="info">
            Review the created variants in your product list.
          </s-banner>
          <s-banner heading="Update successful." tone="success" dismissible>
            Your store settings were updated successfully.
          </s-banner>
        </div>
      );

    case "spinner-standard":
      return (
        <div className="flex items-center justify-center p-8">
          <s-spinner size="base" accessibilityLabel="Loading"></s-spinner>
        </div>
      );

    case "chip-standard":
      return (
        <div className="flex items-center justify-center p-6">
          <s-chip color="base" accessibilityLabel="Tag: Footwear">Footwear</s-chip>
        </div>
      );

    case "text-field-standard":
      return (
        <div className="w-full max-w-xs p-4">
          <s-text-field
            label="Product Title"
            name="title"
            placeholder="e.g. Vintage Leather Jacket"
            required
          ></s-text-field>
        </div>
      );

    case "select-standard":
      return (
        <div className="w-full max-w-xs p-4">
          <s-select label="Collection" name="collection">
            <s-option value="apparel">Apparel &amp; Accessories</s-option>
            <s-option value="electronics">Electronics</s-option>
            <s-option value="home">Home &amp; Kitchen</s-option>
          </s-select>
        </div>
      );

    case "switch-standard":
      return (
        <div className="flex items-center justify-center p-6">
          <s-switch label="Track inventory for this product" name="trackInventory" checked></s-switch>
        </div>
      );

    case "color-field-standard":
      return (
        <div className="w-full max-w-xs p-4">
          <s-color-field label="Accent Color" name="accentColor" value="#2563EB"></s-color-field>
        </div>
      );

    case "drop-zone-standard":
      return (
        <div className="w-full max-w-xs p-4">
          <s-drop-zone label="Upload product media" name="files" accept=".jpg,.png,.webp" multiple></s-drop-zone>
        </div>
      );

    case "page-standard":
    case "section-standard":
      return (
        <div className="w-full max-w-md p-4">
          <s-section heading="Inventory Settings">
            <s-stack direction="block" gap="base">
              <s-text>Automate low-stock alerts to your team email.</s-text>
              <s-button variant="primary">Configure alerts</s-button>
            </s-stack>
          </s-section>
        </div>
      );

    case "grid-standard":
      return (
        <div className="w-full max-w-md p-4">
          <s-grid gridTemplateColumns="1fr 1fr 1fr" gap="base">
            <s-box padding="base" background="subdued" border="base" borderRadius="base">
              <s-heading>Gross Sales</s-heading>
              <s-text type="strong" tone="success">$48,250</s-text>
            </s-box>
            <s-box padding="base" background="subdued" border="base" borderRadius="base">
              <s-heading>Orders</s-heading>
              <s-text type="strong">1,248</s-text>
            </s-box>
            <s-box padding="base" background="subdued" border="base" borderRadius="base">
              <s-heading>Conversion</s-heading>
              <s-text type="strong" tone="info">3.8%</s-text>
            </s-box>
          </s-grid>
        </div>
      );

    case "table-standard":
      return (
        <div className="w-full max-w-md p-2 overflow-x-auto">
          <s-table variant="auto">
            <s-table-header-row>
              <s-table-header listSlot="primary">Product Name</s-table-header>
              <s-table-header>SKU</s-table-header>
              <s-table-header listSlot="labeled" format="currency">Price</s-table-header>
              <s-table-header>Status</s-table-header>
            </s-table-header-row>
            <s-table-body>
              <s-table-row>
                <s-table-cell>Studio Headphones Pro</s-table-cell>
                <s-table-cell>HP-900-BLK</s-table-cell>
                <s-table-cell>$249.00</s-table-cell>
                <s-table-cell><s-badge tone="success">In Stock</s-badge></s-table-cell>
              </s-table-row>
            </s-table-body>
          </s-table>
        </div>
      );

    default:
      return (
        <div className="flex items-center justify-center p-6 text-sm text-gray-500">
          Component Preview
        </div>
      );
  }
}
