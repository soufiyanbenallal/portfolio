export type ThemeEmbedStatusStateModelType = "active" | "disabled" | "checking" | "unknown";

export type ThemeEmbedStatusPropsType = {
  shopDomain?: string;
  appEmbedHandle?: string;
  appEmbedName?: string;
  appEmbedExtensionId?: string;
  themeName?: string;
  status?: ThemeEmbedStatusStateModelType;
  isChecking?: boolean;
  onRecheck?: () => void;
  onOpenThemeEditor?: () => void;
  className?: string;
};
