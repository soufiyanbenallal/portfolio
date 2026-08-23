"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { AvailabilityBadgeUi } from "@/components/ui/badge.ui";
import { ClientTickerShared } from "@/components/shared/client-ticker.shared";
import { HeroProjectStackPart } from "@/components/partials/hero-project-stack.part";
import { Container } from "@/components/shared/container.shared";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import { usePortfolioStore } from "@/lib/portfolio.store";
import { EASINGS } from "@/lib/motion.config";

export function HeroPart() {
  const openBooking = usePortfolioStore((state) => state.openBooking);

  return (
    <section
      id="hero"
      className="relative w-full select-none overflow-visible"
    >
      <Container className="pt-32 md:pt-36 pb-14 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center min-h-105">

          {/* ── Left Column: Intro Copy & Me+You CTA ── */}
          <div className="flex flex-col gap-6 max-w-125 z-10">

            {/* Availability Pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASINGS.standard }}
            >
              <AvailabilityBadgeUi text="Available for August'25" />
            </motion.div>

            {/* H1 Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASINGS.standard }}
              className="font-medium tracking-[-0.03em] leading-[0.95]"
              style={{ fontSize: "clamp(42px, 5.5vw, 72px)" }}
            >
              <span className="text-[#828282] block">Design that</span>
              <span className="text-black block min-h-[1.1em]">
                delivers{" "}
                <AnimatedTextCycle
                  words={["results.", "growth.", "impact.", "sales."]}
                  interval={3500}
                  className="text-black font-medium"
                />
              </span>
            </motion.h1>

            {/* Body Description */}
            <motion.p
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASINGS.standard }}
              className="text-[16px] sm:text-[18px] leading-[1.4] tracking-[-0.02em] text-[#545454] max-w-[390px]"
            >
              <strong className="text-black font-semibold">
                Strategic design that drives growth, not just looks good.
              </strong>{" "}
              I create everything your brand needs to attract customers and turn
              them into sales.
            </motion.p>

            {/* "Me + You" CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: EASINGS.standard }}
              className="flex flex-col items-start gap-2 pt-2"
            >
              <button
                type="button"
                onClick={openBooking}
                className="group inline-flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-black text-white text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-[#1a1a1a] active:scale-[0.98]"
                style={{
                  boxShadow:
                    "inset 0px 1.5px 3px 0px rgba(255,255,255,0.35), 0px 2px 6px rgba(0,0,0,0.15), 0px 10px 20px rgba(0,0,0,0.1)",
                }}
              >
                {/* Joseph Avatar */}
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/20 shrink-0">
                  <Image
                    src="https://framerusercontent.com/images/pKKKvDTDIMbGXt4SKNGc5PEgrkU.jpg"
                    alt="Joseph Alexander"
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                </div>

                {/* Plus symbol */}
                <span className="text-xs font-semibold text-white/70 leading-none">
                  +
                </span>

                {/* You Badge */}
                <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-bold tracking-tight shrink-0 shadow-xs">
                  You
                </div>

                {/* Label */}
                <span className="text-sm font-medium tracking-tight text-white whitespace-nowrap pl-0.5">
                  Book a call with me
                </span>
              </button>

              {/* Indicator dot */}
              <div className="w-2 h-2 rounded-full bg-black ml-6 opacity-80" />
            </motion.div>

            {/* Mobile-only static project stack preview */}
            <HeroProjectStackPart isMobileOnly={true} />
          </div>

          {/* ── Right Column: Bounding area for desktop scroll-driven card transition ── */}
          <div className="hidden md:flex items-center justify-end relative">
            <div className="relative w-full max-w-[500px] lg:max-w-[560px] h-[380px] lg:h-[440px] pointer-events-none" />
          </div>

        </div>
      </Container>

      {/* Client Logo Strip */}
      <ClientTickerShared withHappyClientsCluster={true} />
    </section>
  );
}
