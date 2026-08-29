"use client";

import React, { useState } from "react";
import type {
  PlanPricingMatrixPropsType,
  BillingIntervalType,
  PlanTierItemType,
} from "./types";
import { PlanPricingCard } from "./partials/PlanPricingCard.part";

export function PlanPricingMatrix({
  plans,
  currentPlanId,
  defaultInterval = "monthly",
  annualDiscountPercentage = 20,
  onSelectPlan,
}: PlanPricingMatrixPropsType) {
  const [interval, setInterval] = useState<BillingIntervalType>(defaultInterval);

  const handleSelect = (plan: PlanTierItemType) => {
    onSelectPlan?.(plan, interval);
  };

  const columnsDef =
    plans.length === 2
      ? "1fr 1fr"
      : plans.length === 3
        ? "1fr 1fr 1fr"
        : "repeat(auto-fit, minmax(240px, 1fr))";

  return (
    <s-stack direction="block" gap="base">
      {/* Interval Toggle Switch */}
      <s-stack direction="inline" justifyContent="center" alignItems="center" gap="small-200">
        <s-button
          variant={interval === "monthly" ? "primary" : "secondary"}
          onClick={() => setInterval("monthly")}
        >
          Monthly billing
        </s-button>
        <s-button
          variant={interval === "annual" ? "primary" : "secondary"}
          onClick={() => setInterval("annual")}
        >
          Annual billing (Save {annualDiscountPercentage}%)
        </s-button>
      </s-stack>

      {/* Grid of Plans */}
      <s-grid gridTemplateColumns={columnsDef} gap="base">
        {plans.map((plan) => (
          <s-grid-item key={plan.id}>
            <PlanPricingCard
              plan={plan}
              interval={interval}
              isCurrent={currentPlanId === plan.id}
              onSelect={() => handleSelect(plan)}
            />
          </s-grid-item>
        ))}
      </s-grid>
    </s-stack>
  );
}

export * from "./types";
