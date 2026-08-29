"use client";

import React from "react";
import { FeedbackCard } from "@/app/kits/polaris/ui/feedbacks/FeedbackCard";

export function FeedbackCardExample() {
  return (
    <s-page>
      <FeedbackCard
        appUrl="https://apps.shopify.com"
        title="Enjoying our Shopify App?"
        description="Your feedback directly shapes our future feature updates and helps our engineering team improve."
      />
    </s-page>
  );
}
