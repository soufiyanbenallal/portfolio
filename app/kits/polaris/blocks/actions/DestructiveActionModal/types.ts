import { type ReactNode } from "react";

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
