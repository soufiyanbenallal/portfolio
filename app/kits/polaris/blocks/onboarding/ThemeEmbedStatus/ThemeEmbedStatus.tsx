"use client";

import React from "react";
import type { ThemeEmbedStatusPropsType } from "./types";

export function ThemeEmbedStatus({
  shopDomain = "my-store.myshopify.com",
  appEmbedName = "Core App Embed",
  appEmbedHandle = "app-embed",
  themeName = "Dawn (Live)",
  status = "disabled",
  isChecking = false,
  onRecheck,
  onOpenThemeEditor,
  className = "",
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
    <div
      className={`rounded-xl border transition-all duration-200 ${
        isActive
          ? "border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/10"
          : "border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/10"
      } p-4 sm:p-5 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          {/* Status Indicator Icon */}
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
              isActive
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
            }`}
          >
            {isActive ? (
              <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-semibold text-foreground">{appEmbedName}</h4>
              <s-badge tone={isActive ? "success" : "warning"}>
                {isActive ? "Activated on Theme" : "Action Required: Embed Disabled"}
              </s-badge>
            </div>

            <p className="text-xs text-muted-foreground leading-normal max-w-xl">
              {isActive
                ? `App embed is active and rendering on your published theme (${themeName}). No further action is required.`
                : `To display frontend widgets on your store, activate the app embed in your Shopify Theme Editor (${themeName}) and click Save.`}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          {onRecheck && (
            <s-button
              variant="secondary"
              onClick={onRecheck}
              disabled={isChecking}
              icon="refresh"
            >
              {isChecking ? "Checking..." : "Re-check"}
            </s-button>
          )}

          <s-button
            variant={isActive ? "secondary" : "primary"}
            onClick={handleOpenEditor}
          >
            {isActive ? "Customize Theme" : "Activate in Theme Editor →"}
          </s-button>
        </div>
      </div>
    </div>
  );
}

export * from "./types";
