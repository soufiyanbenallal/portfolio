export type PolarisExampleFileSourceType = {
  name: string;
  path: string;
  sourcePath: string;
  language?: string;
};

export type PolarisExampleItemType = {
  id: string;
  title: string;
  description?: string;
  renderKey: string;
  installCommand?: string;
  fileSources: PolarisExampleFileSourceType[];
};

export type PolarisDocComponentType = {
  slug: string;
  name: string;
  category:
    | "stats"
    | "feedback"
    | "layout"
    | "typography"
    | "actions"
    | "forms"
    | "media";
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
  description?: string;
  items: {
    slug: string;
    label: string;
  }[];
};

export const polarisNavSectionsData: PolarisNavCategoryType[] = [
  {
    id: "stats",
    label: "Stats & Analytics",
    description:
      "Interactive KPI metrics sections, sparklines, and metric cards for analytics dashboards.",
    items: [
      { slug: "stats-section", label: "Stats section" },
    ],
  },
  {
    id: "feedbacks",
    label: "Feedback & Status",
    description:
      "Dismissable banners, feedback cards, and system status indicators.",
    items: [
      { slug: "dismissable-banner", label: "Dismissable banner" },
    ],
  },
  {
    id: "layouts",
    label: "Layout & Structure",
    description:
      "Contained section cards, tabs, sortable lists, and structural layout containers.",
    items: [
      { slug: "section-card", label: "Section card" },
      { slug: "tabs", label: "Tabs" },
    ],
  },
  {
    id: "forms",
    label: "Forms",
    description:
      "Form inputs, selects, checkboxes, switches, and sliders.",
    items: [
      { slug: "input", label: "Input" },
      { slug: "select", label: "Select" },
      { slug: "checkbox", label: "Checkbox" },
      { slug: "toggle", label: "Toggle" },
      { slug: "range", label: "Range" },
    ],
  },
  {
    id: "typography",
    label: "Typography & Content",
    description:
      "Contextual helper tooltips, typography utilities, and inline badges.",
    items: [
      { slug: "info-tooltip", label: "Info tooltip" },
    ],
  },
  {
    id: "actions",
    label: "Actions",
    description:
      "Action buttons, clickable triggers, and interactive controls.",
    items: [],
  },
  {
    id: "media",
    label: "Media",
    description:
      "Media players, icons, and visual assets.",
    items: [],
  },
];

