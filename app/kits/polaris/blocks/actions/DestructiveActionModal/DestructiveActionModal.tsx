"use client";

import React, { useState, useEffect, type ReactNode } from "react";

export type DestructiveActionModalPropsType = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: ReactNode;
  /** Expected keyword the user must type (e.g. "DELETE" or resource name) */
  verificationKeyword?: string;
  verificationPrompt?: string;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  isLoading?: boolean;
};


export function DestructiveActionModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  verificationKeyword,
  verificationPrompt,
  confirmButtonLabel = "Delete permanently",
  cancelButtonLabel = "Cancel",
  isLoading = false,
}: DestructiveActionModalPropsType) {
  const [inputValue, setInputValue] = useState("");

  // Reset typed confirmation whenever modal opens
  useEffect(() => {
    if (open) {
      setInputValue("");
    }
  }, [open]);

  if (!open) return null;

  const isVerified = verificationKeyword
    ? inputValue.trim() === verificationKeyword.trim()
    : true;

  const handleConfirm = () => {
    if (isVerified && !isLoading) {
      onConfirm();
    }
  };

  return (
    <s-modal
      id="destructive-action-modal"
      heading={title}
      onHide={onClose}
    >
      <s-box padding="base">
        <s-stack direction="block" gap="base">
          <s-banner tone="critical" heading="Danger Zone">
            {description}
          </s-banner>

          {verificationKeyword && (
            <s-box paddingBlockStart="base">
              <s-stack direction="block" gap="small-200">
                <s-text>
                  {verificationPrompt || `To confirm, please type "${verificationKeyword}" below:`}
                </s-text>
                <s-text-field
                  value={inputValue}
                  onInput={(e: any) => setInputValue(e.target.value)}
                  placeholder={`Type "${verificationKeyword}"`}
                />
              </s-stack>
            </s-box>
          )}

          <s-box paddingBlockStart="base">
            <s-stack direction="inline" gap="small-200" justifyContent="end">
              <s-button variant="secondary" onClick={onClose} disabled={isLoading}>
                {cancelButtonLabel}
              </s-button>
              <s-button
                variant="primary"
                tone="critical"
                onClick={handleConfirm}
                disabled={!isVerified || isLoading}
                loading={isLoading}
              >
                {confirmButtonLabel}
              </s-button>
            </s-stack>
          </s-box>
        </s-stack>
      </s-box>
    </s-modal>
  );
}

export default DestructiveActionModal;
