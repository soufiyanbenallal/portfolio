export type AiRecommendationActionType = {
  label: string;
  icon?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export type AiRecommendationLiftBadgeType = {
  text: string;
  tone?: "success" | "info" | "warning";
  icon?: string;
};

export type AiRecommendationItemType = {
  id: string;
  title: string;
  description: string;
  liftBadge?: AiRecommendationLiftBadgeType;
  imageSrc?: string;
  primaryAction: AiRecommendationActionType;
};

export type AiRecommendationsPropsType = {
  title?: string;
  subtitle?: string;
  badgeLabel?: string;
  items: AiRecommendationItemType[];
  dismissable?: boolean;
  onDismiss?: () => void;
};
