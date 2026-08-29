export type BillingIntervalType = "monthly" | "annual";

export type PlanFeatureItemType = {
  text: string;
  included: boolean;
  highlight?: boolean;
};

export type PlanTierItemType = {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number; // e.g. billed annually (e.g. 19/mo or total)
  badge?: string;
  popular?: boolean;
  features: PlanFeatureItemType[];
  ctaLabel?: string;
  disabled?: boolean;
};

export type PlanPricingMatrixPropsType = {
  plans: PlanTierItemType[];
  currentPlanId?: string;
  defaultInterval?: BillingIntervalType;
  annualDiscountPercentage?: number;
  onSelectPlan?: (plan: PlanTierItemType, interval: BillingIntervalType) => void;
  className?: string;
};
