import type { WorkHistoryItemType } from "@/types";

export const workHistoryData: WorkHistoryItemType[] = [
  {
    id: "wh-1",
    role: "Full-Stack Designer",
    company: "Studio Alexander",
    location: "Remote",
    period: "2022 — Present",
    description:
      "Operating an independent design & development practice for high-growth tech startups and venture studios.",
    highlights: [
      "Shipped 40+ production web applications and design systems",
      "Average client revenue increase of 140% post-launch",
      "Retained 95% client satisfaction rating across 5 continents",
    ],
    isCurrent: true,
  },
  {
    id: "wh-2",
    role: "Staff Product Designer",
    company: "Axiom Digital",
    location: "San Francisco, CA",
    period: "2020 — 2022",
    description:
      "Led core product UX and design engineering for an enterprise developer tooling platform.",
    highlights: [
      "Spearheaded redesign of cluster telemetry monitoring dashboard",
      "Authored multi-brand Figma-to-code design system tokens",
      "Collaborated closely with VP of Product and engineering leads",
    ],
    isCurrent: false,
  },
  {
    id: "wh-3",
    role: "Senior UI/UX Designer",
    company: "Nexus Labs",
    location: "New York, NY",
    period: "2016 — 2020",
    description:
      "Designed multi-platform consumer apps, commerce flagships, and viral brand campaign microsites.",
    highlights: [
      "Led design team of 5 across 12 high-impact product launches",
      "Pioneered responsive headless Shopify themes",
      "Won 4 consecutive Awwwards and FWA industry accolades",
    ],
    isCurrent: false,
  },
  {
    id: "wh-4",
    role: "UI Designer & Developer",
    company: "Kora Interactive",
    location: "London, UK",
    period: "2012 — 2016",
    description:
      "Front-end engineering, interactive motion design, and digital brand identities for creative agencies.",
    highlights: [
      "Engineered bespoke GSAP and CSS animations for Fortune 500 brands",
      "Built custom CMS architectures and responsive landing pages",
    ],
    isCurrent: false,
  },
];
