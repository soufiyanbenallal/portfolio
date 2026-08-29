import { useState, useCallback, useEffect, useRef } from "react";
import { useFetcher, useNavigate } from "react-router";
import type { WebhookEventDefinitionType, WebhookEndpointType } from "~/commons/types/integrations";
import { useCommonsT } from "~/commons/providers";

export type WebhookEndpointRowType = {
  id: number | string;
  type: string;
  isEnabled: boolean;
  config: {
    name: string;
    url: string;
    events: string[];
  };
};

// Compatibility alias
export type WebhookEndpointRow = WebhookEndpointRowType;

export type WebhookEndpointsPagePropsType = {
  type: WebhookEndpointType;
  integrationName: string;
  availableEvents: WebhookEventDefinitionType[];
  endpoints: WebhookEndpointRowType[];
};

// Compatibility alias
export type WebhookEndpointsPageProps = WebhookEndpointsPagePropsType;

type EndpointFormStateType = {
  name: string;
  url: string;
  events: string[];
};

const EMPTY_FORM: EndpointFormStateType = { name: "", url: "", events: [] };

export const WebhookEndpointsPage = ({
  type,
  integrationName,
  availableEvents,
  endpoints: initialEndpoints,
}: WebhookEndpointsPagePropsType): JSX.Element => {
  const ct = useCommonsT();
  const navigate = useNavigate();
  const fetcher = useFetcher<{ id: number; isEnabled: boolean; config: any }>();
  const [endpoints, setEndpoints] = useState(initialEndpoints);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [form, setForm] = useState<EndpointFormStateType>(EMPTY_FORM);
  const [urlError, setUrlError] = useState<string | null>(null);
  const pendingCreate = useRef<EndpointFormStateType | null>(null);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.id && pendingCreate.current) {
      const created = pendingCreate.current;
      pendingCreate.current = null;
      setEndpoints((prev) => [
        ...prev,
        {
          id: fetcher.data!.id,
          type,
          isEnabled: fetcher.data!.isEnabled ?? true,
          config: {
            name: created.name,
            url: created.url,
            events: created.events,
          },
        },
      ]);
    }
  }, [fetcher.state, fetcher.data, type]);

  const openAdd = useCallback(() => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setUrlError(null);
    setModalOpen(true);
  }, []);

  const openEdit = useCallback((endpoint: WebhookEndpointRowType) => {
    setEditingId(endpoint.id);
    setForm({
      name: endpoint.config.name ?? "",
      url: endpoint.config.url ?? "",
      events: endpoint.config.events ?? [],
    });
    setUrlError(null);
    setModalOpen(true);
  }, []);

  const handleSave = useCallback(async () => {
    if (!form.url.startsWith("https://")) {
      setUrlError(ct("commons.integrations.url_must_https"));
      return;
    }
    setUrlError(null);

    if (editingId) {
      fetcher.submit(JSON.stringify(form), {
        method: "PUT",
        action: `/api/commons/integrations/endpoints/${editingId}`,
        encType: "application/json",
      });
      setEndpoints((prev) => prev.map((e) => (e.id === editingId ? { ...e, config: form } : e)));
    } else {
      pendingCreate.current = form;
      fetcher.submit(JSON.stringify({ type, ...form }), {
        method: "POST",
        action: "/api/commons/integrations/endpoints",
        encType: "application/json",
      });
    }

    setModalOpen(false);
  }, [form, editingId, type, fetcher, ct]);

  const handleToggle = useCallback(
    (id: string | number, isEnabled: boolean) => {
      fetcher.submit(JSON.stringify({ isEnabled }), {
        method: "PATCH",
        action: `/api/commons/integrations/endpoints/${id}`,
        encType: "application/json",
      });
      setEndpoints((prev) => prev.map((e) => (e.id === id ? { ...e, isEnabled } : e)));
    },
    [fetcher]
  );

  const handleDelete = useCallback(
    (id: string | number) => {
      fetcher.submit(null, {
        method: "DELETE",
        action: `/api/commons/integrations/endpoints/${id}`,
      });
      setEndpoints((prev) => prev.filter((e) => e.id !== id));
    },
    [fetcher]
  );

  const toggleEvent = useCallback((slug: string) => {
    setForm((prev) => ({
      ...prev,
      events: prev.events.includes(slug)
        ? prev.events.filter((e) => e !== slug)
        : [...prev.events, slug],
    }));
  }, []);

  const activeCount = endpoints.filter((e) => e.isEnabled).length;

  return (
    <s-page>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-border">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <s-button
                variant="tertiary"
                onClick={() => navigate("/app/integrations")}
                icon="arrow-left"
              >
                {ct("commons.integrations")}
              </s-button>
              <s-heading>
                {ct("commons.integrations.endpoints_title", {
                  name: integrationName,
                })}
              </s-heading>
              {activeCount > 0 && (
                <s-badge tone="success">
                  {ct("commons.integrations.active_count", { count: activeCount })}
                </s-badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Configure webhook URL endpoints and dispatch event topics.
            </p>
          </div>

          <s-button variant="primary" onClick={openAdd}>
            {ct("commons.integrations.add_endpoint")}
          </s-button>
        </div>

        {/* Endpoints Table or Empty State */}
        {endpoints.length === 0 ? (
          <s-box padding="base" background="subdued" borderRadius="base">
            <div className="text-center py-8 space-y-3">
              <p className="text-sm text-muted-foreground">
                {ct("commons.integrations.no_endpoints_desc")}
              </p>
              <s-button variant="primary" onClick={openAdd}>
                {ct("commons.integrations.add_endpoint")}
              </s-button>
            </div>
          </s-box>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xs">
            <s-table>
              <s-table-header-row>
                <s-table-header>{ct("commons.webhooks.col_name")}</s-table-header>
                <s-table-header>{ct("commons.webhooks.col_url")}</s-table-header>
                <s-table-header>{ct("commons.integrations.events")}</s-table-header>
                <s-table-header>{ct("commons.webhooks.col_status")}</s-table-header>
                <s-table-header>Actions</s-table-header>
              </s-table-header-row>
              <s-table-body>
                {endpoints.map((endpoint) => (
                  <s-table-row key={endpoint.id}>
                    <s-table-cell>
                      <span className="font-semibold text-foreground">
                        {endpoint.config.name || "—"}
                      </span>
                    </s-table-cell>
                    <s-table-cell>
                      <span className="font-mono text-xs text-muted-foreground truncate max-w-xs block">
                        {endpoint.config.url}
                      </span>
                    </s-table-cell>
                    <s-table-cell>
                      <s-badge tone="auto">
                        {ct("commons.webhooks.event_count", {
                          count: (endpoint.config.events ?? []).length,
                        })}
                      </s-badge>
                    </s-table-cell>
                    <s-table-cell>
                      <s-badge tone={endpoint.isEnabled ? "success" : "warning"}>
                        {endpoint.isEnabled ? ct("commons.active") : ct("commons.disabled_label")}
                      </s-badge>
                    </s-table-cell>
                    <s-table-cell>
                      <div className="flex items-center gap-2">
                        <s-button variant="tertiary" onClick={() => openEdit(endpoint)}>
                          {ct("commons.edit")}
                        </s-button>
                        <s-button
                          variant="tertiary"
                          onClick={() => handleToggle(endpoint.id, !endpoint.isEnabled)}
                        >
                          {endpoint.isEnabled ? ct("commons.disable") : ct("commons.enable")}
                        </s-button>
                        <s-button
                          variant="tertiary"
                          tone="critical"
                          onClick={() => handleDelete(endpoint.id)}
                        >
                          {ct("commons.delete")}
                        </s-button>
                      </div>
                    </s-table-cell>
                  </s-table-row>
                ))}
              </s-table-body>
            </s-table>
          </div>
        )}
      </div>

      {/* Add / Edit Endpoint Modal */}
      {modalOpen && (
        <s-modal
          id="endpoint-form-modal"
          heading={
            editingId !== null
              ? ct("commons.integrations.edit_endpoint")
              : ct("commons.integrations.add_endpoint")
          }
          onHide={() => setModalOpen(false)}
        >
          <div className="p-5 max-w-lg space-y-4">
            {urlError && (
              <s-banner tone="critical" dismissible>
                {urlError}
              </s-banner>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-4"
            >
              <s-text-field
                label={ct("commons.webhooks.col_name")}
                name="name"
                value={form.name}
                onInput={(e: any) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder={ct("commons.integrations.endpoint_label_placeholder")}
                required
              />

              <s-url-field
                label={ct("commons.integrations.endpoint_url_label")}
                name="url"
                value={form.url}
                onInput={(e: any) => {
                  setUrlError(null);
                  setForm((p) => ({ ...p, url: e.target.value }));
                }}
                placeholder={ct("commons.integrations.endpoint_url_placeholder")}
                required
              />

              {availableEvents.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-border">
                  <span className="text-sm font-semibold text-foreground">
                    {ct("commons.integrations.events")}
                  </span>
                  <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
                    {availableEvents.map((ev) => (
                      <s-checkbox
                        key={ev.slug}
                        label={ev.label}
                        name={ev.slug}
                        checked={form.events.includes(ev.slug)}
                        onChange={() => toggleEvent(ev.slug)}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <s-button variant="secondary" onClick={() => setModalOpen(false)}>
                  {ct("commons.cancel")}
                </s-button>
                <s-button variant="primary" onClick={handleSave}>
                  {ct("commons.save")}
                </s-button>
              </div>
            </form>
          </div>
        </s-modal>
      )}
    </s-page>
  );
};

export default WebhookEndpointsPage;
