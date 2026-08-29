import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  useReviewRequest,
  type ReviewRequestResponse,
} from "~/commons/utils/hooks/useReviewRequest";
import { useAppState } from "~/commons/utils/state/hooks/useAppState";
import { useUpdateState } from "~/commons/utils/state/hooks/useUpdateState";
import { useCommonsT } from "~/commons/providers";

export type ReviewRequestPropsType = {
  showAsButton?: boolean;
  showAsModal?: boolean;
  showAsBanner?: boolean;
  autoTrigger?: number;
  onReviewRequested?: (response: ReviewRequestResponse) => void;
  title?: string;
  description?: string;
  debug?: boolean;
  max?: number;
  sessionModel?: any;
  reviewStats?: {
    totalRequests: number;
    lastRequestDate?: string;
  };
  successfulActionsCount?: number;
  minActionsRequired?: number;
  minAppAge?: number;
};

// Compatibility alias
export type ReviewRequestProps = ReviewRequestPropsType;

export const ReviewRequest: React.FC<ReviewRequestPropsType> = ({
  showAsButton = false,
  showAsModal = false,
  showAsBanner = false,
  autoTrigger = -1,
  onReviewRequested,
  title: titleProp,
  description: descriptionProp,
  debug = false,
  max = 0,
  sessionModel,
  reviewStats,
  successfulActionsCount = 0,
  minActionsRequired = 1,
  minAppAge = 0,
}) => {
  const ct = useCommonsT();
  const title = titleProp ?? ct("commons.review.title");
  const description = descriptionProp ?? ct("commons.review.desc");
  const [isVisible, setIsVisible] = useState(true);
  const hasTriggered = useRef(false);

  const shouldShowReview = useAppState("app.review.shouldShowReview");
  const reviewReason = useAppState("app.review.reviewReason");
  const forceReview = useAppState("app.review.forceReview");
  const updateState = useUpdateState();

  const { isLoading, triggerReviewRequest } = useReviewRequest({
    onReviewRequested: (response) => {
      onReviewRequested?.(response);
    },
    onError: (error) => {
      console.error("Review request error:", error);
    },
  });

  useEffect(() => {
    const checkReviewEligibility = async () => {
      if (!sessionModel?.id || !reviewStats) return;

      try {
        const isFirstTime = reviewStats.totalRequests === 0;
        const appAgeInDays = sessionModel?.createdAt
          ? Math.floor(
              (new Date().getTime() - new Date(sessionModel.createdAt).getTime()) /
                (1000 * 60 * 60 * 24)
            )
          : 0;
        const appAgeRequirementMet = appAgeInDays >= minAppAge;
        const maxLimitReached = max > 0 && reviewStats.totalRequests >= max;

        const shouldTrigger =
          appAgeRequirementMet &&
          ((isFirstTime && successfulActionsCount >= minActionsRequired) ||
            (successfulActionsCount >= minActionsRequired &&
              (!reviewStats.lastRequestDate ||
                new Date().getTime() - new Date(reviewStats.lastRequestDate).getTime() >=
                  30 * 24 * 60 * 60 * 1000)));

        if (shouldTrigger && !maxLimitReached) {
          const reason = isFirstTime
            ? `First time review request (${successfulActionsCount} successful actions)`
            : `Eligible for review (${successfulActionsCount} actions)`;

          updateState([
            { key: "app.review.shouldShowReview", value: true },
            { key: "app.review.reviewReason", value: reason },
            { key: "app.review.forceReview", value: true },
          ]);
        } else {
          updateState([
            { key: "app.review.shouldShowReview", value: false },
            { key: "app.review.reviewReason", value: "Not eligible for review" },
            { key: "app.review.forceReview", value: false },
          ]);
        }
      } catch (error) {
        updateState([
          { key: "app.review.shouldShowReview", value: false },
          { key: "app.review.reviewReason", value: "Error checking eligibility" },
        ]);
      }
    };

    checkReviewEligibility();
  }, [
    sessionModel?.id,
    reviewStats,
    minAppAge,
    max,
    successfulActionsCount,
    minActionsRequired,
    updateState,
  ]);

  const recordReviewRequest = useCallback(
    async (response: ReviewRequestResponse) => {
      if (sessionModel?.id) {
        try {
          await fetch("/api/review/record", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId: sessionModel.id,
              success: response.success,
              code: response.code,
              message: response.message,
            }),
          });
        } catch (error) {
          console.error("Failed to record review request:", error);
        }
      }
    },
    [sessionModel?.id]
  );

  const requestReview = useCallback(async () => {
    try {
      const result = await triggerReviewRequest();
      await recordReviewRequest(result);
      if (onReviewRequested) onReviewRequested(result);
      if (result.success) setIsVisible(false);
      updateState("app.review.forceReview", false);
    } catch (error) {
      const errorResponse: ReviewRequestResponse = {
        success: false,
        code: "cancelled",
        message: error instanceof Error ? error.message : "Unknown error",
      };
      await recordReviewRequest(errorResponse);
      updateState("app.review.forceReview", false);
    }
  }, [triggerReviewRequest, recordReviewRequest, onReviewRequested, updateState]);

  useEffect(() => {
    if (autoTrigger >= 0 && isVisible && !hasTriggered.current && shouldShowReview) {
      hasTriggered.current = true;
      if (autoTrigger === 0) {
        requestReview();
      } else {
        const timer = setTimeout(() => requestReview(), autoTrigger);
        return () => clearTimeout(timer);
      }
    }
  }, [autoTrigger, isVisible, shouldShowReview, requestReview]);

  if (!shouldShowReview && !debug) {
    return null;
  }

  const t = {
    title: title || ct("commons.review.title"),
    description: description || ct("commons.review.desc"),
    requestReview: ct("commons.review.leave"),
    maybeLater: ct("commons.review.later"),
    loading: ct("commons.review.requesting"),
  };

  if (showAsButton) {
    return (
      <s-button variant="primary" onClick={requestReview} loading={isLoading}>
        ★ {isLoading ? t.loading : t.requestReview}
      </s-button>
    );
  }

  if (showAsModal && isVisible) {
    return (
      <s-modal id="review-request-modal" heading={t.title} onHide={() => setIsVisible(false)}>
        <div className="p-5 space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">{t.description}</p>
          <div className="flex items-center justify-end gap-2 pt-2">
            <s-button variant="secondary" onClick={() => setIsVisible(false)}>
              {t.maybeLater}
            </s-button>
            <s-button variant="primary" loading={isLoading} onClick={requestReview}>
              {t.requestReview}
            </s-button>
          </div>
        </div>
      </s-modal>
    );
  }

  if (showAsBanner && isVisible) {
    return (
      <s-banner tone="info" dismissible onDismiss={() => setIsVisible(false)}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs">{t.description}</span>
          <s-button variant="primary" loading={isLoading} onClick={requestReview}>
            {t.requestReview}
          </s-button>
        </div>
      </s-banner>
    );
  }

  return null;
};

export { useReviewRequest };
export default ReviewRequest;
