"use client";

import React from "react";
import type { PlanTierItemType, BillingIntervalType } from "../types";

export type PlanPricingCardPropsType = {
  plan: PlanTierItemType;
  interval: BillingIntervalType;
  isCurrent: boolean;
  onSelect: () => void;
};

export function PlanPricingCard({
  plan,
  interval,
  isCurrent,
  onSelect,
}: PlanPricingCardPropsType) {
  const price = interval === "annual" ? plan.annualPrice : plan.monthlyPrice;
  const isFree = price === 0;

  return (
    <div
      className={`relative flex flex-col justify-between rounded-xl border p-5 transition-all duration-200 ${
        plan.popular
          ? "border-primary bg-card shadow-md ring-1 ring-primary"
          : "border-border bg-card/60 hover:bg-card shadow-xs"
      }`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase bg-primary text-primary-foreground rounded-full shadow-xs">
            {plan.badge || "Most Popular"}
          </span>
        </div>
      )}

      {/* Plan Header */}
      <div className="space-y-4">
        <div>
          <h4 className="text-base font-bold text-foreground">{plan.name}</h4>
          <p className="text-xs text-muted-foreground mt-1 min-h-[32px]">
            {plan.description}
          </p>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-1 pt-1">
          {isFree ? (
            <span className="text-3xl font-extrabold text-foreground">Free</span>
          ) : (
            <>
              <span className="text-3xl font-extrabold text-foreground">${price}</span>
              <span className="text-xs text-muted-foreground font-medium">/ month</span>
            </>
          )}
        </div>
        {interval === "annual" && !isFree && (
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium -mt-2">
            Billed annually (${price * 12}/year)
          </p>
        )}

        <hr className="border-border/60 my-4" />

        {/* Features list */}
        <div className="space-y-2.5">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
            What's included
          </span>
          <ul className="space-y-2">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                {feature.included ? (
                  <svg
                    className={`w-4 h-4 mt-0.5 shrink-0 ${
                      feature.highlight ? "text-primary" : "text-emerald-500"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground/40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
                <span
                  className={
                    feature.included
                      ? feature.highlight
                        ? "text-foreground font-semibold"
                        : "text-foreground"
                      : "text-muted-foreground/60 line-through"
                  }
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-6 w-full">
        {isCurrent ? (
          <s-button variant="secondary" disabled>
            Current Plan
          </s-button>
        ) : (
          <s-button
            variant={plan.popular ? "primary" : "secondary"}
            onClick={onSelect}
            disabled={plan.disabled}
          >
            {plan.ctaLabel || (isFree ? "Downgrade to Free" : "Upgrade to " + plan.name)}
          </s-button>
        )}
      </div>
    </div>
  );
}
