import React from "react";
import Link from "next/link";
import { Icons } from "@/components/ui/social-icons.ui";
import { Container } from "@/components/shared/container.shared";
import { PageTransition } from "@/components/motion/page-transition.motion";

export default function PrivacyPolicyPage() {
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
              Privacy & Data
            </span>
            <h1 className="text-3xl font-medium tracking-tight text-black sm:text-4xl">
              Privacy Policy
            </h1>
            <span className="mt-1 block font-mono text-xs text-gray-50">
              Last updated: September 2026
            </span>
          </div>

          <div className="text-gray-60 flex flex-col gap-6 text-sm leading-relaxed">
            <p>
              This policy explains what personal information Soufiyan Benallal (&quot;I&quot;,
              &quot;me&quot;) receives through this website and how it is used.
            </p>

            <h2 className="mt-4 text-lg font-semibold text-black">1. Information I Receive</h2>
            <p>
              Only what you choose to send: the contact form opens your own email app, so your
              message reaches me as a normal email containing the name, email address and project
              details you entered. Booking a call through Cal.com shares the details you enter in
              the booking form. This site does not use advertising trackers.
            </p>

            <h2 className="mt-4 text-lg font-semibold text-black">2. How It Is Used</h2>
            <p>
              Solely to reply to your inquiry, prepare a proposal, schedule calls and manage any
              agreement we make. It is never sold or shared for marketing.
            </p>

            <h2 className="mt-4 text-lg font-semibold text-black">3. Third-Party Services</h2>
            <p>
              Call scheduling is provided by Cal.com, which processes booking details under its own
              privacy policy. The GitHub section of the homepage loads public repository data from
              GitHub.
            </p>

            <h2 className="mt-4 text-lg font-semibold text-black">4. Your Data</h2>
            <p>
              To ask what I hold about you, or to have your contact records deleted, email{" "}
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
