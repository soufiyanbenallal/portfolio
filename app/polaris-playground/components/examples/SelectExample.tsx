"use client";

import React, { useState, type ReactNode } from "react";
import { Select } from "@/app/kits/polaris/ui/forms/Select";

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
    <div className="w-full max-w-md space-y-4 rounded-xl border border-border bg-card p-5">
      <Select
        label="Store base currency"
        helpText="The standard currency used to price catalog items and calculate checkout payouts."
        options={CURRENCY_OPTIONS}
        value={currency}
        onChange={setCurrency}
      />
    </div>
  );
}

export default SelectExample;
