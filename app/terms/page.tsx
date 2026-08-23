import React from "react";
import Link from "next/link";
import { Icons } from "@/components/ui/social-icons.ui";
import { Container } from "@/components/shared/container.shared";

export default function TermsPage() {
  return (
    <div className="w-full">
      <Container className="max-w-[720px] flex flex-col gap-10 pt-32 pb-24">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-gray-60 hover:text-black transition-colors"
          >
            <Icons.ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </div>

        <div className="border-b border-gray-30 pb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-gray-50 block mb-1">
            Legal Agreement
          </span>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-black">
            Terms of Service
          </h1>
          <span className="text-xs font-mono text-gray-50 mt-1 block">
            Last updated: February 2025
          </span>
        </div>

        <div className="flex flex-col gap-6 text-sm text-gray-60 leading-relaxed">
          <p>
            Welcome to the design services of Joseph Alexander (&quot;Studio&quot;, &quot;we&quot;, &quot;our&quot;). By engaging our design, development, or consulting services, or subscribing to our monthly plans, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <h2 className="text-lg font-semibold text-black mt-4">1. Scope of Services</h2>
          <p>
            Services encompass digital product design, UX/UI consultation, brand architecture, Framer visual development, and custom React front-end development. Work is conducted either on a fixed-scope project contract or through our monthly unlimited subscription retainer.
          </p>

          <h2 className="text-lg font-semibold text-black mt-4">2. Intellectual Property Rights</h2>
          <p>
            Upon complete payment of all agreed fees, 100% of all intellectual property rights, editable source files (Figma, code repositories, asset exports), and final deliverables are transferred unconditionally to the client. The studio reserves the right to showcase non-confidential project visuals in our portfolio and industry award submissions.
          </p>

          <h2 className="text-lg font-semibold text-black mt-4">3. Subscription & Retainer Terms</h2>
          <p>
            Monthly unlimited design plans are billed every 30 days via Stripe. Clients may pause or cancel their subscription at any time prior to the next billing cycle renewal. Pausing suspends active request queues and reserves the remaining billed days for future resumption.
          </p>

          <h2 className="text-lg font-semibold text-black mt-4">4. Revisions & Turnaround</h2>
          <p>
            Standard subscription requests receive active iterations within an average of 48 business hours. Fixed project milestones include up to three structured rounds of revisions to guarantee total satisfaction.
          </p>

          <h2 className="text-lg font-semibold text-black mt-4">5. Confidentiality & Mutual NDA</h2>
          <p>
            All client proprietary information, product roadmaps, and business data are treated with strict confidentiality. A mutual non-disclosure agreement is available upon request prior to project initiation.
          </p>
        </div>
      </Container>
    </div>
  );
}
