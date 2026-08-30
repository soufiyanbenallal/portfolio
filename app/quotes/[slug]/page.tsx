import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { quotesData, getQuoteBySlug } from "@/data/quotes.data";
import { Icons } from "@/components/ui/social-icons.ui";
import { ButtonUi } from "@/components/ui/button.ui";
import { TagBadgeUi } from "@/components/ui/badge.ui";
import { Container } from "@/components/shared/container.shared";
import { PageTransition } from "@/components/motion/page-transition.motion";

export function generateStaticParams() {
  return quotesData.map((quote) => ({
    slug: quote.slug,
  }));
}

export default async function QuoteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quote = getQuoteBySlug(slug);

  if (!quote) {
    notFound();
  }

  return (
    <PageTransition>
      <div className="w-full">
        <Container className="flex max-w-[840px] flex-col gap-10 pt-32 pb-24">
          {/* Back Link */}
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

          {/* Quote Document Card */}
          <div className="border-gray-30 card-shadow flex flex-col gap-8 rounded-[28px] border bg-white p-8 sm:p-12">
            {/* Header & Status */}
            <div className="border-gray-30 flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center">
              <div>
                <span className="mb-1 block font-mono text-xs tracking-widest text-gray-50 uppercase">
                  Project Proposal & Estimate
                </span>
                <h1 className="text-2xl font-medium tracking-tight text-black sm:text-3xl">
                  {quote.projectTitle}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-gray-50">{quote.quoteNumber}</span>
                <TagBadgeUi variant={quote.status === "Sent" ? "dark" : "light"}>
                  {quote.status}
                </TagBadgeUi>
              </div>
            </div>

            {/* Client & Date Details */}
            <div className="bg-gray-5 border-gray-20 grid grid-cols-2 gap-4 rounded-xl border p-4 text-xs sm:grid-cols-4">
              <div>
                <span className="text-gray-40 mb-0.5 block">Prepared For</span>
                <span className="block font-semibold text-black">{quote.clientName}</span>
                <span className="text-gray-50">{quote.clientCompany}</span>
              </div>
              <div>
                <span className="text-gray-40 mb-0.5 block">Issue Date</span>
                <span className="block font-semibold text-black">{quote.issueDate}</span>
              </div>
              <div>
                <span className="text-gray-40 mb-0.5 block">Valid Until</span>
                <span className="block font-semibold text-black">{quote.validUntil}</span>
              </div>
              <div>
                <span className="text-gray-40 mb-0.5 block">Est. Timeline</span>
                <span className="block font-semibold text-black">{quote.estimatedTimeline}</span>
              </div>
            </div>

            {/* Summary */}
            <div>
              <span className="mb-2 block font-mono text-xs tracking-widest text-gray-50 uppercase">
                Scope Summary
              </span>
              <p className="text-gray-60 text-sm leading-relaxed">{quote.summary}</p>
            </div>

            {/* Deliverables / Line Items Table */}
            <div className="flex flex-col gap-3">
              <span className="block font-mono text-xs tracking-widest text-gray-50 uppercase">
                Deliverables & Milestones
              </span>
              <div className="border-gray-30 divide-gray-20 divide-y overflow-hidden rounded-xl border">
                {quote.lineItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between gap-4 bg-white p-4 sm:flex-row sm:items-center sm:p-5"
                  >
                    <div className="flex max-w-lg flex-col gap-1">
                      <span className="text-sm font-semibold text-black">{item.title}</span>
                      <span className="text-xs leading-relaxed text-gray-50">
                        {item.description}
                      </span>
                      <span className="text-gray-40 mt-1 font-mono text-[11px]">
                        Timeline: {item.timeline}
                      </span>
                    </div>
                    <div className="shrink-0 text-right sm:text-right">
                      <span className="font-price text-base font-semibold text-black">
                        ${item.unitPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total & Pricing Breakdown */}
            <div className="border-gray-30 flex flex-col items-end gap-2 border-t pt-4">
              <div className="text-gray-60 flex w-full items-center justify-between text-xs sm:w-64">
                <span>Subtotal:</span>
                <span className="font-mono font-medium text-black">
                  ${quote.subtotal.toLocaleString()}
                </span>
              </div>
              {quote.discount && (
                <div className="text-availability-green flex w-full items-center justify-between text-xs sm:w-64">
                  <span>Partner Discount:</span>
                  <span className="font-mono font-medium">-${quote.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="border-gray-20 flex w-full items-center justify-between border-t pt-2 text-base font-semibold text-black sm:w-64">
                <span>Total Investment:</span>
                <span className="font-price text-2xl font-bold">
                  ${quote.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payment Terms & Conditions */}
            <div className="bg-gray-5 border-gray-20 flex flex-col gap-3 rounded-2xl border p-5 text-xs">
              <span className="font-semibold text-black">Terms & Payment Schedule:</span>
              <p className="text-gray-60">{quote.paymentTerms}</p>
              <ul className="text-gray-60 mt-1 list-disc space-y-1 pl-4">
                {quote.terms.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>

            {/* Action CTA */}
            <div className="border-gray-30 flex flex-col items-center justify-between gap-4 border-t pt-4 sm:flex-row">
              <span className="text-xs text-gray-50">
                Questions? Reply directly to{" "}
                <a href="mailto:benallalsoufiane1@gmail.com" className="text-black underline">
                  benallalsoufiane1@gmail.com
                </a>
              </span>
              <ButtonUi variant="primary" size="lg" className="h-12 w-full px-8 sm:w-auto">
                Accept Proposal & Proceed
              </ButtonUi>
            </div>
          </div>
        </Container>
      </div>
    </PageTransition>
  );
}
