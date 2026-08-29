"use client";

import React, { useMemo } from "react";
import { Copy, Check, Code2, FileCode } from "lucide-react";
import { usePolarisPlaygroundStore } from "@/lib/polaris-playground.store";
import { polarisComponentsData } from "@/data/polaris-playground.data";

export function PlaygroundCodePanelPart() {
  const activeCategory = usePolarisPlaygroundStore((state) => state.activeCategory);
  const codeFormat = usePolarisPlaygroundStore((state) => state.codeFormat);
  const setCodeFormat = usePolarisPlaygroundStore((state) => state.setCodeFormat);
  const copiedCode = usePolarisPlaygroundStore((state) => state.copiedCode);
  const setCopiedCode = usePolarisPlaygroundStore((state) => state.setCopiedCode);
  const propsConfig = usePolarisPlaygroundStore((state) => state.propsConfig);

  const codeSnippet = useMemo(() => {
    switch (activeCategory) {
      case "dashboard":
        return codeFormat === "tsx"
          ? `<s-page heading="Acme Commerce Dashboard" inlineSize="base">
  <s-banner heading="Welcome to Shopify App Home" tone="${propsConfig.bannerTone}" dismissible>
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
        <s-badge tone="${propsConfig.badgeTone}">Operational</s-badge>
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
      </s-table-body>
    </s-table>
  </s-section>
</s-page>`
          : `<s-page heading="Acme Commerce Dashboard" inline-size="base">
  <s-banner heading="Welcome to Shopify App Home" tone="${propsConfig.bannerTone}" dismissible>
    You are previewing native Polaris Web Components powered by @shopify/polaris-types.
  </s-banner>

  <s-section heading="Overview & Metrics">
    <s-grid grid-template-columns="1fr 1fr 1fr" gap="base">
      <s-box padding="base" background="subdued" border="base" border-radius="base">
        <s-heading>Gross Sales</s-heading>
        <s-text type="strong" tone="success">$124,500.00</s-text>
      </s-box>
      <s-box padding="base" background="subdued" border="base" border-radius="base">
        <s-heading>Total Orders</s-heading>
        <s-text type="strong">1,420</s-text>
      </s-box>
      <s-box padding="base" background="subdued" border="base" border-radius="base">
        <s-heading>Active Syncs</s-heading>
        <s-badge tone="${propsConfig.badgeTone}">Operational</s-badge>
      </s-box>
    </s-grid>
  </s-section>
</s-page>`;

      case "forms":
        return codeFormat === "tsx"
          ? `<s-page heading="Create New Product" inlineSize="base">
  <s-section heading="Product Information">
    <s-stack direction="block" gap="base">
      <s-text-field
        label="Product Title"
        name="title"
        value="${propsConfig.formInputTitle}"
        placeholder="e.g. Minimalist Ceramic Mug"
        required
      ></s-text-field>

      <s-text-area label="Description" name="description" rows={4}></s-text-area>

      <s-grid gridTemplateColumns="1fr 1fr" gap="base">
        <s-money-field label="Price" name="price" min={0} max={99999}></s-money-field>
        <s-number-field label="Inventory Quantity" name="inventory" min={0} step={1}></s-number-field>
      </s-grid>

      <s-color-field label="Accent Color" name="accentColor" value="${propsConfig.selectedColor}"></s-color-field>
      <s-switch label="Track inventory for this product" name="trackInventory" checked></s-switch>
      <s-button variant="primary" icon="save">Create Product</s-button>
    </s-stack>
  </s-section>
</s-page>`
          : `<s-page heading="Create New Product" inline-size="base">
  <s-section heading="Product Information">
    <s-stack direction="block" gap="base">
      <s-text-field label="Product Title" name="title" value="${propsConfig.formInputTitle}" required></s-text-field>
      <s-text-area label="Description" name="description" rows="4"></s-text-area>
      <s-grid grid-template-columns="1fr 1fr" gap="base">
        <s-money-field label="Price" name="price" min="0" max="99999"></s-money-field>
        <s-number-field label="Inventory Quantity" name="inventory" min="0" step="1"></s-number-field>
      </s-grid>
      <s-button variant="primary" icon="save">Create Product</s-button>
    </s-stack>
  </s-section>
</s-page>`;

      case "actions":
        return codeFormat === "tsx"
          ? `<s-button-group gap="base">
  <s-button
    variant="${propsConfig.buttonVariant}"
    tone="${propsConfig.buttonTone}"
    ${propsConfig.buttonLoading ? "loading" : ""}
    ${propsConfig.buttonDisabled ? "disabled" : ""}
  >
    Configured Action Button
  </s-button>
  <s-button variant="secondary">Secondary Action</s-button>
  <s-button variant="tertiary" tone="critical">Delete</s-button>
</s-button-group>`
          : `<s-button-group gap="base">
  <s-button
    variant="${propsConfig.buttonVariant}"
    tone="${propsConfig.buttonTone}"
    ${propsConfig.buttonLoading ? "loading" : ""}
    ${propsConfig.buttonDisabled ? "disabled" : ""}
  >
    Configured Action Button
  </s-button>
  <s-button variant="secondary">Secondary Action</s-button>
  <s-button variant="tertiary" tone="critical">Delete</s-button>
</s-button-group>`;

      case "feedback":
        return codeFormat === "tsx"
          ? `<s-stack direction="block" gap="base">
  <s-banner heading="System Alert" tone="${propsConfig.bannerTone}" dismissible>
    Configured alert banner with dynamic Polaris tones.
  </s-banner>
  <s-stack direction="inline" gap="base" alignItems="center">
    <s-badge tone="${propsConfig.badgeTone}">Dynamic Status (${propsConfig.badgeTone})</s-badge>
    <s-badge tone="success">Active</s-badge>
    <s-badge tone="critical">Sync Failed</s-badge>
  </s-stack>
</s-stack>`
          : `<s-stack direction="block" gap="base">
  <s-banner heading="System Alert" tone="${propsConfig.bannerTone}" dismissible>
    Configured alert banner with dynamic Polaris tones.
  </s-banner>
  <s-stack direction="inline" gap="base" align-items="center">
    <s-badge tone="${propsConfig.badgeTone}">Dynamic Status (${propsConfig.badgeTone})</s-badge>
    <s-badge tone="success">Active</s-badge>
    <s-badge tone="critical">Sync Failed</s-badge>
  </s-stack>
</s-stack>`;

      case "tables":
        return codeFormat === "tsx"
          ? `<s-table variant="auto">
  <s-table-header-row>
    <s-table-header listSlot="primary">Order ID</s-table-header>
    <s-table-header>Customer</s-table-header>
    <s-table-header listSlot="labeled" format="currency">Total</s-table-header>
    <s-table-header>Fulfillment</s-table-header>
  </s-table-header-row>
  <s-table-body>
    <s-table-row>
      <s-table-cell>#1042</s-table-cell>
      <s-table-cell>Alex Rivera</s-table-cell>
      <s-table-cell>$189.50</s-table-cell>
      <s-table-cell><s-badge tone="success">Fulfilled</s-badge></s-table-cell>
    </s-table-row>
  </s-table-body>
</s-table>`
          : `<s-table variant="auto">
  <s-table-header-row>
    <s-table-header list-slot="primary">Order ID</s-table-header>
    <s-table-header>Customer</s-table-header>
    <s-table-header list-slot="labeled" format="currency">Total</s-table-header>
    <s-table-header>Fulfillment</s-table-header>
  </s-table-header-row>
  <s-table-body>
    <s-table-row>
      <s-table-cell>#1042</s-table-cell>
      <s-table-cell>Alex Rivera</s-table-cell>
      <s-table-cell>$189.50</s-table-cell>
      <s-table-cell><s-badge tone="success">Fulfilled</s-badge></s-table-cell>
    </s-table-row>
  </s-table-body>
</s-table>`;

      default:
        return polarisComponentsData[0].snippetTsx;
    }
  }, [activeCategory, codeFormat, propsConfig]);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="flex flex-col rounded-2xl border border-gray-30 bg-[#0F172A] text-white shadow-md overflow-hidden">
      {/* ── Header Bar ── */}
      <div className="flex items-center justify-between border-b border-gray-800 bg-[#1E293B]/80 px-4 py-3">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-emerald-400" />
          <span className="font-mono text-xs font-semibold text-gray-200">
            Polaris Web Component Code
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-lg bg-black/40 p-0.5">
            <button
              type="button"
              onClick={() => setCodeFormat("tsx")}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 font-mono text-[11px] font-medium transition-colors cursor-pointer ${
                codeFormat === "tsx"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <FileCode className="h-3 w-3" />
              TSX / JSX
            </button>
            <button
              type="button"
              onClick={() => setCodeFormat("html")}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 font-mono text-[11px] font-medium transition-colors cursor-pointer ${
                codeFormat === "html"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Code2 className="h-3 w-3" />
              HTML
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg border border-gray-700 bg-gray-800/80 px-3 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer"
          >
            {copiedCode ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Code Box ── */}
      <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-gray-300">
        <code>{codeSnippet}</code>
      </pre>
    </div>
  );
}
