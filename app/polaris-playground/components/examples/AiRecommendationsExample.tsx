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
      tooltip: "AI basket mining detected a 64% co-purchase rate between your top 2 catalog items.",
      description:
        "Pair your best-selling product with 1-2 complementary items to offer a 1-click bundle discount on the product page.",
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
      secondaryAction: {
        label: "Preview bundle",
        variant: "tertiary",
        tone: "neutral",
        onClick: () => alert("Previewing bundle layout..."),
      },
    },
    {
      id: "rec-2",
      title: "Add shipping protection add-on ($1.99)",
      tooltip: "High-margin digital upsell with 95%+ profit margin and instant checkout integration.",
      description:
        "A zero-inventory micro-upsell with 95%+ profit margin. Over 34% of shoppers opt in for package guarantee.",
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
      secondaryAction: {
        label: "Learn more",
        variant: "tertiary",
        tone: "neutral",
        onClick: () => alert("Viewing shipping protection analytics..."),
      },
    },
    {
      id: "rec-3",
      title: "Enable 1-click post-purchase funnel",
      tooltip: "Post-purchase triggers right after payment confirmation before the thank you page.",
      description:
        "Show a limited-time 20% off offer right after payment, before the thank you page, with a zero-friction 1-click tokenized charge.",
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

  const handleDismissItem = (itemToRemove: AiRecommendationItemType) => {
    setItems((prev) => prev.filter((item) => item.id !== itemToRemove.id));
  };

  return (
    <s-page>
      <s-box padding="large">
        <s-stack direction="inline" alignItems="center">
          <AiRecommendations
            title="AI recommendations"
            tooltip="Machine learning algorithms analyze order history basket clusters every 24 hours."
            subtitle="Order history basket mining and high-impact revenue opportunities for your store."
            badgeLabel="AI strategy copilot"
            items={items}
            dismissable
            onDismiss={() => alert("AI Recommendations container dismissed")}
            onItemDismiss={handleDismissItem}
          />
        </s-stack>
      </s-box>
    </s-page>
  );
}

export default AiRecommendationsExample;
