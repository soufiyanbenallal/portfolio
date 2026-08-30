import React from "react";
import Link from "next/link";
import { Icons } from "@/components/ui/social-icons.ui";
import { Container } from "@/components/shared/container.shared";
import { PageTransition } from "@/components/motion/page-transition.motion";

export default function TermsPage() {
  return (
    <PageTransition>
      <div className="w-full">
        <Container className="flex max-w-[720px] flex-col gap-10 pt-32 pb-24">
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
              Last updated: February 2025
            </span>
          </div>

          <div className="text-gray-60 flex flex-col gap-6 text-sm leading-relaxed">
            <p>
              Welcome to the engineering &amp; design services of Soufiyan Benallal (&quot;we&quot;,
              &quot;our&quot;). By engaging our software development, Shopify engineering, AI
              integration, or consulting services, or subscribing to our retainer plans, you agree
              to comply with and be bound by the following terms and conditions.
            </p>

            <h2 className="mt-4 text-lg font-semibold text-black">1. Scope of Services</h2>
            <p>
              Services encompass full-stack web application development, custom Shopify apps &amp;
              themes, AI workflow automation, backend API architecture, UI engineering, and
              technical consulting. Work is conducted either on a fixed-scope project contract or
              through an engineering retainer.
            </p>

            <h2 className="mt-4 text-lg font-semibold text-black">
              2. Intellectual Property Rights
            </h2>
            <p>
              Upon complete payment of all agreed fees, 100% of all intellectual property rights,
              editable source files (Figma, code repositories, asset exports), and final
              deliverables are transferred unconditionally to the client. The studio reserves the
              right to showcase non-confidential project visuals in our portfolio and industry award
              submissions.
            </p>

            <h2 className="mt-4 text-lg font-semibold text-black">
              3. Subscription & Retainer Terms
            </h2>
            <p>
              Monthly unlimited design plans are billed every 30 days via Stripe. Clients may pause
              or cancel their subscription at any time prior to the next billing cycle renewal.
              Pausing suspends active request queues and reserves the remaining billed days for
              future resumption.
            </p>

            <h2 className="mt-4 text-lg font-semibold text-black">4. Revisions & Turnaround</h2>
            <p>
              Standard subscription requests receive active iterations within an average of 48
              business hours. Fixed project milestones include up to three structured rounds of
              revisions to guarantee total satisfaction.
            </p>

            <h2 className="mt-4 text-lg font-semibold text-black">
              5. Confidentiality & Mutual NDA
            </h2>
            <p>
              All client proprietary information, product roadmaps, and business data are treated
              with strict confidentiality. A mutual non-disclosure agreement is available upon
              request prior to project initiation.
            </p>
          </div>
        </Container>
      </div>
    </PageTransition>
  );
}
