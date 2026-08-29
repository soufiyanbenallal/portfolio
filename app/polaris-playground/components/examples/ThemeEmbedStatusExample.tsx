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
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground pb-2">
        <span>Toggle state dynamically via the Re-check button:</span>
        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          className="text-primary hover:underline font-semibold"
        >
          Switch to {isActive ? "Disabled" : "Active"}
        </button>
      </div>

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
    </div>
  );
}
