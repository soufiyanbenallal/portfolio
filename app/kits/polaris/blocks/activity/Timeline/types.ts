import type { ReactNode, JSX } from "react";

export type IconType = JSX.IntrinsicElements["s-icon"]["type"];

export type TimelineEventToneType =
  | "auto"
  | "success"
  | "info"
  | "neutral"
  | "warning"
  | "critical";

export type TimelineActionItemType = {
  label: string;
  onClick?: () => void;
  url?: string;
  variant?: "primary" | "secondary" | "tertiary";
};

export type TimelineItemType = {
  id: string;
  timestamp: string | Date;
  title: ReactNode;
  timelineEvent?: ReactNode; // Compatibility alias for title
  description?: ReactNode;
  actor?: string;
  actorAvatar?: string;
  icon?: IconType | string;
  tone?: TimelineEventToneType | string;
  tag?: string;
  url?: string;
  actions?: TimelineActionItemType[];
  metadata?: Record<string, string>;
};

// Compatibility aliases
export type TimelineItem = TimelineItemType;
export type TimelineActionItem = TimelineActionItemType;

export type TimelinePropsType = {
  title?: string;
  subtitle?: string;
  items?: TimelineItemType[];
  searchable?: boolean;
  allowFilter?: boolean;
  pageSize?: number;
  emptyStateHeading?: string;
  emptyStateMessage?: string;
  onRefresh?: () => void;
  className?: string;
};

export type TimelineProps = TimelinePropsType;
