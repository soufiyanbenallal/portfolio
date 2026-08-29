import { useState } from "react";
import type { TicketItemType } from "../TicketList";

export type TicketMessagesListPropsType = {
  tickets: TicketItemType[];
  loadingTickets: boolean;
  onSelect?: (ticket: TicketItemType) => void;
};


function getInitials(email: string) {
  if (!email) return "?";
  const [name] = email.split("@");
  return name?.[0]?.toUpperCase() || "?";
}

export const TicketMessagesList = ({
  tickets,
  loadingTickets,
  onSelect,
}: TicketMessagesListPropsType): JSX.Element => {
  const [hovered, setHovered] = useState<number | null>(null);

  if (loadingTickets) {
    return (
      <div className="flex items-center justify-center p-8 min-h-[200px]">
        <s-spinner size="base" />
      </div>
    );
  }

  if (!tickets || tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center min-h-[200px] space-y-1">
        <span className="text-sm font-semibold text-foreground">No messages yet</span>
        <p className="text-xs text-muted-foreground">
          You have not created any support tickets yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
      {tickets.map((ticket, idx) => (
        <div
          key={ticket.id || idx}
          role="button"
          tabIndex={0}
          onClick={onSelect ? () => onSelect(ticket) : undefined}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onSelect?.(ticket);
          }}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
          className={`p-3 rounded-xl border border-border transition-colors cursor-pointer flex items-center justify-between gap-3 ${
            hovered === idx ? "bg-muted/60" : "bg-card"
          }`}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
              {getInitials(ticket.email)}
            </div>
            <div className="overflow-hidden">
              <span className="font-semibold text-sm text-foreground block truncate">
                {ticket.title || "(No title)"}
              </span>
              <span className="text-xs text-muted-foreground block truncate">
                {ticket.description || "No description"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <s-badge tone={ticket.status === "open" ? "info" : "success"}>{ticket.status}</s-badge>
            <span className="text-muted-foreground text-xs">→</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketMessagesList;
