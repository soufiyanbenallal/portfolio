import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { quotesData, getQuoteBySlug } from "@/data/quotes.data";
import { Icons } from "@/components/ui/social-icons.ui";
import { ButtonUi } from "@/components/ui/button.ui";
import { TagBadgeUi } from "@/components/ui/badge.ui";
import { Container } from "@/components/shared/container.shared";

export function generateStaticParams() {
  return quotesData.map((quote) => ({
    slug: quote.slug,
  }));
}

export default async function QuoteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const quote = getQuoteBySlug(slug);

  if (!quote) {
    notFound();
  }

  return (
    <div className="w-full pt-32 pb-24">
      <Container className="max-w-[840px] flex flex-col gap-10">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-gray-60 hover:text-black transition-colors"
          >
            <Icons.ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </div>

        {/* Quote Document Card */}
        <div className="rounded-[28px] bg-white border border-gray-30 p-8 sm:p-12 card-shadow flex flex-col gap-8">
          {/* Header & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-30 pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-gray-50 block mb-1">
                Project Proposal & Estimate
              </span>
              <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-black">
                {quote.projectTitle}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-50">{quote.quoteNumber}</span>
              <TagBadgeUi variant={quote.status === "Sent" ? "dark" : "light"}>
                {quote.status}
              </TagBadgeUi>
            </div>
          </div>

          {/* Client & Date Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-gray-5 border border-gray-20 text-xs">
            <div>
              <span className="text-gray-40 block mb-0.5">Prepared For</span>
              <span className="font-semibold text-black block">{quote.clientName}</span>
              <span className="text-gray-50">{quote.clientCompany}</span>
            </div>
            <div>
              <span className="text-gray-40 block mb-0.5">Issue Date</span>
              <span className="font-semibold text-black block">{quote.issueDate}</span>
            </div>
            <div>
              <span className="text-gray-40 block mb-0.5">Valid Until</span>
              <span className="font-semibold text-black block">{quote.validUntil}</span>
            </div>
            <div>
              <span className="text-gray-40 block mb-0.5">Est. Timeline</span>
              <span className="font-semibold text-black block">{quote.estimatedTimeline}</span>
            </div>
          </div>

          {/* Summary */}
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-gray-50 block mb-2">
              Scope Summary
            </span>
            <p className="text-sm text-gray-60 leading-relaxed">{quote.summary}</p>
          </div>

          {/* Deliverables / Line Items Table */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-50 block">
              Deliverables & Milestones
            </span>
            <div className="rounded-xl border border-gray-30 overflow-hidden divide-y divide-gray-20">
              {quote.lineItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white"
                >
                  <div className="flex flex-col gap-1 max-w-lg">
                    <span className="text-sm font-semibold text-black">{item.title}</span>
                    <span className="text-xs text-gray-50 leading-relaxed">
                      {item.description}
                    </span>
                    <span className="text-[11px] font-mono text-gray-40 mt-1">
                      Timeline: {item.timeline}
                    </span>
                  </div>
                  <div className="text-right sm:text-right shrink-0">
                    <span className="text-base font-semibold text-black font-price">
                      ${item.unitPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total & Pricing Breakdown */}
          <div className="flex flex-col items-end gap-2 pt-4 border-t border-gray-30">
            <div className="flex items-center justify-between w-full sm:w-64 text-xs text-gray-60">
              <span>Subtotal:</span>
              <span className="font-mono text-black font-medium">${quote.subtotal.toLocaleString()}</span>
            </div>
            {quote.discount && (
              <div className="flex items-center justify-between w-full sm:w-64 text-xs text-availability-green">
                <span>Partner Discount:</span>
                <span className="font-mono font-medium">-${quote.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex items-center justify-between w-full sm:w-64 text-base font-semibold text-black pt-2 border-t border-gray-20">
              <span>Total Investment:</span>
              <span className="text-2xl font-bold font-price">${quote.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Terms & Conditions */}
          <div className="flex flex-col gap-3 p-5 rounded-2xl bg-gray-5 border border-gray-20 text-xs">
            <span className="font-semibold text-black">Terms & Payment Schedule:</span>
            <p className="text-gray-60">{quote.paymentTerms}</p>
            <ul className="list-disc pl-4 text-gray-60 space-y-1 mt-1">
              {quote.terms.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          {/* Action CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-30">
            <span className="text-xs text-gray-50">
              Questions? Reply directly to <a href={`mailto:${quote.clientEmail}`} className="underline text-black">joseph@launchnow.design</a>
            </span>
            <ButtonUi variant="primary" size="lg" className="w-full sm:w-auto h-12 px-8">
              Accept Proposal & Proceed
            </ButtonUi>
          </div>
        </div>
      </Container>
    </div>
  );
}
