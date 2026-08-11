export type Role = {
  years: string;
  company: string;
  place: string;
  title: string;
  note: string;
  shift: string;
};

export type ExpertiseArea = {
  id: string;
  tag: string;
  title: string;
  body: string;
  stack: string;
};

export type Principle = {
  id: string;
  title: string;
  body: string;
};

export type TvChannel = {
  label: string;
  tag: string;
  title: string;
  description: string;
  stack: string;
  caption: string;
  background: string;
  accentA: string;
  accentB: string;
};

export const roles: Role[] = [
  {
    years: "2023 — present",
    company: "Ader Solutions",
    place: "Rabat-Salé-Kénitra, Morocco",
    title: "Lead Full Stack",
    note: "Technology strategy and product roadmap, scalable and secure architecture, full-stack delivery in React, TypeScript, Node.js, Laravel and Shopify. Code review, CI/CD and deployment ownership.",
    shift: "From building the product to deciding what the product is — and mentoring the team that builds it.",
  },
  {
    years: "2020 — 2023",
    company: "Le Ventures",
    place: "Remote · United States",
    title: "Full Stack Engineering Developer",
    note: "Shopify apps, custom themes and SaaS for merchants. React and TypeScript frontends, Node.js and Laravel services, Shopify APIs and webhooks, React Native feature work.",
    shift: "Deep specialisation in commerce engineering, plus three years of async collaboration with a U.S. team.",
  },
  {
    years: "2020 — 2021",
    company: "FORNET Maroc",
    place: "Rabat-Salé-Kénitra, Morocco",
    title: "Full Stack Developer",
    note: "Full-stack web applications with React, TypeScript, Node.js and Laravel. Scalable APIs, third-party integrations, responsive interfaces, Agile delivery.",
    shift: "Consolidated the modern JavaScript and PHP stack that still underpins my work.",
  },
  {
    years: "2019 — 2020",
    company: "ARA Systèmes & Technologie",
    place: "Salé, Morocco",
    title: "Frontend Developer",
    note: "Web app for restaurant and café management, an Angular SPA dashboard and a delivery app, all on Firebase.",
    shift: "Learned to design several interfaces against one shared realtime backend.",
  },
  {
    years: "2018 — 2019",
    company: "morrocow3",
    place: "Morocco",
    title: "Full Stack Engineer",
    note: "Custom web applications and business platforms in Laravel, PHP, JavaScript and MySQL. REST and third-party integrations, performance work, direct client support.",
    shift: "Where client-facing engineering judgment started.",
  },
];

export const expertiseAreas: ExpertiseArea[] = [
  {
    id: "A",
    tag: "Commerce engineering",
    title: "The Shopify ecosystem, end to end",
    body: "Three years building embedded apps, Liquid themes on Online Store 2.0 and merchant SaaS — plus the API, webhook and OAuth plumbing that keeps them in sync.",
    stack: "Shopify apps · Liquid · OS 2.0 · Webhooks",
  },
  {
    id: "B",
    tag: "Frontend systems",
    title: "React interfaces that stay maintainable",
    body: "Typed, reusable component architecture for product surfaces other engineers extend after me. Performance and reliability treated as design constraints, not cleanup.",
    stack: "React · TypeScript · React Native · Angular",
  },
  {
    id: "C",
    tag: "Backend & APIs",
    title: "Two mature server stacks, chosen deliberately",
    body: "Node.js and Laravel/PHP, picked by fit rather than habit. Scalable APIs, third-party integrations, and data models built to be secure and to survive a rewrite.",
    stack: "Node.js · Laravel · PHP · MySQL · REST",
  },
  {
    id: "D",
    tag: "AI & automation",
    title: "AI wired into product flows",
    body: "My top-rated skills are AI integration and automation: features that remove real work from real users, built into the product rather than bolted on as a demo.",
    stack: "AI integration · Automations · Jobs",
  },
  {
    id: "E",
    tag: "Architecture & delivery",
    title: "Strategy, architecture, then shipping",
    body: "Setting a roadmap, designing the architecture, running code review and CI/CD, and raising the team's standards — the part of seniority that isn't syntax.",
    stack: "System design · CI/CD · Review · Mentoring",
  },
];

