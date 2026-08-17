import type { ProjectDetailType, ProjectItemType } from "@/types";

export const projectsData: ProjectDetailType[] = [
  {
    id: "proj-1",
    slug: "kora",
    title: "Kora",
    client: "Kora Ventures",
    category: "Design",
    typeOfWork: "Consulting Site",
    year: "2025",
    tagline: "High-conversion digital presence for a strategic fintech advisory.",
    description: "Designed and built an end-to-end bespoke digital experience with Framer, driving 140% higher lead qualification.",
    thumbnail: "https://framerusercontent.com/images/wn56GiYIGN9okbMTZQ8fV2UQ0.jpg?width=1600&height=1200",
    heroImage: "https://framerusercontent.com/images/wn56GiYIGN9okbMTZQ8fV2UQ0.jpg?width=1600&height=1200",
    accentColor: "#000000",
    liveUrl: "https://launchfolio.framer.website/projects/kora",
    featured: true,
    order: 1,
    overview:
      "Kora approached us with a challenge: elevate their boutique fintech consulting presence to compete directly with tier-one legacy consultancies without sacrificing their modern, agile brand persona.",
    challenge:
      "Their previous web experience was cluttered with generic stock graphics and fragmented case studies, failing to communicate their proprietary consulting framework and resulting in prolonged sales cycles.",
    solution:
      "We rebuilt the entire brand design system, visual identity, and responsive Framer platform with bespoke interactive financial model calculators, sleek editorial typography, and structured conversion touchpoints.",
    results: [
      "142% increase in discovery call bookings within 60 days of launch",
      "Average time on page increased from 42s to 3m 18s",
      "Reduced client onboarding friction by 50% with integrated inquiry routing",
    ],
    stats: [
      { label: "Conversion Lift", value: "+142%" },
      { label: "Avg Time on Page", value: "3.2m" },
      { label: "Pipeline Value", value: "$4.2M" },
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
    client: "KYMA AI",
    category: "Design",
    typeOfWork: "AI Agency",
    year: "2025",
    tagline: "Ultra-clean visual identity and interactive web experience for an applied AI collective.",
    description: "Architected a distinct modern identity, fluid 3D graphics, and responsive web presence that helped secure $3.2M seed financing.",
    thumbnail: "https://framerusercontent.com/images/tBF8hMQFxONWA4CXtHf3R4.jpg?width=1600&height=1200",
    heroImage: "https://framerusercontent.com/images/tBF8hMQFxONWA4CXtHf3R4.jpg?width=1600&height=1200",
    accentColor: "#000000",
    liveUrl: "https://launchfolio.framer.website/projects/kyma",
    featured: true,
    order: 2,
    overview:
      "KYMA needed to launch from stealth with an arresting digital identity that separated them from hundreds of lookalike generative AI wrappers.",
    challenge:
      "Communicating highly technical agent orchestration architecture to enterprise buyers while preserving an elevated, high-fashion tech aesthetic.",
    solution:
      "We conceived an airy, high-contrast monochrome design language accented with soft luminescent greens, custom WebGL nodes, and clear product tiering.",
    results: [
      "Secured $12M Series A funding with the new product showcase",
      "Over 50,000 developer waitlist signups in the first 72 hours",
      "Featured on Site of the Day and DesignSpells",
    ],
    stats: [
      { label: "Waitlist Signups", value: "50k+" },
      { label: "Funding Secured", value: "$12M" },
      { label: "Design Award", value: "SOTD" },
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
    client: "Mugen Design Studio",
    category: "Branding",
    typeOfWork: "Design Studio",
    year: "2024",
    tagline: "Experimental 3D portfolio and interactive digital gallery.",
    description: "Engineered an experimental digital stage showcasing forward-thinking architectural and industrial designs.",
    thumbnail: "https://framerusercontent.com/images/AZe7hFsRlGAWp9spF25RMEwS0gA.jpg",
    heroImage: "https://framerusercontent.com/images/AZe7hFsRlGAWp9spF25RMEwS0gA.jpg",
    accentColor: "#1e1e1e",
    liveUrl: "https://launchfolio.framer.website/projects/mugen",
    featured: true,
    order: 3,
    overview:
      "Mugen is a Tokyo and Berlin-based spatial design studio pushing the boundaries between physical architecture and digital interaction.",
    challenge:
      "The client required an editorial canvas capable of presenting high-polygon 3D architectural renders without sacrificing silky 60fps scrolling and mobile responsiveness.",
    solution:
      "Delivered a lightweight WebGL viewport coupled with Framer Motion layout transitions, custom cursor interactions, and generous editorial white space.",
    results: [
      "99.8% performance score on Google Lighthouse",
      "Won Awwwards Site of the Day and FWA of the Day",
      "Tripled inbound commercial architecture inquiries",
    ],
    stats: [
      { label: "Performance", value: "99/100" },
      { label: "Inbound Leads", value: "3.4x" },
      { label: "Awards", value: "FWA / SOTD" },
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
    client: "Axiom Menswear",
    category: "Development",
    typeOfWork: "Ecommerce Site",
    year: "2024",
    tagline: "Crafting a revolutionary e-commerce presence for architectural menswear.",
    description: "Built a high-performance headless Shopify commerce flagship with custom sizing algorithms and instant checkout.",
    thumbnail: "https://framerusercontent.com/images/q3ruKmoVYmFXP9EeyZlQPnTDuVw.jpg",
    heroImage: "https://framerusercontent.com/images/q3ruKmoVYmFXP9EeyZlQPnTDuVw.jpg",
    accentColor: "#0d0d0d",
    liveUrl: "https://launchfolio.framer.website/projects/axiom",
    featured: true,
    order: 4,
    overview:
      "Axiom is a luxury technical menswear label blending Japanese tailoring with waterproof architectural materials.",
    challenge:
      "High return rates due to fit hesitation on high-ticket garments ($800–$2,400) and slow Shopify theme load times impeding conversion.",
    solution:
      "Designed and developed a custom headless commerce platform using Next.js, Shopify Storefront API, and a real-time 3D draping simulator.",
    results: [
      "Reduced fit-related product returns by 38%",
      "Increased checkout conversion rate by 64%",
      "Page load speed improved by 3.8x compared to previous store",
    ],
    stats: [
      { label: "Checkout Lift", value: "+64%" },
      { label: "Returns Reduced", value: "-38%" },
      { label: "Load Speed", value: "0.6s" },
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
    client: "Quantum Cloud",
    category: "Development",
    typeOfWork: "Server Architecture",
    year: "2024",
    tagline: "Visualizing next-gen server architecture & distributed cloud infrastructure.",
    description: "Architected a real-time cluster monitoring dashboard and modern brand marketing website.",
    thumbnail: "https://framerusercontent.com/images/K6cUNifhQFa6qEX3kqNwfqMkiY.jpg?scale-down-to=1024",
    heroImage: "https://framerusercontent.com/images/K6cUNifhQFa6qEX3kqNwfqMkiY.jpg?scale-down-to=2048",
    accentColor: "#151515",
    liveUrl: "https://launchfolio.framer.website/projects/quantum",
    featured: false,
    order: 5,
    overview:
      "Quantum Cloud provides bare-metal GPU clusters for generative AI training and enterprise inference workloads.",
    challenge:
      "DevOps engineers needed to inspect live cluster health, GPU thermals, and memory throughput without opening clumsy command-line tools.",
    solution:
      "Created a dense, high-frequency React analytics interface with customizable telemetry widgets and WebSocket streaming.",
    results: [
      "Over 400 enterprise engineering teams onboarded in 6 months",
      "Sub-16ms telemetry render latency across 10,000 concurrent metrics",
      "Zero downtime during peak launch traffic",
    ],
    stats: [
      { label: "Active Nodes", value: "10,000+" },
      { label: "Telemetry Latency", value: "<16ms" },
      { label: "Adoption", value: "400+ Teams" },
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
    client: "Essentia Labs",
    category: "Branding",
    typeOfWork: "Brand Identity",
    year: "2024",
    tagline: "Building a better brand for clean energy longevity technology.",
    description: "Complete visual identity, 3D packaging systems, and digital guidelines for a sustainable bio-tech brand.",
    thumbnail: "https://framerusercontent.com/images/wn56GiYIGN9okbMTZQ8fV2UQ0.jpg?scale-down-to=1024",
    heroImage: "https://framerusercontent.com/images/wn56GiYIGN9okbMTZQ8fV2UQ0.jpg?scale-down-to=2048",
    accentColor: "#1c1c1c",
    liveUrl: "https://launchfolio.framer.website/projects/essentia",
    featured: false,
    order: 6,
    overview:
      "Essentia Labs develops biodegradable solid-state batteries that eliminate heavy metal toxicity in consumer devices.",
    challenge:
      "Translating complex chemical breakthroughs into an inspiring, eco-luxury consumer brand story that captivates retail partners.",
    solution:
      "Formulated a clean, organic typography system, rendered tactile 3D packaging visualizations, and developed an interactive lifecycle narrative site.",
    results: [
      "Signed partnership agreements with 3 global electronics manufacturers",
      "Featured in Fast Company World Changing Ideas",
      "100% positive consumer review sentiment during pilot launch",
    ],
    stats: [
      { label: "Retail Deals", value: "3 Global" },
      { label: "CO2 Offset", value: "85 Tons" },
      { label: "Sentiment", value: "100%" },
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
