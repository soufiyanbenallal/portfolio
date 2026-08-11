import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soufiyan Benallal — Senior Full-Stack Engineer",
  description:
    "Soufiyan Benallal — Senior full-stack engineer and engineering lead. Commerce platforms, Shopify apps, React/TypeScript products, AI integrations.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
