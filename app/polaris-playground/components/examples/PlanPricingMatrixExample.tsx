"use client";

import React, { useState } from "react";
import {
  PlanPricingMatrix,
  type PlanTierItemType,
  type BillingIntervalType,
} from "@/app/kits/polaris/blocks/billing/PlanPricingMatrix/PlanPricingMatrix";

export function PlanPricingMatrixExample() {
  const [currentPlanId, setCurrentPlanId] = useState("basic");

  const plans: PlanTierItemType[] = [
    {
      id: "free",
      name: "Free Forever",
      description: "Essential tools for stores getting started.",
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        { text: "Up to 50 orders/month", included: true },
        { text: "1 Announcement Banner", included: true },
        { text: "Standard email support", included: true },
        { text: "Custom CSS styling", included: false },
        { text: "Advanced analytics & export", included: false },
      ],
    },
    {
      id: "basic",
      name: "Growth",
      description: "Ideal for growing brands looking to scale conversions.",
      monthlyPrice: 29,
      annualPrice: 23, // 20% discount
      badge: "Most Popular",
      popular: true,
      features: [
        { text: "Up to 1,000 orders/month", included: true, highlight: true },
        { text: "Unlimited Banners & Bars", included: true },
        { text: "Priority 24/7 live support", included: true },
        { text: "Custom CSS & Font styling", included: true },
        { text: "Advanced analytics & export", included: false },
      ],
    },
    {
      id: "pro",
      name: "Enterprise",
      description: "Maximum speed, dedicated account manager & high volume.",
      monthlyPrice: 79,
      annualPrice: 63,
      features: [
        { text: "Unlimited orders & pageviews", included: true, highlight: true },
        { text: "Multi-language & currency support", included: true },
        { text: "Dedicated onboarding manager", included: true },
        { text: "Custom webhook integrations", included: true },
        { text: "99.99% SLA uptime guarantee", included: true },
      ],
    },
  ];

  const handleSelectPlan = (plan: PlanTierItemType, interval: BillingIntervalType) => {
    setCurrentPlanId(plan.id);
    alert(`Selected "${plan.name}" with ${interval} billing! Initiating App Bridge Billing...`);
  };

  return (
    <s-page>
      <PlanPricingMatrix
        plans={plans}
        currentPlanId={currentPlanId}
        defaultInterval="monthly"
        annualDiscountPercentage={20}
        onSelectPlan={handleSelectPlan}
      />
    </s-page>
  );
}
