"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/shared/container.shared";
import { EASINGS } from "@/lib/motion.config";

const TECH_STACK = [
  { name: "Figma", icon: "https://framerusercontent.com/images/qtdLa7QbKqPky8NoUcgNPzcmgCU.png" },
  { name: "Framer", icon: "https://framerusercontent.com/images/bwCVICcrKWXkOTrVdIrYz2EsNc.png" },
  { name: "Webflow", icon: null },
  { name: "Rive", icon: null },
  { name: "Blender", icon: null },
  { name: "Trello", icon: null },
  { name: "ChatGPT", icon: null },
  { name: "Claude", icon: null },
];

const SERVICES = [
  { label: "Framer Development", emphasis: true },
  { label: "Brand Design", emphasis: true },
  { label: "Web Apps", emphasis: true },
  { label: "Landing Pages", emphasis: true },
  { label: "Motion Graphics", emphasis: true },
  { label: "3D Design", emphasis: false },
  { label: "UX / UI Consultation", emphasis: false },
];

export function ServicesPart() {
  return (
    <section
      id="services"
      className="w-full bg-white border-t border-[#dedede] overflow-hidden"
    >
      <Container className="py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16 items-start">

          {/* ── Left: H2 + Tech Stack ── */}
          <div className="flex flex-col gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASINGS.standard }}
              className="font-medium tracking-[-0.03em] text-black"
              style={{ fontSize: "clamp(28px,3.5vw,40px)", lineHeight: "1.05" }}
            >
              Services that{" "}
              <em className="not-italic text-[#b8b8b8]">supercharge</em> your
              business.
            </motion.h2>

            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#828282]">
                My tech stack
              </span>

              {/* Tech Icons Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap items-center gap-2"
              >
                {TECH_STACK.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#dedede] bg-white text-xs font-medium text-black hover:bg-[#f7f7f7] transition-colors"
                  >
                    {tool.icon ? (
                      <div className="relative w-4 h-4 shrink-0">
                        <Image
                          src={tool.icon}
                          alt={tool.name}
                          fill
                          sizes="16px"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#dedede] shrink-0" />
                    )}
                    {tool.name}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* ── Right: Services List ── */}
          <div className="flex flex-col gap-5 lg:pt-2">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: EASINGS.standard,
                }}
                className="flex items-center gap-3 group"
              >
                <div
                  className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-black group-hover:border-black ${
                    service.emphasis
                      ? "border-[#dedede]"
                      : "border-[#f0f0f0]"
                  }`}
                >
                  <span
                    className={`text-base leading-none transition-colors group-hover:text-white ${
                      service.emphasis ? "text-black" : "text-[#b8b8b8]"
                    }`}
                  >
                    →
                  </span>
                </div>
                <span
                  className={`text-[17px] sm:text-[18px] tracking-[-0.02em] leading-snug transition-colors ${
                    service.emphasis ? "text-black" : "text-[#828282]"
                  }`}
                >
                  {service.label}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
