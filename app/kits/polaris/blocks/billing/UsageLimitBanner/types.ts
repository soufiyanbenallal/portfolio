export type UsageLimitBannerPropsType = {
  title?: string;
  resourceName: string; // e.g. "Monthly Orders", "API Calls", "Emails Sent"
  currentUsage: number;
  maxLimit: number;
  unit?: string;
  upgradeUrl?: string;
  onUpgrade?: () => void;
  dismissable?: boolean;
  onDismiss?: () => void;
  className?: string;
};
