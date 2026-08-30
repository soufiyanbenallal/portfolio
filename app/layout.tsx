import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PortfolioChromeShared } from "@/components/shared/portfolio-chrome.shared";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Soufiyan Benallal — Lead Full-Stack & Shopify Developer",
    template: "%s — Soufiyan Benallal",
  },
  description:
    "Senior Developer specializing in React 19, TypeScript, Node.js, Laravel, Shopify Apps & Themes, and AI integrations. Architecting scalable platforms and high-converting storefronts.",
  keywords: [
    "Soufiyan Benallal",
    "Lead Full Stack Developer",
    "Shopify Apps Developer",
    "Shopify Themes Architect",
    "React Engineer",
    "Next.js Developer",
    "Laravel & PHP",
    "AI Integrations",
    "TypeScript",
  ],
  authors: [{ name: "Soufiyan Benallal" }],
  creator: "Soufiyan Benallal",
  openGraph: {
    title: "Soufiyan Benallal — Lead Full-Stack & Shopify Developer",
    description:
      "Senior Developer specializing in React, TypeScript, Node.js, Laravel, Shopify Apps & Themes, and AI integrations.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soufiyan Benallal — Lead Full-Stack & Shopify Developer",
    description:
      "Senior Developer specializing in React, TypeScript, Node.js, Laravel, Shopify Apps & Themes, and AI integrations.",
  },
};

export const viewport: Viewport = {
  themeColor: "#fafafa",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // No `scroll-smooth` here: Lenis owns the scroll position, and native
    // smooth scrolling fights it for the same frames.
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="bg-gray-5 relative flex min-h-screen flex-col overflow-x-clip font-sans text-black antialiased">
        <a
          href="#main-content"
          className="sr-only rounded-full bg-black px-4 py-2 text-sm text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-9999"
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
