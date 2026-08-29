"use client";

import React, { useState, type ReactNode } from "react";
import { CheckBox } from "@/app/kits/polaris/ui/forms/CheckBox";

export function CheckBoxExample(): ReactNode {
  const [trackInventory, setTrackInventory] = useState(true);
  const [continueSelling, setContinueSelling] = useState(false);

  return (
    <div className="w-full max-w-md space-y-4 rounded-xl border border-border bg-card p-5">
      <div className="space-y-3">
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
      </div>
    </div>
  );
}

export default CheckBoxExample;
