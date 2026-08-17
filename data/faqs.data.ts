import type { FaqItemType } from "@/types";

export const faqsData: FaqItemType[] = [
  {
    id: "faq-1",
    index: "01",
    question: "How long does a typical project take to complete?",
    answer:
      "Project timelines vary based on complexity. A standalone landing page or branding refresh typically takes 2–3 weeks, while comprehensive web applications and multi-brand design systems take 4–8 weeks. For subscription clients, individual task requests are delivered within an average of 48 hours.",
    defaultOpen: true,
  },
  {
    id: "faq-2",
    index: "02",
    question: "Can you work with my existing brand and designs?",
    answer:
      "Absolutely! I regularly integrate with established brand systems, Figma libraries, and live production codebases. I ensure every new component and interface extends your existing visual language harmoniously while elevating conversion and accessibility.",
    defaultOpen: false,
  },
  {
    id: "faq-3",
    index: "03",
    question: "What makes your design process unique?",
    answer:
      "Unlike traditional agencies that pass you down to junior account managers, you work directly with me from initial strategy through to final code. We eliminate bloated meetings with asynchronous Loom updates, live Figma pairing, and rapid interactive prototypes.",
    defaultOpen: false,
  },
  {
    id: "faq-4",
    index: "04",
    question: "Do you offer ongoing support after the project is completed?",
    answer:
      "Yes, all fixed projects include 30 days of complimentary post-launch support for fine-tuning, bug fixes, and team handoff training. For continuous design velocity, you can transition seamlessly into our monthly unlimited retainer.",
    defaultOpen: false,
  },
  {
    id: "faq-5",
    index: "05",
    question: "How do you handle confidentiality and intellectual property rights?",
    answer:
      "I take intellectual property and confidentiality with extreme care. I am happy to sign your standard mutual NDA before discussing project details. Upon final payment, 100% of all intellectual property, design assets, and source code belong entirely to you.",
    defaultOpen: false,
  },
];
