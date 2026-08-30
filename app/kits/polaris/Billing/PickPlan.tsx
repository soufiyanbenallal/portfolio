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
          className={`h-6 w-11 rounded-full p-1 transition-colors ${
            isAnnual ? "bg-primary" : "bg-muted"
          }`}
        >
          <div
            className={`bg-background h-4 w-4 rounded-full shadow-xs transition-transform ${
              isAnnual ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <span
          className={`flex items-center gap-1 text-xs font-semibold ${
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
            ? "mx-auto max-w-md"
            : visiblePlans.length === 2
              ? "mx-auto max-w-2xl grid-cols-1 md:grid-cols-2"
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
              className={`relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 ${
                isFeatured
                  ? "bg-card border-primary ring-primary/20 shadow-lg ring-2"
                  : "bg-card border-border hover:border-border/80 shadow-xs"
              }`}
            >
              {isFeatured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <s-badge tone="info">Most Popular</s-badge>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-foreground text-base font-bold">{plan.name}</h3>
                  {plan.description && (
                    <p className="text-muted-foreground mt-1 min-h-[32px] text-xs">
                      {plan.description}
                    </p>
                  )}
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-foreground text-3xl font-extrabold tracking-tight">
                    {formatPrice(effectivePrice)}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    /{ct("commons.billing.month") || "mo"}
                  </span>
                </div>

                {isAnnual && plan.annualPrice && (
                  <p className="text-muted-foreground text-[10px]">
                    Billed annually at ${plan.annualPrice}/year
                  </p>
                )}

                {plan.features && plan.features.length > 0 && (
                  <ul className="border-border text-foreground space-y-2 border-t pt-4 text-xs">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="font-bold text-emerald-500">✓</span>
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
