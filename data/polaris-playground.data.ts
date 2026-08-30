import type { PolarisCategoryItemType, PolarisComponentDocType } from "@/types";

export const polarisCategoriesData: PolarisCategoryItemType[] = [
  {
    id: "dashboard",
    label: "App Home Overview",
    description: "Complete Shopify App Home layout with real-world patterns",
    iconName: "LayoutDashboard",
    badgeCount: 6,
  },
  {
    id: "forms",
    label: "Forms & Inputs",
    description: "Data collection inputs, pickers, switches, and drop zones",
    iconName: "FormInput",
    badgeCount: 10,
  },
  {
    id: "actions",
    label: "Actions & Overlays",
    description: "Buttons, button groups, clickables, menus, and modals",
    iconName: "MousePointerClick",
    badgeCount: 6,
  },
  {
    id: "feedback",
    label: "Feedback & Status",
    description: "Badges, banners, chips, spinners, and tooltips",
    iconName: "AlertCircle",
    badgeCount: 6,
  },
  {
    id: "tables",
    label: "Tables & Lists",
    description: "Data grid tables, ordered and unordered structured lists",
    iconName: "Table",
    badgeCount: 4,
  },
  {
    id: "layout",
    label: "Layout & Structure",
    description: "Page wrappers, sections, boxes, stacks, and grids",
    iconName: "Grid",
    badgeCount: 6,
  },
];

