"use client";

import React from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { NavbarShared } from "@/components/shared/navbar.shared";
import { FooterShared } from "@/components/shared/footer.shared";
import { CalEmbedShared } from "@/components/shared/cal-embed.shared";
import { ScrollProgress } from "@/components/motion/scroll-progress.motion";
import { cn } from "@/lib/utils";

// Neither is needed for first paint: the dialog renders only once opened,
// and the cursor only on fine pointers. Both load after hydration, outside
// the start-up bundle.
const ContactDialogPart = dynamic(
  () => import("@/components/partials/contact-dialog.part").then((mod) => mod.ContactDialogPart),
  { ssr: false }
);
const Cursor = dynamic(
  () => import("@/components/motion/cursor.motion").then((mod) => mod.Cursor),
  {
    ssr: false,
  }
);

export type PortfolioChromePropsType = {
  children: React.ReactNode;
};

/**
 * Conditionally renders the portfolio profile layout (Navbar, Footer, Overlays, Dialogs)
 * on portfolio pages, while providing a clean, standalone shell for isolated pages like
 * `/polaris-playground`.
 */
export function PortfolioChromeShared({ children }: PortfolioChromePropsType) {
  const pathname = usePathname();
  const isPlayground = pathname.startsWith("/polaris-playground");
  const isHomepage = pathname === "/";

  if (isPlayground) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollProgress />
      <NavbarShared />

      {/* Rail filler: the frame's rails, drawn once behind all page content.
          Sections draw the same 1px lines at the same x, so where they exist
          this is invisible; where a page leaves space (a short route
          stretched by flex-1) it keeps the rails unbroken down to the
          footer, whose own rails then fade out. */}
      {/* The nav floats over the page. The homepage opens on a full-screen
          stage meant to sit beneath it; every other page starts its content
          below the pill. */}
      <div
        className={cn("relative flex w-full flex-1 flex-col", !isHomepage && "pt-(--nav-clear)")}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="border-line-3 mx-auto h-full max-w-(--frame) border-x" />
        </div>
        {children}
      </div>

      <FooterShared />

      <ContactDialogPart />
      <CalEmbedShared />
      <Cursor />
    </>
  );
}
