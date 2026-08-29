import { useState, useCallback, useEffect, useRef } from "react";
import { useFetcher, useNavigate } from "react-router";
import IntegrationCard from "./IntegrationCard";
import IntegrationSetupModal from "./IntegrationSetupModal";
import CreateTicketModal, {
  type CreateTicketModalFormType,
} from "~/commons/components/support/TicketWidget/CreateTicketModal";
import { getIntegrationDefinitions } from "~/commons/service/integrationDefinitions";
import { useCommonsT } from "~/commons/providers";
import type {
  IntegrationModelType,
  IntegrationCategoryType,
  IntegrationDefinitionType,
  IntegrationsConfigType,
  WebhookEventDefinitionType,
} from "~/commons/types/integrations";
import DismissableBanner from "../ui/feedbacks/DismissableBanner";

const INITIAL_TICKET_FORM: CreateTicketModalFormType = {
  contactEmail: "",
  title: "",
  description: "",
  images: [],
  type: "question",
};

export type IntegrationsPagePropsType = {
  integrationsConfig: IntegrationsConfigType;
  integrations: IntegrationModelType[];
  endpointCounts?: Record<string, number>;
  sessionEmail?: string;
  apiBaseUrl?: string;
  asComponent?: boolean;
  showTabs?: boolean;
};

// Compatibility alias
export type IntegrationsPageProps = IntegrationsPagePropsType;

const CATEGORY_TAB_VALUES: (IntegrationCategoryType | "all")[] = [
  "all",
  "marketing",
  "automation",
  "notifications",
  "reviews",
  "support",
  "loyalty",
  "subscriptions",
];

const CATEGORY_TAB_KEYS: Record<string, string> = {
  all: "commons.integrations.all",
  marketing: "commons.integrations.marketing",
  automation: "commons.integrations.automation",
  notifications: "commons.integrations.notifications",
  reviews: "commons.integrations.reviews",
  support: "commons.integrations.support_tab",
  loyalty: "commons.integrations.loyalty",
  subscriptions: "commons.integrations.subscriptions",
};

