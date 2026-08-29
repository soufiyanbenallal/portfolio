"use client";

import React from "react";
import type { PlanTierItemType, BillingIntervalType } from "../PlanPricingMatrix";

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
    <s-box padding="base" borderWidth="base" borderRadius="base" background="base">
      <s-stack direction="block" gap="base">
        <s-stack direction="inline" justifyContent="space-between" alignItems="center">
          <s-heading>{plan.name}</s-heading>
          {plan.popular && <s-badge tone="info">{plan.badge || "Most Popular"}</s-badge>}
        </s-stack>

        <s-paragraph>{plan.description}</s-paragraph>

        <s-stack direction="inline" alignItems="baseline" gap="small-200">
          <s-heading>{isFree ? "Free" : `$${price}`}</s-heading>
          {!isFree && <s-text tone="neutral">/ month</s-text>}
        </s-stack>

        {interval === "annual" && !isFree && (
          <s-text tone="success">Billed annually (${price * 12}/year)</s-text>
        )}

        <s-divider />

        <s-stack direction="block" gap="small-200">
          <s-text type="strong">What's included</s-text>
          {plan.features.map((feature, i) => (
            <s-stack key={i} direction="inline" gap="small-200" alignItems="center">
              <s-icon
                type={feature.included ? "check" : "minus-circle"}
                tone={feature.included ? (feature.highlight ? "info" : "success") : "neutral"}
              />
              <s-text tone={feature.included ? undefined : "neutral"}>
                {feature.text}
              </s-text>
            </s-stack>
          ))}
        </s-stack>

        <s-divider />

        <s-box paddingBlockStart="small-200">
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
        </s-box>
      </s-stack>
    </s-box>
  );
}
