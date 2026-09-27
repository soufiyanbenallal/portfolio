import React from "react";
import Link from "next/link";
import { Icons } from "@/components/ui/social-icons.ui";
import { Container } from "@/components/shared/container.shared";
import { PageTransition } from "@/components/motion/page-transition.motion";

export default function TermsPage() {
  return (
    <PageTransition>
      <div className="w-full">
        <Container className="flex max-w-[720px] flex-col gap-10 pt-16 pb-24">
          <div>
            <Link
              href="/"
              transitionTypes={["nav-back"]}
              className="text-gray-60 inline-flex items-center gap-2 text-xs font-medium transition-colors hover:text-black"
            >
              <Icons.ArrowLeft className="h-3.5 w-3.5" />
              <span>Return to Portfolio</span>
            </Link>
          </div>

          <div className="border-gray-30 border-b pb-6">
            <span className="mb-1 block font-mono text-xs tracking-widest text-gray-50 uppercase">
              Legal Agreement
            </span>
            <h1 className="text-3xl font-medium tracking-tight text-black sm:text-4xl">
              Terms of Service
            </h1>
            <span className="mt-1 block font-mono text-xs text-gray-50">
              Last updated: September 2026
            </span>
          </div>

          <div className="text-gray-60 flex flex-col gap-6 text-sm leading-relaxed">
            <p>
              These terms apply when you engage Soufiyan Benallal (&quot;I&quot;, &quot;me&quot;)
              for software development, Shopify engineering, AI integration or technical
              consulting. Each engagement is also described in a written proposal; where the two
              differ, the proposal wins.
            </p>

            <h2 className="mt-4 text-lg font-semibold text-black">1. Scope of Services</h2>
            <p>
              Services include full-stack web application and SaaS development, Shopify apps and
              themes, AI integration and workflow automation, backend and API development, and
              technical leadership or code review. The exact scope, milestones and deliverables of
              each engagement are set out in its proposal.
            </p>

            <h2 className="mt-4 text-lg font-semibold text-black">2. Engagement &amp; Payment</h2>
            <p>
              Work is carried out either as a fixed-scope project, invoiced by milestone, or as an
              ongoing monthly engagement. Amounts, payment schedule and payment method are stated
              in the proposal and on each invoice.
            </p>

            <h2 className="mt-4 text-lg font-semibold text-black">3. Changes to Scope</h2>
            <p>
              Requests outside the agreed scope are handled as written change requests. I will
              confirm the effect on timeline and cost before starting any additional work.
            </p>

            <h2 className="mt-4 text-lg font-semibold text-black">4. Intellectual Property</h2>
            <p>
              Once the agreed fees are paid in full, ownership of the source code, documentation
              and deliverables created for you transfers to you. I will only reference the work in
              my portfolio with your permission, and never anything confidential.
            </p>

            <h2 className="mt-4 text-lg font-semibold text-black">5. Confidentiality</h2>
            <p>
              Your proprietary information, code, product plans and business data are kept
              confidential. A mutual non-disclosure agreement is available on request before the
              project starts.
            </p>

            <h2 className="mt-4 text-lg font-semibold text-black">6. Contact</h2>
            <p>
              Questions about these terms:{" "}
              <a href="mailto:benallalsoufiane1@gmail.com" className="text-black underline">
                benallalsoufiane1@gmail.com
              </a>
              .
            </p>
          </div>
        </Container>
      </div>
    </PageTransition>
  );
}
