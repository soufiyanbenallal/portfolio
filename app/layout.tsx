import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PortfolioChromeShared } from "@/components/shared/portfolio-chrome.shared";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="relative flex min-h-screen flex-col overflow-x-clip bg-gray-5 font-sans text-black antialiased">
        <a
          href="#main-content"
          className="sr-only rounded-full bg-black px-4 py-2 text-sm text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-9999"
        >
          Skip to content
        </a>

        <PortfolioChromeShared>
          <div id="main-content" className="relative z-10 w-full flex-1">
            {children}
          </div>
        </PortfolioChromeShared>
      </body>
    </html>
  );
}