export const principles: Principle[] = [
  {
    id: "01",
    title: "Architecture is a maintenance decision",
    body: "Scalable, secure and maintainable is one requirement, not three. I design for the engineer who inherits the codebase, because for three years that engineer has been on my team.",
  },
  {
    id: "02",
    title: "Product thinking before implementation",
    body: "Owning a roadmap changed how I write code: the fastest solution is usually the one that answers the actual business need instead of the ticket's literal wording.",
  },
  {
    id: "03",
    title: "Clean, reusable code is the performance strategy",
    body: "Most reliability and performance gains I've shipped came from removing duplication and clarifying boundaries — not from micro-optimising hot paths.",
  },
  {
    id: "04",
    title: "Automate first, then add AI",
    body: "I look for the repetitive work before reaching for a model. When AI does belong, it goes inside an existing flow with clear inputs, review and a fallback.",
  },
];

export const tvChannels: TvChannel[] = [
  {
    label: "Ader Platform",
    tag: "CH 01 · NOW LEADING",
    title: "Strategy, architecture, delivery",
    description: "Lead Full Stack at Ader Solutions since 2023 — owning the roadmap, the architecture and the team standard.",
    stack: "REACT · TYPESCRIPT · NODE.JS · LARAVEL · SHOPIFY",
    caption: "“Scalable, secure and maintainable is one requirement, not three.”",
    background: "var(--tertiary)",
    accentA: "var(--accent)",
    accentB: "var(--secondary)",
  },
  {
    label: "Commerce Desk",
    tag: "CH 02 · COMMERCE",
    title: "Shopify apps, themes and merchant SaaS",
    description: "Three years at Le Ventures building embedded apps, Liquid themes on OS 2.0 and the SaaS around them.",
    stack: "SHOPIFY APIS · LIQUID · OS 2.0 · WEBHOOKS · REACT",
    caption: "“Built for merchants who lose money when something breaks.”",
    background: "var(--secondary)",
    accentA: "var(--tertiary)",
    accentB: "var(--accent)",
  },
  {
    label: "API Workshop",
    tag: "CH 03 · BACKEND",
    title: "APIs built to be integrated against",
    description: "FORNET Maroc: scalable APIs, third-party integration and responsive interfaces in an Agile team.",
    stack: "NODE.JS · LARAVEL · REST · MYSQL",
    caption: "“Reliability mattered more than novelty.”",
    background: "var(--accent)",
    accentA: "var(--tertiary)",
    accentB: "var(--paper)",
  },
  {
    label: "Realtime Ops",
    tag: "CH 04 · MOBILE + WEB",
    title: "Three clients, one realtime backend",
    description: "ARA Systèmes: restaurant management web app, an Angular SPA dashboard and a delivery app on Firebase.",
    stack: "IONIC · ANGULAR · FIREBASE",
    caption: "“One backend, three very different users.”",
    background: "var(--tertiary)",
    accentA: "var(--secondary)",
    accentB: "var(--accent)",
  },
  {
    label: "Client Studio",
    tag: "CH 05 · WHERE IT STARTED",
    title: "Custom platforms, built with the client",
    description: "morrocow3, 2018: Laravel and MySQL business platforms, REST integrations, direct client work.",
    stack: "LARAVEL · PHP · JAVASCRIPT · MYSQL",
    caption: "“Sit with the client until the requirement is actually understood.”",
    background: "var(--paper)",
    accentA: "var(--accent)",
    accentB: "var(--tertiary)",
  },
  {
    label: "AI & Automation",
    tag: "CH 06 · TOP SKILL",
    title: "Automate first, then add AI",
    description: "AI integration and automations are my top-rated skills — features inside real flows, with review and a fallback.",
    stack: "AI INTEGRATION · AUTOMATIONS · BACKGROUND JOBS",
    caption: "“I look for the repetitive work before reaching for a model.”",
    background: "var(--secondary)",
    accentA: "var(--accent)",
    accentB: "var(--paper)",
  },
  {
    label: "Now Hiring Me",
    tag: "CH 07 · AVAILABILITY",
    title: "Open to senior roles and select consulting",
    description: "Meknès, Morocco · UTC+1 · remote-first. Senior and lead engineering roles, Shopify and commerce SaaS, AI work.",
    stack: "BENALLALSOUFIANE1@GMAIL.COM · +212 708 024 535",
    caption: "“Tell me what you're building and I'll tell you honestly whether I'm the right engineer.”",
    background: "var(--accent)",
    accentA: "var(--secondary)",
    accentB: "var(--tertiary)",
  },
];
