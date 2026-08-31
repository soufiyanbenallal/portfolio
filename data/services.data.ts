import type { ServiceItemType } from "@/types";

export const servicesData: ServiceItemType[] = [
  {
    id: "srv-1",
    title: "Shopify Apps & Themes",
    description:
      "End-to-end Shopify apps with Polaris & App Bridge, custom Liquid OS 2.0 themes, Storefront GraphQL, and Shopify Functions.",
    iconName: "layout",
    deliverables: [
      "Custom Shopify Apps & Polaris UI",
      "Liquid & Online Store 2.0 themes",
      "Shopify Functions & Storefront APIs",
    ],
    isPrimary: true,
    order: 1,
  },
  {
    id: "srv-2",
    title: "Full-Stack Web Apps",
    description:
      "Scalable architectures, state management systems, and high-performance React 19, Next.js, TypeScript, Node.js, and Laravel applications.",
    iconName: "rocket",
    deliverables: [
      "React / Next.js & TypeScript frontends",
      "Node.js & Laravel backend services",
      "Database architecture & state stores",
    ],
    isPrimary: true,
    order: 2,
  },
  {
    id: "srv-3",
    title: "AI Integrations & Automations",
    description:
      "Intelligent workflows, autonomous agents, OpenAI/Claude tool calling, and LLM integrations that drive business efficiency.",
    iconName: "compass",
    deliverables: [
      "LLM API integration & custom tools",
      "Automated business workflows & pipelines",
      "Vector embeddings & retrieval systems",
    ],
    isPrimary: true,
    order: 3,
  },
  {
    id: "srv-4",
    title: "High-Performance UI & Motion",
    description:
      "Modern UI/UX with Tailwind CSS v4, Motion choreography, sub-second CWV metrics, and accessible design system components.",
    iconName: "play",
    deliverables: [
      "Tailwind CSS v4 & custom design systems",
      "Smooth 60fps Motion micro-interactions",
      "100 Lighthouse performance & accessibility",
    ],
    isPrimary: true,
    order: 4,
  },
  {
    id: "srv-5",
    title: "API & Backend Architecture",
    description:
      "Robust REST & GraphQL APIs, webhook processing engines, relational data modeling, and secure third-party integrations.",
    iconName: "box",
    deliverables: [
      "REST & GraphQL endpoint design",
      "Webhook ingestion & event systems",
      "CI/CD deployment & cloud pipelines",
    ],
    isPrimary: true,
    order: 5,
  },
  {
    id: "srv-6",
    title: "Design-to-Code Engineering",
    description:
      "Pixel-perfect translation of complex Figma prototypes into production-grade, maintainable codebases with clean abstractions.",
    iconName: "palette",
    deliverables: [
      "Figma to clean React/TypeScript code",
      "Reusable component libraries",
      "Cross-browser & mobile responsive QA",
    ],
    isPrimary: false,
    order: 6,
  },
  {
    id: "srv-7",
    title: "Technical Consulting & Audits",
    description:
      "In-depth code reviews, architecture roadmaps, Shopify store audits, and scalability consultations for growing companies.",
    iconName: "framer",
    deliverables: [
      "Architecture & security review",
      "Performance bottleneck remediation",
      "Engineering roadmap & mentorship",
    ],
    isPrimary: false,
    order: 7,
  },
];
