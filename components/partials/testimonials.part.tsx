"use client";

import React from "react";
import { motion } from "motion/react";
import { testimonialsData } from "@/data/testimonials.data";
import { Icons } from "@/components/ui/social-icons.ui";
import Image from "next/image";
import { Container } from "@/components/shared/container.shared";
import { EASINGS, getTestimonialStagger } from "@/lib/motion.config";

const happyClientAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80",
];

export function TestimonialsPart() {
  return (
    <section className="w-full bg-white border-t border-[#dedede] py-16 md:py-24 lg:py-32 overflow-hidden">
      <Container className="flex flex-col gap-12 md:gap-16">

        {/* Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASINGS.standard }}
            className="font-medium tracking-[-0.03em] text-black max-w-[460px]"
            style={{ fontSize: "clamp(24px,3vw,32px)", lineHeight: "1.15" }}
          >
            Hear from what my clients have to say.
          </motion.h2>

          {/* Happy Clients Cluster */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 shrink-0"
          >
            <div className="flex -space-x-2.5">
              {happyClientAvatars.map((src, i) => (
                <div
                  key={i}
                  className="relative w-8 h-8 rounded-full ring-2 ring-white overflow-hidden bg-[#f0f0f0]"
                >
                  <Image src={src} alt="" fill sizes="32px" className="object-cover" />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Icons.Star key={i} className="w-3 h-3 text-black" />
                ))}
              </div>
              <span className="text-[11px] font-semibold text-black whitespace-nowrap mt-0.5">
                99+ Happy clients
              </span>
            </div>
          </motion.div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonialsData.slice(0, 6).map((t, i) => {
            const anim = getTestimonialStagger(i);
            return (
              <motion.div
                key={t.id}
                initial={anim.initial}
                whileInView={anim.animate}
                viewport={{ once: true, margin: "-40px" }}
                className="flex flex-col justify-between rounded-2xl border border-[#dedede] bg-white p-6 min-h-[280px]"
                style={{
                  boxShadow: "0 1px 2px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.03)",
                }}
              >
                <blockquote className="text-sm text-[#2b2b2b] leading-[1.65] flex-1">
                  <span className="text-[#b8b8b8] text-2xl leading-none mr-1">&ldquo;</span>
                  {t.quote}
                  <span className="text-[#b8b8b8] text-2xl leading-none ml-0.5">&rdquo;</span>
                </blockquote>

                <footer className="flex items-center gap-3 mt-6 pt-5 border-t border-[#f0f0f0]">
                  {t.avatar && (
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#dedede] shrink-0">
                      <Image
                        src={t.avatar}
                        alt={t.author}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-black">{t.author}</span>
                    <span className="text-xs text-[#828282]">{t.role} at {t.company}</span>
                  </div>
                </footer>

              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
