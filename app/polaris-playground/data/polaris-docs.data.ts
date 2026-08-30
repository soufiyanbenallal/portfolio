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
    | "onboarding"
    | "billing"
    | "actions"
    | "stats"
    | "feedback"
    | "layout"
    | "typography"
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
    id: "onboarding",
    label: "Onboarding & Setup",
    description: "Step-by-step setup guides and full onboarding wizards.",
    items: [
      { slug: "onboarding", label: "Onboarding flow" },
      { slug: "setup-guide", label: "Setup guide" },
    ],
  },
  {
    id: "billing",
    label: "Billing & Monetization",
    description: "Tiered pricing matrices and subscription switches.",
    items: [{ slug: "plan-pricing-matrix", label: "Plan pricing matrix" }],
  },
  {
    id: "actions",
    label: "Actions & Workflows",
    description: "Enterprise tables and operational action workflows.",
    items: [
      { slug: "data-table", label: "Data table" },
      { slug: "ai-recommendations", label: "AI recommendations" },
    ],
  },
  {
    id: "stats",
    label: "Stats & Analytics",
    description:
      "Interactive KPI metrics sections, sparklines, and metric cards for analytics dashboards.",
    items: [{ slug: "stats-section", label: "Stats section" }],
  },
  {
    id: "feedbacks",
    label: "Feedback & Status",
    description: "Dismissable banners and milestone review prompts.",
    items: [
      { slug: "dismissable-banner", label: "Dismissable banner" },
      { slug: "app-review-prompt", label: "App review prompt" },
    ],
  },
  {
    id: "layouts",
    label: "Layout & Structure",
    description: "Contained section cards, tabs, timelines, and structural layout containers.",
    items: [
      { slug: "section-card", label: "Section card" },
      { slug: "tabs", label: "Tabs" },
      { slug: "timeline", label: "Timeline audit trail" },
    ],
  },
  {
    id: "forms",
    label: "Forms",
    description: "Form inputs, selects, checkboxes, switches, and sliders.",
    items: [
      { slug: "input", label: "Input" },
      { slug: "select", label: "Select" },
      { slug: "checkbox", label: "Checkbox" },
      { slug: "toggle", label: "Toggle" },
      { slug: "range", label: "Range" },
    ],
  },
];

