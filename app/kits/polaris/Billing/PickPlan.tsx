import { useState } from "react";
import { openBillingPlan } from "~/commons/utils/DeepLink";
import { useCommonsT } from "~/commons/providers";

export type PlanItemType = {
  name: string;
  price?: number;
  monthlyPrice?: number;
  annualPrice?: number;
  description?: string;
  features?: string[];
  featured?: boolean;
  hidden?: boolean;
  handle?: string;
  trialDays?: number;
  ctaText?: string;
};

// Compatibility alias
export type Plan = PlanItemType;

export type PickPlanPropsType = {
  appName?: string;
  plans?: PlanItemType[];
  handleClose?: () => void;
  selectedPlan?: string;
  currentPlan?: string | null;
  isForced?: boolean;
  subtitle?: string;
  onPlanSelected?: (plan: PlanItemType) => void;
  customButtonText?: string;
  getPlanUrl?: (plan: PlanItemType) => string;
};

// Compatibility alias
export type PickPlanProps = PickPlanPropsType;

export function PickPlan({
  appName,
  plans,
  selectedPlan: propSelectedPlan,
  currentPlan,
  getPlanUrl,
  onPlanSelected,
  customButtonText,
}: PickPlanPropsType): JSX.Element {
  const selectedPlan = propSelectedPlan || (currentPlan ?? undefined);
  const ct = useCommonsT();
  const [isAnnual, setIsAnnual] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const formatPrice = (price?: number) => {
    if (price === undefined || price === null) return "$0";
    return `$${price.toFixed(0)}`;
  };

  const getEffectivePrice = (plan: PlanItemType) => {
    if (isAnnual && plan.annualPrice) {
      return plan.annualPrice / 12;
    }
    return plan.monthlyPrice ?? plan.price ?? 0;
  };

  const pickPlan = (plan?: PlanItemType) => {
    if (!plan) return;
    setLoadingPlan(plan.name);
    if (onPlanSelected) {
      onPlanSelected(plan);
      return;
    }
    if (getPlanUrl) {
      const url = getPlanUrl(plan);
      if (typeof window !== "undefined") {
        window.location.href = url;
      }
      return;
    }
    openBillingPlan(appName || "app", plan.handle || plan.name);
  };

  const visiblePlans = plans?.filter((plan) => !plan.hidden) ?? [];
  const primaryPlan =
    visiblePlans.length === 1 ? visiblePlans[0] : visiblePlans.find((p) => p.featured);

  return (
    <div className="space-y-6">
      {/* Billing interval switch */}
      <div className="flex items-center justify-center gap-3">
        <span
          className={`text-xs font-semibold ${
            !isAnnual ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {ct("commons.billing.monthly") || "Monthly"}
        </span>
        <button
          type="button"
          onClick={() => setIsAnnual(!isAnnual)}
          className={`w-11 h-6 rounded-full p-1 transition-colors ${
            isAnnual ? "bg-primary" : "bg-muted"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-background shadow-xs transition-transform ${
              isAnnual ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <span
          className={`text-xs font-semibold flex items-center gap-1 ${
            isAnnual ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          <span>{ct("commons.billing.annual") || "Annual"}</span>
          <s-badge tone="success">{ct("commons.billing.save_badge") || "Save 20%"}</s-badge>
        </span>
      </div>

      {/* Plan cards */}
      <div
        className={`grid gap-5 ${
          visiblePlans.length === 1
            ? "max-w-md mx-auto"
            : visiblePlans.length === 2
              ? "grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto"
              : "grid-cols-1 md:grid-cols-3"
        }`}
      >
        {visiblePlans.map((plan) => {
          const isSelected = selectedPlan === plan.name;
          const isFeatured = plan.featured;
          const effectivePrice = getEffectivePrice(plan);

          return (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between relative border ${
                isFeatured
                  ? "bg-card border-primary ring-2 ring-primary/20 shadow-lg"
                  : "bg-card border-border shadow-xs hover:border-border/80"
              }`}
            >
              {isFeatured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <s-badge tone="info">Most Popular</s-badge>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-foreground">{plan.name}</h3>
                  {plan.description && (
                    <p className="text-xs text-muted-foreground mt-1 min-h-[32px]">
                      {plan.description}
                    </p>
                  )}
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-foreground tracking-tight">
                    {formatPrice(effectivePrice)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    /{ct("commons.billing.month") || "mo"}
                  </span>
                </div>

                {isAnnual && plan.annualPrice && (
                  <p className="text-[10px] text-muted-foreground">
                    Billed annually at ${plan.annualPrice}/year
                  </p>
                )}

                {plan.features && plan.features.length > 0 && (
                  <ul className="space-y-2 pt-4 border-t border-border text-xs text-foreground">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="pt-6">
                <s-button
                  variant={isFeatured || isSelected ? "primary" : "secondary"}
                  loading={loadingPlan === plan.name}
                  onClick={() => pickPlan(plan)}
                >
                  {customButtonText ||
                    plan.ctaText ||
                    (isSelected
                      ? ct("commons.billing.current_plan") || "Current Plan"
                      : ct("commons.billing.select_plan") || "Upgrade Plan")}
                </s-button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PickPlan;
