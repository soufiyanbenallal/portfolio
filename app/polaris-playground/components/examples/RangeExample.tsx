"use client";

import React, { useState, type ReactNode } from "react";
import { Range } from "@/app/kits/polaris/ui/forms/Range";

export function RangeExample(): ReactNode {
  const [discountPercent, setDiscountPercent] = useState(25);

  return (
    <div className="w-full max-w-md space-y-4 rounded-xl border border-border bg-card p-5">
      <Range
        label="Volume Discount Percentage"
        helpText="Discount rate automatically applied when purchasing 5 or more items."
        min={0}
        max={50}
        step={5}
        value={discountPercent}
        suffix={<span className="font-semibold text-foreground text-xs">%</span>}
        onChange={setDiscountPercent}
      />
    </div>
  );
}

export default RangeExample;
