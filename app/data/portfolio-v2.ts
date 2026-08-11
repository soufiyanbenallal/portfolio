export type Accent = "coral" | "aqua" | "sun" | "blue" | "leaf";

export type Metric = {
  value: string;
  label: string;
  accent: Accent;
};

export type Project = {
  index: string;
  company: string;
  period: string;
  title: string;
  summary: string;
  responsibility: string;
  outcome: string;
  stack: string[];
  accent: Accent;
  visual: "architecture" | "commerce";
};

export type Experience = {
  period: string;
  company: string;
  location: string;
  role: string;
  shift: string;
  accent: Accent;
};

export type Capability = {
  index: string;
  title: string;
  body: string;
  stack: string;
  accent: Accent;
  size: "wide" | "standard";
};

export const navigation = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Experience", href: "#experience" },
  { label: "Lab", href: "#lab" },
] as const;

export const metrics: Metric[] = [
  { value: "8 yrs", label: "shipping production software", accent: "coral" },
  { value: "3+ yrs", label: "leading product engineering", accent: "aqua" },
  { value: "AR · EN · FR", label: "working across teams and markets", accent: "sun" },
  { value: "UTC+1", label: "Meknès, Morocco · remote-first", accent: "blue" },
];

export const projects: Project[] = [
  {
    index: "01",
    company: "ADER SOLUTIONS",
    period: "2023 — NOW",
    title: "A product strategy with an architecture strong enough to carry it.",
    summary:
      "Leading full-stack engineering across roadmap, system design, delivery and mentoring—so product decisions and implementation stay in the same room.",
    responsibility:
      "Technology strategy, secure scalable architecture, code review, CI/CD and team standards.",
    outcome:
      "A shared engineering practice that makes ambitious product work easier to ship and maintain.",
    stack: ["React", "TypeScript", "Node.js", "Laravel", "Shopify", "AI"],
    accent: "coral",
    visual: "architecture",
  },
  {
    index: "02",
    company: "LE VENTURES",
    period: "2020 — 2023",
    title: "Commerce software built for the moment a merchant presses publish.",
    summary:
      "Three years inside the Shopify ecosystem: embedded apps, Online Store 2.0 themes and SaaS tooling delivered remotely with a U.S. product team.",
    responsibility:
      "Full-stack product delivery across merchant UX, APIs, webhooks, themes and mobile features.",
    outcome:
      "Reliable tools for businesses where a broken workflow has a direct cost—not a hypothetical one.",
    stack: ["Shopify", "Liquid", "React", "TypeScript", "Node.js", "Laravel"],
    accent: "aqua",
    visual: "commerce",
  },
];

export const experience: Experience[] = [
  {
    period: "2023 — NOW",
    company: "Ader Solutions",
    location: "Rabat · Morocco",
    role: "Lead Full Stack",
    shift: "From building the product to deciding what the product should become.",
    accent: "coral",
  },
  {
    period: "2020 — 2023",
    company: "Le Ventures",
    location: "Remote · United States",
    role: "Full Stack Engineering Developer",
    shift: "Deep commerce specialization and long-running async product collaboration.",
    accent: "aqua",
  },
  {
    period: "2020 — 2021",
    company: "FORNET Maroc",
    location: "Rabat · Morocco",
    role: "Full Stack Developer",
    shift: "APIs, integrations and the modern JavaScript/PHP stack working as one system.",
    accent: "sun",
  },
  {
    period: "2019 — 2020",
    company: "ARA Systèmes",
    location: "Salé · Morocco",
    role: "Frontend Developer",
    shift: "Several interfaces, one realtime backend, and very different operational users.",
    accent: "blue",
  },
  {
    period: "2018 — 2019",
    company: "morrocow3",
    location: "Morocco",
    role: "Full Stack Engineer",
    shift: "The start of client-facing engineering judgment and end-to-end ownership.",
    accent: "leaf",
  },
];

export const capabilities: Capability[] = [
  {
    index: "A",
    title: "Product-minded architecture",
    body: "Roadmaps, boundaries and technical decisions designed together—not handed from one room to another.",
    stack: "System design · Roadmaps · Mentoring",
    accent: "coral",
    size: "wide",
  },
  {
    index: "B",
    title: "Frontend systems",
    body: "Typed, reusable React surfaces that remain legible when the team and product both grow.",
    stack: "React · TypeScript · React Native",
    accent: "blue",
    size: "standard",
  },
  {
    index: "C",
    title: "Commerce engineering",
    body: "Merchant apps, themes and backend plumbing across the Shopify ecosystem.",
    stack: "Apps · Liquid · OS 2.0 · Webhooks",
    accent: "aqua",
    size: "standard",
  },
  {
    index: "D",
    title: "Backend & integrations",
    body: "Node.js and Laravel services, third-party APIs and data models chosen for fit and longevity.",
    stack: "Node.js · Laravel · REST · MySQL",
    accent: "sun",
    size: "standard",
  },
  {
    index: "E",
    title: "Useful AI & automation",
    body: "Automation first; models where they remove real work, with review paths and graceful fallbacks.",
    stack: "AI integration · Jobs · Automations",
    accent: "leaf",
    size: "wide",
  },
];

export const ticker = [
  "PRODUCT STRATEGY",
  "REACT + TYPESCRIPT",
  "SHOPIFY SYSTEMS",
  "NODE.JS + LARAVEL",
  "AI IN REAL WORKFLOWS",
  "TEAMS THAT SHIP",
] as const;
