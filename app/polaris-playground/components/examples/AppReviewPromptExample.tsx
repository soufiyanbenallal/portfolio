"use client";

import React from "react";
import { AppReviewPrompt } from "~/components/AppReviewPrompt/AppReviewPrompt";

export function AppReviewPromptExample() {
  return (
    <s-page>
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
    </s-page>
  );
}
