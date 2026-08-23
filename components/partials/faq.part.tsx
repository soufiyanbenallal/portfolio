"use client";

import React, { useId, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { faqsData } from "@/data/faqs.data";
import { Container } from "@/components/shared/container.shared";
import { TextReveal } from "@/components/motion/text-reveal.motion";
import { Reveal } from "@/components/motion/reveal.motion";
import { Tilt3D } from "@/components/motion/tilt-3d.motion";
import { Magnetic } from "@/components/motion/magnetic.motion";
import { usePortfolioStore } from "@/lib/portfolio.store";
import { DURATIONS, EASINGS, SPRINGS } from "@/lib/motion.config";

/**
 * FAQ.
 *
 * The accordion animates height with a spring rather than a tween, so a
 * long answer and a short one both feel like the same physical hinge — a
 * fixed duration makes long answers crawl and short ones snap.
 *
 * `aria-expanded` + `aria-controls` and a real `<button>` do the semantic
 * work; the animation is layered on top and never gates the content.
 */
export function FaqPart() {
  const [openId, setOpenId] = useState<string>(faqsData[0]?.id ?? "");
  const openBooking = usePortfolioStore((state) => state.openBooking);
  const panelPrefix = useId();

  return (
    <div className="w-full">
      <Container className="py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          {/* ── Questions ── */}
          <div className="flex flex-col gap-10">
            <TextReveal
              as="h2"
              by="word"
              text="Your questions answered."
              className="text-h2-sm text-black"
            />

            <div className="flex flex-col gap-4">
              {faqsData.map((item, index) => {
                const isOpen = openId === item.id;
                const panelId = `${panelPrefix}-${item.id}`;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: DURATIONS.base,
                      delay: index * 0.06,
                      ease: EASINGS.entrance,
                    }}
                    className="overflow-hidden rounded-2xl border border-gray-20 bg-white card-shadow"
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenId(isOpen ? "" : item.id)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="group flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <span className="flex items-center gap-3">
                          <span className="shrink-0 font-mono text-xs text-gray-40">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm font-medium leading-snug text-black">
                            {item.question}
                          </span>
                        </span>

                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-30 transition-all duration-300 group-hover:border-black group-hover:bg-black">
                          <motion.span
                            animate={{ rotate: isOpen ? 135 : 0 }}
                            transition={{
                              duration: DURATIONS.fast,
                              ease: EASINGS.overshoot,
                            }}
                            className="-mt-px block text-lg leading-none text-black group-hover:text-white"
                          >
                            +
                          </motion.span>
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          id={panelId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={SPRINGS.accordion}
                          className="overflow-hidden"
                        >
                          <motion.p
                            initial={{ y: 8 }}
                            animate={{ y: 0 }}
                            exit={{ y: 4 }}
                            transition={{ duration: DURATIONS.fast }}
                            className="border-t border-gray-20 px-5 pb-5 pt-4 text-sm leading-[1.6] text-gray-60"
                          >
                            {item.answer}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Sticky booking card ── */}
          <div className="mt-8 lg:sticky lg:top-[88px] lg:mt-[72px]">
            <Reveal preset="card3D" delay={0.15}>
              <Tilt3D intensity={6} lift={12} perspective={900}>
                <div
                  className="flex flex-col gap-6 rounded-2xl bg-black p-8 text-white"
                  style={{
                    boxShadow:
                      "0 2px 4px rgba(0,0,0,0.06), 0 8px 20px rgba(0,0,0,0.12), 0 20px 40px rgba(0,0,0,0.1)",
                  }}
                >
                  <span
                    className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/20"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <Image
                      src="https://framerusercontent.com/images/pKKKvDTDIMbGXt4SKNGc5PEgrkU.jpg"
                      alt="Joseph Alexander"
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </span>

                  <div
                    className="flex flex-col gap-3"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    <p className="text-[17px] font-medium leading-snug tracking-[-0.02em]">
                      Still not sure?{" "}
                      <span className="text-gray-50">
                        Book a free discovery call.
                      </span>
                    </p>
                    <p className="text-sm leading-relaxed text-gray-60">
                      Learn more about how I work and how I can help you and your
                      business take the next step.
                    </p>
                  </div>

                  <Magnetic strength={0.2} fullWidth>
                    <button
                      type="button"
                      onClick={openBooking}
                      data-cursor="grow"
                      className="w-full cursor-pointer rounded-full bg-white py-3 text-sm font-medium tracking-tight text-black transition-colors duration-200 hover:bg-gray-20"
                    >
                      Schedule Now
                    </button>
                  </Magnetic>

                  <span className="text-label text-gray-60">
                    Powered by Cal.com
                  </span>
                </div>
              </Tilt3D>
            </Reveal>
          </div>
        </div>
      </Container>
    </div>
  );
}
