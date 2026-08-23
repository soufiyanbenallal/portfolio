"use client";

import React from "react";
import { motion } from "motion/react";
import { Container } from "@/components/shared/container.shared";
import { EASINGS } from "@/lib/motion.config";

const STEPS = [
  {
    number: "01",
    title: "Subscribe",
    desc: "Subscribe via stripe & start requesting through my trello board.",
  },
  {
    number: "02",
    title: "Request",
    desc: "Request whatever service I offer, from branding to web design.",
  },
  {
    number: "03",
    title: "Receive",
    desc: "Receive your design within 48 hours on average.",
  },
];

const UNLIMITED_FEATURES = [
  "No contracts or commitments",
  "Pause or cancel anytime",
  "Multiple Brands",
  "Unlimited requests",
  "Avg 48 hour turnaround",
  "Framer development",
];

const SINGLE_FEATURES = [
  "Clearly defined scope",
  "Fixed timeline",
  "3 revision rounds",
  "Milestone updates",
];

export function PricingPart() {
  return (
    <section
      id="pricing"
      className="w-full bg-white border-t border-[#dedede]"
    >
      <Container className="flex flex-col gap-16 md:gap-24 py-16 md:py-24 lg:py-32">

        {/* Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 items-end">
          <motion.h2
            initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASINGS.standard }}
            className="font-medium tracking-[-0.03em] text-black"
            style={{ fontSize: "clamp(28px,3.5vw,40px)", lineHeight: "1.05" }}
          >
            Simple pricing.
            <br />
            Standout designs.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASINGS.standard }}
            className="text-sm sm:text-base leading-relaxed text-[#545454]"
          >
            Clear costs, no hidden fees. Select from monthly subscriptions or
            individual project rates.
          </motion.p>
        </div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASINGS.standard }}
              className="flex flex-col gap-3"
            >
              <span className="text-xs font-mono text-[#b8b8b8]">{step.number}</span>
              <span className="text-base font-semibold text-black tracking-tight">
                {step.title}
              </span>
              <p className="text-sm text-[#828282] leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Pricing Cards Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASINGS.standard }}
          className="rounded-2xl bg-[#f0f0f0] p-1.5 flex flex-col gap-1.5"
        >
          {/* Top Row: Two Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            {/* Unlimited Design Card */}
            <div className="rounded-xl bg-black text-white p-7 flex flex-col gap-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#21b30b] animate-pulse" />
                    <span className="text-xs font-mono text-[#828282] uppercase tracking-widest">
                      Slots available
                    </span>
                  </div>
                  <h3 className="text-xl font-medium text-white tracking-tight">
                    Unlimited Design
                  </h3>
                  <p className="text-sm text-[#545454]">
                    One flat monthly rate for unlimited design requests.
                    Ideal for ongoing design requirements.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span
                  className="font-semibold text-white tracking-[-0.03em]"
                  style={{ fontFamily: "Inter Display, Inter, sans-serif", fontSize: "clamp(32px,3vw,40px)", lineHeight: "1.1" }}
                >
                  $8,000
                </span>
                <span className="text-sm text-[#545454]">/ month</span>
              </div>

              <ul className="flex flex-col gap-2.5">
                {UNLIMITED_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#828282]">
                    <span className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                      <span className="text-[10px] text-white">✓</span>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="w-full py-3 rounded-full bg-white text-black text-sm font-medium tracking-tight cursor-pointer transition-all duration-200 hover:bg-[#f0f0f0] active:scale-[0.98] mt-auto"
              >
                Hire me today
              </button>
            </div>

            {/* Right Info Card */}
            <div className="rounded-xl bg-white border border-[#dedede] p-7 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-3">
                <p className="text-sm text-[#828282] leading-relaxed">
                  Subscription design services
                </p>
                <p className="text-2xl font-medium text-black tracking-tight leading-snug">
                  for brands who move fast.
                </p>
              </div>
              <p className="text-sm text-[#545454] leading-relaxed">
                Skip the agency markup and work directly with an experienced
                designer.
              </p>
            </div>
          </div>

          {/* Bottom Row: Single Project Card */}
          <div className="rounded-xl bg-white border border-[#dedede] p-7">
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-start">
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-medium text-black tracking-tight">
                  Single Project
                </h3>
                <p className="text-sm text-[#828282] leading-relaxed">
                  Comprehensive design services for any project scope.
                  Ideal for one-time design needs or individual tasks.
                </p>
                <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                  {SINGLE_FEATURES.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#545454]">
                      <span className="w-1 h-1 rounded-full bg-[#b8b8b8]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex md:justify-end">
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-full border border-[#dedede] text-sm font-medium text-black cursor-pointer hover:bg-[#f7f7f7] transition-colors"
                >
                  Get quote
                </button>
              </div>
            </div>
          </div>
        </motion.div>

      </Container>
    </section>
  );
}
