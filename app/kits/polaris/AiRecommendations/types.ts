import type { ReactNode } from "react";

export type AiRecommendationActionType = {
  label: string;
  icon?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertiary" | "auto";
  tone?: "critical" | "neutral" | "auto";
};

export type AiRecommendationLiftBadgeType = {
  text: string;
  tone?: "success" | "info" | "warning";
  icon?: string;
};

export type AiRecommendationItemType = {
  id: string;
  title: string;
  tooltip?: ReactNode;
  description: string;
  liftBadge?: AiRecommendationLiftBadgeType;
  imageSrc?: string;
  imageAlt?: string;
  media?: ReactNode;
  primaryAction?: AiRecommendationActionType;
  secondaryAction?: AiRecommendationActionType;
  dismissable?: boolean;
  dismissLabel?: string;
  onDismiss?: () => void;
};

export type AiRecommendationsPropsType = {
  title?: string;
  tooltip?: ReactNode;
  subtitle?: string;
  badgeLabel?: string;
  items: AiRecommendationItemType[];
  dismissable?: boolean;
  onDismiss?: () => void;
  onItemDismiss?: (item: AiRecommendationItemType) => void;
};
