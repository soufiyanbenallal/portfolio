export type ProcessStepType = {
  stepNumber: string;
  title: string;
  description: string;
  iconName: string;
};

export type PricingBenefitType = {
  text: string;
  included: boolean;
};

export type PricingPlanType = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  cadence: string;
  popular?: boolean;
  slotsAvailable?: number;
  badge?: string;
  description: string;
  benefits: PricingBenefitType[];
  ctaLabel: string;
  ctaHref?: string;
  isDark?: boolean;
  notes?: string;
};
