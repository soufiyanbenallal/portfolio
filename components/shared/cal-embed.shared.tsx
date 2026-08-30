"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export const CAL_LINK = "soufiyan-benallal-rcyc9k/30min-meet";

export function CalEmbedShared() {
  useEffect(() => {
    (async function initCal() {
      try {
        const cal = await getCalApi();
        cal("ui", {
          theme: "light",
          styles: {
            branding: { brandColor: "#000000" },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
        cal("preload", { calLink: CAL_LINK });
      } catch (err) {
        console.error("Failed to initialize Cal.com embed", err);
      }
    })();
  }, []);

  return null;
}
