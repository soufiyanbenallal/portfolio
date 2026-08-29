"use client";

import React, { useState, type ReactNode } from "react";
import { DismissableBanner } from "@/app/kits/polaris/ui/feedbacks/DismissableBanner";

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
    <div key={resetKey} className="w-full max-w-2xl space-y-4">
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

      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={handleReset}
          className="text-xs text-muted-foreground hover:text-foreground underline cursor-pointer"
        >
          Reset dismissed banners (clears localStorage)
        </button>
      </div>
    </div>
  );
}

export default DismissableBannerExample;
