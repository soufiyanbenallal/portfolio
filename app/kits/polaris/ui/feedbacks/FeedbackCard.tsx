"use client";

import { useEffect, useState } from "react";

export type FeedbackCardPropsType = {
  appUrl?: string;
  feedbackFormUrl?: string;
  title?: string;
  description?: string;
};

// Compatibility alias
export type FeedbackCardProps = FeedbackCardPropsType;

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

  if (typeof window === "undefined") {
    return null;
  }

  const goodFeedback = () => {
    window.open(`${appUrl}#modal-show=WriteReviewModal`, "_blank");
    setSubmitted(true);
    window.localStorage.setItem(`alreadyFeedback-${appUrl}`, "true");
  };

  const badFeedback = () => {
    window.open(feedbackFormUrl, "_blank");
    setSubmitted(true);
    window.localStorage.setItem(`alreadyFeedback-${appUrl}`, "true");
  };

  return (
    <div className="space-y-3 rounded-xl border border-border bg-card p-4">
      <h2 className="text-sm font-bold text-foreground">{title}</h2>

      {submitted ? (
        <s-banner tone="success">
          Thanks for your feedback! We really appreciate your time.
        </s-banner>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">{description}</p>

          <div className="flex items-center gap-2">
            <s-button onClick={goodFeedback}>👍 Yes, I love it!</s-button>
            <s-button onClick={badFeedback}>👎 Not really</s-button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedbackCard;
