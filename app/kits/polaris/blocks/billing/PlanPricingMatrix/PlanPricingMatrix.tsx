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
  className = "",
}: PlanPricingMatrixPropsType) {
  const [interval, setInterval] = useState<BillingIntervalType>(defaultInterval);

  const handleSelect = (plan: PlanTierItemType) => {
    onSelectPlan?.(plan, interval);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Interval Toggle Switch */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-1.5 p-1 rounded-lg border border-border bg-muted/40 text-xs font-medium">
          <button
            type="button"
            onClick={() => setInterval("monthly")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              interval === "monthly"
                ? "bg-card text-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly billing
          </button>
          <button
            type="button"
            onClick={() => setInterval("annual")}
            className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
              interval === "annual"
                ? "bg-card text-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>Annual billing</span>
            <span className="px-1.5 py-0.2 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px] rounded-full">
              Save {annualDiscountPercentage}%
            </span>
          </button>
        </div>
      </div>

      {/* Grid of Plans */}
      <div
        className={`grid gap-4 ${
          plans.length === 2
            ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
            : plans.length === 3
              ? "grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {plans.map((plan) => (
          <PlanPricingCard
            key={plan.id}
            plan={plan}
            interval={interval}
            isCurrent={currentPlanId === plan.id}
            onSelect={() => handleSelect(plan)}
          />
        ))}
      </div>
    </div>
  );
}

export * from "./types";
