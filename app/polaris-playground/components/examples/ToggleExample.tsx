"use client";

import React, { useState, type ReactNode } from "react";
import { Toggle } from "@/app/kits/polaris/ui/forms/Toggle";

export function ToggleExample(): ReactNode {
  const [autoFulfill, setAutoFulfill] = useState(true);
  const [notifyCustomer, setNotifyCustomer] = useState(true);

  return (
    <div className="w-full max-w-md space-y-4 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-foreground">Auto-fulfill digital items</div>
          <div className="text-xs text-muted-foreground">Mark orders fulfilled upon successful payment capture.</div>
        </div>
        <Toggle active={autoFulfill} onChange={setAutoFulfill} />
      </div>

      <div className="h-px bg-border" />

      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-foreground">Send customer notifications</div>
          <div className="text-xs text-muted-foreground">Email order status links upon dispatch.</div>
        </div>
        <Toggle active={notifyCustomer} onChange={setNotifyCustomer} />
      </div>
    </div>
  );
}

export default ToggleExample;
