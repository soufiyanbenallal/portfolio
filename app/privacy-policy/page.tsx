import React from "react";
import Link from "next/link";
import { Icons } from "@/components/ui/social-icons.ui";
import { Container } from "@/components/shared/container.shared";

export default function PrivacyPolicyPage() {
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
            Privacy & Data
          </span>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-black">
            Privacy Policy
          </h1>
          <span className="text-xs font-mono text-gray-50 mt-1 block">
            Last updated: February 2025
          </span>
        </div>

        <div className="flex flex-col gap-6 text-sm text-gray-60 leading-relaxed">
          <p>
            Your privacy is fundamental to how we work. This policy describes how Joseph Alexander collects, uses, and protects personal information submitted through this website.
          </p>

          <h2 className="text-lg font-semibold text-black mt-4">1. Information We Collect</h2>
          <p>
            We only collect personal information you explicitly provide to us via our contact form or discovery call scheduler (such as name, email address, company name, and project requirements). We do not use third-party behavioral ad trackers.
          </p>

          <h2 className="text-lg font-semibold text-black mt-4">2. How We Use Information</h2>
          <p>
            Submitted contact details are strictly utilized to respond to your project inquiries, prepare proposals, schedule discovery calls, and manage active service agreements.
          </p>

          <h2 className="text-lg font-semibold text-black mt-4">3. Security & Payments</h2>
          <p>
            All subscription payments are securely processed through Stripe. We do not store or process raw credit card numbers on our servers.
          </p>

          <h2 className="text-lg font-semibold text-black mt-4">4. Contact Inquiries</h2>
          <p>
            If you have any questions regarding your data or wish to request deletion of your contact records, please email <a href="mailto:joseph@launchnow.design" className="underline text-black">joseph@launchnow.design</a>.
          </p>
        </div>
      </Container>
    </div>
  );
}
