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
    <div className="border-border bg-card max-h-[380px] space-y-4 overflow-y-auto rounded-xl border p-4">
      {/* Header */}
      <div className="border-border flex items-center justify-between gap-3 border-b pb-2">
        <div className="flex items-center gap-2">
          <s-button variant="tertiary" onClick={onBack}>
            ← Back
          </s-button>
          <span className="text-foreground max-w-[180px] truncate text-sm font-bold">
            {selectedTicket.title}
          </span>
        </div>
        <s-badge tone={selectedTicket.status === "open" ? "info" : "success"}>
          {selectedTicket.status}
        </s-badge>
      </div>

      {/* Meta info */}
      <div className="text-muted-foreground space-y-1 text-xs">
        <div>
          <span className="text-foreground font-semibold">Type: </span>
          {selectedTicket.type}
        </div>
        {Boolean(selectedTicket.email) && (
          <div>
            <span className="text-foreground font-semibold">Contact Email: </span>
            {selectedTicket.email}
          </div>
        )}
        {Boolean(meta?.sessionEmail) && (
          <div>
            <span className="text-foreground font-semibold">Admin Email: </span>
            {String(meta?.sessionEmail)}
          </div>
        )}
      </div>

      {/* Description */}
      <div className="border-border space-y-1 border-t pt-2">
        <span className="text-muted-foreground block text-xs font-semibold tracking-wider uppercase">
          Description
        </span>
        <div className="bg-muted/40 text-foreground border-border/60 rounded-lg border p-3 text-xs leading-relaxed whitespace-pre-wrap">
          {selectedTicket.description}
        </div>
      </div>

      {/* Images */}
      {selectedTicket.images && selectedTicket.images.length > 0 && (
        <div className="border-border space-y-2 border-t pt-2">
          <span className="text-muted-foreground block text-xs font-semibold tracking-wider uppercase">
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
                  className="border-border bg-muted/30 block h-16 w-16 overflow-hidden rounded-lg border transition-opacity hover:opacity-80"
                >
                  <img
                    src={url}
                    alt={`Attachment ${idx + 1}`}
                    className="h-full w-full object-cover"
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
