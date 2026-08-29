export type PolarisExampleItemType = {
  id: string;
  title: string;
  description: string;
  codeHtml: string;
  codeTsx: string;
  renderKey: string;
};

export type PolarisDocComponentType = {
  slug: string;
  name: string;
  category: "actions" | "feedback" | "forms" | "layout" | "display";
  categoryLabel: string;
  description: string;
  summary: string;
  docsUrl: string;
  previewType: string;
  examples: PolarisExampleItemType[];
};

export type PolarisNavCategoryType = {
  id: string;
  label: string;
  items: {
    slug: string;
    label: string;
  }[];
};

export const polarisNavSectionsData: PolarisNavCategoryType[] = [
  {
    id: "actions",
    label: "Actions",
    items: [
      { slug: "button", label: "Button" },
      { slug: "clickable", label: "Clickable" },
      { slug: "link", label: "Link" },
      { slug: "menu", label: "Menu" },
      { slug: "button-group", label: "Button group" },
      { slug: "clickable-chip", label: "Clickable chip" },
    ],
  },
  {
    id: "feedback",
    label: "Feedback and status indicators",
    items: [
      { slug: "badge", label: "Badge" },
      { slug: "banner", label: "Banner" },
      { slug: "spinner", label: "Spinner" },
      { slug: "chip", label: "Chip" },
    ],
  },
  {
    id: "forms",
    label: "Forms",
    items: [
      { slug: "text-field", label: "Text field" },
      { slug: "select", label: "Select" },
      { slug: "switch", label: "Switch" },
      { slug: "color-field", label: "Color field" },
      { slug: "drop-zone", label: "Drop zone" },
      { slug: "number-field", label: "Number field" },
      { slug: "money-field", label: "Money field" },
    ],
  },
  {
    id: "layout",
    label: "Layout and structure",
    items: [
      { slug: "page", label: "Page" },
      { slug: "section", label: "Section" },
      { slug: "grid", label: "Grid" },
      { slug: "box", label: "Box" },
      { slug: "stack", label: "Stack" },
      { slug: "table", label: "Table" },
      { slug: "divider", label: "Divider" },
    ],
  },
];

