"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export const CAL_LINK = "soufiyan-benallal-rcyc9k/30min-meet";

const BOOKING_SELECTOR = "[data-cal-link]";

type CalApiType = Awaited<ReturnType<typeof getCalApi>>;

/**
 * Cal.com, loaded on intent.
 *
 * Every "Book a call" control on the site is a plain element carrying
 * `data-cal-link`; the embed script turns those into scheduler triggers.
 * That script and the scheduler it preloads are the heaviest third-party
 * cost on the page, so neither runs at page load:
 *
 *   • the script loads only when a visitor points at, focuses or clicks a
 *     booking control — so a visit that never books never contacts Cal.com
 *     at all (no third-party request, no third-party cookie);
 *   • the scheduler is preloaded on that same first intent, usually a
 *     hover, a moment before the click.
 *
 * A click that lands before the script is ready is not lost: it is replayed
 * as an explicit modal open once the embed is up.
 */
export function CalEmbedShared() {
  useEffect(() => {
    let calPromise: Promise<CalApiType> | null = null;
    let hasPreloaded = false;

    const loadCal = () => {
      calPromise ??= getCalApi().then((cal) => {
        cal("ui", {
          theme: "light",
          styles: { branding: { brandColor: "#111113" } },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
        return cal;
      });
      return calPromise;
    };

    const preload = () => {
      if (hasPreloaded) return;
      hasPreloaded = true;
      loadCal()
        .then((cal) => cal("preload", { calLink: CAL_LINK }))
        .catch(() => {});
    };

    const bookingTarget = (event: Event) =>
      (event.target as Element | null)?.closest?.(BOOKING_SELECTOR) as HTMLElement | null;

    const handleIntent = (event: Event) => {
      if (bookingTarget(event)) preload();
    };

    const handleClick = (event: MouseEvent) => {
      const target = bookingTarget(event);
      if (!target || calPromise) return;
      // First click before the embed exists: open it explicitly once ready.
      const calLink = target.dataset.calLink ?? CAL_LINK;
      let config: Record<string, string> = {};
      try {
        config = JSON.parse(target.dataset.calConfig ?? "{}");
      } catch {
        // Malformed config — open with defaults.
      }
      loadCal()
        .then((cal) => cal("modal", { calLink, config }))
        .catch((error) => console.error("Failed to open Cal.com", error));
    };

    document.addEventListener("pointerover", handleIntent, { passive: true });
    document.addEventListener("focusin", handleIntent);
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("pointerover", handleIntent);
      document.removeEventListener("focusin", handleIntent);
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return null;
}
