"use client";

import React, { useState, type ReactNode } from "react";
import { CheckBox } from "~/components/ui/forms/CheckBox";

export function CheckBoxExample(): ReactNode {
  const [trackInventory, setTrackInventory] = useState(true);
  const [continueSelling, setContinueSelling] = useState(false);

  return (
    <s-page>
      <s-box padding="base" borderWidth="base" borderRadius="base" background="base">
        <s-stack direction="block" gap="base">
          <CheckBox
            label="Track inventory quantity"
            helpText="Automatically adjust stock counts when customer orders are fulfilled."
            checked={trackInventory}
            onChange={setTrackInventory}
          />

          <CheckBox
            label="Continue selling when out of stock"
            helpText="Allow backorders on pre-order items."
            checked={continueSelling}
            disabled={!trackInventory}
            onChange={setContinueSelling}
          />
        </s-stack>
      </s-box>
    </s-page>
  );
}

export default CheckBoxExample;
