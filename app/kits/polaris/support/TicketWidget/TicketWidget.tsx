import { useState, useEffect, useCallback } from "react";
import { useFetcher } from "react-router";
import TicketMessagesList from "./TicketMessagesList";
import CreateTicketModal, { type SupportImageItemType } from "./CreateTicketModal";
import TicketDetails from "./TicketDetails";
import { useCommonsT } from "~/commons/providers";

type TicketsResponseType = {
  tickets: any[];
  sessionEmail: string;
};

type SubmitResponseType = {
  success: boolean;
  ticket?: any;
  error?: string;
};

const INITIAL_FORM = {
  contactEmail: "",
  title: "",
  description: "",
  images: [] as SupportImageItemType[],
  type: "question",
};

export const TicketWidget = (): JSX.Element => {
  const ct = useCommonsT();
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"tickets" | "new">("tickets");
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [view, setView] = useState<"list" | "details">("list");
  const [hasLoaded, setHasLoaded] = useState(false);
  const [localTickets, setLocalTickets] = useState<any[]>([]);
  const [form, setForm] = useState(INITIAL_FORM);
  const [formKey, setFormKey] = useState(0);

  const ticketFetcher = useFetcher<TicketsResponseType>();
  const submitFetcher = useFetcher<SubmitResponseType>();

  const tickets = ticketFetcher.data?.tickets ?? [];
  const sessionEmail = ticketFetcher.data?.sessionEmail ?? "";
  const loadingTickets = ticketFetcher.state === "loading";
  const submitting = submitFetcher.state !== "idle";

  useEffect(() => {
    if (open && !hasLoaded) {
      ticketFetcher.load("/api/support/tickets");
      setHasLoaded(true);
    }
  }, [open, hasLoaded, ticketFetcher]);

  useEffect(() => {
    if (sessionEmail && !form.contactEmail) {
      setForm((prev) => ({ ...prev, contactEmail: sessionEmail }));
    }
  }, [sessionEmail, form.contactEmail]);

  useEffect(() => {
    if (tickets.length > 0) {
      setLocalTickets(tickets);
    }
  }, [tickets]);

  const submitData = submitFetcher.data;
  useEffect(() => {
    if (submitFetcher.state === "idle" && submitData?.success && submitData.ticket) {
      setLocalTickets((prev) => {
        const alreadyExists = prev.some((t) => t.id === submitData.ticket.id);
        return alreadyExists ? prev : [submitData.ticket, ...prev];
      });
      setForm({ ...INITIAL_FORM, contactEmail: sessionEmail });
      setFormKey((k) => k + 1);
      setSelectedTab("tickets");
    }
  }, [submitFetcher.state, submitData, sessionEmail]);

  const handleSubmit = useCallback(() => {
    const data = new FormData();
    data.set("contactEmail", form.contactEmail);
    data.set("title", form.title);
    data.set("description", form.description);
    data.set("type", form.type);
    data.set(
      "images",
      JSON.stringify(form.images.filter((img: any) => img?.url).map((img: any) => img.url))
    );
    submitFetcher.submit(data, {
      method: "POST",
      action: "/api/support/tickets",
    });
  }, [form, submitFetcher]);

  const openTicketsCount = localTickets.filter((t) => t.status === "open").length;

  return (
    <>
      {/* Floating Button */}
      <div className="fixed right-6 bottom-6 z-50">
        <s-button variant="primary" onClick={() => setOpen(!open)}>
          {open ? ct("commons.close") : ct("commons.support")}
        </s-button>
      </div>

      {/* Widget Panel */}
      {open && (
        <div className="bg-card border-border animate-in fade-in slide-in-from-bottom-5 fixed right-6 bottom-20 z-50 flex h-[560px] w-[380px] flex-col overflow-hidden rounded-2xl border shadow-2xl duration-200">
          {/* Header */}
          <div className="border-border flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <h2 className="text-foreground text-base font-bold">{ct("commons.support")}</h2>
              {openTicketsCount > 0 && (
                <s-badge tone="success">
                  {openTicketsCount} {ct("commons.support.open")}
                </s-badge>
              )}
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground p-1 font-bold"
            >
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div className="border-border bg-muted/20 flex items-center gap-2 border-b px-3 pt-2">
            <button
              type="button"
              onClick={() => setSelectedTab("tickets")}
              className={`rounded-t-lg border-b-2 px-3 py-1.5 text-xs font-semibold transition-colors ${
                selectedTab === "tickets"
                  ? "border-primary text-primary bg-card"
                  : "text-muted-foreground hover:text-foreground border-transparent"
              }`}
            >
              {localTickets.length > 0
                ? ct("commons.support.tickets_count", {
                    count: localTickets.length,
                  })
                : ct("commons.support.tickets")}
            </button>
            <button
              type="button"
              onClick={() => setSelectedTab("new")}
              className={`rounded-t-lg border-b-2 px-3 py-1.5 text-xs font-semibold transition-colors ${
                selectedTab === "new"
                  ? "border-primary text-primary bg-card"
                  : "text-muted-foreground hover:text-foreground border-transparent"
              }`}
            >
              {ct("commons.support.new_ticket")}
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {selectedTab === "tickets" && (
              <div>
                {view === "list" ? (
                  <TicketMessagesList
                    tickets={localTickets}
                    loadingTickets={loadingTickets}
                    onSelect={(ticket) => {
                      setSelectedTicket(ticket);
                      setView("details");
                    }}
                  />
                ) : (
                  <TicketDetails selectedTicket={selectedTicket} onBack={() => setView("list")} />
                )}
              </div>
            )}

            {selectedTab === "new" && (
              <div className="space-y-3">
                <CreateTicketModal
                  key={formKey}
                  open={true}
                  onClose={() => {
                    setForm({
                      ...INITIAL_FORM,
                      contactEmail: sessionEmail,
                    });
                    setSelectedTab("tickets");
                  }}
                  onSubmit={handleSubmit}
                  submitting={submitting}
                  form={form}
                  setForm={setForm}
                  sessionEmail={sessionEmail}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TicketWidget;
