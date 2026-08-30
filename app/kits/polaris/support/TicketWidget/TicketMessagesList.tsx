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
      <div className="flex min-h-[200px] items-center justify-center p-8">
        <s-spinner size="base" />
      </div>
    );
  }

  if (!tickets || tickets.length === 0) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center space-y-1 p-8 text-center">
        <span className="text-foreground text-sm font-semibold">No messages yet</span>
        <p className="text-muted-foreground text-xs">
          You have not created any support tickets yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-h-[380px] space-y-2 overflow-y-auto pr-1">
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
          className={`border-border flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-3 transition-colors ${
            hovered === idx ? "bg-muted/60" : "bg-card"
          }`}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold">
              {getInitials(ticket.email)}
            </div>
            <div className="overflow-hidden">
              <span className="text-foreground block truncate text-sm font-semibold">
                {ticket.title || "(No title)"}
              </span>
              <span className="text-muted-foreground block truncate text-xs">
                {ticket.description || "No description"}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <s-badge tone={ticket.status === "open" ? "info" : "success"}>{ticket.status}</s-badge>
            <span className="text-muted-foreground text-xs">→</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketMessagesList;
