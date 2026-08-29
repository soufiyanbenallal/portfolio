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
  className = "",
}: AppReviewPromptPropsType) {
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleSelectRating = (stars: number) => {
    setRating(stars);
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
    <div
      className={`rounded-xl border border-border bg-card p-5 shadow-xs transition-all duration-200 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-foreground">
              How has your experience been with {appName}?
            </h4>
          </div>

          {submitted ? (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              Thank you for your rating! Your feedback helps us build a better product for you.
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              We'd love to hear your thoughts. Click a star rating below to share your feedback.
            </p>
          )}

          {/* Interactive Star Rating */}
          {!submitted && (
            <div className="flex items-center gap-1 pt-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = (hoverRating ?? rating ?? 0) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    onClick={() => handleSelectRating(star)}
                    className="p-1 rounded-md hover:scale-110 transition-transform focus:outline-hidden"
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  >
                    <svg
                      className={`w-6 h-6 transition-colors ${
                        active
                          ? "fill-amber-400 text-amber-400"
                          : "fill-none stroke-muted-foreground/40 hover:stroke-amber-400"
                      }`}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Dismiss Button */}
        {dismissable && (
          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 text-muted-foreground hover:text-foreground rounded-md transition-colors shrink-0"
            aria-label="Dismiss review prompt"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export * from "./types";
