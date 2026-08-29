"use client";

import React, { useState, useEffect } from "react";
import type { DestructiveActionModalPropsType } from "./types";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md rounded-2xl border border-destructive/30 bg-card p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        {/* Header with Danger Tone */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            <div className="text-xs text-muted-foreground leading-relaxed">{description}</div>
          </div>
        </div>

        {/* Optional Typing Verification Guard */}
        {verificationKeyword && (
          <div className="space-y-2 pt-2 border-t border-border/60">
            <label className="block text-xs font-medium text-foreground">
              {verificationPrompt || (
                <>
                  To confirm, please type <span className="font-bold text-destructive select-all font-mono">{verificationKeyword}</span> below:
                </>
              )}
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Type "${verificationKeyword}"`}
              className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-hidden focus:ring-2 focus:ring-destructive/30 focus:border-destructive transition-all"
            />
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-2">
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
        </div>
      </div>
    </div>
  );
}

export * from "./types";
