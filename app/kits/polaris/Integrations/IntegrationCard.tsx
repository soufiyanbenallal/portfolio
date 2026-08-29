import { useState } from "react";
import type {
  IntegrationModelType,
  IntegrationCategoryType,
  IntegrationDefinitionType,
} from "~/commons/types/integrations";
import { useCommonsT } from "~/commons/providers";

const BRAND: Record<string, { bg: string; color: string }> = {
  klaviyo: { bg: "#E8F5EE", color: "#1B7340" },
  shopify_flow: { bg: "#EEF0FC", color: "#5C6AC4" },
  omnisend: { bg: "#E3EFFE", color: "#1A74D2" },
  mailchimp: { bg: "#FEF3E0", color: "#C47F00" },
  zapier: { bg: "#FFF0EB", color: "#FF4A00" },
  make: { bg: "#F0ECFF", color: "#6D4AFF" },
  slack: { bg: "#F3E8F4", color: "#4A154B" },
  gorgias: { bg: "#F0EDFF", color: "#5D3FD3" },
  yotpo: { bg: "#FFF0F0", color: "#E2001A" },
  judgeme: { bg: "#E8FAF6", color: "#00897B" },
  recharge: { bg: "#E8F7F0", color: "#00B272" },
  postscript: { bg: "#F2EDFF", color: "#6B21A8" },
  attentive: { bg: "#E8EEF7", color: "#1F3251" },
  loyaltylion: { bg: "#FFF1EB", color: "#FF5A1D" },
  okendo: { bg: "#FEF0EE", color: "#E03E2D" },
  whatsapp: { bg: "#E8FAF0", color: "#25D366" },
  webhook: { bg: "#F3F4F6", color: "#374151" },
};

const CATEGORY_BADGE_TONE: Record<
  IntegrationCategoryType,
  "info" | "success" | "auto" | undefined
> = {
  marketing: "info",
  automation: "info",
  notifications: "info",
  reviews: "success",
  support: "info",
  loyalty: "auto",
  subscriptions: "info",
};

const CATEGORY_LABEL_KEY: Record<IntegrationCategoryType, string> = {
  marketing: "commons.integrations.marketing",
  automation: "commons.integrations.automation",
  notifications: "commons.integrations.notifications",
  reviews: "commons.integrations.reviews",
  support: "commons.integrations.support_tab",
  loyalty: "commons.integrations.loyalty",
  subscriptions: "commons.integrations.subscriptions",
};

export type IntegrationCardPropsType = {
  definition: IntegrationDefinitionType;
  integration?: IntegrationModelType | null;
  endpointCount?: number;
  isDefaultEnabled?: boolean;
  onConnect: (definition: IntegrationDefinitionType) => void;
  onConfigure: (definition: IntegrationDefinitionType) => void;
  onDisconnect: (definition: IntegrationDefinitionType) => void;
  onToggle?: (definition: IntegrationDefinitionType, enabled: boolean) => void;
};


export const IntegrationCard = ({
  definition,
  integration,
  endpointCount,
  isDefaultEnabled,
  onConnect,
  onConfigure,
  onDisconnect,
  onToggle,
}: IntegrationCardPropsType): JSX.Element => {
  const ct = useCommonsT();
  const [imageError, setImageError] = useState(false);
  const isMultiEndpoint = definition.multiEndpoint === true;
  const isConnected = isMultiEndpoint ? (endpointCount ?? 0) > 0 : !!integration;
  const isEnabled = isMultiEndpoint ? (endpointCount ?? 0) > 0 : (integration?.isEnabled ?? false);
  const brand = BRAND[definition.type] ?? { bg: "#F3F4F6", color: "#6B7280" };

  return (
    <div className="flex flex-col justify-between h-full bg-card rounded-xl border border-border p-5 shadow-xs hover:shadow-md transition-shadow">
      <div className="space-y-3">
        {/* Logo and Category */}
        <div className="flex items-start justify-between gap-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 overflow-hidden border border-border"
            style={{ backgroundColor: imageError ? brand.color : brand.bg }}
          >
            {!imageError ? (
              <img
                src={definition.logo}
                alt={`${definition.name} logo`}
                width={26}
                height={26}
                className="object-contain"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-white font-bold text-lg leading-none">
                {definition.name[0].toUpperCase()}
              </span>
            )}
          </div>

          <s-badge tone={CATEGORY_BADGE_TONE[definition.category]}>
            {ct(CATEGORY_LABEL_KEY[definition.category])}
          </s-badge>
        </div>

        {/* Name and Active Status */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-foreground text-base">{definition.name}</span>
          {isMultiEndpoint ? (
            endpointCount !== undefined && endpointCount > 0 ? (
              <s-badge tone="success">
                {ct("commons.integrations.active_count", {
                  count: endpointCount,
                })}
              </s-badge>
            ) : (
              <s-badge tone="auto">{ct("commons.integrations.no_endpoints")}</s-badge>
            )
          ) : (
            isConnected && (
              <s-badge tone={isEnabled ? "success" : "warning"}>
                {isEnabled ? ct("commons.active") : ct("commons.disabled_label")}
              </s-badge>
            )
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3">{definition.description}</p>
      </div>

      {/* Actions Footer */}
      <div className="pt-4 mt-4 border-t border-border flex items-center justify-between gap-2">
        {isMultiEndpoint ? (
          <s-button variant="secondary" onClick={() => onConfigure(definition)}>
            {ct("commons.integrations.manage")} →
          </s-button>
        ) : !isConnected ? (
          <s-button variant="secondary" onClick={() => onConnect(definition)}>
            {ct("commons.integrations.connect")}
          </s-button>
        ) : isDefaultEnabled ? (
          <div className="flex items-center gap-2">
            <s-button variant="secondary" onClick={() => onConfigure(definition)}>
              {ct("commons.integrations.configure")}
            </s-button>
            <s-button
              variant="tertiary"
              tone={isEnabled ? "critical" : "auto"}
              onClick={() => onToggle?.(definition, !isEnabled)}
            >
              {isEnabled ? ct("commons.disable") : ct("commons.enable")}
            </s-button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <s-button variant="secondary" onClick={() => onConfigure(definition)}>
              {ct("commons.integrations.configure")}
            </s-button>
            <s-button variant="tertiary" tone="critical" onClick={() => onDisconnect(definition)}>
              {ct("commons.integrations.disconnect")}
            </s-button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntegrationCard;
