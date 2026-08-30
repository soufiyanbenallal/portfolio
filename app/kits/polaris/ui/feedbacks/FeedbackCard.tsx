"use client";

import { useEffect, useState } from "react";

export type FeedbackCardPropsType = {
  appUrl?: string;
  feedbackFormUrl?: string;
  title?: string;
  description?: string;
};


export function FeedbackCard({
  appUrl = "https://apps.shopify.com",
  feedbackFormUrl = "https://xco.agency/pages/maestro-feedback?rate=buy",
  title = "Enjoying the app?",
  description = "Your feedback helps us improve the app and build better features for you.",
}: FeedbackCardPropsType) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const alreadyFeedback = !!window.localStorage.getItem(
        `alreadyFeedback-${appUrl}`
      );

      if (alreadyFeedback) {
        setSubmitted(true);
      }
    }
  }, [appUrl]);

  const goodFeedback = () => {
    if (typeof window !== "undefined") {
      window.open(`${appUrl}#modal-show=WriteReviewModal`, "_blank");
      setSubmitted(true);
      window.localStorage.setItem(`alreadyFeedback-${appUrl}`, "true");
    }
  };

  const badFeedback = () => {
    if (typeof window !== "undefined") {
      window.open(feedbackFormUrl, "_blank");
      setSubmitted(true);
      window.localStorage.setItem(`alreadyFeedback-${appUrl}`, "true");
    }
  };

  return (
    <s-box padding="base" borderWidth="base" borderRadius="base" background="base">
      <s-stack direction="block" gap="base">
        <s-heading>{title}</s-heading>

        {submitted ? (
          <s-banner tone="success">
            Thanks for your feedback! We really appreciate your time.
          </s-banner>
        ) : (
          <s-stack direction="block" gap="small-200">
            <s-paragraph>{description}</s-paragraph>

            <s-stack direction="inline" gap="small-200" alignItems="center">
              <s-button variant="primary" onClick={goodFeedback}>
                👍 Yes, I love it!
              </s-button>
              <s-button variant="secondary" onClick={badFeedback}>
                👎 Not really
              </s-button>
            </s-stack>
          </s-stack>
        )}
      </s-stack>
    </s-box>
  );
}

export default FeedbackCard;
