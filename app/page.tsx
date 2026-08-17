import React from "react";
import { HeroPart } from "@/components/partials/hero.part";
import { LatestProjectsPart } from "@/components/partials/latest-projects.part";
import { BigQuotePart } from "@/components/partials/big-quote.part";
import { ServicesPart } from "@/components/partials/services.part";
import { AboutHistoryPart } from "@/components/partials/about-history.part";
import { PricingPart } from "@/components/partials/pricing.part";
import { ClientTickerShared } from "@/components/shared/client-ticker.shared";
import { TestimonialsPart } from "@/components/partials/testimonials.part";
import { FaqPart } from "@/components/partials/faq.part";
import { BlogInsightsPart } from "@/components/partials/blog-insights.part";
import { MegaCtaPart } from "@/components/partials/mega-cta.part";

export default function HomePage() {
  return (
    <main className="relative w-full flex flex-col items-center">
      {/* 1. Hero Section */}
      <HeroPart />

      {/* 2. Latest Projects */}
      <LatestProjectsPart />

      {/* 3. Big Quote Testimonial */}
      <BigQuotePart />

      {/* 4. Services That Supercharge Your Business */}
      <ServicesPart />

      {/* 5. About & Work History */}
      <AboutHistoryPart />

      {/* 6. Pricing Plans */}
      <PricingPart />

      {/* 7. Bordered Client Logo Ticker Strip */}
      <ClientTickerShared withHappyClientsCluster={false} />

      {/* 8. Client Testimonials */}
      <TestimonialsPart />

      {/* 9. FAQ & Sticky Discovery Card */}
      <FaqPart />

      {/* 10. Design Insights & Articles */}
      <BlogInsightsPart />

      {/* 11. Mega Interactive CTA */}
      <MegaCtaPart />
    </main>
  );
}
