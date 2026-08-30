import type { WorkHistoryItemType } from "@/types";

export const workHistoryData: WorkHistoryItemType[] = [
  {
    id: "wh-1",
    role: "Lead Full Stack",
    company: "Ader Solutions",
    location: "Rabat-Salé-Kénitra, Morocco",
    period: "2023 — Present",
    description:
      "Define and execute technology strategy and product roadmap, mentor engineering team, design scalable software architectures, and develop full-stack applications with React, TypeScript, Node.js, Laravel, and Shopify.",
    highlights: [
      "Define and execute technology strategy & product roadmap",
      "Architect scalable full-stack applications with React, TypeScript, Laravel & Shopify",
      "Drive AI solution integrations, CI/CD deployment pipelines, and engineering best practices",
    ],
    isCurrent: true,
  },
  {
    id: "wh-2",
    role: "Full Stack Engineering Developer",
    company: "Le Ventures",
    location: "United States (Remote)",
    period: "2020 — 2023",
    description:
      "Developed and maintained Shopify apps, custom themes, and SaaS solutions for merchants, focusing on scalable and user-friendly products.",
    highlights: [
      "Built high-performance Shopify apps, custom Liquid OS 2.0 themes, and SaaS products",
      "Engineered backend microservices with Node.js and Laravel, integrating Shopify APIs & webhooks",
      "Collaborated with remote U.S. engineering teams via Agile workflows, code reviews, and React Native features",
    ],
    isCurrent: false,
  },
  {
    id: "wh-3",
    role: "Full Stack Developer",
    company: "FORNET MAROC",
    location: "Rabat-Salé-Kénitra, Morocco",
    period: "2020 — 2021",
    description:
      "Developed and maintained full stack web applications using React, TypeScript, Node.js, and Laravel.",
    highlights: [
      "Built scalable REST APIs and integrated third-party services",
      "Delivered responsive, user-focused web interfaces with React and TypeScript",
      "Collaborated with cross-functional teams to deliver reliable software in Agile environments",
    ],
    isCurrent: false,
  },
  {
    id: "wh-4",
    role: "Frontend Developer",
    company: "ARA systèmes & technologie",
    location: "Salé, Morocco",
    period: "2019 — 2020",
    description:
      "Created web applications and single-page dashboards for hospitality and delivery management.",
    highlights: [
      "Created Web App using Ionic and Firebase to manage restaurants and cafes",
      "Engineered real-time SPA dashboard and delivery App using Angular and Firebase",
    ],
    isCurrent: false,
  },
  {
    id: "wh-5",
    role: "Full Stack Engineer",
    company: "morrocow3",
    location: "Morocco",
    period: "2018 — 2019",
    description:
      "Developed custom web applications and business platforms using Laravel, PHP, JavaScript, and MySQL.",
    highlights: [
      "Engineered custom business web platforms with Laravel, PHP, JavaScript, and MySQL",
      "Integrated REST APIs and third-party services with secure, maintainable architectures",
      "Delivered tailored client solutions with performance optimization and ongoing enhancements",
    ],
    isCurrent: false,
  },
];

