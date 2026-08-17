"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { faqsData as faqData } from "@/data/faqs.data";
import Image from "next/image";
import { Container } from "@/components/shared/container.shared";
import { usePortfolioStore } from "@/lib/portfolio.store";
import { EASINGS } from "@/lib/motion.config";

export function FaqPart() {
  const [openId, setOpenId] = useState<string>(faqData[0]?.id ?? "");
  const openBooking = usePortfolioStore((s) => s.openBooking);

  return (
    <section
      id="faq"
      className="w-full bg-white border-t border-[#dedede] py-16 md:py-24 lg:py-32"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12 items-start">

          {/* ── Left: FAQ List ── */}
          <div className="flex flex-col gap-10">
            <motion.h2
              initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASINGS.standard }}
              className="font-medium tracking-[-0.03em] text-black"
              style={{ fontSize: "clamp(24px,3vw,32px)", lineHeight: "1.15" }}
            >
              Your questions answered.
            </motion.h2>

            <div className="flex flex-col gap-4">
              {faqData.map((item, i) => {
                const isOpen = openId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: EASINGS.standard }}
                    className="rounded-2xl border border-[#f0f0f0] bg-white overflow-hidden"
                    style={{
                      boxShadow: "0 1px 2px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.03)",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? "" : item.id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer group"
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-xs font-mono text-[#b8b8b8] shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-medium text-black leading-snug">
                          {item.question}
                        </span>
                      </span>
                      <span
                        className="w-6 h-6 rounded-full border border-[#dedede] flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-black group-hover:border-black"
                      >
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.3, ease: EASINGS.standard }}
                          className="block text-black group-hover:text-white text-lg leading-none mt-[-1px]"
                        >
                          +
                        </motion.span>
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASINGS.standard }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-0 text-sm text-[#545454] leading-[1.6] border-t border-[#f0f0f0]">
                            <p className="pt-4">{item.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Right: Sticky Discovery Call Card ── */}
          <div className="lg:sticky lg:top-[88px] mt-8 lg:mt-[72px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASINGS.standard }}
              className="rounded-2xl bg-black text-white p-8 flex flex-col gap-6"
              style={{
                boxShadow:
                  "0 2px 4px rgba(0,0,0,0.06), 0 8px 20px rgba(0,0,0,0.12), 0 20px 40px rgba(0,0,0,0.1)",
              }}
            >
              {/* Profile image */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                <Image
                  src="https://framerusercontent.com/images/pKKKvDTDIMbGXt4SKNGc5PEgrkU.jpg"
                  alt="Joseph Alexander"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-[17px] font-medium leading-snug tracking-[-0.02em]">
                  Still not sure?{" "}
                  <span className="text-[#828282]">
                    Book a free discovery call.
                  </span>
                </p>
                <p className="text-sm text-[#545454] leading-relaxed">
                  Learn more about how I work and how I can help you and your
                  business take the next step.
                </p>
              </div>

              <button
                type="button"
                onClick={openBooking}
                className="w-full py-3 rounded-full bg-white text-black text-sm font-medium tracking-tight cursor-pointer transition-all duration-200 hover:bg-[#f0f0f0] active:scale-[0.98]"
              >
                Schedule Now
              </button>

              {/* Scheduling badge */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#545454] uppercase tracking-widest">
                  Powered by Cal.com
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
}