export const polarisComponentsData: PolarisComponentDocType[] = [
  {
    id: "s-page",
    tag: "s-page",
    name: "Page",
    category: "layout",
    description:
      "Top-level container for an App Home view. Sets the max inline size, heading, and breadcrumb navigation actions.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/page",
    propsList: ["heading", "inlineSize", "subtitle"],
    snippetTsx: `<s-page heading="Store Analytics" inlineSize="base">
  <s-section heading="Performance Overview">
    <s-paragraph>Monitor store metrics across all active sales channels.</s-paragraph>
  </s-section>
</s-page>`,
    snippetHtml: `<s-page heading="Store Analytics" inline-size="base">
  <s-section heading="Performance Overview">
    <s-paragraph>Monitor store metrics across all active sales channels.</s-paragraph>
  </s-section>
</s-page>`,
  },
  {
    id: "s-section",
    tag: "s-section",
    name: "Section",
    category: "layout",
    description:
      "A card-like content container that groups related controls and information with consistent padding.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/section",
    propsList: ["heading", "padding"],
    snippetTsx: `<s-section heading="Product Inventory">
  <s-stack direction="block" gap="base">
    <s-text>Configure automated inventory sync across warehouses.</s-text>
    <s-button variant="primary">Configure Sync</s-button>
  </s-stack>
</s-section>`,
    snippetHtml: `<s-section heading="Product Inventory">
  <s-stack direction="block" gap="base">
    <s-text>Configure automated inventory sync across warehouses.</s-text>
    <s-button variant="primary">Configure Sync</s-button>
  </s-stack>
</s-section>`,
  },
  {
    id: "s-grid",
    tag: "s-grid",
    name: "Grid",
    category: "layout",
    description:
      "Multi-column responsive grid container. Recommended over inline stacks for aligning inputs and action buttons.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/grid",
    propsList: ["gridTemplateColumns", "gap", "alignItems"],
    snippetTsx: `<s-grid gridTemplateColumns="1fr 1fr 1fr" gap="base">
  <s-box padding="base" background="subdued" border="base" borderRadius="base">
    <s-heading>Gross Sales</s-heading>
    <s-text type="strong" tone="success">$48,250.00</s-text>
  </s-box>
  <s-box padding="base" background="subdued" border="base" borderRadius="base">
    <s-heading>Orders</s-heading>
    <s-text type="strong">1,248</s-text>
  </s-box>
  <s-box padding="base" background="subdued" border="base" borderRadius="base">
    <s-heading>Conversion</s-heading>
    <s-text type="strong" tone="info">3.82%</s-text>
  </s-box>
</s-grid>`,
    snippetHtml: `<s-grid grid-template-columns="1fr 1fr 1fr" gap="base">
  <s-box padding="base" background="subdued" border="base" border-radius="base">
    <s-heading>Gross Sales</s-heading>
    <s-text type="strong" tone="success">$48,250.00</s-text>
  </s-box>
  <s-box padding="base" background="subdued" border="base" border-radius="base">
    <s-heading>Orders</s-heading>
    <s-text type="strong">1,248</s-text>
  </s-box>
  <s-box padding="base" background="subdued" border="base" border-radius="base">
    <s-heading>Conversion</s-heading>
    <s-text type="strong" tone="info">3.82%</s-text>
  </s-box>
</s-grid>`,
  },
  {
    id: "s-button",
    tag: "s-button",
    name: "Button",
    category: "actions",
    description:
      "Triggers an action or event with distinct visual weights, tones, icons, and loading states.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/actions/button",
    propsList: ["variant", "tone", "icon", "disabled", "loading", "type"],
    snippetTsx: `<s-button-group gap="base">
  <s-button variant="primary" icon="save">Save Changes</s-button>
  <s-button variant="secondary">Discard</s-button>
  <s-button variant="tertiary" tone="critical" icon="trash">Delete Product</s-button>
</s-button-group>`,
    snippetHtml: `<s-button-group gap="base">
  <s-button variant="primary" icon="save">Save Changes</s-button>
  <s-button variant="secondary">Discard</s-button>
  <s-button variant="tertiary" tone="critical" icon="trash">Delete Product</s-button>
</s-button-group>`,
  },
  {
    id: "s-text-field",
    tag: "s-text-field",
    name: "Text Field",
    category: "forms",
    description:
      "Input element for single-line text data with icons, validation errors, and clear buttons.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/forms/text-field",
    propsList: ["label", "name", "value", "placeholder", "icon", "required"],
    snippetTsx: `<s-text-field
  label="Product Title"
  name="title"
  placeholder="e.g. Vintage Leather Jacket"
  icon="product"
  required
></s-text-field>`,
    snippetHtml: `<s-text-field
  label="Product Title"
  name="title"
  placeholder="e.g. Vintage Leather Jacket"
  icon="product"
  required
></s-text-field>`,
  },
  {
    id: "s-switch",
    tag: "s-switch",
    name: "Switch",
    category: "forms",
    description:
      "A toggle control that immediately activates or deactivates a specific feature or setting.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/forms/switch",
    propsList: ["label", "name", "checked", "disabled"],
    snippetTsx: `<s-switch
  label="Enable Automated Fulfillment Sync"
  name="autoSync"
  checked
></s-switch>`,
    snippetHtml: `<s-switch
  label="Enable Automated Fulfillment Sync"
  name="autoSync"
  checked
></s-switch>`,
  },
  {
    id: "s-banner",
    tag: "s-banner",
    name: "Banner",
    category: "feedback",
    description:
      "Informs merchants about important system status, warnings, errors, or critical next steps.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/feedback/banner",
    propsList: ["heading", "tone", "dismissible"],
    snippetTsx: `<s-banner heading="API Key Verification Required" tone="warning" dismissible>
  Your webhook endpoint returned a 401 Unauthorized status. Please update your secret key in Settings.
</s-banner>`,
    snippetHtml: `<s-banner heading="API Key Verification Required" tone="warning" dismissible>
  Your webhook endpoint returned a 401 Unauthorized status. Please update your secret key in Settings.
</s-banner>`,
  },
  {
    id: "s-badge",
    tag: "s-badge",
    name: "Badge",
    category: "feedback",
    description: "Compact visual indicator for item statuses, tones, and categorical labels.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/feedback/badge",
    propsList: ["tone", "color", "icon", "size"],
    snippetTsx: `<s-stack direction="inline" gap="base" alignItems="center">
  <s-badge tone="success" icon="check-circle">Active &amp; Published</s-badge>
  <s-badge tone="warning" icon="clock">Draft Pending</s-badge>
  <s-badge tone="critical" icon="alert-triangle">Sync Error</s-badge>
  <s-badge tone="info">Beta Feature</s-badge>
</s-stack>`,
    snippetHtml: `<s-stack direction="inline" gap="base" align-items="center">
  <s-badge tone="success" icon="check-circle">Active &amp; Published</s-badge>
  <s-badge tone="warning" icon="clock">Draft Pending</s-badge>
  <s-badge tone="critical" icon="alert-triangle">Sync Error</s-badge>
  <s-badge tone="info">Beta Feature</s-badge>
</s-stack>`,
  },
  {
    id: "s-table",
    tag: "s-table",
    name: "Table",
    category: "tables",
    description:
      "Data grid designed to present tabular datasets with structured header and body rows.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/data-display/table",
    propsList: ["variant"],
    snippetTsx: `<s-table variant="auto">
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
    <s-table-row>
      <s-table-cell>Wireless Charging Dock</s-table-cell>
      <s-table-cell>WC-300-SLV</s-table-cell>
      <s-table-cell>$59.00</s-table-cell>
      <s-table-cell><s-badge tone="warning">Low Stock</s-badge></s-table-cell>
    </s-table-row>
  </s-table-body>
</s-table>`,
    snippetHtml: `<s-table variant="auto">
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
    <s-table-row>
      <s-table-cell>Wireless Charging Dock</s-table-cell>
      <s-table-cell>WC-300-SLV</s-table-cell>
      <s-table-cell>$59.00</s-table-cell>
      <s-table-cell><s-badge tone="warning">Low Stock</s-badge></s-table-cell>
    </s-table-row>
  </s-table-body>
</s-table>`,
  },
];
