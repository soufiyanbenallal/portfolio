import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Soufiyan Benallal — Product-minded Full-Stack Engineer",
    template: "%s — Soufiyan Benallal",
  },
  description:
    "Senior full-stack engineer and product lead building durable commerce platforms, Shopify apps, React and TypeScript products, and useful AI workflows.",
  keywords: [
    "Soufiyan Benallal",
    "full-stack engineer",
    "engineering lead",
    "Shopify developer",
    "React TypeScript",
    "product architecture",
  ],
  authors: [{ name: "Soufiyan Benallal" }],
  creator: "Soufiyan Benallal",
  openGraph: {
    title: "Soufiyan Benallal — From rough idea to shipped system",
    description:
      "Product-minded engineering across commerce, React, TypeScript, Node.js, Laravel, Shopify and AI.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soufiyan Benallal — Product-minded Full-Stack Engineer",
    description: "From rough idea to a system that ships.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
