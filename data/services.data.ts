import type { ServiceItemType } from "@/types";

export const servicesData: ServiceItemType[] = [
  {
    id: "srv-1",
    title: "Framer Development",
    description:
      "Pixel-perfect, lightning-fast Framer sites with custom React code components and CMS architecture.",
    iconName: "framer",
    deliverables: [
      "Custom Framer components",
      "CMS dynamic collections",
      "SEO optimization & 100 Lighthouse",
    ],
    isPrimary: true,
    order: 1,
  },
  {
    id: "srv-2",
    title: "Brand Design",
    description:
      "End-to-end visual identity systems, typography guidelines, vector logo marks, and comprehensive design manuals.",
    iconName: "palette",
    deliverables: [
      "Visual identity & logo system",
      "Color & typography scale",
      "Brand guidelines & asset kit",
    ],
    isPrimary: true,
    order: 2,
  },
  {
    id: "srv-3",
    title: "Web Apps",
    description:
      "Scalable frontend architectures, state management systems, and high-performance React & Next.js applications.",
    iconName: "layout",
    deliverables: [
      "React / Next.js codebases",
      "TypeScript state architecture",
      "Design system tokens",
    ],
    isPrimary: true,
    order: 3,
  },
  {
    id: "srv-4",
    title: "Landing Pages",
    description:
      "High-conversion marketing landing pages built for venture-backed startups and growth brands.",
    iconName: "rocket",
    deliverables: [
      "Conversion-focused UX",
      "Physics-based micro-animations",
      "A/B testing readiness",
    ],
    isPrimary: true,
    order: 4,
  },
  {
    id: "srv-5",
    title: "Motion Graphics",
    description:
      "Silky 60fps micro-interactions, scroll-driven storytelling sequences, and custom SVG path animations.",
    iconName: "play",
    deliverables: [
      "Framer Motion interactions",
      "Interactive Rive animations",
      "Scroll-linked visual choreography",
    ],
    isPrimary: true,
    order: 5,
  },
  {
    id: "srv-6",
    title: "3D Design",
    description:
      "Tactile product visualizations, WebGL viewports, and interactive 3D spatial experiences.",
    iconName: "box",
    deliverables: [
      "Three.js / WebGL setups",
      "Blender product renders",
      "Real-time canvas shaders",
    ],
    isPrimary: false,
    order: 6,
  },
  {
    id: "srv-7",
    title: "UX / UI Consultation",
    description:
      "Design audits, product heuristic evaluations, user onboarding flows, and accessibility consulting.",
    iconName: "compass",
    deliverables: [
      "Heuristic UX evaluation",
      "Accessibility WCAG audit",
      "Conversion bottleneck report",
    ],
    isPrimary: false,
    order: 7,
  },
];
