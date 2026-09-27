import type { EngagementModelType, ServiceItemType, ServiceThemeType } from "@/types";

/*
 * Three services, compacted from the resume. Product engineering leads.
 * Everything claimed here — the
 * stack, the kind of work, the proof lines — is something the resume states.
 */
export const servicesData: ServiceItemType[] = [
  {
    id: "srv-product",
    slug: "product",
    theme: "product",
    kicker: "Product",
    title: "Full-Stack Product Engineering",
    summary: "SaaS and web apps end to end, with the architecture and leadership behind them.",
    headline: ["SaaS products, from schema to screen.", "Designed to scale, built to be maintained."],
    description:
      "Web applications and SaaS platforms built end to end: React and TypeScript interfaces, Node.js and Laravel services, REST APIs and a data model that holds as the product grows — with architecture, code review and CI/CD around it.",
    deliverables: [
      "React & TypeScript frontends",
      "Node.js & Laravel services and APIs",
      "Data modelling on MySQL & Supabase",
      "Architecture, code review & CI/CD",
    ],
    stack: ["React", "TypeScript", "Node.js", "Laravel", "PHP", "MySQL", "Supabase", "REST"],
    proof: "Leading the engineering team and product architecture at Ader Solutions since 2023.",
    deepDive: {
      capabilities: [
        { title: "SaaS products", description: "Multi-tenant web apps, built from the data model up." },
        { title: "Interfaces", description: "Typed React components that stay consistent as features grow." },
        { title: "Services & APIs", description: "Node.js and Laravel APIs, webhooks and integrations." },
        { title: "Architecture", description: "System design, code review and CI/CD for the team." },
      ],
      process: [
        { title: "Discover", description: "Problem, data and constraints — then a written plan." },
        { title: "Build", description: "Milestones that each end in a working build." },
        { title: "Review", description: "Every change reviewed, tested and shipped by CI/CD." },
        { title: "Launch", description: "Deploy, document, and an agreed support period." },
      ],
      stackGroups: [
        { label: "Interface", items: ["React", "TypeScript", "JavaScript"] },
        { label: "Services", items: ["Node.js", "Laravel", "PHP", "REST", "Webhooks"] },
        { label: "Data", items: ["MySQL", "Supabase"] },
        { label: "Delivery", items: ["CI/CD", "Code review", "Agile"] },
      ],
    },
    order: 1,
  },
  {
    id: "srv-shopify",
    slug: "shopify",
    theme: "commerce",
    kicker: "Commerce",
    title: "Shopify Apps & Themes",
    summary: "Custom apps and Online Store 2.0 themes, wired into the Shopify APIs.",
    headline: ["Apps and storefronts merchants run on.", "Built on the platform, not around it."],
    description:
      "Custom Shopify apps that plug into the admin through the Shopify APIs and webhooks, and Online Store 2.0 themes in Liquid that merchants can shape themselves. Scoped around how the store actually sells.",
    deliverables: [
      "Custom Shopify apps",
      "Online Store 2.0 themes in Liquid",
      "Shopify API & webhook integrations",
      "SaaS products for merchants",
    ],
    stack: ["Shopify API", "Webhooks", "Liquid", "Online Store 2.0", "Polaris", "React", "Node.js", "Laravel"],
    proof: "Built Shopify apps, themes and merchant SaaS with a U.S. team at Le Ventures, 2020–2023.",
    deepDive: {
      capabilities: [
        { title: "Custom apps", description: "Admin apps on the Shopify APIs, with Polaris screens merchants know." },
        { title: "Online Store 2.0 themes", description: "Liquid sections and blocks merchants can rearrange themselves." },
        { title: "Webhooks & integrations", description: "Orders, products and customers synced with the store's tools." },
        { title: "Merchant SaaS", description: "Products sold to merchants — onboarding, plans and settings." },
      ],
      process: [
        { title: "Discover", description: "The store, its catalog and the workflow to improve." },
        { title: "Build", description: "On a development store, milestone by milestone." },
        { title: "Test", description: "Against real products, themes and edge cases." },
        { title: "Launch", description: "Install, publish, hand over — with agreed support." },
      ],
      stackGroups: [
        { label: "Storefront", items: ["Liquid", "Online Store 2.0", "JavaScript"] },
        { label: "Admin", items: ["Shopify API", "Polaris", "React", "TypeScript"] },
        { label: "Backend", items: ["Node.js", "Laravel", "Webhooks", "MySQL"] },
        { label: "Delivery", items: ["CI/CD", "Code review", "Agile"] },
      ],
    },
    order: 2,
  },
  {
    id: "srv-ai",
    slug: "ai",
    theme: "ai",
    kicker: "AI",
    title: "AI Integration & Automation",
    summary: "LLM features inside real products, and workflows that take repetitive work away.",
    headline: ["AI inside the product, not beside it.", "Automations that remove real work."],
    description:
      "LLM features wired into existing apps with the same care as any other production code, and automated workflows — triggered by webhooks, schedules or events — that take repetitive work off your team.",
    deliverables: [
      "AI features in existing products",
      "Event-driven & scheduled automations",
      "Third-party API integrations",
      "Review steps & logging built in",
    ],
    stack: ["LLM APIs", "Webhooks", "Node.js", "Laravel", "REST APIs", "Supabase"],
    proof: "Integrating AI into production products as lead developer at Ader Solutions.",
    deepDive: {
      capabilities: [
        { title: "AI in the product", description: "LLM features built into the app, held to production standards." },
        { title: "Workflow automation", description: "Webhooks, schedules and events that run the repetitive work." },
        { title: "Integrations", description: "The third-party APIs a workflow needs, connected reliably." },
        { title: "Guardrails", description: "Structured output, review steps and logs for every action." },
      ],
      process: [
        { title: "Map", description: "The task, its inputs and what a good result is." },
        { title: "Prototype", description: "A working version on real data, measured." },
        { title: "Harden", description: "Validation, review steps, logging and fallbacks." },
        { title: "Ship", description: "Rolled out inside the product, then monitored." },
      ],
      stackGroups: [
        { label: "Models", items: ["LLM APIs", "Structured output"] },
        { label: "Workflows", items: ["Node.js", "Laravel", "Webhooks"] },
        { label: "Data", items: ["Supabase", "MySQL", "REST APIs"] },
        { label: "Delivery", items: ["CI/CD", "Logging", "Review steps"] },
      ],
    },
    order: 3,
  },
];

export const getServiceBySlug = (slug: string): ServiceItemType => {
  const service = servicesData.find((item) => item.slug === slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
};

/** Palette class for a service theme (defined in globals.css). */
export const SERVICE_THEME_CLASS: Record<ServiceThemeType, string> = {
  commerce: "svc-commerce",
  product: "svc-product",
  ai: "svc-ai",
};

export const engagementModelsData: EngagementModelType[] = [
  {
    id: "eng-project",
    title: "Project build",
    description: "A defined scope delivered in milestones, each ending in a working build you can review.",
  },
  {
    id: "eng-team",
    title: "Team extension",
    description: "I join your repositories, rituals and code review, and ship alongside your engineers.",
  },
  {
    id: "eng-lead",
    title: "Technical leadership",
    description: "Architecture, roadmap and code review for teams that need senior direction.",
  },
];
