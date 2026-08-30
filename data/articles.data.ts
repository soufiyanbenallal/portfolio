import type { ArticleDetailType } from "@/types";

export const articlesData: ArticleDetailType[] = [
  {
    id: "art-1",
    slug: "bridging-design-and-engineering-with-component-systems",
    title: "Bridging Design & Engineering with Living Component Systems",
    subtitle:
      "Eliminating the handoff friction by uniting Tailwind CSS v4 design tokens and React 19 primitives.",
    publishedAt: "Mar 12, 2025",
    author: {
      name: "Soufiyan Benallal",
      role: "Lead Full Stack & Shopify Architect",
      avatar: "/images/profile.jpeg",
    },
    readTime: "6 min read",
    category: "Architecture",
    coverImage:
      "https://framerusercontent.com/images/tBF8hMQFxONWA4CXtHf3R4.jpg?scale-down-to=1024",
    featured: true,
    excerpt:
      "Discover proven patterns to bridge the designer-developer gap. Learn how living design token pipelines eliminate regression bugs and accelerate feature delivery across engineering teams.",
    intro:
      "For years, standard software teams treated design and engineering as sequential waterfall silos: design finishes mockups, throws static frames over the wall, and hopes the shipped production app looks roughly familiar. This gap generates expensive redesign cycles and UI regressions.",
    sections: [
      {
        heading: "Tokens as the Single Source of Truth",
        paragraphs: [
          "With Tailwind CSS v4 and modern CSS cascade layers, design tokens defined in Figma map directly to typed CSS variables in code. When color palettes, elevation shadows, and corner radii share identical naming in both tooling worlds, visual drift disappears.",
          "Engineers and designers no longer debate whether a margin is 12px or 16px; instead, they discuss functional token contracts and interaction states.",
        ],
        quote:
          "Design and engineering are not sequential steps in a waterfall—they are two hands shaping the same living digital clay.",
      },
      {
        heading: "Synchronous Pairing Over Static Handoffs",
        paragraphs: [
          "Teams that adopt synchronous pairing—where engineers review component interaction states before full implementation, and designers test living code branches—reduce visual bugs by over 60%.",
          "Building a living component library with Storybook or isolated playgrounds ensures that edge cases (like multi-line truncation or locale translations) are addressed before production launch.",
        ],
      },
    ],
    conclusion:
      "When developers and designers share a unified vocabulary in code, building delight into software ceases to be accidental and becomes an inevitable engineering outcome.",
    relatedArticleSlugs: ["architecting-shopify-polaris-web-components", "scaling-ai-workflows-in-production-saas"],
  },
  {
    id: "art-2",
    slug: "architecting-shopify-polaris-web-components",
    title: "Architecting Embedded Shopify Apps with Polaris Web Components",
    subtitle:
      "Building high-concurrency merchant tools with App Bridge, GraphQL, and modern web components.",
    publishedAt: "Feb 28, 2025",
    author: {
      name: "Soufiyan Benallal",
      role: "Lead Full Stack & Shopify Architect",
      avatar: "/images/profile.jpeg",
    },
    readTime: "8 min read",
    category: "Shopify Ecosystem",
    coverImage:
      "https://framerusercontent.com/images/AZe7hFsRlGAWp9spF25RMEwS0gA.jpg?scale-down-to=1024",
    featured: false,
    excerpt:
      "A deep technical breakdown of building embedded Shopify Admin applications using Shopify Polaris Web Components, App Bridge, and GraphQL caching strategies.",
    intro:
      "Shopify's transition to Polaris Web Components marked a major paradigm shift for merchant app development. By running web components directly in the Admin frame, apps achieve native performance and complete visual coherence.",
    sections: [
      {
        heading: "Decoupling State from Embedded Frames",
        paragraphs: [
          "Embedded Shopify applications require reliable bi-directional communication between the top-level Admin frame and your app backend. Using App Bridge utilities with state stores prevents unnecessary page reloads and authentication token invalidations.",
          "Leveraging GraphQL Storefront and Admin queries with bulk operations ensures low-latency responses even when handling tens of thousands of SKU updates.",
        ],
      },
      {
        heading: "Shopify Functions & Checkout Customizations",
        paragraphs: [
          "With Shopify Functions replacing legacy scripts, merchant business logic (discounts, cart validations, and delivery rules) runs securely on Shopify's global edge infrastructure with sub-5ms execution times.",
        ],
      },
    ],
    relatedArticleSlugs: [
      "bridging-design-and-engineering-with-component-systems",
      "the-art-of-high-performance-web-apps",
    ],
  },
  {
    id: "art-3",
    slug: "scaling-ai-workflows-in-production-saas",
    title: "Integrating Autonomous AI Workflows into Production SaaS",
    subtitle:
      "From simple prompt wrappers to robust tool-calling pipelines and asynchronous background agents.",
    publishedAt: "Feb 14, 2025",
    author: {
      name: "Soufiyan Benallal",
      role: "Lead Full Stack & Shopify Architect",
      avatar: "/images/profile.jpeg",
    },
    readTime: "7 min read",
    category: "AI Engineering",
    coverImage:
      "https://framerusercontent.com/images/q3ruKmoVYmFXP9EeyZlQPnTDuVw.jpg?scale-down-to=1024",
    featured: false,
    excerpt:
      "How to move beyond generic chatbot widgets and architect production-grade AI agent pipelines with deterministic schemas, tool calling, and background task queues.",
    intro:
      "The next generation of software value is created when AI moves from open-ended chat conversations to deterministic, action-oriented workflow automation integrated deep into business databases.",
    sections: [
      {
        heading: "Deterministic Output with Schema Validation",
        paragraphs: [
          "Large language models excel at unstructured reasoning, but production APIs require strict data contracts. Using structured JSON schema outputs and Zod validation guarantees that agent actions can be safely written to SQL databases.",
          "Decoupling LLM generation from synchronous HTTP requests using Redis queues and background workers ensures that your frontend never hangs while an AI agent analyzes complex datasets.",
        ],
      },
    ],
    relatedArticleSlugs: [
      "architecting-shopify-polaris-web-components",
      "bridging-design-and-engineering-with-component-systems",
    ],
  },
  {
    id: "art-4",
    slug: "the-art-of-high-performance-web-apps",
    title: "The Science of Sub-Second Web Performance",
    subtitle:
      "Optimizing Core Web Vitals, server components, and physics-driven micro-interactions at scale.",
    publishedAt: "Jan 25, 2025",
    author: {
      name: "Soufiyan Benallal",
      role: "Lead Full Stack & Shopify Architect",
      avatar: "/images/profile.jpeg",
    },
    readTime: "5 min read",
    category: "Performance",
    coverImage:
      "https://framerusercontent.com/images/3IIKOQ9VkCZyf0KlL2N5yBg1cQ.jpg?scale-down-to=1024",
    featured: false,
    excerpt:
      "Speed is the ultimate product feature. Learn how modern React 19 architectures, streaming SSR, and optimized asset pipelines deliver lightning-fast digital storefronts.",
    intro:
      "Every 100 milliseconds of latency in an e-commerce checkout flow directly reduces conversion rates. High-performance software engineering is not an afterthought—it must be architected from day one.",
    sections: [
      {
        heading: "Eliminating Main-Thread Bottlenecks",
        paragraphs: [
          "By delegating static rendering to Server Components and optimizing bundle sizes, the client browser only parses minimal JavaScript required for interactivity.",
          "Smooth, 60fps animations powered by hardware-accelerated transforms create a perceived speed that makes applications feel instantaneous to users.",
        ],
      },
    ],
    relatedArticleSlugs: [
      "bridging-design-and-engineering-with-component-systems",
      "architecting-shopify-polaris-web-components",
    ],
  },
];

export const getFeaturedArticle = (): ArticleDetailType =>
  articlesData.find((a) => a.featured) || articlesData[0];

export const getArticleBySlug = (slug: string): ArticleDetailType | undefined =>
  articlesData.find((a) => a.slug === slug);