export const polarisDocComponentsData: PolarisDocComponentType[] = [
  // ── Onboarding & Setup ──
  {
    slug: "onboarding",
    name: "Onboarding flow",
    category: "onboarding",
    categoryLabel: "Onboarding & Setup",
    description:
      "A complete multi-step merchant onboarding wizard featuring initialization animations, core revenue foundation setup, tool selection, interactive configuration steps, live Shopify validation, and a celebration screen.",
    summary:
      "Full-page interactive setup wizard with step progress, state reducer, sequential configuration, live embed verification, and confetti celebration.",
    docsUrl: "https://shopify.dev/docs/apps/design-guidelines/onboarding",
    previewType: "onboarding",
    examples: [
      {
        id: "onboarding-flow-example-block",
        title: "Interactive multi-step onboarding wizard",
        description:
          "Full merchant onboarding flow with step transitions, automated store sync, interactive tool configuration, and completion celebration.",
        renderKey: "onboarding-example",
        installCommand: "npx soufiyan@latest add onboarding",
        fileSources: [
          {
            name: "Onboarding.tsx",
            path: "components/Onboarding/Onboarding.tsx",
            sourcePath: "app/kits/polaris/Onboarding/Onboarding.tsx",
            language: "tsx",
          },
          {
            name: "onboarding.module.css",
            path: "components/Onboarding/onboarding.module.css",
            sourcePath: "app/kits/polaris/Onboarding/onboarding.module.css",
            language: "css",
          },
          {
            name: "useOnboarding.ts",
            path: "components/Onboarding/useOnboarding.ts",
            sourcePath: "app/kits/polaris/Onboarding/useOnboarding.ts",
            language: "ts",
          },
          {
            name: "constants.ts",
            path: "components/Onboarding/constants.ts",
            sourcePath: "app/kits/polaris/Onboarding/constants.ts",
            language: "ts",
          },
          {
            name: "types.ts",
            path: "components/Onboarding/types.ts",
            sourcePath: "app/kits/polaris/Onboarding/types.ts",
            language: "ts",
          },
          {
            name: "ProgressHeader.tsx",
            path: "components/Onboarding/ProgressHeader.tsx",
            sourcePath: "app/kits/polaris/Onboarding/ProgressHeader.tsx",
            language: "tsx",
          },
          {
            name: "Step1Initializing.tsx",
            path: "components/Onboarding/Step1Initializing.tsx",
            sourcePath: "app/kits/polaris/Onboarding/steps/Step1Initializing.tsx",
            language: "tsx",
          },
          {
            name: "Step2RevenueFoundation.tsx",
            path: "components/Onboarding/Step2RevenueFoundation.tsx",
            sourcePath: "app/kits/polaris/Onboarding/steps/Step2RevenueFoundation.tsx",
            language: "tsx",
          },
          {
            name: "Step3DefaultConfiguration.tsx",
            path: "components/Onboarding/Step3DefaultConfiguration.tsx",
            sourcePath: "app/kits/polaris/Onboarding/steps/Step3DefaultConfiguration.tsx",
            language: "tsx",
          },
          {
            name: "Step4AddTools.tsx",
            path: "components/Onboarding/Step4AddTools.tsx",
            sourcePath: "app/kits/polaris/Onboarding/steps/Step4AddTools.tsx",
            language: "tsx",
          },
          {
            name: "Step5ShopifyValidation.tsx",
            path: "components/Onboarding/Step5ShopifyValidation.tsx",
            sourcePath: "app/kits/polaris/Onboarding/steps/Step5ShopifyValidation.tsx",
            language: "tsx",
          },
          {
            name: "Step6Celebration.tsx",
            path: "components/Onboarding/Step6Celebration.tsx",
            sourcePath: "app/kits/polaris/Onboarding/steps/Step6Celebration.tsx",
            language: "tsx",
          },
          {
            name: "ProgressTracker.tsx",
            path: "components/ui/ProgressTracker.tsx",
            sourcePath: "app/kits/polaris/ui/ProgressTracker.tsx",
            language: "tsx",
          },
          {
            name: "IconTile.tsx",
            path: "components/ui/IconTile.tsx",
            sourcePath: "app/kits/polaris/ui/IconTile.tsx",
            language: "tsx",
          },
        ],
      },
    ],
  },
  {
    slug: "setup-guide",
    name: "Setup guide",
    category: "onboarding",
    categoryLabel: "Onboarding & Setup",
    description:
      "A step-by-step onboarding checklist that guides merchants through app installation, configuration, and go-live.",
    summary:
      "Complete collapsible setup guide with progress completion tracking, action CTAs, and status indicators.",
    docsUrl: "https://shopify.dev/docs/apps/design-guidelines/onboarding",
    previewType: "setup-guide",
    examples: [
      {
        id: "setup-guide-example-block",
        title: "Merchant onboarding checklist",
        description:
          "Collapsible step accordion with progress bar, time estimates, and primary action buttons.",
        renderKey: "setup-guide-example",
        installCommand: "npx shadcn@latest add setup-guide",
        fileSources: [
          {
            name: "SetupGuideExample.tsx",
            path: "example/SetupGuideExample.tsx",
            sourcePath: "app/polaris-playground/components/examples/SetupGuideExample.tsx",
            language: "tsx",
          },
          {
            name: "SetupGuide.tsx",
            path: "components/SetupGuide/SetupGuide.tsx",
            sourcePath: "app/kits/polaris/SetupGuide/SetupGuide.tsx",
            language: "tsx",
          },
          {
            name: "SetupGuideItem.part.tsx",
            path: "components/SetupGuide/partials/SetupGuideItem.part.tsx",
            sourcePath: "app/kits/polaris/SetupGuide/partials/SetupGuideItem.part.tsx",
            language: "tsx",
          },
          {
            name: "SetupGuideProgress.part.tsx",
            path: "components/SetupGuide/partials/SetupGuideProgress.part.tsx",
            sourcePath: "app/kits/polaris/SetupGuide/partials/SetupGuideProgress.part.tsx",
            language: "tsx",
          },
          {
            name: "types.ts",
            path: "components/SetupGuide/types.ts",
            sourcePath: "app/kits/polaris/SetupGuide/types.ts",
            language: "ts",
          },
        ],
      },
    ],
  },

  // ── Billing & Monetization ──
  {
    slug: "plan-pricing-matrix",
    name: "Plan pricing matrix",
    category: "billing",
    categoryLabel: "Billing & Monetization",
    description:
      "Tiered subscription pricing grid with monthly/annual toggle, feature comparison checkmarks, and App Bridge billing triggers.",
    summary:
      "Conversion-optimized pricing matrix for Shopify apps with annual discount badges and plan highlights.",
    docsUrl: "https://shopify.dev/docs/apps/billing",
    previewType: "plan-pricing-matrix",
    examples: [
      {
        id: "plan-pricing-matrix-block",
        title: "Tiered subscription plans with billing cycle toggle",
        description: "3-tier subscription cards with monthly and annual pricing discounts.",
        renderKey: "plan-pricing-matrix-example",
        installCommand: "npx shadcn@latest add plan-pricing-matrix",
        fileSources: [
          {
            name: "PlanPricingMatrixExample.tsx",
            path: "example/PlanPricingMatrixExample.tsx",
            sourcePath: "app/polaris-playground/components/examples/PlanPricingMatrixExample.tsx",
            language: "tsx",
          },
          {
            name: "PlanPricingMatrix.tsx",
            path: "components/PlanPricingMatrix/PlanPricingMatrix.tsx",
            sourcePath: "app/kits/polaris/PlanPricingMatrix/PlanPricingMatrix.tsx",
            language: "tsx",
          },
          {
            name: "PlanPricingCard.part.tsx",
            path: "components/PlanPricingMatrix/partials/PlanPricingCard.part.tsx",
            sourcePath: "app/kits/polaris/PlanPricingMatrix/partials/PlanPricingCard.part.tsx",
            language: "tsx",
          },
          {
            name: "types.ts",
            path: "components/PlanPricingMatrix/types.ts",
            sourcePath: "app/kits/polaris/PlanPricingMatrix/types.ts",
            language: "ts",
          },
        ],
      },
    ],
  },

  // ── Actions & Workflows ──
  {
    slug: "data-table",
    name: "Data table",
    category: "actions",
    categoryLabel: "Actions & Workflows",
    description:
      "Enterprise data table with expandable sub-rows, header tooltips, IndexFilters, active filter chips, selection checkboxes, and action menus.",
    summary:
      "Full-featured Polaris table with A/B variant sub-rows, metric definitions, and active filter management.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components",
    previewType: "data-table",
    examples: [
      {
        id: "data-table-block",
        title: "Bundle deals data table",
        description:
          "Table with expandable A/B test variant rows, header tooltips, active filter chips, and action menus.",
        renderKey: "data-table-example",
        installCommand: "npx shadcn@latest add data-table",
        fileSources: [
          {
            name: "DataTableExample.tsx",
            path: "example/DataTableExample.tsx",
            sourcePath: "app/polaris-playground/components/examples/DataTableExample.tsx",
            language: "tsx",
          },
          {
            name: "Table.tsx",
            path: "ui/Table.tsx",
            sourcePath: "app/kits/polaris/ui/layouts/Table.tsx",
            language: "tsx",
          },
          {
            name: "Filters.tsx",
            path: "ui/Filters.tsx",
            sourcePath: "app/kits/polaris/ui/layouts/Filters.tsx",
            language: "tsx",
          },
          {
            name: "Card.tsx",
            path: "ui/Card.tsx",
            sourcePath: "app/kits/polaris/ui/layouts/Card.tsx",
            language: "tsx",
          },
          {
            name: "Content.tsx",
            path: "ui/Content.tsx",
            sourcePath: "app/kits/polaris/ui/typography/Content.tsx",
            language: "tsx",
          },
        ],
      },
    ],
  },
  {
    slug: "ai-recommendations",
    name: "AI recommendations",
    category: "actions",
    categoryLabel: "Actions & Workflows",
    description:
      "Contextual AI strategy recommendation cards with visual thumbnails, metric lift badges, and 1-click execution actions.",
    summary: "Order basket mining and upsell recommendation cards powered by AI strategy analysis.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components",
    previewType: "ai-recommendations",
    examples: [
      {
        id: "ai-recommendations-block",
        title: "AI strategy and revenue recommendation card",
        description:
          "Card with basket mining recommendations, lift percentage badges, and 1-click CTA buttons.",
        renderKey: "ai-recommendations-example",
        installCommand: "npx soufiyan@latest add ai-recommendations",
        fileSources: [
          {
            name: "AiRecommendationsExample.tsx",
            path: "example/AiRecommendationsExample.tsx",
            sourcePath: "app/polaris-playground/components/examples/AiRecommendationsExample.tsx",
            language: "tsx",
          },
          {
            name: "AiRecommendations.tsx",
            path: "components/AiRecommendations/AiRecommendations.tsx",
            sourcePath: "app/kits/polaris/AiRecommendations/AiRecommendations.tsx",
            language: "tsx",
          },
          {
            name: "RecommendationItem.tsx",
            path: "components/AiRecommendations/partials/RecommendationItem.tsx",
            sourcePath: "app/kits/polaris/AiRecommendations/partials/RecommendationItem.tsx",
            language: "tsx",
          },
          {
            name: "AiRecommendationIllustration.tsx",
            path: "components/AiRecommendations/partials/AiRecommendationIllustration.tsx",
            sourcePath: "app/kits/polaris/AiRecommendations/partials/AiRecommendationIllustration.tsx",
            language: "tsx",
          },
          {
            name: "types.ts",
            path: "components/AiRecommendations/types.ts",
            sourcePath: "app/kits/polaris/AiRecommendations/types.ts",
            language: "ts",
          },
        ],
      },
    ],
  },
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
        description: "Responsive 4-column metrics section with SVG trend sparklines.",
        renderKey: "stats-section-example",
        installCommand: "npx shadcn@latest add stats-section",
        fileSources: [
          {
            name: "StatsSectionExample.tsx",
            path: "example/StatsSectionExample.tsx",
            sourcePath: "app/polaris-playground/components/examples/StatsSectionExample.tsx",
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

  // ── Feedback & Status ──
  {
    slug: "dismissable-banner",
    name: "Dismissable banner",
    category: "feedback",
    categoryLabel: "Feedback & Status",
    description:
      "Contextual notification banner that remembers its dismissed state in localStorage.",
    summary:
      "Persistently dismissable alert banners for store migrations, announcements, and success messages.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/feedback/banner",
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
            sourcePath: "app/polaris-playground/components/examples/DismissableBannerExample.tsx",
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
  {
    slug: "app-review-prompt",
    name: "App review prompt",
    category: "feedback",
    categoryLabel: "Feedback & Status",
    description:
      "Milestone-triggered 5-star rating prompt routing high ratings to Shopify App Store and lower ratings to a private feedback form.",
    summary: "Smart App Store review card with interactive star selection and feedback routing.",
    docsUrl: "https://shopify.dev/docs/apps/app-store",
    previewType: "app-review-prompt",
    examples: [
      {
        id: "app-review-prompt-block",
        title: "5-star App Store review card",
        description: "Interactive star rating card with smart routing.",
        renderKey: "app-review-prompt-example",
        installCommand: "npx shadcn@latest add app-review-prompt",
        fileSources: [
          {
            name: "AppReviewPromptExample.tsx",
            path: "example/AppReviewPromptExample.tsx",
            sourcePath: "app/polaris-playground/components/examples/AppReviewPromptExample.tsx",
            language: "tsx",
          },
          {
            name: "AppReviewPrompt.tsx",
            path: "components/AppReviewPrompt/AppReviewPrompt.tsx",
            sourcePath: "app/kits/polaris/AppReviewPrompt/AppReviewPrompt.tsx",
            language: "tsx",
          },
          {
            name: "types.ts",
            path: "components/AppReviewPrompt/types.ts",
            sourcePath: "app/kits/polaris/AppReviewPrompt/types.ts",
            language: "ts",
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
      "Standard container card providing a title, action menu, footer actions, and consistent padding.",
    summary:
      "Versatile section container for structuring dashboard content, forms, and data tables.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/layout/card",
    previewType: "section-card",
    examples: [
      {
        id: "section-card-block",
        title: "Standard section card with actions",
        description: "Card with header action menu and primary/secondary footer actions.",
        renderKey: "section-card-example",
        installCommand: "npx shadcn@latest add section-card",
        fileSources: [
          {
            name: "CardExample.tsx",
            path: "example/CardExample.tsx",
            sourcePath: "app/polaris-playground/components/examples/CardExample.tsx",
            language: "tsx",
          },
          {
            name: "Card.tsx",
            path: "ui/Card.tsx",
            sourcePath: "app/kits/polaris/ui/layouts/Card.tsx",
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
      "Horizontal navigation tabs for organizing settings, segmented views, and multi-step forms.",
    summary:
      "Accessible Polaris tabs with badge counters, disabled states, and dynamic panel rendering.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/navigation/tabs",
    previewType: "tabs",
    examples: [
      {
        id: "tabs-block",
        title: "Segmented navigation tabs",
        description: "Tabs with badge indicators and panel state switching.",
        renderKey: "tabs-example",
        installCommand: "npx shadcn@latest add tabs",
        fileSources: [
          {
            name: "TabsExample.tsx",
            path: "example/TabsExample.tsx",
            sourcePath: "app/polaris-playground/components/examples/TabsExample.tsx",
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
  {
    slug: "timeline",
    name: "Timeline audit trail",
    category: "layout",
    categoryLabel: "Layout & Structure",
    description:
      "Chronological activity history and event log with search, tone filters, date grouping, and actor attribution.",
    summary:
      "Audit trail component for tracking store syncs, billing updates, webhooks, and merchant actions.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components",
    previewType: "timeline",
    examples: [
      {
        id: "timeline-block",
        title: "Store activity timeline",
        description:
          "Rich event log with search, status filtering, date grouping, and action triggers.",
        renderKey: "timeline-example",
        installCommand: "npx shadcn@latest add timeline",
        fileSources: [
          {
            name: "TimelineExample.tsx",
            path: "example/TimelineExample.tsx",
            sourcePath: "app/polaris-playground/components/examples/TimelineExample.tsx",
            language: "tsx",
          },
          {
            name: "Timeline.tsx",
            path: "components/Timeline/Timeline.tsx",
            sourcePath: "app/kits/polaris/Timeline/Timeline.tsx",
            language: "tsx",
          },
          {
            name: "TimelineItem.part.tsx",
            path: "components/Timeline/partials/TimelineItem.part.tsx",
            sourcePath: "app/kits/polaris/Timeline/partials/TimelineItem.part.tsx",
            language: "tsx",
          },
          {
            name: "TimelineDateHeader.part.tsx",
            path: "components/Timeline/partials/TimelineDateHeader.part.tsx",
            sourcePath: "app/kits/polaris/Timeline/partials/TimelineDateHeader.part.tsx",
            language: "tsx",
          },
          {
            name: "TimelineFilterBar.part.tsx",
            path: "components/Timeline/partials/TimelineFilterBar.part.tsx",
            sourcePath: "app/kits/polaris/Timeline/partials/TimelineFilterBar.part.tsx",
            language: "tsx",
          },
          {
            name: "types.ts",
            path: "components/Timeline/types.ts",
            sourcePath: "app/kits/polaris/Timeline/types.ts",
            language: "typescript",
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
      "Text input field with support for prefixes, suffixes, error states, and helper text.",
    summary:
      "Flexible single-line text input adhering to Shopify Polaris web component specifications.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/forms/text-field",
    previewType: "input",
    examples: [
      {
        id: "input-block",
        title: "Standard text input variants",
        description: "Text input with prefix, suffix, and error messaging.",
        renderKey: "input-example",
        installCommand: "npx shadcn@latest add input",
        fileSources: [
          {
            name: "InputExample.tsx",
            path: "example/InputExample.tsx",
            sourcePath: "app/polaris-playground/components/examples/InputExample.tsx",
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
    description: "Dropdown selection menu for choosing from a list of predefined options.",
    summary: "Accessible select menu with option groups, placeholder, and disabled states.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/forms/select",
    previewType: "select",
    examples: [
      {
        id: "select-block",
        title: "Select dropdown with options",
        description: "Dropdown selector for choosing store currencies and tiers.",
        renderKey: "select-example",
        installCommand: "npx shadcn@latest add select",
        fileSources: [
          {
            name: "SelectExample.tsx",
            path: "example/SelectExample.tsx",
            sourcePath: "app/polaris-playground/components/examples/SelectExample.tsx",
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
      "Boolean toggle checkbox with support for indeterminate states, help text, and labels.",
    summary: "Standard Polaris checkbox for multiple choice selections and agreement toggles.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/forms/checkbox",
    previewType: "checkbox",
    examples: [
      {
        id: "checkbox-block",
        title: "Checkbox with helper text",
        description: "Checkboxes for multi-selection options.",
        renderKey: "checkbox-example",
        installCommand: "npx shadcn@latest add checkbox",
        fileSources: [
          {
            name: "CheckBoxExample.tsx",
            path: "example/CheckBoxExample.tsx",
            sourcePath: "app/polaris-playground/components/examples/CheckBoxExample.tsx",
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
    description: "Interactive on/off switch for instant feature activation and preferences.",
    summary: "Boolean switch toggle with smooth transitions and clear active states.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/forms/choice-list",
    previewType: "toggle",
    examples: [
      {
        id: "toggle-block",
        title: "Feature switch toggle",
        description: "On/off switch with contextual descriptions.",
        renderKey: "toggle-example",
        installCommand: "npx shadcn@latest add toggle",
        fileSources: [
          {
            name: "ToggleExample.tsx",
            path: "example/ToggleExample.tsx",
            sourcePath: "app/polaris-playground/components/examples/ToggleExample.tsx",
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
    description: "Slider input for selecting numerical values within a bounded range.",
    summary: "Range slider with min/max labels, step increments, and dynamic value output.",
    docsUrl: "https://shopify.dev/docs/api/app-home/web-components/forms/range-slider",
    previewType: "range",
    examples: [
      {
        id: "range-block",
        title: "Numerical range slider",
        description: "Slider with value readout and custom step intervals.",
        renderKey: "range-example",
        installCommand: "npx shadcn@latest add range",
        fileSources: [
          {
            name: "RangeExample.tsx",
            path: "example/RangeExample.tsx",
            sourcePath: "app/polaris-playground/components/examples/RangeExample.tsx",
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
];
