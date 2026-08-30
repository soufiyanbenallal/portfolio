import { useRevalidator } from "react-router";
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useCommonsT } from "~/commons/providers";
import {
  FREQUENCIES,
  RECIPIENT_CAP,
  isValidEmail,
  type ReportFrequencyType,
  type ReportSubscriptionType,
} from "../../service/ReportSubscriptionService";

export type EmailReportsCardPropsType = {
  subscription: ReportSubscriptionType;
  fallbackEmail: string;
  timezone: string;
  endpoint?: string;
  inlineSave?: boolean;
  saveTrigger?: number;
  onSavingChange?: (saving: boolean) => void;
  onDirtyChange?: (dirty: boolean) => void;
};

export type Props = EmailReportsCardPropsType;

const CADENCE_KEYS: Record<ReportFrequencyType, string> = {
  daily: "commons.email_reports.cadence_daily",
  weekly: "commons.email_reports.cadence_weekly",
  monthly: "commons.email_reports.cadence_monthly",
};

export type EmailReportsCardRefType = {
  getFormData: () => {
    enabled: boolean;
    frequency: string;
    recipients: string[];
    timezone: string;
  };
};

export const EmailReportsCard = forwardRef<EmailReportsCardRefType, EmailReportsCardPropsType>(
  function EmailReportsCard(
    {
      subscription,
      fallbackEmail,
      timezone,
      endpoint = "/api/email-reports",
      inlineSave = true,
      saveTrigger,
      onSavingChange,
      onDirtyChange,
    },
    ref
  ) {
    const [enabled, setEnabled] = useState<boolean>(subscription.enabled);
    const [frequency, setFrequency] = useState<ReportFrequencyType>(subscription.frequency);
    const [recipients, setRecipients] = useState<string[]>(subscription.recipients);
    const [draftEmail, setDraftEmail] = useState("");
    const [recipientError, setRecipientError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const revalidator = useRevalidator();
    const ct = useCommonsT();
    const prevSaveTrigger = useRef(saveTrigger);

    useImperativeHandle(
      ref,
      () => ({
        getFormData: () => ({ enabled, frequency, recipients, timezone }),
      }),
      [enabled, frequency, recipients, timezone]
    );

    const addRecipient = () => {
      const trimmed = draftEmail.trim();
      if (!trimmed) return;
      if (!isValidEmail(trimmed)) {
        setRecipientError(ct("commons.email_reports.invalid_email"));
        return;
      }
      if (recipients.includes(trimmed)) {
        setRecipientError(ct("commons.email_reports.already_added"));
        return;
      }
      if (recipients.length >= RECIPIENT_CAP) {
        setRecipientError(ct("commons.email_reports.max_recipients", { max: RECIPIENT_CAP }));
        return;
      }
      setRecipients([...recipients, trimmed]);
      setDraftEmail("");
      setRecipientError(null);
    };

    const removeRecipient = (email: string) => {
      setRecipients(recipients.filter((r) => r !== email));
      setRecipientError(null);
    };

    const save = async () => {
      setSaving(true);
      onSavingChange?.(true);
      setError(null);
      setSuccess(null);

      const formData = new FormData();
      formData.append("enabled", enabled ? "true" : "false");
      formData.append("frequency", frequency);
      formData.append("recipients", recipients.join(","));
      formData.append("timezone", timezone);

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (response.ok && data.ok) {
          setSuccess(ct("commons.email_reports.saved"));
          if (data.subscription) {
            setEnabled(data.subscription.enabled);
            setFrequency(data.subscription.frequency);
            setRecipients(data.subscription.recipients);
          }
          revalidator.revalidate();
        } else {
          setError(data.error || ct("commons.email_reports.save_failed"));
        }
      } catch {
        setError(ct("commons.email_reports.network_error"));
      } finally {
        setSaving(false);
        onSavingChange?.(false);
      }
    };

    useEffect(() => {
      const dirty =
        enabled !== subscription.enabled ||
        frequency !== subscription.frequency ||
        JSON.stringify(recipients) !== JSON.stringify(subscription.recipients);
      onDirtyChange?.(dirty);
    }, [enabled, frequency, recipients, subscription, onDirtyChange]);

    useEffect(() => {
      if (saveTrigger !== undefined && saveTrigger !== prevSaveTrigger.current) {
        prevSaveTrigger.current = saveTrigger;
        if (saveTrigger > 0) save();
      }
    }, [saveTrigger]);

    const previewLine = !enabled
      ? ct("commons.email_reports.disabled")
      : ct("commons.email_reports.preview", {
          cadence: ct(CADENCE_KEYS[frequency]),
          timezone,
        });

    return (
      <div className="border-border bg-card space-y-4 rounded-xl border p-5">
        <div>
          <h3 className="text-foreground text-base font-bold">
            {ct("commons.email_reports.title")}
          </h3>
          <p className="text-muted-foreground mt-0.5 text-xs">
            {ct("commons.email_reports.subtitle")}
          </p>
        </div>

        {success && <s-banner tone="success">{success}</s-banner>}
        {error && <s-banner tone="critical">{error}</s-banner>}

        <s-checkbox
          label={ct("commons.email_reports.enable")}
          checked={enabled}
          onChange={(e: any) => setEnabled(e.target.checked)}
        />

        {enabled && (
          <div className="border-border space-y-4 border-t pt-3">
            <div className="space-y-2">
              <span className="text-foreground block text-xs font-semibold">
                {ct("commons.email_reports.frequency")}
              </span>
              <div className="flex items-center gap-4">
                {FREQUENCIES.map((f) => (
                  <label
                    key={f}
                    className="text-foreground flex cursor-pointer items-center gap-1.5 text-xs"
                  >
                    <input
                      type="radio"
                      name="email-report-frequency"
                      checked={frequency === f}
                      onChange={() => setFrequency(f)}
                      className="accent-primary"
                    />
                    {ct(`commons.email_reports.freq_${f}`)}
                  </label>
                ))}
              </div>
            </div>

            <div className="border-border space-y-2 border-t pt-3">
              <span className="text-foreground block text-xs font-semibold">
                {ct("commons.email_reports.recipients")}
              </span>
              <p className="text-muted-foreground text-xs">
                {ct("commons.email_reports.recipients_limit", {
                  max: RECIPIENT_CAP,
                })}
                {fallbackEmail
                  ? ` ${ct("commons.email_reports.default_email", { email: fallbackEmail })}`
                  : ""}
              </p>

              {recipients.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {recipients.map((r) => (
                    <span
                      key={r}
                      className="bg-muted text-foreground inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs"
                    >
                      {r}
                      <button
                        type="button"
                        onClick={() => removeRecipient(r)}
                        className="text-muted-foreground hover:text-foreground text-xs"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {recipients.length < RECIPIENT_CAP && (
                <div className="flex max-w-md items-center gap-2 pt-1">
                  <s-email-field
                    label={ct("commons.email_reports.add_recipient")}
                    placeholder="ops@your-store.com"
                    value={draftEmail}
                    onInput={(e: any) => {
                      setDraftEmail(e.target.value);
                      setRecipientError(null);
                    }}
                  />
                  <s-button onClick={addRecipient} disabled={!draftEmail.trim()}>
                    {ct("commons.email_reports.add")}
                  </s-button>
                </div>
              )}
              {recipientError && <p className="text-destructive text-xs">{recipientError}</p>}
            </div>

            <p className="text-muted-foreground pt-2 text-xs">{previewLine}</p>
          </div>
        )}

        {inlineSave && (
          <div className="border-border flex justify-end border-t pt-3">
            <s-button variant="primary" onClick={save} loading={saving}>
              {ct("commons.save")}
            </s-button>
          </div>
        )}
      </div>
    );
  }
);

export default EmailReportsCard;
