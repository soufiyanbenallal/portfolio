import React from "react";
import Link from "next/link";
import { Icons } from "@/components/ui/social-icons.ui";
import { Container } from "@/components/shared/container.shared";
import { PageTransition } from "@/components/motion/page-transition.motion";

export default function PrivacyPolicyPage() {
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
              Privacy & Data
            </span>
            <h1 className="text-3xl font-medium tracking-tight text-black sm:text-4xl">
              Privacy Policy
            </h1>
            <span className="mt-1 block font-mono text-xs text-gray-50">
              Last updated: February 2025
            </span>
          </div>

          <div className="text-gray-60 flex flex-col gap-6 text-sm leading-relaxed">
            <p>
              Your privacy is fundamental to how we work. This policy describes how Joseph Alexander
              collects, uses, and protects personal information submitted through this website.
            </p>

            <h2 className="mt-4 text-lg font-semibold text-black">1. Information We Collect</h2>
            <p>
              We only collect personal information you explicitly provide to us via our contact form
              or discovery call scheduler (such as name, email address, company name, and project
              requirements). We do not use third-party behavioral ad trackers.
            </p>

            <h2 className="mt-4 text-lg font-semibold text-black">2. How We Use Information</h2>
            <p>
              Submitted contact details are strictly utilized to respond to your project inquiries,
              prepare proposals, schedule discovery calls, and manage active service agreements.
            </p>

            <h2 className="mt-4 text-lg font-semibold text-black">3. Security & Payments</h2>
            <p>
              All subscription payments are securely processed through Stripe. We do not store or
              process raw credit card numbers on our servers.
            </p>

            <h2 className="mt-4 text-lg font-semibold text-black">4. Contact Inquiries</h2>
            <p>
              If you have any questions regarding your data or wish to request deletion of your
              contact records, please email{" "}
              <a href="mailto:joseph@launchnow.design" className="text-black underline">
                joseph@launchnow.design
              </a>
              .
            </p>
          </div>
        </Container>
      </div>
    </PageTransition>
  );
}
