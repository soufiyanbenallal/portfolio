"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
import { useReducedMotionSafe } from "@/hooks/use-media-query.hook";
import { AvailabilityBadgeUi } from "@/components/ui/badge.ui";
import { ClientTickerShared } from "@/components/shared/client-ticker.shared";
import { HeroDeck } from "@/components/partials/hero-deck.part";
import { Container } from "@/components/shared/container.shared";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import { TextReveal } from "@/components/motion/text-reveal.motion";
import { Magnetic } from "@/components/motion/magnetic.motion";
import { usePortfolioStore } from "@/lib/portfolio.store";
import { DURATIONS, EASINGS, SPRINGS, SCROLL_OFFSETS } from "@/lib/motion.config";

/**
 * Hero.
 *
 * The copy column and the 3D deck leave on different curves as the page
 * scrolls: the text recedes straight back in Z while the deck peels apart and
 * flies out. Two exits at two speeds is what gives the hand-off to the work
 * section depth, instead of the whole hero sliding away as one plate.
 */
export function HeroPart() {
  const sectionRef = useRef<HTMLElement>(null);
  const openBooking = usePortfolioStore((state) => state.openBooking);
  const prefersReducedMotion = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: SCROLL_OFFSETS.leaving,
  });
  const progress = useSpring(scrollYProgress, SPRINGS.scroll);

  const copyY = useTransform(progress, [0, 1], [0, -90]);
  const copyScale = useTransform(progress, [0, 1], [1, 0.94]);
  const copyOpacity = useTransform(progress, [0, 0.75], [1, 0]);
  const copyBlur = useTransform(progress, [0, 0.8], [0, 6]);
  const copyFilter = useTransform(copyBlur, (value) =>
    value < 0.05 ? "none" : `blur(${value.toFixed(2)}px)`,
  );

  const staticStyle = { y: 0, scale: 1, opacity: 1, filter: "none" };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full select-none overflow-visible"
    >
      <Container className="pb-14 pt-32 md:pb-20 md:pt-36">
        <div className="grid min-h-105 grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-8">
          {/* ── Copy column ── */}
          <motion.div
            // No max-width: the grid column already bounds this, and clamping
            // it to 500px forces the rotating word onto a third line.
            className="z-10 flex flex-col gap-6"
            style={
              prefersReducedMotion
                ? staticStyle
                : {
                    y: copyY,
                    scale: copyScale,
                    opacity: copyOpacity,
                    filter: copyFilter,
                    transformOrigin: "0% 50%",
                  }
            }
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DURATIONS.slow,
                delay: 0.1,
                ease: EASINGS.entrance,
              }}
            >
              <AvailabilityBadgeUi text="Available for August'25" />
            </motion.div>

            <h1
              className="font-medium leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: "clamp(42px, 5.5vw, 72px)" }}
            >
              <TextReveal
                as="span"
                by="word"
                text="Design that"
                trigger="mount"
                delay={0.18}
                className="block text-gray-50"
              />
              <span className="block min-h-[1.1em] text-black">
                <TextReveal
                  as="span"
                  by="word"
                  text="delivers"
                  trigger="mount"
                  delay={0.32}
                  className="inline-block pr-[0.25em]"
                />
                <AnimatedTextCycle
                  words={["results.", "growth.", "impact.", "sales."]}
                  interval={3200}
                  className="font-medium text-black"
                />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: DURATIONS.slower,
                delay: 0.55,
                ease: EASINGS.entrance,
              }}
              className="max-w-[390px] text-[16px] leading-[1.4] tracking-[-0.02em] text-gray-60 sm:text-[18px]"
            >
              <strong className="font-semibold text-black">
                Strategic design that drives growth, not just looks good.
              </strong>{" "}
              I create everything your brand needs to attract customers and turn
              them into sales.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DURATIONS.slow,
                delay: 0.7,
                ease: EASINGS.entrance,
              }}
              className="flex flex-col items-start gap-2 pt-2"
            >
              <Magnetic strength={0.28} innerStrength={0.12}>
                <button
                  type="button"
                  onClick={openBooking}
                  data-cursor="grow"
                  className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-black py-2 pl-2 pr-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#1a1a1a]"
                  style={{
                    boxShadow:
                      "inset 0 1.5px 3px rgba(255,255,255,0.35), 0 2px 6px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-white/20">
                    <Image
                      src="https://framerusercontent.com/images/pKKKvDTDIMbGXt4SKNGc5PEgrkU.jpg"
                      alt="Joseph Alexander"
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  </span>

                  <span className="text-xs font-semibold leading-none text-white/70">
                    +
                  </span>

                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-bold tracking-tight text-black shadow-xs">
                    You
                  </span>

                  <span className="whitespace-nowrap pl-0.5 text-sm font-medium tracking-tight text-white">
                    Book a call with me
                  </span>
                </button>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* ── Deck column. One instance: it picks its own desktop/mobile
                 presentation, and the single-column grid drops it under the
                 copy on small screens. ── */}
          <div className="relative flex items-center justify-end">
            <HeroDeck sectionRef={sectionRef} />
          </div>
        </div>
      </Container>

      <ClientTickerShared withHappyClientsCluster={true} />
    </section>
  );
}
