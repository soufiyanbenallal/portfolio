import type { FaqItemType } from "@/types";

export const faqsData: FaqItemType[] = [
  {
    id: "faq-1",
    index: "01",
    question: "What is your typical project timeline and delivery pace?",
    answer:
      "Project timelines scale with architecture scope. Custom Shopify apps, specialized themes, and standalone web applications typically take 2–4 weeks. Large-scale enterprise platforms, multi-service backends, and AI pipeline integrations take 4–8 weeks. For retainer clients, individual feature sprints and requests are delivered continuously with weekly demo builds.",
    defaultOpen: true,
  },
  {
    id: "faq-2",
    index: "02",
    question: "Can you integrate with our existing codebase, APIs, and team?",
    answer:
      "Yes, seamlessly. With extensive experience leading engineering teams and collaborating with remote US & international companies, I integrate directly into your Git repositories, CI/CD pipelines, Shopify stores, and cloud environments. I adhere strictly to your established coding conventions while elevating code quality, modularity, and automated testing.",
    defaultOpen: false,
  },
  {
    id: "faq-3",
    index: "03",
    question: "What core technologies and architectures do you specialize in?",
    answer:
      "My core stack encompasses React 19, Next.js App Router, TypeScript, Tailwind CSS v4, Node.js, and Laravel/PHP. Within the Shopify ecosystem, I build embedded Polaris apps, Liquid & Online Store 2.0 themes, Storefront GraphQL headless storefronts, and Shopify Functions. I also engineer custom AI agent workflows and tool-calling pipelines using OpenAI and Claude APIs.",
    defaultOpen: false,
  },
  {
    id: "faq-4",
    index: "04",
    question: "Do you offer post-launch support and ongoing maintenance?",
    answer:
      "Yes. All fixed-scope projects include 30 days of complimentary post-launch warranty for bug remediation, performance monitoring, and team knowledge transfer. For long-term feature velocity, infrastructure scaling, and continuous improvements, you can transition smoothly into a monthly engineering retainer.",
    defaultOpen: false,
  },
  {
    id: "faq-5",
    index: "05",
    question: "How do you handle intellectual property and confidentiality?",
    answer:
      "I treat client data and intellectual property with total confidentiality. I am always happy to execute a mutual NDA prior to reviewing your codebases or project specs. Upon final milestone settlement, 100% of all intellectual property, source repositories, documentation, and assets belong exclusively to you.",
    defaultOpen: false,
  },
];

