"use client";

import React, { useState } from "react";
import { DestructiveActionModal } from "@/app/kits/polaris/blocks/actions/DestructiveActionModal/DestructiveActionModal";

export function DestructiveActionModalExample() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      alert("Feed 'black-friday-promos' has been permanently deleted.");
    }, 1000);
  };

  return (
    <s-page>
      <s-box padding="base">
        <s-stack direction="block" gap="base" alignItems="center">
          <s-heading>Destructive Action Safety Verification</s-heading>
          <s-paragraph>
            Click the button below to test the double-check confirmation dialog with keyword verification.
          </s-paragraph>

          <s-button variant="primary" tone="critical" onClick={() => setOpen(true)}>
            Delete Feed "black-friday-promos"
          </s-button>

          <DestructiveActionModal
            open={open}
            onClose={() => setOpen(false)}
            onConfirm={handleConfirm}
            title="Delete promotional feed?"
            description="This action cannot be undone. All active announcement banners and associated analytics data for this feed will be permanently erased."
            verificationKeyword="DELETE"
            confirmButtonLabel="Delete feed permanently"
            isLoading={loading}
          />
        </s-stack>
      </s-box>
    </s-page>
  );
}
