"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { NavbarShared } from "@/components/shared/navbar.shared";
import { FooterShared } from "@/components/shared/footer.shared";
import { ContactDialogPart } from "@/components/partials/contact-dialog.part";
import { BookingDialogShared } from "@/components/shared/booking-dialog.shared";
import { CalEmbedShared } from "@/components/shared/cal-embed.shared";
import { GridOverlay } from "@/components/layout/grid-overlay";
import { ScrollProgress } from "@/components/motion/scroll-progress.motion";
import { Cursor } from "@/components/motion/cursor.motion";

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

  if (isPlayground) {
    return <>{children}</>;
  }

  return (
    <>
      <GridOverlay />
      <ScrollProgress />
      <NavbarShared />

      {children}

      <FooterShared />

      <ContactDialogPart />
      <BookingDialogShared />
      <CalEmbedShared />
      <Cursor />
    </>
  );
}
