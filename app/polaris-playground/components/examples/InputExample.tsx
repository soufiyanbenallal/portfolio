"use client";

import React, { useState, type ReactNode } from "react";
import { Input } from "@/app/kits/polaris/ui/forms/Input";

export function InputExample(): ReactNode {
  const [storeName, setStoreName] = useState("Snowdevil Snowboards");
  const [contactEmail, setContactEmail] = useState("support@snowdevil.com");
  const [notes, setNotes] = useState("");

  return (
    <div className="w-full max-w-md space-y-4 rounded-xl border border-border bg-card p-5">
      <Input
        label="Store Name"
        value={storeName}
        placeholder="e.g. Acme Apparel"
        onInputChange={(val) => setStoreName(val as string)}
      />

      <Input
        label="Contact Email"
        type="email"
        value={contactEmail}
        placeholder="merchant@store.com"
        onInputChange={(val) => setContactEmail(val as string)}
      />

      <Input
        label="Internal Notes"
        multiline={3}
        value={notes}
        placeholder="Optional notes visible only to staff..."
        onInputChange={(val) => setNotes(val as string)}
      />
    </div>
  );
}

export default InputExample;
