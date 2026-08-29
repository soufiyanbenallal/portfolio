"use client";

import React, { useState, type ReactNode } from "react";
import { SectionCard } from "@/app/kits/polaris/ui/layouts/SectionCard";

export function SectionCardExample(): ReactNode {
  const [active, setActive] = useState(true);

  return (
    <div className="w-full max-w-xl space-y-4">
      <SectionCard
        title="Checkout Customizations"
        description="Configure rules applied to customer checkout orders."
        actions={
          <s-button variant="secondary" onClick={() => setActive(!active)}>
            {active ? "Disable" : "Enable"}
          </s-button>
        }
      >
        <div className="space-y-3 pt-2 text-xs text-muted-foreground">
          <p>
            When enabled, custom discount rules and address validation triggers will run on all cart transactions.
          </p>
          <div className="flex items-center gap-2 font-medium">
            <span className="text-foreground">Status:</span>
            <s-badge tone={active ? "success" : "neutral"}>
              {active ? "Active & Enforced" : "Inactive"}
            </s-badge>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

export default SectionCardExample;
