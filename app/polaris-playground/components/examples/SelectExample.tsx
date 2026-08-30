"use client";

import React, { useState, type ReactNode } from "react";
import { Select } from "~/components/ui/forms/Select";

const CURRENCY_OPTIONS = [
  { label: "USD ($) — United States Dollar", value: "USD" },
  { label: "EUR (€) — Euro", value: "EUR" },
  { label: "GBP (£) — British Pound", value: "GBP" },
  { label: "CAD ($) — Canadian Dollar", value: "CAD" },
  { label: "JPY (¥) — Japanese Yen", value: "JPY" },
];

export function SelectExample(): ReactNode {
  const [currency, setCurrency] = useState("USD");

  return (
    <s-page>
      <s-box padding="base" borderWidth="base" borderRadius="base" background="base">
        <Select
          label="Store base currency"
          helpText="The standard currency used to price catalog items and calculate checkout payouts."
          options={CURRENCY_OPTIONS}
          value={currency}
          onChange={setCurrency}
        />
      </s-box>
    </s-page>
  );
}

export default SelectExample;
