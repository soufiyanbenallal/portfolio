"use client";

import React from "react";

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


export function ThemeEmbedStatus({
  shopDomain = "my-store.myshopify.com",
  appEmbedName = "Core App Embed",
  appEmbedHandle = "app-embed",
  themeName = "Dawn (Live)",
  status = "disabled",
  isChecking = false,
  onRecheck,
  onOpenThemeEditor,
}: ThemeEmbedStatusPropsType) {
  const isActive = status === "active";

  const getThemeEditorUrl = () => {
    const cleanDomain = shopDomain.replace(/^https?:\/\//, "");
    return `https://${cleanDomain}/admin/themes/current/editor?context=apps&activateAppId=${appEmbedHandle}`;
  };

  const handleOpenEditor = () => {
    if (onOpenThemeEditor) {
      onOpenThemeEditor();
      return;
    }
    window.open(getThemeEditorUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <s-banner
      tone={isActive ? "success" : "warning"}
      heading={isActive ? `${appEmbedName} is Active` : `Action Required: Activate ${appEmbedName}`}
    >
      <s-stack direction="block" gap="base">
        <s-paragraph>
          {isActive
            ? `App embed is active and rendering on your published theme (${themeName}). No further action is required.`
            : `To display frontend widgets on your store, activate the app embed in your Shopify Theme Editor (${themeName}) and click Save.`}
        </s-paragraph>

        <s-stack direction="inline" gap="small-200" alignItems="center">
          <s-button
            variant={isActive ? "secondary" : "primary"}
            onClick={handleOpenEditor}
          >
            {isActive ? "Customize in Theme Editor" : "Activate in Theme Editor →"}
          </s-button>

          {onRecheck && (
            <s-button
              variant="secondary"
              onClick={onRecheck}
              disabled={isChecking}
            >
              {isChecking ? "Checking..." : "Re-check status"}
            </s-button>
          )}
        </s-stack>
      </s-stack>
    </s-banner>
  );
}

export default ThemeEmbedStatus;
