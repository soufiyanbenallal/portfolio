"use client";

import React, { useState } from "react";
import { ThemeEmbedStatus } from "@/app/kits/polaris/blocks/onboarding/ThemeEmbedStatus/ThemeEmbedStatus";

export function ThemeEmbedStatusExample() {
  const [isActive, setIsActive] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleRecheck = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      setIsActive((prev) => !prev);
    }, 800);
  };

  return (
    <s-page>
      <s-stack direction="block" gap="base">
        <s-stack direction="inline" justifyContent="space-between" alignItems="center">
          <s-text tone="neutral">Toggle state dynamically via the button:</s-text>
          <s-button variant="secondary" onClick={() => setIsActive(!isActive)}>
            Switch to {isActive ? "Disabled" : "Active"}
          </s-button>
        </s-stack>

        <ThemeEmbedStatus
          shopDomain="quickstart-store.myshopify.com"
          appEmbedName="Sales Booster App Embed"
          appEmbedHandle="sales-booster"
          themeName="Dawn (Published)"
          status={isActive ? "active" : "disabled"}
          isChecking={isChecking}
          onRecheck={handleRecheck}
          onOpenThemeEditor={() => alert("Deep-linking to Shopify Theme Editor...")}
        />
      </s-stack>
    </s-page>
  );
}
