import type { Metadata } from "next";
import "./globals.css";
import { NavbarShared } from "@/components/shared/navbar.shared";
import { FooterShared } from "@/components/shared/footer.shared";
import { ContactDialogPart } from "@/components/partials/contact-dialog.part";
import { BookingDialogShared } from "@/components/shared/booking-dialog.shared";
import { SmoothScrollShared } from "@/components/shared/smooth-scroll.shared";
import { GridOverlay } from "@/components/layout/grid-overlay";



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
      "Strategic design that drives growth, not just looks good. Built with Next.js and Framer Motion.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joseph Alexander — Design that delivers results",
    description: "Strategic design that drives growth, not just looks good.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="relative min-h-screen bg-gray-5 text-black flex flex-col font-sans antialiased overflow-x-hidden">
        <SmoothScrollShared>
          {/* Continuous Editorial Grid Overlay */}
          <GridOverlay />

          {/* Global floating glass pill navbar */}
          <NavbarShared />

          {/* Main Content Area */}
          <div className="flex-1 w-full relative z-10">{children}</div>

          {/* Pure Black Footer */}
          <FooterShared  />

          {/* Fixed Bottom Contact Control + Blur Gradient */}
          {/* <BottomContactNavShared /> */}

          {/* Interactive Modals */}
          <ContactDialogPart />
          <BookingDialogShared />
        </SmoothScrollShared>
      </body>
    </html>
  );
}
