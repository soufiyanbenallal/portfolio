"use client";

import React, { useState, type ReactNode } from "react";
import { Card } from "~/components/ui/layouts/Card";

export function CardExample(): ReactNode {
  const [active, setActive] = useState(true);

  return (
    <s-page>
      <Card
        title="Checkout Customizations"
        description="Configure rules applied to customer checkout orders."
        rightActions={
          <s-button variant="secondary" onClick={() => setActive(!active)}>
            {active ? "Disable" : "Enable"}
          </s-button>
        }
      >
        <s-box paddingBlockStart="small-200">
          <s-stack direction="block" gap="small-200">
            <s-paragraph>
              When enabled, custom discount rules and address validation triggers will run on all
              cart transactions.
            </s-paragraph>
            <s-stack direction="inline" gap="small-200" alignItems="center">
              <s-text type="strong">Status:</s-text>
              <s-badge tone={active ? "success" : "neutral"}>
                {active ? "Active & Enforced" : "Inactive"}
              </s-badge>
            </s-stack>
          </s-stack>
        </s-box>
      </Card>
    </s-page>
  );
}

export default CardExample;
