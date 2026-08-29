export type AppReviewPromptPropsType = {
  appName?: string;
  appStoreUrl: string;
  feedbackFormUrl?: string;
  minRatingForAppStore?: number; // default 4 or 5 stars routes to App Store, lower to feedback form
  onReviewSubmitted?: (rating: number, destination: "app_store" | "feedback_form") => void;
  onDismiss?: () => void;
  dismissable?: boolean;
  className?: string;
};
