"use client";

import React, { useState, type ReactNode } from "react";
import { Toggle } from "~/components/ui/forms/Toggle";

export function ToggleExample(): ReactNode {
  const [autoFulfill, setAutoFulfill] = useState(true);
  const [notifyCustomer, setNotifyCustomer] = useState(true);

  return (
    <s-page>
      <s-box padding="base" borderWidth="base" borderRadius="base" background="base">
        <s-stack direction="block" gap="base">
          <s-stack direction="inline" justifyContent="space-between" alignItems="center">
            <s-stack direction="block" gap="none">
              <s-text type="strong">Auto-fulfill digital items</s-text>
              <s-text tone="neutral">Mark orders fulfilled upon successful payment capture.</s-text>
            </s-stack>
            <Toggle active={autoFulfill} onChange={setAutoFulfill} />
          </s-stack>

          <s-divider />

          <s-stack direction="inline" justifyContent="space-between" alignItems="center">
            <s-stack direction="block" gap="none">
              <s-text type="strong">Send customer notifications</s-text>
              <s-text tone="neutral">Email order status links upon dispatch.</s-text>
            </s-stack>
            <Toggle active={notifyCustomer} onChange={setNotifyCustomer} />
          </s-stack>
        </s-stack>
      </s-box>
    </s-page>
  );
}

export default ToggleExample;
