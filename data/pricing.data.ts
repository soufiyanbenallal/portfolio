import type { PricingPlanType, ProcessStepType } from "@/types";

export const processStepsData: ProcessStepType[] = [
  {
    stepNumber: "01",
    title: "Subscribe",
    description: "Subscribe via Stripe & start requesting immediately through your private Trello board.",
    iconName: "credit-card",
  },
  {
    stepNumber: "02",
    title: "Request",
    description: "Request whatever service I offer, from full visual identity to interactive web development.",
    iconName: "send",
  },
  {
    stepNumber: "03",
    title: "Receive",
    description: "Receive your polished design within 48 hours on average. Pause or cancel anytime without friction.",
    iconName: "check-circle",
  },
];

export const pricingPlansData: PricingPlanType[] = [
  {
    id: "unlimited-monthly",
    name: "Unlimited Design",
    tagline: "Subscription design services for brands who move fast.",
    price: "$8,000",
    cadence: "/ month",
    popular: true,
    slotsAvailable: 2,
    badge: "Slots available",
    description: "One flat monthly rate for unlimited design & development requests. Skip the agency markup and work directly with a senior lead designer.",
    benefits: [
      { text: "One request at a time", included: true },
      { text: "Unlimited design requests & revisions", included: true },
      { text: "Average 48-hour turnaround", included: true },
      { text: "Full Framer & React development", included: true },
      { text: "Multiple brands & design systems", included: true },
      { text: "Pause or cancel anytime", included: true },
      { text: "No contracts or hidden commitments", included: true },
    ],
    ctaLabel: "Get Started",
    isDark: true,
    notes: "Payments secured with Stripe. Pause when you don't have active requests.",
  },
  {
    id: "single-project",
    name: "Single Project",
    tagline: "Comprehensive design services for defined scope.",
    price: "Custom",
    cadence: "/ fixed project",
    popular: false,
    description: "Ideal for one-off brand overhauls, dedicated web application builds, or standalone marketing redesigns.",
    benefits: [
      { text: "Clearly defined scope & deliverables", included: true },
      { text: "Guaranteed fixed delivery timeline", included: true },
      { text: "3 structured revision rounds", included: true },
      { text: "Weekly milestone video updates", included: true },
      { text: "Full Figma and production code handoff", included: true },
      { text: "30-day post-launch warranty support", included: true },
    ],
    ctaLabel: "Get Quote",
    isDark: false,
    notes: "50% upfront deposit, 50% upon final delivery approval.",
  },
];
