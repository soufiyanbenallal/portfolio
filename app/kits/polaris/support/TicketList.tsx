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
          <p className="text-xs text-muted-foreground mt-1">
            {ct("commons.support.banner_followup")}
          </p>
        )}
      </s-banner>

      <div className="bg-card rounded-xl border border-border p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-foreground">
              {ct("commons.support.recent_tickets")}
            </h3>
            <p className="text-xs text-muted-foreground">{ct("commons.support.need_help")}</p>
          </div>
        </div>

        {loadingTickets ? (
          <div className="flex items-center justify-center py-8">
            <s-spinner size="base" />
          </div>
        ) : !tickets || tickets.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-border rounded-lg space-y-1">
            <p className="text-sm font-semibold text-foreground">
              {ct("commons.support.no_tickets")}
            </p>
            <p className="text-xs text-muted-foreground">{ct("commons.support.no_tickets_desc")}</p>
          </div>
        ) : (
          <div className="border border-border rounded-lg overflow-hidden">
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
                      <span className="font-semibold text-foreground">{ticket.title}</span>
                    </s-table-cell>
                    <s-table-cell>
                      <span className="text-xs text-muted-foreground truncate max-w-xs block">
                        {ticket.description}
                      </span>
                    </s-table-cell>
                    <s-table-cell>
                      <s-badge tone={ticket.status === "open" ? "info" : "success"}>
                        {ticket.status}
                      </s-badge>
                    </s-table-cell>
                    <s-table-cell>
                      <span className="text-xs text-foreground font-medium">{ticket.type}</span>
                    </s-table-cell>
                    <s-table-cell>
                      <span className="text-xs text-muted-foreground">{ticket.email}</span>
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
          <div className="p-5 max-w-lg space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                {ct("commons.support.col_email")}
              </span>
              <p className="text-sm font-medium text-foreground">{selectedTicket.email}</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                {ct("commons.support.col_type")}
              </span>
              <p className="text-sm font-medium text-foreground">{selectedTicket.type}</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                {ct("commons.support.col_description")}
              </span>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {selectedTicket.description}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                {ct("commons.support.col_status")}
              </span>
              <s-badge tone={selectedTicket.status === "open" ? "info" : "success"}>
                {selectedTicket.status}
              </s-badge>
            </div>

            {selectedTicket.images && selectedTicket.images.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  {ct("commons.support.col_images")}
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedTicket.images.map((img, i) => (
                    <a
                      key={i}
                      href={img}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-16 h-16 rounded-lg overflow-hidden border border-border hover:opacity-80 transition-opacity"
                    >
                      <img
                        src={img}
                        alt="ticket attachment"
                        className="w-full h-full object-cover"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-3 border-t border-border">
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
