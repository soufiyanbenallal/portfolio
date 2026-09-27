import type { FaqItemType } from "@/types";

// Answers describe how engagements work without promising figures (warranty
// days, response times, guarantees) that haven't been agreed with a client.
export const faqsData: FaqItemType[] = [
  {
    id: "faq-1",
    index: "01",
    question: "How long does a typical project take?",
    answer:
      "It depends on scope, so every project starts with a short discovery call and a written estimate broken into milestones. A focused Shopify app feature or theme customization is usually a matter of weeks; a new SaaS product or multi-service backend is planned as a series of milestones, each ending in a working build you can review.",
    defaultOpen: true,
  },
  {
    id: "faq-2",
    index: "02",
    question: "Can you work inside our existing codebase and team?",
    answer:
      "Yes — that is most of my experience. I worked for two years inside a remote U.S. engineering team at Le Ventures, and I currently lead a team at Ader Solutions. I work in your repositories, follow your conventions, take part in code review and planning, and leave the codebase easier to maintain than I found it.",
    defaultOpen: false,
  },
  {
    id: "faq-3",
    index: "03",
    question: "What technologies do you work with?",
    answer:
      "React and TypeScript on the frontend; Node.js, Laravel and PHP on the backend, with MySQL and Supabase for data. In the Shopify ecosystem I build apps on the Shopify APIs and webhooks, and themes with Liquid and Online Store 2.0. I also integrate AI features and automated workflows into production apps, with CI/CD pipelines around all of it.",
    defaultOpen: false,
  },
  {
    id: "faq-4",
    index: "04",
    question: "Do you offer support after launch?",
    answer:
      "Yes. We agree a post-launch support period in writing before work begins, so fixes and handover are part of the plan rather than an afterthought. For ongoing development after that, we can move to a monthly engagement.",
    defaultOpen: false,
  },
  {
    id: "faq-5",
    index: "05",
    question: "How do you handle confidentiality and ownership?",
    answer:
      "Your code, data and plans stay confidential, and I'm happy to sign a mutual NDA before reviewing anything. Once the agreed fees are paid, the source code, documentation and deliverables belong to you.",
    defaultOpen: false,
  },
];
