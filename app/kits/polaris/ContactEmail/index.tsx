import { useState } from "react";
import { useLocation } from "react-router";
import { useCommonsT } from "~/commons/providers";

export type ContactEmailPropsType = {
  currentEmail?: string | null;
  value?: string;
  onChange?: (value: string) => void;
  minimalDesign?: boolean;
  title?: string;
  description?: string;
  imageUrl?: string;
  privacyText?: string;
  successMessage?: string;
  errorMessage?: string;
  onClose?: () => void;
  onSuccess?: (email: string) => void;
  onError?: (error: string) => void;
};

export const ContactEmail = ({
  currentEmail,
  value: controlledValue,
  onChange: controlledOnChange,
  minimalDesign = true,
  title: titleProp,
  description: descriptionProp,
  privacyText: privacyTextProp,
  successMessage: successMessageProp,
  errorMessage: errorMessageProp,
  onClose,
  onSuccess,
  onError,
}: ContactEmailPropsType): JSX.Element | null => {
  const ct = useCommonsT();
  const title = titleProp ?? ct("commons.contact.update_title");
  const description = descriptionProp ?? ct("commons.contact.update_desc");
  const privacyText = privacyTextProp ?? ct("commons.contact.privacy");
  const successMessage = successMessageProp ?? ct("commons.contact.success");
  const errorMessage = errorMessageProp ?? ct("commons.contact.error");
  const isControlled = controlledOnChange !== undefined;
  const [localEmail, setLocalEmail] = useState<string>(currentEmail ?? "");
  const email = isControlled ? (controlledValue ?? "") : localEmail;
  const setEmail = isControlled ? controlledOnChange! : setLocalEmail;
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [close, setClose] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const location = useLocation();

  const validateEmail = (emailStr: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailStr)) {
      setError(ct("commons.contact.invalid_email", { email: emailStr }));
      return false;
    }
    setError(null);
    return true;
  };

  const handleSave = async () => {
    if (!email || !validateEmail(email)) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("contactEmail", email);

    try {
      const response = await fetch("/api/setting/update/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccess(successMessage);
        setIsSaved(true);
        onSuccess?.(email);
      } else {
        const errorText = await response.text();
        setError(errorText || errorMessage);
        onError?.(errorText || errorMessage);
      }
    } catch {
      const errorMsg = ct("commons.contact.generic_error");
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setClose(true);
    onClose?.();
  };

  if (close && location.pathname === "/app") return null;

  return (
    <div
      className={`border-border bg-card relative rounded-xl border p-4 ${minimalDesign ? "" : "p-6"}`}
    >
      <div className="space-y-3">
        <div>
          <h2 className="text-foreground text-base font-bold">{title}</h2>
          <p className="text-muted-foreground mt-0.5 text-xs">{description}</p>
        </div>

        {success && <s-banner tone="success">{success}</s-banner>}
        {error && <s-banner tone="critical">{error}</s-banner>}

        <div className="space-y-2">
          <s-email-field
            label={ct("commons.contact.email_label")}
            value={email}
            onInput={(e: any) => {
              setEmail(e.target.value);
              setIsSaved(false);
            }}
            placeholder="admin@yourstore.com"
          />

          {isControlled ? (
            <p className="text-muted-foreground text-[11px]">{privacyText}</p>
          ) : (
            <div className="flex items-center justify-between gap-4 pt-1">
              <p className="text-muted-foreground text-[11px]">{privacyText}</p>
              <s-button
                variant="primary"
                onClick={handleSave}
                loading={loading}
                disabled={loading || email === ""}
              >
                {ct("commons.contact.save")}
              </s-button>
            </div>
          )}
        </div>
      </div>

      {currentEmail != null && location.pathname !== "/app/settings" && isSaved && (
        <button
          type="button"
          onClick={handleClose}
          className="text-muted-foreground hover:text-foreground absolute top-3 right-3 p-1 text-xs"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default ContactEmail;
