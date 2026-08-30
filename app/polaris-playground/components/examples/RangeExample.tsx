"use client";

import React, { useState, type ReactNode } from "react";
import { Range } from "~/components/ui/forms/Range";

export function RangeExample(): ReactNode {
  const [discountPercent, setDiscountPercent] = useState(25);

  return (
    <s-page>
      <s-box padding="base" borderWidth="base" borderRadius="base" background="base">
        <Range
          label="Volume Discount Percentage"
          helpText="Discount rate automatically applied when purchasing 5 or more items."
          min={0}
          max={50}
          step={5}
          value={discountPercent}
          suffix={<s-text type="strong">%</s-text>}
          onChange={setDiscountPercent}
        />
      </s-box>
    </s-page>
  );
}

export default RangeExample;
