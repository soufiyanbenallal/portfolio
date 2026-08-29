import { type ReactNode } from "react";

export type SetupGuideStepStatusType =
  | "completed"
  | "in_progress"
  | "not_started"
  | "optional";

export type SetupGuideActionType = {
  label: string;
  url?: string;
  onClick?: () => void;
  primary?: boolean;
  external?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

export type SetupGuideStepItemType = {
  id: string;
  title: string;
  description: ReactNode;
  status: SetupGuideStepStatusType;
  badgeLabel?: string;
  illustrationUrl?: string;
  estimatedTime?: string;
  primaryAction?: SetupGuideActionType;
  secondaryAction?: SetupGuideActionType;
  onToggleComplete?: (stepId: string, completed: boolean) => void;
};

export type SetupGuidePropsType = {
  title?: string;
  subtitle?: string;
  steps: SetupGuideStepItemType[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  dismissable?: boolean;
  onDismiss?: () => void;
  className?: string;
};
