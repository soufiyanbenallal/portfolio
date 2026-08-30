import { useState } from "react";
import { useCommonsT } from "~/commons/providers";

export type TicketItemType = {
  id?: string | number;
  title: string;
  description: string;
  status: "open" | "closed" | string;
  type: string;
  email: string;
  images?: string[];
  meta?: Record<string, unknown>;
};

export type TicketListPropsType = {
  tickets: TicketItemType[];
  loadingTickets: boolean;
};

export const TicketList = ({ tickets, loadingTickets }: TicketListPropsType): JSX.Element => {
  const ct = useCommonsT();
  const [selectedTicket, setSelectedTicket] = useState<TicketItemType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = (ticket: TicketItemType) => {
    setSelectedTicket(ticket);
    setModalOpen(true);
  };

  const openTicketsCount = tickets?.filter((t) => t.status === "open")?.length || 0;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <s-banner heading={ct("commons.support")} tone="info">
        <p className="text-sm">{ct("commons.support.banner_desc")}</p>
        {openTicketsCount > 0 && (
          <p className="text-muted-foreground mt-1 text-xs">
            {ct("commons.support.banner_followup")}
          </p>
        )}
      </s-banner>

      <div className="bg-card border-border space-y-4 rounded-xl border p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-foreground text-base font-bold">
              {ct("commons.support.recent_tickets")}
            </h3>
            <p className="text-muted-foreground text-xs">{ct("commons.support.need_help")}</p>
          </div>
        </div>

        {loadingTickets ? (
          <div className="flex items-center justify-center py-8">
            <s-spinner size="base" />
          </div>
        ) : !tickets || tickets.length === 0 ? (
          <div className="border-border space-y-1 rounded-lg border border-dashed py-8 text-center">
            <p className="text-foreground text-sm font-semibold">
              {ct("commons.support.no_tickets")}
            </p>
            <p className="text-muted-foreground text-xs">{ct("commons.support.no_tickets_desc")}</p>
          </div>
        ) : (
          <div className="border-border overflow-hidden rounded-lg border">
            <s-table>
              <s-table-header-row>
                <s-table-header>{ct("commons.support.col_title")}</s-table-header>
                <s-table-header>{ct("commons.support.col_description")}</s-table-header>
                <s-table-header>{ct("commons.support.col_status")}</s-table-header>
                <s-table-header>{ct("commons.support.col_type")}</s-table-header>
                <s-table-header>{ct("commons.support.col_email")}</s-table-header>
                <s-table-header>{ct("commons.support.col_actions")}</s-table-header>
              </s-table-header-row>
              <s-table-body>
                {tickets.map((ticket, idx) => (
                  <s-table-row key={idx}>
                    <s-table-cell>
                      <span className="text-foreground font-semibold">{ticket.title}</span>
                    </s-table-cell>
                    <s-table-cell>
                      <span className="text-muted-foreground block max-w-xs truncate text-xs">
                        {ticket.description}
                      </span>
                    </s-table-cell>
                    <s-table-cell>
                      <s-badge tone={ticket.status === "open" ? "info" : "success"}>
                        {ticket.status}
                      </s-badge>
                    </s-table-cell>
                    <s-table-cell>
                      <span className="text-foreground text-xs font-medium">{ticket.type}</span>
                    </s-table-cell>
                    <s-table-cell>
                      <span className="text-muted-foreground text-xs">{ticket.email}</span>
                    </s-table-cell>
                    <s-table-cell>
                      <s-button variant="tertiary" onClick={() => handleCardClick(ticket)}>
                        {ct("commons.support.details")}
                      </s-button>
                    </s-table-cell>
                  </s-table-row>
                ))}
              </s-table-body>
            </s-table>
          </div>
        )}
      </div>

      {/* Ticket Details Modal */}
      {modalOpen && selectedTicket && (
        <s-modal
          id="ticket-details-modal"
          heading={selectedTicket.title || ct("commons.support.ticket_details")}
          onHide={() => setModalOpen(false)}
        >
          <div className="max-w-lg space-y-4 p-5">
            <div className="space-y-1">
              <span className="text-muted-foreground block text-xs font-semibold tracking-wider uppercase">
                {ct("commons.support.col_email")}
              </span>
              <p className="text-foreground text-sm font-medium">{selectedTicket.email}</p>
            </div>

            <div className="space-y-1">
              <span className="text-muted-foreground block text-xs font-semibold tracking-wider uppercase">
                {ct("commons.support.col_type")}
              </span>
              <p className="text-foreground text-sm font-medium">{selectedTicket.type}</p>
            </div>

            <div className="space-y-1">
              <span className="text-muted-foreground block text-xs font-semibold tracking-wider uppercase">
                {ct("commons.support.col_description")}
              </span>
              <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
                {selectedTicket.description}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-muted-foreground block text-xs font-semibold tracking-wider uppercase">
                {ct("commons.support.col_status")}
              </span>
              <s-badge tone={selectedTicket.status === "open" ? "info" : "success"}>
                {selectedTicket.status}
              </s-badge>
            </div>

            {selectedTicket.images && selectedTicket.images.length > 0 && (
              <div className="border-border space-y-2 border-t pt-2">
                <span className="text-muted-foreground block text-xs font-semibold tracking-wider uppercase">
                  {ct("commons.support.col_images")}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {selectedTicket.images.map((img, i) => (
                    <a
                      key={i}
                      href={img}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-border block h-16 w-16 overflow-hidden rounded-lg border transition-opacity hover:opacity-80"
                    >
                      <img
                        src={img}
                        alt="ticket attachment"
                        className="h-full w-full object-cover"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="border-border flex justify-end border-t pt-3">
              <s-button variant="secondary" onClick={() => setModalOpen(false)}>
                {ct("commons.close")}
              </s-button>
            </div>
          </div>
        </s-modal>
      )}
    </div>
  );
};

export default TicketList;
