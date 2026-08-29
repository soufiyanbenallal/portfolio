"use client";

import React from "react";
import { FeedbackCard } from "@/app/kits/polaris/ui/feedbacks/FeedbackCard";

export function FeedbackCardExample() {
  return (
    <div className="w-full max-w-xl mx-auto p-4 space-y-4">
      <FeedbackCard
        appUrl="https://apps.shopify.com"
        title="Enjoying our Shopify App?"
        description="Your feedback directly shapes our future feature updates and helps our engineering team improve."
      />
    </div>
  );
}
