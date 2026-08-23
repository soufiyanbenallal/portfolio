import React from "react";
import { HeroPart } from "@/components/partials/hero.part";
import { ProjectsShowcasePart } from "@/components/partials/projects-showcase.part";
import { BigQuotePart } from "@/components/partials/big-quote.part";
import { ServicesPart } from "@/components/partials/services.part";
import { AboutHistoryPart } from "@/components/partials/about-history.part";
import { ClientTickerShared } from "@/components/shared/client-ticker.shared";
import { TestimonialsPart } from "@/components/partials/testimonials.part";
import { FaqPart } from "@/components/partials/faq.part";
import { BlogInsightsPart } from "@/components/partials/blog-insights.part";
import { MegaCtaPart } from "@/components/partials/mega-cta.part";
import { SectionShell } from "@/components/motion/section-shell.motion";
import { PageTransition } from "@/components/motion/page-transition.motion";

/**
 * Homepage.
 *
 * The section order is the narrative; `SectionShell` is what binds it. Each
 * shell unwraps its section from a rounded card into full bleed on arrival
 * and dims it as the next one slides over, so twelve distinct animation ideas
 * read as one continuous scroll rather than a reel of effects.
 *
 * Sections that pin their own content — the project deck, the docking
 * services rig, and the FAQ's sticky booking card — opt out of the shell's
 * transform. A transformed ancestor becomes the containing block for
 * `position: sticky` descendants and silently breaks the pin.
 */
export default function HomePage() {
  return (
    <PageTransition>
      <main className="relative flex w-full flex-col items-center">
        <HeroPart />

        {/* Card-to-card scroll deck */}
        <ProjectsShowcasePart />

        <SectionShell tone="paper">
          <BigQuotePart />
        </SectionShell>

        {/* Scales the whole section down into a docked card, then runs the
            service details past it */}
        <ServicesPart />

        <SectionShell id="about" tone="paper">
          <AboutHistoryPart />
        </SectionShell>

        <ClientTickerShared withHappyClientsCluster={false} />

        <SectionShell tone="paper">
          <TestimonialsPart />
        </SectionShell>

        <SectionShell id="faq" tone="paper" pinned>
          <FaqPart />
        </SectionShell>

        <SectionShell id="blog" tone="paper">
          <BlogInsightsPart />
        </SectionShell>

        <SectionShell tone="paper" dim={0}>
          <MegaCtaPart />
        </SectionShell>
      </main>
    </PageTransition>
  );
}
