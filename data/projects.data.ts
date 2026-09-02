import type { ProjectDetailType, ProjectItemType } from "@/types";

export const projectsData: ProjectDetailType[] = [
  {
    id: "proj-1",
    slug: "kora",
    title: "Kora",
    client: "Concept project",
    category: "Design",
    typeOfWork: "Consulting Site",
    year: "2025",
    tagline: "Concept digital presence for a boutique fintech advisory.",
    description:
      "Designed and built an end-to-end bespoke digital experience in Framer, exploring conversion-focused UX patterns and interactive financial calculators.",
    thumbnail:
      "https://framerusercontent.com/images/wn56GiYIGN9okbMTZQ8fV2UQ0.jpg?width=1600&height=1200",
    heroImage:
      "https://framerusercontent.com/images/wn56GiYIGN9okbMTZQ8fV2UQ0.jpg?width=1600&height=1200",
    accentColor: "#000000",
    liveUrl: "https://launchfolio.framer.website/projects/kora",
    featured: true,
    order: 1,
    overview:
      "As a self-directed concept, I set out to explore how a boutique fintech consulting brand could compete visually with tier-one legacy consultancies without losing its modern, agile feel.",
    challenge:
      "The brief I set for myself: avoid generic stock graphics and fragmented case studies, and communicate a clear, proprietary consulting framework at a glance.",
    solution:
      "I built the brand design system, visual identity, and a responsive Framer platform with bespoke interactive financial model calculators, editorial typography, and structured conversion touchpoints.",
    results: [
      "Fully responsive Framer build with custom interactive financial calculators",
      "Sub-1.5s load time with a clean editorial typography system",
      "Structured conversion-focused UX flow from landing to booking",
    ],
    stats: [
      { label: "Lighthouse Score", value: "98" },
      { label: "Load Time", value: "1.4s" },
      { label: "Components Built", value: "30+" },
    ],
    gallery: [
      {
        src: "https://framerusercontent.com/images/wn56GiYIGN9okbMTZQ8fV2UQ0.jpg?width=1600&height=1200",
        alt: "Kora homepage showcase with interactive financial calculator",
        aspectRatio: "16:9",
        caption: "16:9 High-definition responsive viewport layout",
      },
      {
        src: "https://framerusercontent.com/images/W7oQ4BScxWhGC5oVOzKGxVGAD4.jpg?scale-down-to=1024",
        alt: "Kora mobile design system and components",
        aspectRatio: "4:3",
        caption: "4:3 Mobile design system and responsive cards",
      },
    ],
    techStack: ["Framer", "Figma", "React", "Tailwind CSS", "Motion"],
    relatedProjectSlugs: ["kyma", "mugen"],
  },
  {
    id: "proj-2",
    slug: "kyma",
    title: "KYMA",
    client: "Concept project",
    category: "Design",
    typeOfWork: "AI Agency",
    year: "2025",
    tagline: "Concept visual identity and web experience for an applied AI collective.",
    description:
      "Architected a distinct modern identity, fluid 3D graphics, and a responsive web presence for a concept applied-AI collective.",
    thumbnail:
      "https://framerusercontent.com/images/tBF8hMQFxONWA4CXtHf3R4.jpg?width=1600&height=1200",
    heroImage:
      "https://framerusercontent.com/images/tBF8hMQFxONWA4CXtHf3R4.jpg?width=1600&height=1200",
    accentColor: "#000000",
    liveUrl: "https://launchfolio.framer.website/projects/kyma",
    featured: true,
    order: 2,
    overview:
      "As a concept build, I imagined launching an applied-AI collective from stealth with an identity that stands apart from hundreds of lookalike generative-AI wrapper sites.",
    challenge:
      "The self-imposed challenge: communicate technical agent-orchestration architecture to enterprise buyers while keeping an elevated, high-fashion tech aesthetic.",
    solution:
      "I designed an airy, high-contrast monochrome language accented with soft luminescent greens, custom WebGL nodes, and clear product tiering.",
    results: [
      "Custom WebGL node system running at a steady 60fps",
      "High-contrast monochrome design system with a full component library",
      "Fully responsive across desktop, tablet, and mobile breakpoints",
    ],
    stats: [
      { label: "Animation", value: "60fps" },
      { label: "Lighthouse", value: "96" },
      { label: "Components", value: "25+" },
    ],
    gallery: [
      {
        src: "https://framerusercontent.com/images/W7oQ4BScxWhGC5oVOzKGxVGAD4.jpg?scale-down-to=1024",
        alt: "KYMA AI agent playground interface",
        aspectRatio: "16:9",
        caption: "Interactive model orchestration interface",
      },
      {
        src: "https://framerusercontent.com/images/UqrSyX3j0KDY0YY2JZCQuc7Wzzg.jpg?scale-down-to=1024",
        alt: "KYMA visual assets and iconography",
        aspectRatio: "4:3",
        caption: "Design system tokens and iconography",
      },
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Figma", "Rive"],
    relatedProjectSlugs: ["kora", "axiom"],
  },
  {
    id: "proj-3",
    slug: "mugen",
    title: "Mugen",
    client: "Concept project",
    category: "Branding",
    typeOfWork: "Design Studio",
    year: "2024",
    tagline: "Experimental 3D portfolio and interactive digital gallery.",
    description:
      "Engineered an experimental digital stage showcasing forward-thinking architectural and industrial designs.",
    thumbnail: "https://framerusercontent.com/images/AZe7hFsRlGAWp9spF25RMEwS0gA.jpg",
    heroImage: "https://framerusercontent.com/images/AZe7hFsRlGAWp9spF25RMEwS0gA.jpg",
    accentColor: "#1e1e1e",
    liveUrl: "https://launchfolio.framer.website/projects/mugen",
    featured: true,
    order: 3,
    overview:
      "As a concept build, I imagined a Tokyo-and-Berlin spatial design studio pushing the boundary between physical architecture and digital interaction.",
    challenge:
      "The self-imposed challenge: present high-polygon 3D architectural renders without sacrificing silky 60fps scrolling and mobile responsiveness.",
    solution:
      "I built a lightweight WebGL viewport paired with Motion layout transitions, a custom cursor, and generous editorial white space.",
    results: [
      "99/100 Lighthouse performance score",
      "WebGL render viewer with a graceful low-end device fallback",
      "Editorial grid layout with custom cursor interactions",
    ],
    stats: [
      { label: "Performance", value: "99/100" },
      { label: "Renderer", value: "WebGL" },
      { label: "Framework", value: "Three.js" },
    ],
    gallery: [
      {
        src: "https://framerusercontent.com/images/AZe7hFsRlGAWp9spF25RMEwS0gA.jpg",
        alt: "Mugen 3D spatial view",
        aspectRatio: "16:9",
        caption: "WebGL render viewer and gallery",
      },
      {
        src: "https://framerusercontent.com/images/wFJgmAuVHn37SCJR5MDBtfbFdY.jpg?scale-down-to=1024",
        alt: "Mugen layout typography",
        aspectRatio: "4:3",
        caption: "Typography and project index grid",
      },
    ],
    techStack: ["Three.js", "React", "Tailwind CSS", "Figma", "Blender"],
    relatedProjectSlugs: ["kyma", "kora"],
  },
  {
    id: "proj-4",
    slug: "axiom",
    title: "Axiom",
    client: "Concept project",
    category: "Development",
    typeOfWork: "Ecommerce Site",
    year: "2024",
    tagline: "Concept e-commerce build for architectural menswear.",
    description:
      "Built a high-performance headless Shopify commerce flagship with custom sizing algorithms and instant checkout.",
    thumbnail: "https://framerusercontent.com/images/q3ruKmoVYmFXP9EeyZlQPnTDuVw.jpg",
    heroImage: "https://framerusercontent.com/images/q3ruKmoVYmFXP9EeyZlQPnTDuVw.jpg",
    accentColor: "#0d0d0d",
    liveUrl: "https://launchfolio.framer.website/projects/axiom",
    featured: true,
    order: 4,
    overview:
      "As a concept build, I imagined a technical menswear label needing a headless commerce flagship built for fit confidence and speed.",
    challenge:
      "The self-imposed challenge: reduce fit hesitation on high-ticket garments and eliminate the slow theme load times that typically hurt Shopify storefront conversion.",
    solution:
      "I built a custom headless commerce platform using Next.js, the Shopify Storefront API, and a real-time 3D draping simulator.",
    results: [
      "Headless Shopify Storefront API integration with a real-time 3D draping simulator",
      "Sub-1s page load powered by Next.js and edge caching",
      "Custom sizing matrix component with a fit-confidence UI",
    ],
    stats: [
      { label: "Load Speed", value: "0.6s" },
      { label: "Stack", value: "Next.js" },
      { label: "Commerce", value: "Shopify API" },
    ],
    gallery: [
      {
        src: "https://framerusercontent.com/images/wFJgmAuVHn37SCJR5MDBtfbFdY.jpg?scale-down-to=1024",
        alt: "Axiom e-commerce lookbook",
        aspectRatio: "16:9",
        caption: "Interactive lookbook and instant drawer checkout",
      },
      {
        src: "https://framerusercontent.com/images/K6cUNifhQFa6qEX3kqNwfqMkiY.jpg?scale-down-to=1024",
        alt: "Axiom product detail page",
        aspectRatio: "4:3",
        caption: "Product detail with sizing matrix",
      },
    ],
    techStack: ["Next.js", "Shopify API", "TypeScript", "Tailwind CSS", "Motion"],
    relatedProjectSlugs: ["kora", "mugen"],
  },
  {
    id: "proj-5",
    slug: "quantum",
    title: "Quantum",
    client: "Concept project",
    category: "Development",
    typeOfWork: "Server Architecture",
    year: "2024",
    tagline: "Concept visualization of next-gen server & distributed cloud infrastructure.",
    description:
      "Architected a real-time cluster monitoring dashboard and modern brand marketing website.",
    thumbnail:
      "https://framerusercontent.com/images/K6cUNifhQFa6qEX3kqNwfqMkiY.jpg?scale-down-to=1024",
    heroImage:
      "https://framerusercontent.com/images/K6cUNifhQFa6qEX3kqNwfqMkiY.jpg?scale-down-to=2048",
    accentColor: "#151515",
    liveUrl: "https://launchfolio.framer.website/projects/quantum",
    featured: false,
    order: 5,
    overview:
      "As a concept build, I imagined a GPU cloud provider needing to give DevOps engineers a way to inspect live cluster health without clumsy command-line tools.",
    challenge:
      "The self-imposed challenge: surface live cluster health, GPU thermals, and memory throughput in a dense, readable real-time interface.",
    solution:
      "I built a dense, high-frequency React analytics interface with customizable telemetry widgets and WebSocket streaming.",
    results: [
      "Real-time WebSocket telemetry streaming with sub-16ms render latency",
      "Customizable widget layout for cluster health, GPU thermals & memory",
      "Handles 10,000+ concurrent simulated metrics without frame drops",
    ],
    stats: [
      { label: "Telemetry Latency", value: "<16ms" },
      { label: "Metrics Rendered", value: "10,000+" },
      { label: "Stack", value: "WebSockets" },
    ],
    gallery: [
      {
        src: "https://framerusercontent.com/images/K6cUNifhQFa6qEX3kqNwfqMkiY.jpg?scale-down-to=1024",
        alt: "Quantum dashboard metrics",
        aspectRatio: "16:9",
        caption: "Real-time cluster telemetry console",
      },
    ],
    techStack: ["React", "TypeScript", "Node.js", "WebSockets", "Tailwind CSS"],
    relatedProjectSlugs: ["kyma", "axiom"],
  },
  {
    id: "proj-6",
    slug: "essentia",
    title: "Essentia",
    client: "Concept project",
    category: "Branding",
    typeOfWork: "Brand Identity",
    year: "2024",
    tagline: "Concept brand for a clean energy longevity technology.",
    description:
      "Complete visual identity, 3D packaging systems, and digital guidelines for a concept sustainable bio-tech brand.",
    thumbnail:
      "https://framerusercontent.com/images/wn56GiYIGN9okbMTZQ8fV2UQ0.jpg?scale-down-to=1024",
    heroImage:
      "https://framerusercontent.com/images/wn56GiYIGN9okbMTZQ8fV2UQ0.jpg?scale-down-to=2048",
    accentColor: "#1c1c1c",
    liveUrl: "https://launchfolio.framer.website/projects/essentia",
    featured: false,
    order: 6,
    overview:
      "As a concept build, I imagined a clean-energy brand needing to translate a complex chemical breakthrough into an accessible, eco-luxury consumer story.",
    challenge:
      "The self-imposed challenge: turn a technical battery-chemistry breakthrough into an inspiring brand story without losing scientific credibility.",
    solution:
      "I formulated a clean, organic typography system, rendered tactile 3D packaging visualizations, and built an interactive lifecycle-narrative site.",
    results: [
      "Full brand identity system with organic typography and packaging renders",
      "Interactive lifecycle-narrative site built with a Figma-to-React handoff",
      "3D packaging visualizations rendered in Blender",
    ],
    stats: [
      { label: "Deliverable", value: "Brand System" },
      { label: "3D Renders", value: "12" },
      { label: "Tools", value: "Blender / Figma" },
    ],
    gallery: [
      {
        src: "https://framerusercontent.com/images/wn56GiYIGN9okbMTZQ8fV2UQ0.jpg?scale-down-to=1024",
        alt: "Essentia identity guidelines and packaging",
        aspectRatio: "16:9",
        caption: "Packaging renders and material specifications",
      },
    ],
    techStack: ["Figma", "Blender", "Framer", "React"],
    relatedProjectSlugs: ["mugen", "kora"],
  },
];

export const getFeaturedProjects = (): ProjectItemType[] =>
  projectsData.filter((p) => p.featured).slice(0, 4);

export const getProjectBySlug = (slug: string): ProjectDetailType | undefined =>
  projectsData.find((p) => p.slug === slug);
