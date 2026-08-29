import { useState, useEffect, useCallback } from "react";
import CreateTicketModal, {
  type SupportImageItemType,
} from "./support/TicketWidget/CreateTicketModal";
import { useCommonsT } from "~/commons/providers";

export type SomethingWentWrongPropsType = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  error?: any;
};

// Compatibility alias
export type Props = SomethingWentWrongPropsType;

export type ErrorResponseType = {
  status?: number;
  statusText?: string;
  internal?: boolean;
  data?: string;
  error?: any;
};

const INITIAL_FORM = {
  contactEmail: "",
  title: "Error Report",
  description: "",
  images: [] as SupportImageItemType[],
  type: "bug",
};

function navigateTo(path: string) {
  if (typeof window === "undefined") return;

  try {
    if ((window as any).shopify?.idToken) {
      window.history.pushState({}, "", path);
      window.dispatchEvent(new PopStateEvent("popstate"));
      return;
    }
  } catch {
    // ignore
  }

  try {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  } catch {
    window.location.assign(path);
  }
}

export const SomethingWentWrong = ({
  title,
  message,
  onRetry,
  error,
}: SomethingWentWrongPropsType): JSX.Element => {
  const ct = useCommonsT();
  const [ticketOpen, setTicketOpen] = useState(false);
  const [ticketSubmitting, setTicketSubmitting] = useState(false);
  const [ticketDone, setTicketDone] = useState(false);
  const [ticketError, setTicketError] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);

  const encodeError = (err: any): string => {
    try {
      return btoa(JSON.stringify(err, null, 2));
    } catch {
      return btoa("Error encoding failed");
    }
  };

  useEffect(() => {
    if (error) {
      const page = typeof window !== "undefined" ? window.location.href : "unknown page";
      setForm((prev) => ({
        ...prev,
        description: `I encountered an error on: ${page}\n\nPlease describe what you were doing:\n`,
      }));
    }
  }, [error]);

  const handleTicketSubmit = useCallback(async () => {
    setTicketSubmitting(true);
    setTicketError(false);
    try {
      const data = new FormData();
      data.set("contactEmail", form.contactEmail);
      data.set("title", form.title);
      data.set("description", form.description);
      data.set("type", form.type);
      data.set(
        "images",
        JSON.stringify(form.images.filter((img: any) => img?.url).map((img: any) => img.url))
      );
      if (error) {
        data.set("meta", JSON.stringify({ errorCode: encodeError(error) }));
      }
      const res = await fetch("/api/support/tickets", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error("Ticket submission failed");
      setTicketDone(true);
      setTicketOpen(false);
    } catch {
      setTicketError(true);
      setTicketOpen(false);
    } finally {
      setTicketSubmitting(false);
    }
  }, [form, error]);

  const goBack = () => {
    if (typeof window !== "undefined") window.history.back();
  };

  const goToHomepage = () => navigateTo("/app");

  const retry = () => {
    if (onRetry) {
      onRetry();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const errorResponse = error as ErrorResponseType;
  const is404 = errorResponse?.status === 404;

  if (is404) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-6">
        <div className="max-w-md w-full text-center p-8 bg-card rounded-2xl border border-border shadow-md space-y-4">
          <div className="w-16 h-16 rounded-full bg-indigo-500/10 text-indigo-600 flex items-center justify-center mx-auto text-2xl font-bold">
            404
          </div>
          <h1 className="text-xl font-bold text-foreground">{ct("commons.error.not_found")}</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {ct("commons.error.not_found_desc")}
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <s-button variant="primary" onClick={goBack}>
              {ct("commons.go_back")}
            </s-button>
            <s-button variant="secondary" onClick={goToHomepage}>
              {ct("commons.homepage")}
            </s-button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-6">
      <div className="max-w-md w-full text-center p-8 bg-card rounded-2xl border border-border shadow-md space-y-4">
        <div className="w-16 h-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto text-2xl font-bold">
          !
        </div>

        <h1 className="text-xl font-bold text-foreground">
          {title || ct("commons.error.default_title")}
        </h1>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {message || ct("commons.error.default_desc")}
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-semibold">
          <span>✓</span>
          <span>{ct("commons.error.notified")}</span>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <s-button variant="primary" onClick={retry}>
            {ct("commons.refresh_page")}
          </s-button>
          <s-button variant="secondary" onClick={goToHomepage}>
            {ct("commons.homepage")}
          </s-button>
        </div>

        <div className="pt-4 border-t border-border text-xs text-muted-foreground">
          {ticketDone ? (
            <span className="text-emerald-600 font-medium">
              {ct("commons.support.ticket_submitted_short")}
            </span>
          ) : ticketError ? (
            <p>
              {ct("commons.support.ticket_failed")}{" "}
              <a
                href={`mailto:${ct("commons.support.support_email")}`}
                className="text-primary underline font-medium"
              >
                {ct("commons.support.support_email")}
              </a>
            </p>
          ) : (
            <p>
              {ct("commons.support.need_immediate_help")}{" "}
              <button
                type="button"
                onClick={() => setTicketOpen(true)}
                className="text-primary underline font-medium cursor-pointer"
              >
                {ct("commons.error.create_ticket")}
              </button>
            </p>
          )}
        </div>
      </div>

      <CreateTicketModal
        open={ticketOpen}
        onClose={() => setTicketOpen(false)}
        onSubmit={handleTicketSubmit}
        submitting={ticketSubmitting}
        form={form}
        setForm={setForm}
        sessionEmail=""
        asModal
      />
    </div>
  );
};

export default SomethingWentWrong;
