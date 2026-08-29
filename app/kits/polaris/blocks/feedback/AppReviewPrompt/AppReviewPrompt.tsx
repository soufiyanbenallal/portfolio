"use client";

import React, { useState } from "react";
import type { AppReviewPromptPropsType } from "./types";

export function AppReviewPrompt({
  appName = "our app",
  appStoreUrl,
  feedbackFormUrl = "https://xco.agency/pages/feedback",
  minRatingForAppStore = 4,
  onReviewSubmitted,
  onDismiss,
  dismissable = true,
}: AppReviewPromptPropsType) {
  const [submitted, setSubmitted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleSelectRating = (stars: number) => {
    setSubmitted(true);

    if (stars >= minRatingForAppStore) {
      onReviewSubmitted?.(stars, "app_store");
      window.open(appStoreUrl, "_blank", "noopener,noreferrer");
    } else {
      onReviewSubmitted?.(stars, "feedback_form");
      if (feedbackFormUrl) {
        window.open(
          `${feedbackFormUrl}?rating=${stars}&app=${encodeURIComponent(appName)}`,
          "_blank",
          "noopener,noreferrer"
        );
      }
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <s-box padding="base" borderWidth="base" borderRadius="base" background="base">
      <s-stack direction="block" gap="base">
        <s-stack direction="inline" justifyContent="space-between" alignItems="center">
          <s-heading>How has your experience been with {appName}?</s-heading>
          {dismissable && (
            <s-button variant="secondary" onClick={handleDismiss} icon="x" />
          )}
        </s-stack>

        {submitted ? (
          <s-banner tone="success" heading="Thank you for your rating!">
            Your feedback helps us build a better product for you.
          </s-banner>
        ) : (
          <s-stack direction="block" gap="base">
            <s-paragraph>
              We'd love to hear your thoughts. Choose a rating below to share your feedback.
            </s-paragraph>

            <s-stack direction="inline" gap="small-200" alignItems="center">
              {[1, 2, 3, 4, 5].map((star) => (
                <s-button
                  key={star}
                  variant="secondary"
                  onClick={() => handleSelectRating(star)}
                >
                  {star} ★
                </s-button>
              ))}
            </s-stack>
          </s-stack>
        )}
      </s-stack>
    </s-box>
  );
}

export * from "./types";
