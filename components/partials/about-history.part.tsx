"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { workHistoryData } from "@/data/work-history.data";
import { socialLinksData } from "@/data/client-logos.data";
import { Container } from "@/components/shared/container.shared";
import { EASINGS, floatingMirrorTransition } from "@/lib/motion.config";

const BIO_PARAGRAPHS = [
  "I love turning ideas into something real through design. What started as a hobby turned into a career when I discovered how design can make things both look great and work better.",
  "I focus on creating user interfaces that serve a real purpose – making sure they're not just pretty, but actually solve problems. Whether I'm working on a mobile app or a website, my goal is to make something that feels natural and easy to use.",
  "I'm a bit of a perfectionist when it comes to the small stuff, but I think that's what makes good design great. This attention to detail helps me build strong relationships with clients, as they know I'll put the same care into their project that they would.",
];

export function AboutHistoryPart() {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedHistory = isExpanded ? workHistoryData : workHistoryData.slice(0, 3);

  return (
    <section
      id="about"
      className="w-full bg-white border-t border-[#dedede] py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      <Container className="flex flex-col gap-12 md:gap-16">

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASINGS.standard }}
          className="font-medium tracking-[-0.03em] text-black"
          style={{ fontSize: "clamp(28px,3.5vw,40px)", lineHeight: "1.05" }}
        >
          <span className="text-[#b8b8b8] block">Designing experiences</span>
          <span className="text-black block">that solve real problems.</span>
        </motion.h2>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 items-start">

          {/* Left: Portrait + Work History */}
          <div className="flex flex-col gap-8">
            {/* Portrait Card with floating badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASINGS.standard }}
              className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden border border-[#dedede] bg-[#f7f7f7]"
            >
              <Image
                src="https://framerusercontent.com/images/pKKKvDTDIMbGXt4SKNGc5PEgrkU.jpg"
                alt="Joseph Alexander"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
              {/* Floating Decorative Badge */}
              <motion.div
                animate={{ x: [0, 2, 0], y: [0, -5, 0], rotate: [0, -6, 0] }}
                transition={floatingMirrorTransition}
                className="absolute bottom-4 left-4 px-3.5 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-[#dedede] shadow-md flex items-center gap-2 text-xs font-medium text-black pointer-events-none"
              >
                <span className="w-2 h-2 rounded-full bg-[#21b30b] animate-pulse" />
                <span>Full-stack Designer</span>
              </motion.div>
            </motion.div>

            {/* Social Pills */}
            <div className="flex flex-wrap gap-2">
              {socialLinksData.slice(0, 4).map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full border border-[#dedede] bg-[#fafafa] hover:bg-[#f0f0f0] text-xs font-medium text-black transition-colors"
                >
                  {s.platform.split(" ")[0]}
                </a>
              ))}
            </div>

            {/* Expandable Work History */}
            <div className="flex flex-col gap-4 pt-4 border-t border-[#dedede]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#828282]">
                  My work history
                </span>
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-xs font-medium text-black underline underline-offset-4 hover:text-[#545454] transition-colors cursor-pointer"
                >
                  {isExpanded ? "Show less" : "Show all"}
                </button>
              </div>

              <motion.div layout className="flex flex-col divide-y divide-[#f0f0f0]">
                <AnimatePresence mode="popLayout">
                  {displayedHistory.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: EASINGS.standard }}
                      className="py-3 flex flex-col gap-0.5"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-black">{item.role}</span>
                        <span className="text-xs font-mono text-[#828282]">{item.period}</span>
                      </div>
                      <span className="text-xs text-[#545454]">
                        {item.company} · {item.location}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* Right: Bio + Signature */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASINGS.standard }}
              className="flex flex-col gap-5"
            >
              {BIO_PARAGRAPHS.map((para, i) => (
                <p
                  key={i}
                  className="text-[17px] sm:text-[18px] text-black leading-[1.5] tracking-[-0.02em]"
                  style={{ color: i === 0 ? "#000" : "#545454" }}
                >
                  {para}
                </p>
              ))}
            </motion.div>

            {/* Signature */}
            <div className="pt-6 border-t border-[#dedede] flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-[#b8b8b8] uppercase tracking-widest">
                  Signed
                </span>
                <span
                  className="text-2xl italic font-bold tracking-tight text-black"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Joseph Alexander
                </span>
              </div>
              <span className="text-xs font-mono text-[#828282]">London, United Kingdom</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
