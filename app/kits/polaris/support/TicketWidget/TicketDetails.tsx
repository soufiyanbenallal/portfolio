import type { TicketItemType } from "../TicketList";

export type TicketDetailsPropsType = {
  selectedTicket: TicketItemType | null;
  onBack: () => void;
};


export const TicketDetails = ({
  selectedTicket,
  onBack,
}: TicketDetailsPropsType): JSX.Element | null => {
  if (!selectedTicket) return null;
  const meta = selectedTicket.meta as Record<string, unknown> | undefined;

  return (
    <div className="p-4 rounded-xl border border-border bg-card space-y-4 max-h-[380px] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-border">
        <div className="flex items-center gap-2">
          <s-button variant="tertiary" onClick={onBack}>
            ← Back
          </s-button>
          <span className="font-bold text-sm text-foreground truncate max-w-[180px]">
            {selectedTicket.title}
          </span>
        </div>
        <s-badge tone={selectedTicket.status === "open" ? "info" : "success"}>
          {selectedTicket.status}
        </s-badge>
      </div>

      {/* Meta info */}
      <div className="space-y-1 text-xs text-muted-foreground">
        <div>
          <span className="font-semibold text-foreground">Type: </span>
          {selectedTicket.type}
        </div>
        {Boolean(selectedTicket.email) && (
          <div>
            <span className="font-semibold text-foreground">Contact Email: </span>
            {selectedTicket.email}
          </div>
        )}
        {Boolean(meta?.sessionEmail) && (
          <div>
            <span className="font-semibold text-foreground">Admin Email: </span>
            {String(meta?.sessionEmail)}
          </div>
        )}
      </div>

      {/* Description */}
      <div className="space-y-1 pt-2 border-t border-border">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
          Description
        </span>
        <div className="p-3 bg-muted/40 rounded-lg text-xs text-foreground leading-relaxed whitespace-pre-wrap border border-border/60">
          {selectedTicket.description}
        </div>
      </div>

      {/* Images */}
      {selectedTicket.images && selectedTicket.images.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-border">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Attachments ({selectedTicket.images.length})
          </span>
          <div className="flex flex-wrap gap-2">
            {selectedTicket.images.map((img: any, idx: number) => {
              const url = typeof img === "string" ? img : img?.url;
              if (!url) return null;
              return (
                <a
                  key={idx}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-16 h-16 rounded-lg overflow-hidden border border-border bg-muted/30 hover:opacity-80 transition-opacity"
                >
                  <img
                    src={url}
                    alt={`Attachment ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
