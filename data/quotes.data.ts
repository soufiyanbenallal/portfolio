import type { QuoteDetailType } from "@/types";

export const quotesData: QuoteDetailType[] = [
  {
    id: "quote-1",
    slug: "tb-0001",
    quoteNumber: "TB-0001",
    clientName: "Thomas Weber",
    clientCompany: "KYMA AI Technologies",
    clientEmail: "thomas@kyma.ai",
    projectTitle: "Brand & Platform Architecture Overhaul",
    issueDate: "Feb 10, 2025",
    validUntil: "Mar 15, 2025",
    status: "Sent",
    summary:
      "Comprehensive end-to-end redesign and custom Next.js web application build for KYMA's next-generation artificial intelligence automation platform.",
    lineItems: [
      {
        id: "li-1",
        title: "Brand Identity & Design System",
        description:
          "Vector logo suite, typography hierarchy, dark/light surface tokens, custom icon set, and comprehensive Figma variable library.",
        quantity: 1,
        unitPrice: 4500,
        timeline: "2 weeks",
      },
      {
        id: "li-2",
        title: "Interactive Web Application & Marketing Flagship",
        description:
          "Bespoke Next.js App Router frontend with React 19, Tailwind CSS v4, Framer Motion scroll sequences, and dynamic CMS integration.",
        quantity: 1,
        unitPrice: 7500,
        timeline: "3 weeks",
      },
      {
        id: "li-3",
        title: "Interactive 3D Product Visuals & Canvas Shaders",
        description:
          "Three.js interactive model pipeline visualizer with responsive fallback optimization.",
        quantity: 1,
        unitPrice: 3000,
        timeline: "1 week",
      },
    ],
    subtotal: 15000,
    discount: 1000,
    total: 14000,
    estimatedTimeline: "6 weeks total",
    paymentTerms:
      "50% upfront retainer ($7,000) upon signing; 50% ($7,000) upon production launch approval.",
    terms: [
      "All delivered design files, prototypes, and source code become the exclusive intellectual property of the client upon final settlement.",
      "Includes up to 3 revision cycles per milestone.",
      "Complimentary 30-day post-launch technical warranty and bug remediation.",
      "Work commences within 3 business days of deposit receipt.",
    ],
  },
];

export const getQuoteBySlug = (slug: string): QuoteDetailType | undefined =>
  quotesData.find((q) => q.slug === slug);
