import type { Metadata, Viewport } from "next";
import "./globals.css";
import { NavbarShared } from "@/components/shared/navbar.shared";
import { FooterShared } from "@/components/shared/footer.shared";
import { ContactDialogPart } from "@/components/partials/contact-dialog.part";
import { BookingDialogShared } from "@/components/shared/booking-dialog.shared";
import { CalEmbedShared } from "@/components/shared/cal-embed.shared";
import { SmoothScrollShared } from "@/components/shared/smooth-scroll.shared";
import { GridOverlay } from "@/components/layout/grid-overlay";
import { ScrollProgress } from "@/components/motion/scroll-progress.motion";
import { Cursor } from "@/components/motion/cursor.motion";

export const metadata: Metadata = {
  title: {
    default: "Joseph Alexander — Lead Full-Stack Designer",
    template: "%s — Joseph Alexander",
  },
  description:
    "Strategic design that drives growth, not just looks good. Creating everything your brand needs to attract customers and turn them into sales.",
  keywords: [
    "Joseph Alexander",
    "Full-Stack Designer",
    "Product Design",
    "Framer Development",
    "React Engineer",
    "Brand Architecture",
  ],
  authors: [{ name: "Joseph Alexander" }],
  creator: "Joseph Alexander",
  openGraph: {
    title: "Joseph Alexander — Design that delivers results",
    description:
      "Strategic design that drives growth, not just looks good. Built with Next.js and Motion.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joseph Alexander — Design that delivers results",
    description: "Strategic design that drives growth, not just looks good.",
  },
};

export const viewport: Viewport = {
  themeColor: "#fafafa",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // No `scroll-smooth` here: Lenis owns the scroll position, and native
    // smooth scrolling fights it for the same frames.
    <html lang="en">
      <body className="relative flex min-h-screen flex-col overflow-x-clip bg-gray-5 font-sans text-black antialiased">
        <SmoothScrollShared>
          <a
            href="#main-content"
            className="sr-only rounded-full bg-black px-4 py-2 text-sm text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-9999"
          >
            Skip to content
          </a>

          <GridOverlay />
          <ScrollProgress />
          <NavbarShared />

          <div id="main-content" className="relative z-10 w-full flex-1">
            {children}
          </div>

          <FooterShared />

          <ContactDialogPart />
          <BookingDialogShared />
          <CalEmbedShared />

          {/* Enhancement only — removes itself for coarse pointers and
              reduced motion. */}
          <Cursor />
        </SmoothScrollShared>
      </body>
    </html>
  );
}
