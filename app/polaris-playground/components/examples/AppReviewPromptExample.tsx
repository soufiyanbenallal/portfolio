"use client";

import React from "react";
import { AppReviewPrompt } from "@/app/kits/polaris/blocks/feedback/AppReviewPrompt/AppReviewPrompt";

export function AppReviewPromptExample() {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <AppReviewPrompt
        appName="Sales Booster & Promo Bar"
        appStoreUrl="https://apps.shopify.com"
        feedbackFormUrl="https://xco.agency/pages/feedback"
        minRatingForAppStore={4}
        dismissable
        onReviewSubmitted={(stars, dest) => {
          alert(`Submitted ${stars} stars (routed to: ${dest})`);
        }}
        onDismiss={() => alert("Review prompt dismissed")}
      />
    </div>
  );
}
