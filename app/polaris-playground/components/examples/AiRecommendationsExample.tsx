"use client";

import React, { useState } from "react";
import {
  AiRecommendations,
  type AiRecommendationItemType,
} from "~/components/AiRecommendations/AiRecommendations";

export function AiRecommendationsExample() {
  const [items, setItems] = useState<AiRecommendationItemType[]>([
    {
      id: "rec-1",
      title: 'Launch "frequently bought together" bundle',
      description:
        "Pair your best-selling product with 1-2 complementary items to offer a 1-click bundle discount on the product page.",
      imageSrc: "/images/recommendations/bundle.jpg",
      liftBadge: {
        text: "+12.5%",
        tone: "success",
        icon: "arrow-up",
      },
      primaryAction: {
        label: "Create smart bundle",
        icon: "plus",
        onClick: () => alert("Creating Frequently Bought Together smart bundle..."),
      },
    },
    {
      id: "rec-2",
      title: "Add shipping protection add-on ($1.99)",
      description:
        "A zero-inventory micro-upsell with 95%+ profit margin. Over 34% of shoppers opt in for package guarantee.",
      imageSrc: "/images/recommendations/shipping-protection.jpg",
      liftBadge: {
        text: "+$1.85/order",
        tone: "success",
        icon: "arrow-up",
      },
      primaryAction: {
        label: "Add shipping protection",
        icon: "plus",
        onClick: () => alert("Configuring shipping protection micro-upsell..."),
      },
    },
    {
      id: "rec-3",
      title: "Enable 1-click post-purchase funnel",
      description:
        "Show a limited-time 20% off offer right after payment, before the thank you page, with a zero-friction 1-click tokenized charge.",
      imageSrc: "/images/recommendations/post-purchase.jpg",
      liftBadge: {
        text: "+8.4%",
        tone: "success",
        icon: "arrow-up",
      },
      primaryAction: {
        label: "Set up post-purchase",
        icon: "plus",
        onClick: () => alert("Opening post-purchase offer builder..."),
      },
    },
  ]);

  return (
    <s-page>
      <s-box padding="large">
        <s-stack direction="inline" alignItems="center">
          <AiRecommendations
            title="AI recommendations"
            subtitle="Order history basket mining and high-impact revenue opportunities for your store."
            badgeLabel="AI strategy copilot"
            items={items}
            dismissable
            onDismiss={() => alert("AI Recommendations dismissed")}
          />
        </s-stack>
      </s-box>
    </s-page>
  );
}

export default AiRecommendationsExample;
