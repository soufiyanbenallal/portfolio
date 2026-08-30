"use client";

import React, { useState, type ReactNode } from "react";
import { DismissableBanner } from "~/components/ui/feedbacks/DismissableBanner";

export function DismissableBannerExample(): ReactNode {
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("banner-dismissed-store-migration");
      localStorage.removeItem("banner-dismissed-shipping-update");
    }
    setResetKey((k) => k + 1);
  };

  return (
    <s-page key={resetKey}>
      <s-stack direction="block" gap="base">
        <DismissableBanner
          storageKey="store-migration"
          heading="Store migration completed"
          tone="info"
        >
          Your inventory records and order tags have been synced across all locations.
        </DismissableBanner>

        <DismissableBanner
          storageKey="shipping-update"
          heading="Carrier rates updated"
          tone="success"
        >
          DHL Express and FedEx international shipping profiles are now active.
        </DismissableBanner>

        <s-stack direction="inline" justifyContent="center">
          <s-button variant="secondary" onClick={handleReset}>
            Reset dismissed banners (clears localStorage)
          </s-button>
        </s-stack>
      </s-stack>
    </s-page>
  );
}

export default DismissableBannerExample;
