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
      <div className="fixed bottom-6 right-6 z-50">
        <s-button variant="primary" onClick={() => setOpen(!open)}>
          {open ? ct("commons.close") : ct("commons.support")}
        </s-button>
      </div>

      {/* Widget Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-[380px] h-[560px] rounded-2xl bg-card border border-border shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base text-foreground">{ct("commons.support")}</h2>
              {openTicketsCount > 0 && (
                <s-badge tone="success">
                  {openTicketsCount} {ct("commons.support.open")}
                </s-badge>
              )}
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground font-bold p-1"
            >
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center border-b border-border bg-muted/20 px-3 pt-2 gap-2">
            <button
              type="button"
              onClick={() => setSelectedTab("tickets")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
                selectedTab === "tickets"
                  ? "border-primary text-primary bg-card"
                  : "border-transparent text-muted-foreground hover:text-foreground"
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
              className={`px-3 py-1.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
                selectedTab === "new"
                  ? "border-primary text-primary bg-card"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {ct("commons.support.new_ticket")}
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-4 overflow-y-auto">
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
