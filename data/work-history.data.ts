import type { WorkHistoryItemType } from "@/types";

// Source of truth: the resume. Roles, dates and bullets are kept to what it
// states — nothing here should claim more than it does.
export const workHistoryData: WorkHistoryItemType[] = [
  {
    id: "wh-1",
    role: "Lead Full Stack Developer",
    company: "Ader Solutions",
    location: "Rabat-Salé-Kénitra, Morocco",
    period: "Jan 2023 — Present",
    description:
      "Lead the engineering team and define the company's technology strategy and product roadmap, while building full-stack applications and SaaS products with React, TypeScript, Node.js, Laravel and Shopify.",
    highlights: [
      "Define and execute the technology strategy and product roadmap",
      "Lead and mentor the engineering team; set and enforce engineering best practices",
      "Design scalable, secure and maintainable software architectures",
      "Oversee code reviews, CI/CD workflows and deployments",
      "Drive product innovation by integrating AI into production systems",
    ],
    isCurrent: true,
  },
  {
    id: "wh-2",
    role: "Full Stack Engineering Developer",
    company: "Le Ventures",
    location: "United States (Remote)",
    period: "Nov 2020 — Jan 2023",
    description:
      "Built and maintained Shopify apps, custom themes and SaaS products for merchants, working inside a remote U.S. engineering team.",
    highlights: [
      "Developed Shopify apps, custom themes and SaaS solutions for merchants",
      "Built backend services with Node.js and Laravel, integrating Shopify APIs, webhooks and third-party platforms",
      "Customized Shopify themes with Liquid and Online Store 2.0",
      "Built responsive React and TypeScript frontends; contributed React Native features",
      "Worked in Agile workflows with code reviews and technical planning",
    ],
    isCurrent: false,
  },
  {
    id: "wh-3",
    role: "Full Stack Developer (Part-time)",
    company: "FORNET MAROC",
    location: "Rabat-Salé-Kénitra, Morocco",
    period: "Nov 2020 — May 2021",
    description:
      "Developed and maintained full-stack web applications with React, TypeScript, Node.js and Laravel, alongside the full-time role at Le Ventures.",
    highlights: [
      "Built scalable APIs and integrated third-party services",
      "Delivered responsive, user-focused interfaces",
      "Shipped reliable software with cross-functional teams in Agile environments",
    ],
    isCurrent: false,
  },
  {
    id: "wh-4",
    role: "Frontend Developer",
    company: "ARA Systèmes & Technologie",
    location: "Salé, Morocco",
    period: "Nov 2019 — Aug 2020",
    description: "Built web apps and dashboards for restaurant, café and delivery management.",
    highlights: [
      "Built a web app with Ionic and Firebase to manage restaurants and cafés",
      "Built an SPA dashboard and a delivery app with Angular and Firebase",
    ],
    isCurrent: false,
  },
  {
    id: "wh-5",
    role: "Full Stack Engineer",
    company: "Morrocow3",
    location: "Morocco",
    period: "Jun 2019 — Oct 2019",
    description:
      "Developed custom web applications and business platforms with Laravel, PHP, JavaScript and MySQL.",
    highlights: [
      "Built custom business platforms with Laravel, PHP, JavaScript and MySQL",
      "Integrated REST APIs and third-party services into secure, maintainable websites",
      "Worked directly with clients on tailored solutions, performance and ongoing enhancements",
    ],
    isCurrent: false,
  },
];

/** Education and languages, as listed on the resume. */
export const educationData = [
  {
    id: "edu-1",
    school: "Jiangsu University of Science and Technology",
    degree: "Master's Degree, Computer Science",
    period: "Sep 2023 — Jun 2025",
  },
  {
    id: "edu-2",
    school: "Ibn Tofaïl University, Kénitra",
    degree: "Bachelor of Technology, Web/Multimedia Management and Webmaster",
    period: "Sep 2019 — Jul 2020",
  },
  {
    id: "edu-3",
    school: "Specialized Institute of Applied Technology – Bab Tizimi",
    degree: "Specialized Technician Diploma (DTS), Information Technology",
    period: "Sep 2015 — Jun 2018",
  },
] as const;

export const languagesData = [
  { id: "lang-ar", name: "Arabic", level: "Native" },
  { id: "lang-en", name: "English", level: "Professional working proficiency" },
  { id: "lang-fr", name: "French", level: "Limited working proficiency" },
] as const;
