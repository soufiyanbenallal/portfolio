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
        className="flex cursor-pointer items-center gap-2"
      >
        {isInline ? (
          <button
            type="button"
            className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold transition-colors"
            aria-label={ct("commons.help_menu")}
          >
            {ct("commons.help")}
          </button>
        ) : (
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900 text-white shadow-lg transition-transform hover:scale-105"
            aria-label={ct("commons.help_menu")}
          >
            ?
          </button>
        )}
        {!isOpen && isHovered && !isInline && (
          <div className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium whitespace-nowrap text-white shadow-md">
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
          className="bg-card border-border animate-in fade-in zoom-in-95 w-64 overflow-hidden rounded-2xl border shadow-2xl duration-150"
        >
          <div className="border-border flex items-center justify-between border-b p-3">
            <span className="text-foreground text-xs font-bold tracking-wider uppercase">
              {ct("commons.help_resources")}
            </span>
            <button
              type="button"
              onClick={close}
              className="text-muted-foreground hover:text-foreground p-1 text-sm font-bold"
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
                    className="hover:bg-muted/60 flex w-full items-center gap-3 px-3 py-2 text-left transition-colors"
                  >
                    <img src={item.icon} alt="" className="h-7 w-7 shrink-0 rounded-md" />
                    <div className="min-w-0 flex-1">
                      <span className="text-foreground block truncate text-xs font-medium">
                        {item.title}
                      </span>
                      <span className="text-muted-foreground block truncate text-[11px]">
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
                    className="hover:bg-muted/60 flex w-full items-center gap-3 px-3 py-2 text-left transition-colors"
                  >
                    <img src={item.icon} alt="" className="h-7 w-7 shrink-0 rounded-md" />
                    <div className="min-w-0 flex-1">
                      <span className="text-foreground block truncate text-xs font-medium">
                        {item.title}
                      </span>
                      <span className="text-muted-foreground block truncate text-[11px]">
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
                    className="hover:bg-muted/60 flex w-full items-center gap-3 px-3 py-2 text-left transition-colors"
                  >
                    <img src={item.icon} alt="" className="h-7 w-7 shrink-0 rounded-md" />
                    <div className="min-w-0 flex-1">
                      <span className="text-foreground block truncate text-xs font-medium">
                        {item.title}
                      </span>
                      <span className="text-muted-foreground block truncate text-[11px]">
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
