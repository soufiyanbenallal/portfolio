import { useState } from "react";
import MediaUploader from "./MediaUploader";
import { useCommonsT } from "~/commons/providers";

export type SupportImageItemType =
  File | { name: string; size: number; type: string; url: string; id: string };

export type CreateTicketModalFormType = {
  contactEmail: string;
  title: string;
  description: string;
  images: SupportImageItemType[];
  type: string;
};

export type CreateTicketModalPropsType = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  submitting: boolean;
  form: CreateTicketModalFormType;
  setForm: React.Dispatch<React.SetStateAction<CreateTicketModalFormType>>;
  sessionEmail: string;
  asModal?: boolean;
};

// Compatibility alias
export type CreateTicketModalProps = CreateTicketModalPropsType;

function maskEmail(email: string) {
  const [user, domain] = email.split("@");
  if (!user || !domain) return email;
  if (user.length <= 2) return user[0] + "****@" + domain;
  return user[0] + "****" + user[user.length - 1] + "@" + domain;
}

export const CreateTicketModal = ({
  open,
  onClose,
  onSubmit,
  submitting,
  form,
  setForm,
  sessionEmail,
  asModal = false,
}: CreateTicketModalPropsType): JSX.Element | null => {
  const ct = useCommonsT();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string>("");

  const handleChange = (field: keyof CreateTicketModalFormType) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
    setGeneralError("");
  };

  const handleRemoveImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  function validateForm() {
    const errors: Record<string, string> = {};
    if (!form.contactEmail) {
      errors.contactEmail = ct("commons.support.email_required");
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.contactEmail)) {
      errors.contactEmail = ct("commons.support.email_invalid");
    }
    if (!form.title) {
      errors.title = ct("commons.support.title_required");
    }
    if (!form.description) {
      errors.description = ct("commons.support.desc_required");
    }
    if (!form.type) {
      errors.type = ct("commons.support.type_required");
    }
    return errors;
  }

  const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setGeneralError(ct("commons.support.fill_required"));
      return;
    }
    setFormErrors({});
    setGeneralError("");
    onSubmit();
  };

  const ticketTypeOptions = [
    { label: ct("commons.support.type_bug"), value: "bug" },
    { label: ct("commons.support.type_feature"), value: "feature" },
    { label: ct("commons.support.type_question"), value: "question" },
    {
      label: ct("commons.support.type_integration"),
      value: "integration_request",
    },
    { label: ct("commons.support.type_other"), value: "other" },
  ];

  const content = (
    <div className="space-y-4">
      {generalError && (
        <s-banner tone="critical" dismissible>
          {generalError}
        </s-banner>
      )}

      {sessionEmail && (
        <div className="space-y-1">
          <s-text-field
            label={ct("commons.support.shopify_email")}
            value={maskEmail(sessionEmail)}
            readOnly
          />
        </div>
      )}

      <div className="space-y-1">
        <s-email-field
          label={ct("commons.support.contact_email")}
          value={form.contactEmail}
          onInput={(e: any) => handleChange("contactEmail")(e.target.value)}
          required
        />
        {formErrors.contactEmail && (
          <p className="text-xs text-destructive">{formErrors.contactEmail}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-foreground block">
          {ct("commons.support.ticket_type")}
        </label>
        <select
          value={form.type}
          disabled={submitting}
          onChange={(e) => handleChange("type")(e.target.value)}
          className="w-full h-9 rounded-lg border border-border bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {ticketTypeOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <s-text-field
          label={ct("commons.support.title")}
          value={form.title}
          onInput={(e: any) => handleChange("title")(e.target.value)}
          required
        />
        {formErrors.title && <p className="text-xs text-destructive">{formErrors.title}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-foreground block">
          {ct("commons.support.description")}
        </label>
        <textarea
          value={form.description}
          onChange={(e) => handleChange("description")(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-border bg-card p-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
          placeholder="Please describe your issue or question..."
          required
        />
        {formErrors.description && (
          <p className="text-xs text-destructive">{formErrors.description}</p>
        )}
      </div>

      <div className="space-y-2 pt-2 border-t border-border">
        <span className="text-xs font-semibold text-foreground block">
          {ct("commons.support.add_attachments")}
        </span>
        <MediaUploader
          multiple
          disabled={submitting}
          onUploadComplete={(uploadedFiles) => {
            setForm((prev) => ({
              ...prev,
              images: [
                ...prev.images,
                ...uploadedFiles.map((file) => ({
                  name: file.alt || file.id,
                  size: 0,
                  type: "image",
                  url: file.url,
                  id: file.id,
                })),
              ],
            }));
          }}
        >
          <s-button variant="secondary" disabled={submitting}>
            {ct("commons.support.attach_files")}
          </s-button>
        </MediaUploader>

        {form?.images?.length > 0 && (
          <div className="grid grid-cols-4 gap-2 pt-2">
            {form.images.map((file, idx) => {
              const isUploaded = typeof file !== "undefined" && "url" in file && !!file.url;
              const imgUrl = isUploaded ? (file as any).url : URL.createObjectURL(file as File);
              return (
                <div
                  key={idx}
                  className="relative group rounded-lg overflow-hidden border border-border aspect-square bg-muted/20"
                >
                  <img src={imgUrl} alt="attachment" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-destructive text-destructive-foreground opacity-90 hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  if (asModal) {
    if (!open) return null;
    return (
      <s-modal
        id="create-ticket-modal"
        heading={ct("commons.support.create_ticket")}
        onHide={onClose}
      >
        <div className="p-5 max-w-lg max-h-[80vh] overflow-y-auto space-y-4">
          {content}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <s-button variant="secondary" onClick={onClose}>
              {ct("commons.cancel")}
            </s-button>
            <s-button
              variant="primary"
              loading={submitting}
              disabled={submitting || !form.contactEmail || !form.title || !form.description}
              onClick={handleSubmit}
            >
              {submitting ? ct("commons.support.submitting") : ct("commons.support.submit_ticket")}
            </s-button>
          </div>
        </div>
      </s-modal>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex-1 overflow-y-auto">{content}</div>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <s-button
          variant="primary"
          onClick={handleSubmit}
          disabled={submitting || !form.contactEmail || !form.title || !form.description}
          loading={submitting}
        >
          {submitting ? ct("commons.support.submitting") : ct("commons.support.submit_ticket")}
        </s-button>
        <s-button variant="secondary" onClick={onClose} disabled={submitting}>
          {ct("commons.cancel")}
        </s-button>
      </div>
    </div>
  );
};

export default CreateTicketModal;