export const polarisDocComponentsData: PolarisDocComponentType[] = [
  // ── Actions ──
  {
    slug: "button",
    name: "Button",
    category: "actions",
    categoryLabel: "Actions",
    description:
      "Trigger actions or events, such as submitting forms, opening dialogs, or navigating to other pages.",
    summary:
      "Buttons allow users to take actions, and make choices, with a single tap.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/actions/button",
    previewType: "button",
    examples: [
      {
        id: "btn-ex-1",
        title: "Standard primary and secondary buttons",
        description:
          "Buttons with different visual hierarchy weights to distinguish main actions from cancel or discard choices.",
        codeHtml: `<s-button-group gap="base">
  <s-button variant="primary">Add product</s-button>
  <s-button variant="secondary">Cancel</s-button>
  <s-button variant="tertiary" tone="critical">Delete</s-button>
</s-button-group>`,
        codeTsx: `<s-button-group gap="base">
  <s-button variant="primary">Add product</s-button>
  <s-button variant="secondary">Cancel</s-button>
  <s-button variant="tertiary" tone="critical">Delete</s-button>
</s-button-group>`,
        renderKey: "button-variants",
      },
      {
        id: "btn-ex-2",
        title: "Button with icon and loading state",
        description:
          "Buttons can display an icon to reinforce intent, or a loading spinner during asynchronous operations.",
        codeHtml: `<s-button-group gap="base">
  <s-button variant="primary" icon="save">Save changes</s-button>
  <s-button variant="primary" loading>Updating...</s-button>
  <s-button variant="secondary" disabled>Disabled</s-button>
</s-button-group>`,
        codeTsx: `<s-button-group gap="base">
  <s-button variant="primary" icon="save">Save changes</s-button>
  <s-button variant="primary" loading>Updating...</s-button>
  <s-button variant="secondary" disabled>Disabled</s-button>
</s-button-group>`,
        renderKey: "button-states",
      },
    ],
  },
  {
    slug: "clickable",
    name: "Clickable",
    category: "actions",
    categoryLabel: "Actions",
    description:
      "Create custom interactive elements not achievable with Button or Link.",
    summary:
      "Wraps custom HTML content to create flexible clickable surfaces with interactive hover and focus styles.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/actions/clickable",
    previewType: "clickable",
    examples: [
      {
        id: "click-ex-1",
        title: "Create a custom interactive element",
        description:
          "Build custom interactive elements with flexible styling that button or link don't support. This example shows two clickable elements with different background and border styles.",
        codeHtml: `<s-clickable padding="base">Create Store</s-clickable>

<s-clickable
  border="base"
  padding="base"
  background="subdued"
  borderRadius="base"
>
  View Shipping Settings
</s-clickable>`,
        codeTsx: `<s-clickable padding="base">Create Store</s-clickable>

<s-clickable
  border="base"
  padding="base"
  background="subdued"
  borderRadius="base"
>
  View Shipping Settings
</s-clickable>`,
        renderKey: "clickable-custom",
      },
      {
        id: "click-ex-2",
        title: "Navigate to a URL",
        description:
          "Set the href property to make a clickable element navigate like a link. This example shows a clickable component that opens a URL in a new browser tab.",
        codeHtml: `<s-clickable href="https://shopify.com" target="_blank">
  Visit Shopify
</s-clickable>`,
        codeTsx: `<s-clickable href="https://shopify.com" target="_blank">
  Visit Shopify
</s-clickable>`,
        renderKey: "clickable-url",
      },
      {
        id: "click-ex-3",
        title: "Create a form submit button",
        description:
          "Set the type property to submit to trigger form submission when clicked.",
        codeHtml: `<s-clickable type="submit" padding="base" background="subdued" borderRadius="base">
  Submit Application Form
</s-clickable>`,
        codeTsx: `<s-clickable type="submit" padding="base" background="subdued" borderRadius="base">
  Submit Application Form
</s-clickable>`,
        renderKey: "clickable-submit",
      },
    ],
  },
  {
    slug: "link",
    name: "Link",
    category: "actions",
    categoryLabel: "Actions",
    description:
      "Make text interactive for navigating to other pages or performing actions.",
    summary:
      "Links take users to another page or location, either within the app or externally.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/actions/link",
    previewType: "link",
    examples: [
      {
        id: "link-ex-1",
        title: "Standard external and internal link",
        description:
          "Render accessible links with auto or monochrome tone styling.",
        codeHtml: `<s-link href="https://snowdevil.myshopify.com" tone="auto">
  snowdevil.myshopify.com
</s-link>`,
        codeTsx: `<s-link href="https://snowdevil.myshopify.com" tone="auto">
  snowdevil.myshopify.com
</s-link>`,
        renderKey: "link-standard",
      },
    ],
  },
  {
    slug: "menu",
    name: "Menu",
    category: "actions",
    categoryLabel: "Actions",
    description:
      "Display a list of actions that can be performed on a resource.",
    summary:
      "Collapsible menu triggered by a button to save horizontal interface space.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/actions/menu",
    previewType: "menu",
    examples: [
      {
        id: "menu-ex-1",
        title: "Resource action dropdown menu",
        description:
          "Anchor a menu to a trigger button using commandFor to show secondary actions.",
        codeHtml: `<s-button commandFor="actions-menu" icon="menu-vertical">More actions</s-button>
<s-menu id="actions-menu" accessibilityLabel="Actions">
  <s-button variant="tertiary" icon="import">Import list</s-button>
  <s-button variant="tertiary" icon="export">Export list</s-button>
</s-menu>`,
        codeTsx: `<s-button commandFor="actions-menu" icon="menu-vertical">More actions</s-button>
<s-menu id="actions-menu" accessibilityLabel="Actions">
  <s-button variant="tertiary" icon="import">Import list</s-button>
  <s-button variant="tertiary" icon="export">Export list</s-button>
</s-menu>`,
        renderKey: "menu-standard",
      },
    ],
  },
  {
    slug: "button-group",
    name: "Button group",
    category: "actions",
    categoryLabel: "Actions",
    description:
      "The button group component displays multiple related buttons in a structured layout.",
    summary:
      "Groups related action buttons together horizontally with consistent spacing.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/actions/button-group",
    previewType: "button-group",
    examples: [
      {
        id: "bg-ex-1",
        title: "Inline action button group",
        description:
          "Group related primary and secondary action buttons with automatic gap spacing.",
        codeHtml: `<s-button-group gap="base">
  <s-button variant="secondary">Cancel</s-button>
  <s-button variant="primary">Save</s-button>
</s-button-group>`,
        codeTsx: `<s-button-group gap="base">
  <s-button variant="secondary">Cancel</s-button>
  <s-button variant="primary">Save</s-button>
</s-button-group>`,
        renderKey: "button-group-standard",
      },
    ],
  },
  {
    slug: "clickable-chip",
    name: "Clickable chip",
    category: "actions",
    categoryLabel: "Actions",
    description:
      "The clickable chip component displays interactive labels or categories that users can click or dismiss.",
    summary:
      "Interactive chip supporting selection toggling and removal callbacks.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/actions/clickable-chip",
    previewType: "clickable-chip",
    examples: [
      {
        id: "chip-ex-1",
        title: "Removable filter chip",
        description:
          "Chip with removable attribute allowing users to dismiss active filters.",
        codeHtml: `<s-clickable-chip color="strong" removable accessibilityLabel="Filter: Out of stock">
  Out of stock
</s-clickable-chip>`,
        codeTsx: `<s-clickable-chip color="strong" removable accessibilityLabel="Filter: Out of stock">
  Out of stock
</s-clickable-chip>`,
        renderKey: "clickable-chip-standard",
      },
    ],
  },

  // ── Feedback & Status ──
  {
    slug: "badge",
    name: "Badge",
    category: "feedback",
    categoryLabel: "Feedback and status indicators",
    description:
      "Inform users of the status of an object or of an action with colored badge indicators.",
    summary:
      "Compact visual indicator for item statuses, tones, and categorical labels.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/feedback/badge",
    previewType: "badge",
    examples: [
      {
        id: "badge-ex-1",
        title: "Status tones",
        description:
          "Badges with different tones (success, warning, critical, info, auto) communicating item fulfillment or review state.",
        codeHtml: `<s-stack direction="inline" gap="base" alignItems="center">
  <s-badge tone="success">Fulfilled</s-badge>
  <s-badge tone="info">Draft</s-badge>
  <s-badge tone="success">Active</s-badge>
  <s-badge tone="warning">Open</s-badge>
  <s-badge tone="warning">On hold</s-badge>
  <s-badge tone="critical">Action required</s-badge>
</s-stack>`,
        codeTsx: `<s-stack direction="inline" gap="base" alignItems="center">
  <s-badge tone="success">Fulfilled</s-badge>
  <s-badge tone="info">Draft</s-badge>
  <s-badge tone="success">Active</s-badge>
  <s-badge tone="warning">Open</s-badge>
  <s-badge tone="warning">On hold</s-badge>
  <s-badge tone="critical">Action required</s-badge>
</s-stack>`,
        renderKey: "badge-tones",
      },
    ],
  },
  {
    slug: "banner",
    name: "Banner",
    category: "feedback",
    categoryLabel: "Feedback and status indicators",
    description:
      "Informs merchants about important system status, warnings, errors, or critical next steps.",
    summary:
      "Prominent alert message cards with optional headings and dismissibility.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/feedback/banner",
    previewType: "banner",
    examples: [
      {
        id: "banner-ex-1",
        title: "Informational & success banners",
        description:
          "Display contextual messages informing users about progress, completed operations, or required inputs.",
        codeHtml: `<s-stack direction="block" gap="base">
  <s-banner heading="3 of 5 variants created." tone="info">
    Review the created variants in your product list.
  </s-banner>
  <s-banner heading="Update successful." tone="success" dismissible>
    Your store settings were updated successfully.
  </s-banner>
</s-stack>`,
        codeTsx: `<s-stack direction="block" gap="base">
  <s-banner heading="3 of 5 variants created." tone="info">
    Review the created variants in your product list.
  </s-banner>
  <s-banner heading="Update successful." tone="success" dismissible>
    Your store settings were updated successfully.
  </s-banner>
</s-stack>`,
        renderKey: "banner-standard",
      },
    ],
  },
  {
    slug: "spinner",
    name: "Spinner",
    category: "feedback",
    categoryLabel: "Feedback and status indicators",
    description:
      "Provides visual feedback during asynchronous data fetching or background execution.",
    summary:
      "Circular spinner graphic with accessibility labels for loading states.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/feedback/spinner",
    previewType: "spinner",
    examples: [
      {
        id: "spin-ex-1",
        title: "Loading spinner",
        description:
          "Show a spinner when waiting for network responses or processing data.",
        codeHtml: `<s-spinner size="base" accessibilityLabel="Loading data"></s-spinner>`,
        codeTsx: `<s-spinner size="base" accessibilityLabel="Loading data"></s-spinner>`,
        renderKey: "spinner-standard",
      },
    ],
  },
  {
    slug: "chip",
    name: "Chip",
    category: "feedback",
    categoryLabel: "Feedback and status indicators",
    description:
      "Compact visual elements that represent an attribute, category, or entity.",
    summary: "Static tag or category chip for tagging items.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/feedback/chip",
    previewType: "chip",
    examples: [
      {
        id: "chip-ex-1",
        title: "Standard Category Chip",
        description: "Static visual chip indicating a product category.",
        codeHtml: `<s-chip color="base" accessibilityLabel="Tag: Footwear">Footwear</s-chip>`,
        codeTsx: `<s-chip color="base" accessibilityLabel="Tag: Footwear">Footwear</s-chip>`,
        renderKey: "chip-standard",
      },
    ],
  },

  // ── Forms ──
  {
    slug: "text-field",
    name: "Text field",
    category: "forms",
    categoryLabel: "Forms",
    description:
      "Input element for single-line text data with icons, validation errors, and clear buttons.",
    summary:
      "Allows merchants to enter and edit text information in forms.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/forms/text-field",
    previewType: "text-field",
    examples: [
      {
        id: "tf-ex-1",
        title: "Text field with label and placeholder",
        description: "Single-line input with placeholder text and required validation.",
        codeHtml: `<s-text-field
  label="Product Title"
  name="title"
  placeholder="e.g. Vintage Leather Jacket"
  required
></s-text-field>`,
        codeTsx: `<s-text-field
  label="Product Title"
  name="title"
  placeholder="e.g. Vintage Leather Jacket"
  required
></s-text-field>`,
        renderKey: "text-field-standard",
      },
    ],
  },
  {
    slug: "select",
    name: "Select",
    category: "forms",
    categoryLabel: "Forms",
    description:
      "Allows merchants to choose one option from a predefined list of choices.",
    summary: "Drop-down selection input component.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/forms/select",
    previewType: "select",
    examples: [
      {
        id: "sel-ex-1",
        title: "Select dropdown with options",
        description: "Standard select input containing options for collections.",
        codeHtml: `<s-select label="Collection" name="collection">
  <s-option value="apparel">Apparel &amp; Accessories</s-option>
  <s-option value="electronics">Electronics</s-option>
  <s-option value="home">Home &amp; Kitchen</s-option>
</s-select>`,
        codeTsx: `<s-select label="Collection" name="collection">
  <s-option value="apparel">Apparel &amp; Accessories</s-option>
  <s-option value="electronics">Electronics</s-option>
  <s-option value="home">Home &amp; Kitchen</s-option>
</s-select>`,
        renderKey: "select-standard",
      },
    ],
  },
  {
    slug: "switch",
    name: "Switch",
    category: "forms",
    categoryLabel: "Forms",
    description:
      "A toggle control that immediately activates or deactivates a specific feature or setting.",
    summary: "Binary toggle control for store settings.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/forms/switch",
    previewType: "switch",
    examples: [
      {
        id: "sw-ex-1",
        title: "Active toggle switch",
        description: "Toggle control for inventory tracking and sync features.",
        codeHtml: `<s-switch label="Track inventory for this product" name="trackInventory" checked></s-switch>`,
        codeTsx: `<s-switch label="Track inventory for this product" name="trackInventory" checked></s-switch>`,
        renderKey: "switch-standard",
      },
    ],
  },
  {
    slug: "color-field",
    name: "Color field",
    category: "forms",
    categoryLabel: "Forms",
    description:
      "Input element allowing merchants to select hex/alpha colors through an integrated picker.",
    summary: "Color input field with interactive color picker preview.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/forms/color-field",
    previewType: "color-field",
    examples: [
      {
        id: "cf-ex-1",
        title: "Brand accent color picker",
        description: "Color input field with alpha channel support.",
        codeHtml: `<s-color-field label="Accent Color" name="accentColor" value="#2563EB"></s-color-field>`,
        codeTsx: `<s-color-field label="Accent Color" name="accentColor" value="#2563EB"></s-color-field>`,
        renderKey: "color-field-standard",
      },
    ],
  },
  {
    slug: "drop-zone",
    name: "Drop zone",
    category: "forms",
    categoryLabel: "Forms",
    description:
      "File upload zone allowing drag and drop or browsing for images and documents.",
    summary: "File upload drop zone component.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/forms/drop-zone",
    previewType: "drop-zone",
    examples: [
      {
        id: "dz-ex-1",
        title: "Image upload drop zone",
        description: "Accepts multiple image file formats for product galleries.",
        codeHtml: `<s-drop-zone label="Upload product media" name="files" accept=".jpg,.png,.webp" multiple></s-drop-zone>`,
        codeTsx: `<s-drop-zone label="Upload product media" name="files" accept=".jpg,.png,.webp" multiple></s-drop-zone>`,
        renderKey: "drop-zone-standard",
      },
    ],
  },

  // ── Layout & Structure ──
  {
    slug: "page",
    name: "Page",
    category: "layout",
    categoryLabel: "Layout and structure",
    description:
      "Top-level container for an App Home view. Sets the max inline size, heading, and breadcrumb navigation actions.",
    summary: "Primary wrapper for App Home screens.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/page",
    previewType: "page",
    examples: [
      {
        id: "page-ex-1",
        title: "Standard page structure",
        description: "Creates consistent page layout with automatic spacing and heading.",
        codeHtml: `<s-page heading="Store Analytics" inline-size="base">
  <s-section heading="Overview">
    <s-text>Monitor store metrics across all active sales channels.</s-text>
  </s-section>
</s-page>`,
        codeTsx: `<s-page heading="Store Analytics" inlineSize="base">
  <s-section heading="Overview">
    <s-text>Monitor store metrics across all active sales channels.</s-text>
  </s-section>
</s-page>`,
        renderKey: "page-standard",
      },
    ],
  },
  {
    slug: "section",
    name: "Section",
    category: "layout",
    categoryLabel: "Layout and structure",
    description:
      "A card-like content container that groups related controls and information with consistent padding.",
    summary: "Card container grouping related settings or data.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/section",
    previewType: "section",
    examples: [
      {
        id: "sec-ex-1",
        title: "Section with heading and action",
        description: "Card container grouping text and action button.",
        codeHtml: `<s-section heading="Inventory Settings">
  <s-stack direction="block" gap="base">
    <s-text>Automate low-stock alerts to your team email.</s-text>
    <s-button variant="primary">Configure alerts</s-button>
  </s-stack>
</s-section>`,
        codeTsx: `<s-section heading="Inventory Settings">
  <s-stack direction="block" gap="base">
    <s-text>Automate low-stock alerts to your team email.</s-text>
    <s-button variant="primary">Configure alerts</s-button>
  </s-stack>
</s-section>`,
        renderKey: "section-standard",
      },
    ],
  },
  {
    slug: "grid",
    name: "Grid",
    category: "layout",
    categoryLabel: "Layout and structure",
    description:
      "Multi-column responsive grid container. Recommended over inline stacks for aligning inputs and action buttons.",
    summary: "CSS grid container with proportional template columns.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/grid",
    previewType: "grid",
    examples: [
      {
        id: "grid-ex-1",
        title: "Three column KPI grid",
        description: "Grid dividing KPI boxes evenly across horizontal space.",
        codeHtml: `<s-grid grid-template-columns="1fr 1fr 1fr" gap="base">
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
        codeTsx: `<s-grid gridTemplateColumns="1fr 1fr 1fr" gap="base">
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
        renderKey: "grid-standard",
      },
    ],
  },
  {
    slug: "table",
    name: "Table",
    category: "layout",
    categoryLabel: "Layout and structure",
    description:
      "Data grid designed to present tabular datasets with structured header and body rows.",
    summary: "Responsive data table component.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/data-display/table",
    previewType: "table",
    examples: [
      {
        id: "tbl-ex-1",
        title: "Product inventory data table",
        description: "Table with headers, currency formatting, and status badges.",
        codeHtml: `<s-table variant="auto">
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
</s-table>`,
        codeTsx: `<s-table variant="auto">
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
</s-table>`,
        renderKey: "table-standard",
      },
    ],
  },
];
