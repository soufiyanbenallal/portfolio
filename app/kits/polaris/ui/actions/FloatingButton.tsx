import { useState, useCallback, useEffect } from "react";
import { useNavigate, useFetcher } from "react-router";
import { useCommonsT } from "~/commons/providers";
import CreateTicketModal from "~/commons/components/support/TicketWidget/CreateTicketModal";
import {
  getFloatingItems,
  INITIAL_TICKET_FORM,
  type FloatingItem,
} from "~/commons/components/FloatingButtonActions";

type Side = "left" | "right";
type Vertical = "top" | "bottom";

type FloatingButtonPropsType = {
  extraItems?: FloatingItem[];
  sessionEmail?: string;
  side?: Side;
  vertical?: Vertical;
  offsetX?: string;
  offsetY?: string;
  panelOffset?: string;
  mode?: "floating" | "inline";
};

export function FloatingButton({
  extraItems = [],
  sessionEmail = "",
  side = "left",
  vertical = "bottom",
  offsetX = "16px",
  offsetY = "2px",
  panelOffset = "52px",
  mode = "floating",
}: FloatingButtonPropsType): JSX.Element {
  const navigate = useNavigate();
  const ct = useCommonsT();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [ticketForm, setTicketForm] = useState(INITIAL_TICKET_FORM);
  const ticketFetcher = useFetcher<{ success: boolean; error?: string }>();

  const close = () => setIsOpen(false);

  const handleOpenTicket = useCallback(
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
    }
  }, [ticketFetcher.state, ticketFetcher.data, handleTicketClose]);

  const items = getFloatingItems(handleOpenTicket, extraItems).filter((item) => !item.disabled);

  const isInline = mode === "inline";
  const buttonPos = isInline ? {} : { [side]: offsetX, [vertical]: offsetY };
  const panelPos = isInline
    ? {}
    : { [side]: offsetX, [vertical]: `calc(${offsetY} + ${panelOffset})` };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsOpen((v) => !v);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: isInline ? "relative" : "fixed",
          ...buttonPos,
          zIndex: isInline ? 1 : 200,
        }}
        className="flex items-center gap-2 cursor-pointer"
      >
        {isInline ? (
          <button
            type="button"
            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label={ct("commons.help_menu")}
          >
            {ct("commons.help")}
          </button>
        ) : (
          <button
            type="button"
            className="w-11 h-11 rounded-full bg-zinc-900 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
            aria-label={ct("commons.help_menu")}
          >
            ?
          </button>
        )}
        {!isOpen && isHovered && !isInline && (
          <div className="bg-zinc-900 text-white rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap shadow-md">
            {ct("commons.help_resources")}
          </div>
        )}
      </div>

      {isOpen && (
        <div
          style={{
            position: isInline ? "absolute" : "fixed",
            bottom: isInline ? "100%" : undefined,
            left: isInline ? "0" : undefined,
            marginBottom: isInline ? "8px" : undefined,
            ...(!isInline ? panelPos : {}),
            zIndex: isInline ? 300 : 200,
          }}
          className="w-64 bg-card rounded-2xl border border-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="p-3 border-b border-border flex items-center justify-between">
            <span className="font-bold text-xs text-foreground uppercase tracking-wider">
              {ct("commons.help_resources")}
            </span>
            <button
              type="button"
              onClick={close}
              className="text-muted-foreground hover:text-foreground text-sm font-bold p-1"
            >
              ✕
            </button>
          </div>

          <div className="py-1">
            {items.map((item, index) => (
              <div key={index}>
                {item.onClick ? (
                  <button
                    type="button"
                    onClick={() => {
                      item.onClick!();
                      close();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-muted/60 transition-colors"
                  >
                    <img src={item.icon} alt="" className="w-7 h-7 rounded-md shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-xs text-foreground block truncate">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-muted-foreground block truncate">
                        {item.subtitle}
                      </span>
                    </div>
                  </button>
                ) : item.url?.startsWith("http") ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={close}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-muted/60 transition-colors"
                  >
                    <img src={item.icon} alt="" className="w-7 h-7 rounded-md shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-xs text-foreground block truncate">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-muted-foreground block truncate">
                        {item.subtitle}
                      </span>
                    </div>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (item.url) navigate(item.url);
                      close();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-muted/60 transition-colors"
                  >
                    <img src={item.icon} alt="" className="w-7 h-7 rounded-md shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-xs text-foreground block truncate">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-muted-foreground block truncate">
                        {item.subtitle}
                      </span>
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <CreateTicketModal
        open={ticketModalOpen}
        onClose={handleTicketClose}
        onSubmit={handleTicketSubmit}
        submitting={ticketFetcher.state !== "idle"}
        form={ticketForm}
        setForm={setTicketForm}
        sessionEmail={sessionEmail}
        asModal
      />
    </>
  );
}

export default FloatingButton;