export const polarisDocComponentsData: PolarisDocComponentType[] = [
  // ── Stats & Analytics ──
  {
    slug: "stats-section",
    name: "Stats section",
    category: "stats",
    categoryLabel: "Stats & Analytics",
    description:
      "Interactive KPI metrics grid featuring sparkline trends, icon badges, and responsive columns.",
    summary:
      "Full KPI analytics dashboard section combining metric cards, sparklines, and responsive grid layouts.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/layout/grid",
    previewType: "stats-section",
    examples: [
      {
        id: "stats-section-block",
        title: "KPI metrics grid with sparklines",
        description:
          "Responsive 4-column metrics section with SVG trend sparklines.",
        renderKey: "stats-section-example",
        installCommand: "npx shadcn@latest add stats-section",
        fileSources: [
          {
            name: "StatsSectionExample.tsx",
            path: "example/StatsSectionExample.tsx",
            sourcePath:
              "app/polaris-playground/components/examples/StatsSectionExample.tsx",
            language: "tsx",
          },
          {
            name: "StatsSection.tsx",
            path: "ui/StatsSection.tsx",
            sourcePath: "app/kits/polaris/ui/stats/StatsSection.tsx",
            language: "tsx",
          },
          {
            name: "StatsCard.tsx",
            path: "ui/StatsCard.tsx",
            sourcePath: "app/kits/polaris/ui/stats/StatsCard.tsx",
            language: "tsx",
          },
        ],
      },
    ],
  },

  // ── Feedbacks ──
  {
    slug: "dismissable-banner",
    name: "Dismissable banner",
    category: "feedback",
    categoryLabel: "Feedback & Status",
    description:
      "Contextual notification banner that remembers its dismissed state in localStorage.",
    summary:
      "Persistently dismissable alert banners for store migrations, announcements, and success messages.",
    docsUrl:
      "https://shopify.dev/docs/api/app-home/web-components/feedback/banner",
    previewType: "dismissable-banner",
    examples: [
      {
        id: "dismissable-banner-block",
        title: "Dismissable contextual banners",
        description: "Banners with tone variants that persist closure.",
        renderKey: "dismissable-banner-example",
        installCommand: "npx shadcn@latest add dismissable-banner",
        fileSources: [
          {
            name: "DismissableBannerExample.tsx",
            path: "example/DismissableBannerExample.tsx",
            sourcePath:
              "app/polaris-playground/components/examples/DismissableBannerExample.tsx",
            language: "tsx",
          },
          {
            name: "DismissableBanner.tsx",
            path: "ui/DismissableBanner.tsx",
            sourcePath: "app/kits/polaris/ui/feedbacks/DismissableBanner.tsx",
            language: "tsx",
          },
        ],
      },
    ],
  },

  // ── Layouts ──
  {
    slug: "section-card",
    name: "Section card",
    category: "layout",
    categoryLabel: "Layout & Structure",
    description:
      "Contained card container with header, description, custom action triggers, and configurable padding.",
    summary:
      "Structural container card for grouping related settings, forms, and merchant controls.",
    docsUrl:
      "https://shopify.dev/docs/api/app-home/web-components/layout/section",
    previewType: "section-card",
    examples: [
      {
        id: "section-card-block",
        title: "Section card with header actions",
        description: "Container card with action button and content area.",
        renderKey: "section-card-example",
        installCommand: "npx shadcn@latest add section-card",
        fileSources: [
          {
            name: "SectionCardExample.tsx",
            path: "example/SectionCardExample.tsx",
            sourcePath:
              "app/polaris-playground/components/examples/SectionCardExample.tsx",
            language: "tsx",
          },
          {
            name: "SectionCard.tsx",
            path: "ui/SectionCard.tsx",
            sourcePath: "app/kits/polaris/ui/layouts/SectionCard.tsx",
            language: "tsx",
          },
        ],
      },
    ],
  },
  {
    slug: "tabs",
    name: "Tabs",
    category: "layout",
    categoryLabel: "Layout & Structure",
    description:
      "Segmented tab navigation with badges, icons, and active state switching.",
    summary:
      "Tabbed navigation bar allowing merchants to switch between views and filtered lists.",
    docsUrl:
      "https://shopify.dev/docs/api/app-home/web-components/actions/button-group",
    previewType: "tabs",
    examples: [
      {
        id: "tabs-block",
        title: "Segmented tab navigation with count badges",
        description: "Tabs with numerical counters and smooth state switching.",
        renderKey: "tabs-example",
        installCommand: "npx shadcn@latest add tabs",
        fileSources: [
          {
            name: "TabsExample.tsx",
            path: "example/TabsExample.tsx",
            sourcePath:
              "app/polaris-playground/components/examples/TabsExample.tsx",
            language: "tsx",
          },
          {
            name: "Tabs.tsx",
            path: "ui/Tabs.tsx",
            sourcePath: "app/kits/polaris/ui/layouts/Tabs.tsx",
            language: "tsx",
          },
        ],
      },
    ],
  },

  // ── Forms ──
  {
    slug: "input",
    name: "Input",
    category: "forms",
    categoryLabel: "Forms",
    description:
      "Flexible form field supporting text, email, number, password, and multiline textarea input.",
    summary:
      "Form input field for gathering textual data with built-in validation styling and helpers.",
    docsUrl:
      "https://shopify.dev/docs/api/app-home/web-components/forms/text-field",
    previewType: "input",
    examples: [
      {
        id: "input-block",
        title: "Text, email and multiline fields",
        description: "Form inputs with validation helper text and multiline support.",
        renderKey: "input-example",
        installCommand: "npx shadcn@latest add input",
        fileSources: [
          {
            name: "InputExample.tsx",
            path: "example/InputExample.tsx",
            sourcePath:
              "app/polaris-playground/components/examples/InputExample.tsx",
            language: "tsx",
          },
          {
            name: "Input.tsx",
            path: "ui/Input.tsx",
            sourcePath: "app/kits/polaris/ui/forms/Input.tsx",
            language: "tsx",
          },
        ],
      },
    ],
  },
  {
    slug: "select",
    name: "Select",
    category: "forms",
    categoryLabel: "Forms",
    description:
      "Dropdown selection menu for choosing a single option from a list of values.",
    summary:
      "Custom styled select dropdown with helper text and validation states.",
    docsUrl:
      "https://shopify.dev/docs/api/app-home/web-components/forms/select",
    previewType: "select",
    examples: [
      {
        id: "select-block",
        title: "Standard dropdown select",
        description: "Dropdown menu with options list and helper text.",
        renderKey: "select-example",
        installCommand: "npx shadcn@latest add select",
        fileSources: [
          {
            name: "SelectExample.tsx",
            path: "example/SelectExample.tsx",
            sourcePath:
              "app/polaris-playground/components/examples/SelectExample.tsx",
            language: "tsx",
          },
          {
            name: "Select.tsx",
            path: "ui/Select.tsx",
            sourcePath: "app/kits/polaris/ui/forms/Select.tsx",
            language: "tsx",
          },
        ],
      },
    ],
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    category: "forms",
    categoryLabel: "Forms",
    description:
      "Single or grouped checkbox inputs for boolean choices and multi-option selection.",
    summary:
      "Accessible checkbox component with help text and disabled states.",
    docsUrl:
      "https://shopify.dev/docs/api/app-home/web-components/forms/checkbox",
    previewType: "checkbox",
    examples: [
      {
        id: "checkbox-block",
        title: "Checkbox with helper text",
        description: "Standard checkbox inputs for store settings and inventory triggers.",
        renderKey: "checkbox-example",
        installCommand: "npx shadcn@latest add checkbox",
        fileSources: [
          {
            name: "CheckBoxExample.tsx",
            path: "example/CheckBoxExample.tsx",
            sourcePath:
              "app/polaris-playground/components/examples/CheckBoxExample.tsx",
            language: "tsx",
          },
          {
            name: "CheckBox.tsx",
            path: "ui/CheckBox.tsx",
            sourcePath: "app/kits/polaris/ui/forms/CheckBox.tsx",
            language: "tsx",
          },
        ],
      },
    ],
  },
  {
    slug: "toggle",
    name: "Toggle",
    category: "forms",
    categoryLabel: "Forms",
    description:
      "Instant on/off toggle switch for binary preferences and live feature enabling.",
    summary:
      "Modern switch toggle with smooth transitions and disabled states.",
    docsUrl:
      "https://shopify.dev/docs/api/app-home/web-components/forms/switch",
    previewType: "toggle",
    examples: [
      {
        id: "toggle-block",
        title: "Switch toggles for binary settings",
        description: "Clean toggle switches with titles and subtitle descriptions.",
        renderKey: "toggle-example",
        installCommand: "npx shadcn@latest add toggle",
        fileSources: [
          {
            name: "ToggleExample.tsx",
            path: "example/ToggleExample.tsx",
            sourcePath:
              "app/polaris-playground/components/examples/ToggleExample.tsx",
            language: "tsx",
          },
          {
            name: "Toggle.tsx",
            path: "ui/Toggle.tsx",
            sourcePath: "app/kits/polaris/ui/forms/Toggle.tsx",
            language: "tsx",
          },
        ],
      },
    ],
  },
  {
    slug: "range",
    name: "Range",
    category: "forms",
    categoryLabel: "Forms",
    description:
      "Numerical range slider allowing merchants to select continuous values within limits.",
    summary:
      "Slider input with dynamic live output and suffix units.",
    docsUrl:
      "https://shopify.dev/docs/api/app-home/web-components/forms/range-slider",
    previewType: "range",
    examples: [
      {
        id: "range-block",
        title: "Range slider with live percentage output",
        description: "Numerical slider with live value indicator and percentage suffix.",
        renderKey: "range-example",
        installCommand: "npx shadcn@latest add range",
        fileSources: [
          {
            name: "RangeExample.tsx",
            path: "example/RangeExample.tsx",
            sourcePath:
              "app/polaris-playground/components/examples/RangeExample.tsx",
            language: "tsx",
          },
          {
            name: "Range.tsx",
            path: "ui/Range.tsx",
            sourcePath: "app/kits/polaris/ui/forms/Range.tsx",
            language: "tsx",
          },
        ],
      },
    ],
  },

  // ── Typography ──
  {
    slug: "info-tooltip",
    name: "Info tooltip",
    category: "typography",
    categoryLabel: "Typography & Content",
    description:
      "Inline tooltip badge for contextual explanations and form field helpers.",
    summary:
      "Compact contextual information indicator with native hover tooltip hints.",
    docsUrl:
      "https://shopify.dev/docs/api/app-home/web-components/typography/text",
    previewType: "info-tooltip",
    examples: [
      {
        id: "info-tooltip-block",
        title: "Contextual helper tooltips",
        description:
          "Inline info triggers displaying explanatory tooltip descriptions.",
        renderKey: "info-tooltip-example",
        installCommand: "npx shadcn@latest add info-tooltip",
        fileSources: [
          {
            name: "InfoTooltipExample.tsx",
            path: "example/InfoTooltipExample.tsx",
            sourcePath:
              "app/polaris-playground/components/examples/InfoTooltipExample.tsx",
            language: "tsx",
          },
          {
            name: "InfoTooltip.tsx",
            path: "ui/InfoTooltip.tsx",
            sourcePath: "app/kits/polaris/ui/typography/InfoTooltip.tsx",
            language: "tsx",
          },
        ],
      },
    ],
  },
];
