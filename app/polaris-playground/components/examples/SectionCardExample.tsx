"use client";

import React, { useState, type ReactNode } from "react";
import { SectionCard } from "@/app/kits/polaris/ui/layouts/SectionCard";

export function SectionCardExample(): ReactNode {
  const [active, setActive] = useState(true);

  return (
    <s-page>
      <SectionCard
        title="Checkout Customizations"
        description="Configure rules applied to customer checkout orders."
        actions={
          <s-button variant="secondary" onClick={() => setActive(!active)}>
            {active ? "Disable" : "Enable"}
          </s-button>
        }
      >
        <s-box paddingBlockStart="small-200">
          <s-stack direction="block" gap="small-200">
            <s-paragraph>
              When enabled, custom discount rules and address validation triggers will run on all cart transactions.
            </s-paragraph>
            <s-stack direction="inline" gap="small-200" alignItems="center">
              <s-text type="strong">Status:</s-text>
              <s-badge tone={active ? "success" : "neutral"}>
                {active ? "Active & Enforced" : "Inactive"}
              </s-badge>
            </s-stack>
          </s-stack>
        </s-box>
      </SectionCard>
    </s-page>
  );
}

export default SectionCardExample;
