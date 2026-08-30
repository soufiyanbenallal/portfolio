import { useState, useCallback, useEffect } from "react";
import type {
  IntegrationModelType,
  IntegrationDefinitionType,
  IntegrationFeatureType,
} from "~/commons/types/integrations";
import KlaviyoSetup from "./providers/KlaviyoSetup";
import ShopifyFlowSetup from "./providers/ShopifyFlowSetup";
import { useCommonsT } from "~/commons/providers";

export type IntegrationSetupModalPropsType = {
  definition: IntegrationDefinitionType | null;
  integration?: IntegrationModelType | null;
  /** App-defined feature toggles for this integration type */
  features?: IntegrationFeatureType[];
  open: boolean;
  onClose: () => void;
  onSave: (type: string, config: Record<string, unknown>) => Promise<void>;
};

export const IntegrationSetupModal = ({
  definition,
  integration,
  features,
  open,
  onClose,
  onSave,
}: IntegrationSetupModalPropsType): JSX.Element | null => {
  const ct = useCommonsT();
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [featureValues, setFeatureValues] = useState<Record<string, boolean>>({});
  const [verifying, setVerifying] = useState(false);
  const [saving, setSaving] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    const savedConfig = integration?.config ?? {};

    setFieldValues(
      Object.fromEntries(
        Object.entries(savedConfig)
          .filter(([key]) => key !== "features")
          .map(([k, v]) => [k, String(v)])
      )
    );

    if (features && features.length > 0) {
      const savedFeatures = (savedConfig.features ?? {}) as Record<string, boolean>;
      const initial: Record<string, boolean> = {};
      for (const f of features) {
        initial[f.key] = f.key in savedFeatures ? savedFeatures[f.key] : (f.defaultEnabled ?? true);
      }
      setFeatureValues(initial);
    } else {
      setFeatureValues({});
    }

    setVerificationError(null);
  }, [open, definition?.type, integration, features]);

  const handleFieldChange = useCallback((key: string, value: string) => {
    setVerificationError(null);
    setFieldValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleFeatureToggle = useCallback((key: string, checked: boolean) => {
    setFeatureValues((prev) => ({ ...prev, [key]: checked }));
  }, []);

  const handleSave = useCallback(async () => {
    if (!definition) return;

    const isZeroConfig = definition.configFields.length === 0;

    if (!isZeroConfig) {
      setVerifying(true);
      setVerificationError(null);

      try {
        const res = await fetch("/api/commons/integrations/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: definition.type, config: fieldValues }),
        });
        const result = (await res.json()) as { valid: boolean; error?: string };

        if (!result.valid) {
          setVerificationError(result.error ?? ct("commons.integrations.verify_failed"));
          setVerifying(false);
          return;
        }
      } catch {
        setVerificationError(ct("commons.integrations.verification_failed"));
        setVerifying(false);
        return;
      }

      setVerifying(false);
    }

    setSaving(true);
    try {
      const configToSave: Record<string, unknown> = { ...fieldValues };
      if (features && features.length > 0) {
        configToSave.features = featureValues;
      }
      await onSave(definition.type, configToSave);
      onClose();
    } finally {
      setSaving(false);
    }
  }, [definition, fieldValues, featureValues, features, onSave, onClose, ct]);

  if (!open || !definition) return null;

  const isZeroConfig = definition.configFields.length === 0;
  const hasFeatures = features && features.length > 0;
  const isLoading = verifying || saving;
  const hasEmptyRequiredFields =
    !isZeroConfig && definition.configFields.some((f) => !fieldValues[f.key]?.trim());
  const primaryLabel = isZeroConfig
    ? ct("commons.enable")
    : verifying
      ? ct("commons.integrations.verifying")
      : saving
        ? ct("commons.integrations.saving")
        : ct("commons.integrations.save_enable");

  const renderProviderContent = () => {
    if (definition.type === "klaviyo") return <KlaviyoSetup />;
    if (definition.type === "shopify_flow") return <ShopifyFlowSetup />;
    return null;
  };

  return (
    <s-modal
      id="integration-setup-modal"
      heading={ct("commons.integrations.connect_name", { name: definition.name })}
      onHide={onClose}
    >
      <div className="max-h-[80vh] max-w-xl space-y-4 overflow-y-auto p-5">
        {renderProviderContent()}

        {verificationError && (
          <s-banner tone="critical" dismissible>
            {verificationError}
          </s-banner>
        )}

        {!isZeroConfig && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="space-y-4"
          >
            {definition.configFields.map((field) => (
              <div key={field.key} className="space-y-1.5">
                <label className="text-foreground text-xs font-semibold">
                  {field.label}
                  {field.required && <span className="text-destructive ml-0.5">*</span>}
                </label>
                <input
                  type={field.type === "password" ? "password" : "text"}
                  value={fieldValues[field.key] ?? ""}
                  onChange={(e) => handleFieldChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  disabled={isLoading}
                  required={field.required}
                  className="border-border bg-background text-foreground focus:ring-primary w-full rounded-lg border px-3 py-2 text-xs focus:ring-1 focus:outline-none"
                />
                {field.helpText && (
                  <p className="text-muted-foreground text-xs">{field.helpText}</p>
                )}
              </div>
            ))}
          </form>
        )}

        {verifying && (
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <s-spinner size="base" />
            <span>
              {ct("commons.integrations.verifying_with", {
                name: definition.name,
              })}
            </span>
          </div>
        )}

        {hasFeatures && (
          <div className="border-border space-y-3 border-t pt-3">
            <div className="space-y-0.5">
              <span className="text-foreground text-sm font-semibold">
                {ct("commons.integrations.events")}
              </span>
              <p className="text-muted-foreground text-xs">
                {ct("commons.integrations.events_desc")}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {features!.map((feature) => (
                <div key={feature.key} className="flex items-start gap-2">
                  <s-checkbox
                    label={feature.label}
                    name={feature.key}
                    checked={featureValues[feature.key] ?? feature.defaultEnabled ?? true}
                    onChange={(e: any) => handleFeatureToggle(feature.key, e.target.checked)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {definition.docsUrl && (
          <div className="text-muted-foreground pt-2 text-xs">
            {ct("commons.integrations.need_help")}{" "}
            <a
              href={definition.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium underline"
            >
              {ct("commons.integrations.view_docs")}
            </a>
          </div>
        )}

        {/* Modal Actions */}
        <div className="border-border flex items-center justify-end gap-3 border-t pt-4">
          <s-button variant="secondary" onClick={onClose}>
            {ct("commons.cancel")}
          </s-button>
          <s-button
            variant="primary"
            loading={isLoading}
            disabled={isLoading || hasEmptyRequiredFields}
            onClick={handleSave}
          >
            {primaryLabel}
          </s-button>
        </div>
      </div>
    </s-modal>
  );
};

export default IntegrationSetupModal;