export const IntegrationsPage = ({
  integrationsConfig,
  integrations,
  endpointCounts = {},
  sessionEmail = "",
  apiBaseUrl = "",
  asComponent = false,
  showTabs = true,
}: IntegrationsPagePropsType): JSX.Element => {
  const ct = useCommonsT();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<IntegrationCategoryType | "all">("all");

  const [modalDef, setModalDef] = useState<IntegrationDefinitionType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [ticketForm, setTicketForm] = useState<CreateTicketModalFormType>(INITIAL_TICKET_FORM);
  const [ticketSuccessBanner, setTicketSuccessBanner] = useState(false);
  const fetcher = useFetcher();
  const ticketFetcher = useFetcher<{ success: boolean; error?: string }>();

  const supportedDefinitions = getIntegrationDefinitions()
    .filter((def) => integrationsConfig.supported.includes(def.type))
    .sort(
      (a, b) =>
        integrationsConfig.supported.indexOf(a.type) - integrationsConfig.supported.indexOf(b.type)
    );

  const filteredDefinitions =
    selectedCategory === "all"
      ? supportedDefinitions
      : supportedDefinitions.filter((d) => d.category === selectedCategory);

  const getIntegration = useCallback(
    (type: string): IntegrationModelType | null => {
      return integrations.find((i) => i.type === type) ?? null;
    },
    [integrations]
  );

  const connectedCount = supportedDefinitions.filter((def) => {
    if (def.multiEndpoint) {
      return (endpointCounts[def.type] ?? 0) > 0;
    }
    return integrations.some((i) => i.type === def.type && i.isEnabled);
  }).length;

  const handleConnect = useCallback((def: IntegrationDefinitionType) => {
    setModalDef(def);
    setModalOpen(true);
  }, []);

  const [endpointsDef, setEndpointsDef] = useState<IntegrationDefinitionType | null>(null);
  const [endpointsModalOpen, setEndpointsModalOpen] = useState(false);
  const [endpointsLoaded, setEndpointsLoaded] = useState(false);
  const endpointsFetcher = useFetcher<any>();
  const endpointActionFetcher = useFetcher<any>();
  const tempIdCounter = useRef(-1);

  const [endpointsList, setEndpointsList] = useState<any[]>([]);
  const [endpointFormOpen, setEndpointFormOpen] = useState(false);
  const [editingEndpointId, setEditingEndpointId] = useState<number | null>(null);
  const [epForm, setEpForm] = useState({
    name: "",
    url: "",
    events: [] as string[],
  });
  const [epUrlError, setEpUrlError] = useState<string | null>(null);
  const [epSuccessMsg, setEpSuccessMsg] = useState<string | null>(null);

  const handleConfigure = useCallback(
    (def: IntegrationDefinitionType) => {
      if (def.multiEndpoint) {
        setEndpointsDef(def);
        setEndpointsModalOpen(true);
        setEndpointsLoaded(false);
        setEndpointFormOpen(false);
        endpointsFetcher.load(`/api/commons/integrations/endpoints?type=${def.type}`);
        return;
      }
      setModalDef(def);
      setModalOpen(true);
    },
    [endpointsFetcher]
  );

  const handleDisconnect = useCallback(
    (def: IntegrationDefinitionType) => {
      fetcher.submit(null, {
        method: "DELETE",
        action: `/api/commons/integrations/${def.type}`,
      });
    },
    [fetcher]
  );

  const handleToggle = useCallback(
    (def: IntegrationDefinitionType, enabled: boolean) => {
      fetcher.submit(JSON.stringify({ isEnabled: enabled }), {
        method: "PATCH",
        action: `/api/commons/integrations/${def.type}`,
        encType: "application/json",
      });
    },
    [fetcher]
  );

  useEffect(() => {
    if (
      endpointsFetcher.state === "idle" &&
      endpointsFetcher.data &&
      Array.isArray(endpointsFetcher.data)
    ) {
      setEndpointsList(
        endpointsFetcher.data.map((r: any) => ({
          id: r.id,
          type: r.type,
          isEnabled: r.isEnabled,
          config: {
            name: (r.config as any)?.name ?? "Unnamed",
            url: (r.config as any)?.url ?? "",
            events: (r.config as any)?.events ?? [],
          },
        }))
      );
      setEndpointsLoaded(true);
    }
  }, [endpointsFetcher.state, endpointsFetcher.data]);

  const webhookEvents: WebhookEventDefinitionType[] = integrationsConfig.webhookEvents ?? [];

  const openAddEndpoint = useCallback(() => {
    setEditingEndpointId(null);
    setEpForm({ name: "", url: "", events: [] });
    setEpUrlError(null);
    setEpSuccessMsg(null);
    setEndpointFormOpen(true);
  }, []);

  const openEditEndpoint = useCallback((ep: any) => {
    setEditingEndpointId(ep.id);
    setEpForm({
      name: ep.config.name ?? "",
      url: ep.config.url ?? "",
      events: ep.config.events ?? [],
    });
    setEpUrlError(null);
    setEndpointFormOpen(true);
  }, []);

  const handleSaveEndpoint = useCallback(() => {
    if (!epForm.url.startsWith("https://")) {
      setEpUrlError(ct("commons.integrations.url_must_https"));
      return;
    }
    setEpUrlError(null);
    const config = {
      name: epForm.name,
      url: epForm.url,
      events: epForm.events,
    };

    if (editingEndpointId !== null) {
      endpointActionFetcher.submit(JSON.stringify({ config }), {
        method: "PUT",
        action: `/api/commons/integrations/endpoints/${editingEndpointId}`,
        encType: "application/json",
      });
      setEndpointsList((prev) =>
        prev.map((e) => (e.id === editingEndpointId ? { ...e, config } : e))
      );
    } else {
      const tmpId = tempIdCounter.current--;
      setEndpointsList((prev) => [
        ...prev,
        {
          id: tmpId,
          type: endpointsDef?.type,
          isEnabled: true,
          config,
        },
      ]);
      endpointActionFetcher.submit(JSON.stringify({ type: endpointsDef?.type, config }), {
        method: "POST",
        action: "/api/commons/integrations/endpoints",
        encType: "application/json",
      });
    }
    setEndpointFormOpen(false);
    setEpSuccessMsg(
      editingEndpointId !== null
        ? ct("commons.integrations.endpoint_updated")
        : ct("commons.integrations.endpoint_created")
    );
  }, [epForm, editingEndpointId, endpointsDef, endpointActionFetcher, ct]);

  const handleToggleEndpoint = useCallback(
    (id: number, isEnabled: boolean) => {
      endpointActionFetcher.submit(JSON.stringify({ isEnabled }), {
        method: "PATCH",
        action: `/api/commons/integrations/endpoints/${id}`,
        encType: "application/json",
      });
      setEndpointsList((prev) => prev.map((e) => (e.id === id ? { ...e, isEnabled } : e)));
      setEpSuccessMsg(
        isEnabled
          ? ct("commons.integrations.endpoint_enabled")
          : ct("commons.integrations.endpoint_disabled")
      );
    },
    [endpointActionFetcher, ct]
  );

  const handleDeleteEndpoint = useCallback(
    (id: number) => {
      endpointActionFetcher.submit(null, {
        method: "DELETE",
        action: `/api/commons/integrations/endpoints/${id}`,
      });
      setEndpointsList((prev) => prev.filter((e) => e.id !== id));
      setEpSuccessMsg(ct("commons.integrations.endpoint_deleted"));
    },
    [endpointActionFetcher, ct]
  );

  const toggleEpEvent = useCallback((slug: string) => {
    setEpForm((prev) => ({
      ...prev,
      events: prev.events.includes(slug)
        ? prev.events.filter((e) => e !== slug)
        : [...prev.events, slug],
    }));
  }, []);

  const defaultEnabledSet = new Set(integrationsConfig.defaultEnabled ?? []);

  const handleSave = useCallback(
    async (type: string, config: Record<string, unknown>) => {
      fetcher.submit(JSON.stringify({ type, config }), {
        method: "POST",
        action: "/api/commons/integrations",
        encType: "application/json",
      });
    },
    [fetcher]
  );

  const handleOpenTicketModal = useCallback(
    (type: string) => {
      setTicketForm({
        ...INITIAL_TICKET_FORM,
        contactEmail: sessionEmail,
        type,
      });
      setTicketModalOpen(true);
    },
    [sessionEmail]
  );

  const handleTicketClose = useCallback(() => {
    setTicketModalOpen(false);
    setTicketForm(INITIAL_TICKET_FORM);
  }, []);

  const handleTicketSubmit = useCallback(() => {
    const data = new FormData();
    data.set("contactEmail", ticketForm.contactEmail);
    data.set("title", ticketForm.title);
    data.set("description", ticketForm.description);
    data.set("type", ticketForm.type);
    data.set(
      "images",
      JSON.stringify(ticketForm.images.filter((img: any) => img?.url).map((img: any) => img.url))
    );
    ticketFetcher.submit(data, {
      method: "POST",
      action: "/api/support/tickets",
    });
  }, [ticketForm, ticketFetcher]);

  useEffect(() => {
    if (ticketFetcher.state === "idle" && ticketFetcher.data?.success) {
      handleTicketClose();
      setTicketSuccessBanner(true);
    }
  }, [ticketFetcher.state, ticketFetcher.data, handleTicketClose]);

  const pageContent = (
    <div className="space-y-6">
      {/* Top Banner and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">{ct("commons.integrations")}</h1>
          <p className="text-sm text-muted-foreground">
            Connect marketing, reviews, support, and custom automation webhooks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <s-button variant="tertiary" onClick={() => handleOpenTicketModal("bug")}>
            {ct("commons.integrations.report_issue")}
          </s-button>
          <s-button variant="primary" onClick={() => handleOpenTicketModal("integration_request")}>
            {ct("commons.integrations.request")}
          </s-button>
        </div>
      </div>

      {ticketSuccessBanner && (
        <s-banner tone="success" dismissible onDismiss={() => setTicketSuccessBanner(false)}>
          {ct("commons.integrations.thanks_reaching_out")}
        </s-banner>
      )}

      <DismissableBanner storageKey="integrations-beta" tone="info">
        {ct("commons.integrations.beta_notice")}{" "}
        <button
          type="button"
          onClick={() => handleOpenTicketModal("bug")}
          className="font-semibold underline cursor-pointer"
        >
          {ct("commons.integrations.report_issues")}
        </button>{" "}
        {ct("commons.integrations.beta_notice_end")}
      </DismissableBanner>

      {/* Connected Summary */}
      {connectedCount > 0 && (
        <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl shadow-xs">
          <span className="text-sm text-muted-foreground">
            {connectedCount} {ct("commons.integrations.of")} {supportedDefinitions.length}{" "}
            {ct("commons.integrations.active")}{" "}
            {connectedCount === 1 ? "integration" : "integrations"}
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {supportedDefinitions
              .filter((def) => {
                if (def.multiEndpoint) {
                  return (endpointCounts[def.type] ?? 0) > 0;
                }
                return integrations.some((i) => i.type === def.type && i.isEnabled);
              })
              .slice(0, 5)
              .map((def) => (
                <s-badge key={def.type} tone="success">
                  {def.name}
                </s-badge>
              ))}
          </div>
        </div>
      )}

      {/* Category Tabs */}
      {showTabs && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border">
          {CATEGORY_TAB_VALUES.map((cat) => {
            const hasIntegrations =
              cat === "all" || supportedDefinitions.some((d) => d.category === cat);
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                disabled={!hasIntegrations}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : hasIntegrations
                      ? "text-muted-foreground hover:bg-muted hover:text-foreground"
                      : "text-muted-foreground/40 cursor-not-allowed"
                }`}
              >
                {ct(CATEGORY_TAB_KEYS[cat])}
              </button>
            );
          })}
        </div>
      )}

      {/* Integration Grid */}
      {filteredDefinitions.length === 0 ? (
        <s-box padding="base" background="subdued" borderRadius="base">
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              {ct("commons.integrations.no_category_desc")}
            </p>
          </div>
        </s-box>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDefinitions.map((def) => (
            <IntegrationCard
              key={def.type}
              definition={def}
              integration={getIntegration(def.type)}
              endpointCount={def.multiEndpoint ? (endpointCounts[def.type] ?? 0) : undefined}
              isDefaultEnabled={defaultEnabledSet.has(def.type)}
              onConnect={handleConnect}
              onConfigure={handleConfigure}
              onDisconnect={handleDisconnect}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}

      {/* Developer Tools Card */}
      {apiBaseUrl && (
        <div className="p-5 bg-card border border-border rounded-xl space-y-3">
          <h2 className="text-base font-bold text-foreground">
            {ct("commons.integrations.developer_tools")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-sm font-semibold text-foreground">
                {ct("commons.integrations.rest_api")}
              </span>
              <p className="text-xs text-muted-foreground">
                {ct("commons.integrations.rest_api_desc")}
              </p>
              <a
                href={`${apiBaseUrl}/docs`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-primary font-medium underline inline-block pt-1"
              >
                {ct("commons.integrations.api_docs")} →
              </a>
            </div>
            <div className="space-y-1">
              <span className="text-sm font-semibold text-foreground">
                {ct("commons.integrations.mcp")}
              </span>
              <p className="text-xs text-muted-foreground">{ct("commons.integrations.mcp_desc")}</p>
              <a
                href={`${apiBaseUrl}/mcp`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-primary font-medium underline inline-block pt-1"
              >
                {ct("commons.integrations.mcp_endpoint")} →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <IntegrationSetupModal
        definition={modalDef}
        integration={modalDef ? getIntegration(modalDef.type) : null}
        features={modalDef ? (integrationsConfig.features?.[modalDef.type] ?? []) : []}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <CreateTicketModal
        asModal
        open={ticketModalOpen}
        onClose={handleTicketClose}
        onSubmit={handleTicketSubmit}
        submitting={ticketFetcher.state !== "idle"}
        form={ticketForm}
        setForm={setTicketForm}
        sessionEmail={sessionEmail}
      />

      {/* Multi-endpoint Modal */}
      {endpointsModalOpen && (
        <s-modal
          id="endpoints-manage-modal"
          heading={
            endpointFormOpen
              ? editingEndpointId !== null
                ? ct("commons.integrations.edit_endpoint")
                : ct("commons.integrations.add_endpoint")
              : ct("commons.integrations.endpoints_title", {
                  name: endpointsDef?.name ?? "",
                })
          }
          onHide={() => {
            setEndpointsModalOpen(false);
            setEndpointsDef(null);
            setEndpointFormOpen(false);
          }}
        >
          <div className="p-5 max-w-xl max-h-[80vh] overflow-y-auto space-y-4">
            {epSuccessMsg && !endpointFormOpen && (
              <s-banner tone="success" dismissible>
                {epSuccessMsg}
              </s-banner>
            )}

            {endpointFormOpen ? (
              <div className="space-y-4">
                {epUrlError && (
                  <s-banner tone="critical" dismissible>
                    {epUrlError}
                  </s-banner>
                )}

                <s-text-field
                  label={ct("commons.support.title")}
                  value={epForm.name}
                  onInput={(e: any) => setEpForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder={ct("commons.integrations.endpoint_label_placeholder")}
                />

                <s-url-field
                  label={ct("commons.integrations.endpoint_url_label")}
                  value={epForm.url}
                  onInput={(e: any) => {
                    setEpUrlError(null);
                    setEpForm((p) => ({ ...p, url: e.target.value }));
                  }}
                  placeholder={ct("commons.integrations.endpoint_url_placeholder")}
                  required
                />

                {webhookEvents.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-border">
                    <span className="text-sm font-semibold text-foreground">
                      {ct("commons.integrations.events")}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {webhookEvents.map((ev) => (
                        <s-checkbox
                          key={ev.slug}
                          label={ev.label}
                          name={ev.slug}
                          checked={epForm.events.includes(ev.slug)}
                          onChange={() => toggleEpEvent(ev.slug)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                  <s-button variant="secondary" onClick={() => setEndpointFormOpen(false)}>
                    {ct("commons.back")}
                  </s-button>
                  <s-button
                    variant="primary"
                    disabled={
                      !epForm.url.startsWith("https://") ||
                      !epForm.url.trim() ||
                      epForm.events.length === 0
                    }
                    onClick={handleSaveEndpoint}
                  >
                    {ct("commons.save")}
                  </s-button>
                </div>
              </div>
            ) : !endpointsLoaded ? (
              <div className="text-center py-6 text-sm text-muted-foreground">
                {ct("commons.integrations.loading_endpoints")}
              </div>
            ) : endpointsList.length === 0 ? (
              <div className="text-center py-6 space-y-3">
                <p className="text-sm text-muted-foreground">
                  {ct("commons.integrations.no_endpoints_desc")}
                </p>
                <s-button variant="primary" onClick={openAddEndpoint}>
                  {ct("commons.integrations.add_endpoint")}
                </s-button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-end">
                  <s-button variant="primary" onClick={openAddEndpoint}>
                    {ct("commons.integrations.add_endpoint")}
                  </s-button>
                </div>
                {endpointsList.map((ep) => (
                  <div
                    key={ep.id}
                    className="p-3.5 rounded-lg border border-border bg-card space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground text-sm">
                        {ep.config.name || ct("commons.integrations.unnamed")}
                      </span>
                      <s-badge tone={ep.isEnabled ? "success" : "warning"}>
                        {ep.isEnabled ? ct("commons.active") : ct("commons.disabled_label")}
                      </s-badge>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground block truncate">
                      {ep.config.url}
                    </span>
                    <div className="flex items-center gap-2 pt-2 border-t border-border">
                      <s-button variant="tertiary" onClick={() => openEditEndpoint(ep)}>
                        {ct("commons.edit")}
                      </s-button>
                      <s-button
                        variant="tertiary"
                        onClick={() => handleToggleEndpoint(ep.id, !ep.isEnabled)}
                      >
                        {ep.isEnabled ? ct("commons.disable") : ct("commons.enable")}
                      </s-button>
                      <s-button
                        variant="tertiary"
                        tone="critical"
                        onClick={() => handleDeleteEndpoint(ep.id)}
                      >
                        {ct("commons.delete")}
                      </s-button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </s-modal>
      )}
    </div>
  );

  if (asComponent) {
    return pageContent;
  }

  return <s-page>{pageContent}</s-page>;
};

export default IntegrationsPage;
