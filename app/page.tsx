import { HeroProjectsUnifiedPart } from "@/components/partials/hero-projects-unified.part";
import { BigQuotePart } from "@/components/partials/big-quote.part";
import { ServicesPart } from "@/components/partials/services.part";
import { AboutHistoryPart } from "@/components/partials/about-history.part";
import { GithubProjectsPart } from "@/components/partials/github-projects.part";
import { CompaniesStrip } from "@/components/shared/companies-strip.shared";
import { TestimonialsPart } from "@/components/partials/testimonials.part";
import { FaqPart } from "@/components/partials/faq.part";
import { BlogInsightsPart } from "@/components/partials/blog-insights.part";
import { StatsPart } from "@/components/partials/stats.part";
import { Band, Section } from "@/components/shared/section.shared";
import { PageTransition } from "@/components/motion/page-transition.motion";

/**
 * Homepage.
 *
 * One frame, many sections: every block below is a `<Section>` — a seam
 * across the viewport and the frame's rails down both sides — stacked with
 * no gaps, so the rails run unbroken from the nav to the footer. Layout
 * lives here; the partials only render what goes inside the frame.
 *
 * Sections that pin their own content (the hero deck, the services rig,
 * the FAQ's sticky booking card) skip `clip` and never get a transform:
 * a transformed ancestor becomes the containing block for `position:
 * sticky` descendants and silently breaks the pin.
 */
export default function HomePage() {
  return (
    <PageTransition>
      <main className="relative flex w-full flex-col">
        {/* First block under the nav — no seam, the bar's bottom edge is its
            top line. Hatched margins mark the gutters beside the product
            stage. */}
        <Section as="div" seam hatchedMargins>
          <HeroProjectsUnifiedPart />
        </Section>

        <Section aria-label="At a glance" seam>
          <StatsPart />
        </Section>
        <Band />

        {/* The quote pins beneath the nav while the services rig slides up
            over it; the services wrapper's own background is what covers
            it. The page's one ambient motion, the beam, runs this seam. */}
        <div className="relative w-full">
          <Section className="sticky top-(--nav-h)" beam aria-label="Quote">
            <BigQuotePart />
          </Section>

          {/* Renders its own Sections — one seam per service stack. */}
          <ServicesPart />
        </div>

        <Band />

        <Section id="about" hatchedMargins>
          <AboutHistoryPart />
        </Section>

        <Section aria-label="Companies" seam hatchedMargins>
          <CompaniesStrip />
        </Section>

        {/* Renders its own Section: it disappears entirely when the GitHub
            API is unavailable, and an empty Section would leave a stray seam. */}
        <GithubProjectsPart />
        <Band />

        <Section aria-label="Testimonials" hatchedMargins>
          <TestimonialsPart />
        </Section>
        <Band />

        <Section id="blog">
          <BlogInsightsPart />
        </Section>

        <Band />

        {/* Last before the footer: the questions, and the booking card. */}
        <Section id="faq" seam hatchedMargins>
          <FaqPart />
        </Section>
        <Band />
      </main>
    </PageTransition>
  );
}
