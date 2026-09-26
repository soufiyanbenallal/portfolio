"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { workHistoryData } from "@/data/work-history.data";
import { socialLinksData } from "@/data/client-logos.data";
import { Container } from "@/components/shared/container.shared";
import { ScrollDimmedText } from "@/components/motion/text-reveal.motion";
import { SectionHeading } from "@/components/shared/section-heading.shared";
import { Tilt3D } from "@/components/motion/tilt-3d.motion";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal.motion";
import { Counter } from "@/components/motion/counter.motion";
import { SPRINGS, floatingMirrorTransition } from "@/lib/motion.config";

const BIO_PARAGRAPHS = [
  "I architect and build scalable full-stack web applications, custom Shopify ecosystems, and intelligent AI integrations. What began with a deep curiosity for computing evolved into leading engineering teams, designing resilient software architectures, and shipping platforms that deliver measurable business impact.",
  "My focus centers on end-to-end engineering excellence — from robust Laravel and Node.js backend services, database design, and Shopify GraphQL APIs to fluid, accessible React 19 and Next.js interfaces powered by Tailwind CSS v4 and silky micro-interactions.",
  "As a Lead Full Stack Developer, I bridge high-level technical strategy with precise execution. Whether mentoring engineering talent, orchestrating CI/CD deployment pipelines, or integrating autonomous AI workflows, I ensure every codebase is secure, scalable, and built to last.",
];

const FACTS = [
  { value: 8, suffix: "+", label: "Years engineering" },
  { value: 40, suffix: "+", label: "Solutions shipped" },
  { value: 99, suffix: "%", label: "Client satisfaction" },
];

/**
 * About.
 *
 * The bio is the one place on the page where the reader is asked to actually
 * read, so the motion inverts: instead of arriving and stopping, the copy
 * illuminates word by word as it crosses the viewport. Scroll speed becomes
 * reading pace, and the paragraph cannot be skimmed past unnoticed.
 */
export function AboutHistoryPart() {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedHistory = isExpanded ? workHistoryData : workHistoryData.slice(0, 3);

  return (
    <div className="w-full">
      <Container className="gap-stack py-section flex flex-col">
        <SectionHeading
          eyebrow="About"
          title={["Engineering software", "that scales and solves real problems."]}
          mutedFirstLine
        />

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          {/* ── Portrait + history ── */}
          <div className="flex flex-col gap-8">
            <Reveal preset="card3D">
              <Tilt3D intensity={7} lift={14} glare className="w-full">
                <div className="border-gray-30 bg-gray-10 relative aspect-4/3 w-full overflow-hidden rounded-card border">
                  <Image
                    src="/images/profile.jpeg"
                    alt="Soufiyan Benallal"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />

                  {/* Floats above the photo in real Z, so the tilt separates
                      it from the surface instead of gluing it flat. */}
                  <motion.div
                    animate={{ x: [0, 2, 0], y: [0, -5, 0], rotate: [0, -6, 0] }}
                    transition={floatingMirrorTransition}
                    style={{ transform: "translateZ(40px)" }}
                    className="border-gray-30 pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-tile border bg-white/90 px-3.5 py-2 text-xs font-medium text-black card-shadow-hover backdrop-blur-md"
                  >
                    <span className="bg-availability-green h-2 w-2 animate-pulse rounded-full" />
                    <span>Lead Full Stack Developer</span>
                  </motion.div>
                </div>
              </Tilt3D>
            </Reveal>

            <Stagger className="flex flex-wrap gap-2" stagger={0.06}>
              {socialLinksData.slice(0, 4).map((social) => (
                <StaggerItem key={social.platform} as="span" preset="scale">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-gray-30 bg-gray-5 hover:bg-gray-20 inline-block rounded-full border px-3 py-1.5 text-xs font-medium text-black transition-colors"
                  >
                    {social.platform.split(" ")[0]}
                  </a>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="border-gray-30 flex flex-col gap-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-label text-gray-50">My work history</span>
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-expanded={isExpanded}
                  className="hover:text-gray-60 cursor-pointer text-xs font-medium text-black underline underline-offset-4 transition-colors"
                >
                  {isExpanded ? "Show less" : "Show all"}
                </button>
              </div>

              {/* `layout` on the list plus `popLayout` on the children means
                  the rows below an inserted item slide rather than jump. */}
              <motion.div layout className="divide-gray-20 flex flex-col divide-y">
                <AnimatePresence mode="popLayout" initial={false}>
                  {displayedHistory.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, height: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
                      exit={{ opacity: 0, height: 0, filter: "blur(4px)" }}
                      transition={SPRINGS.accordion}
                      className="flex flex-col gap-0.5 overflow-hidden py-3"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-black">{item.role}</span>
                        <span className="font-mono text-xs text-gray-50">{item.period}</span>
                      </div>
                      <span className="text-gray-60 text-xs">
                        {item.company} · {item.location}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* ── Bio ── */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              {BIO_PARAGRAPHS.map((paragraph, index) => (
                <ScrollDimmedText
                  key={index}
                  text={paragraph}
                  className="text-body-l leading-[1.55]"
                  dimClassName={index === 0 ? "text-black" : "text-gray-60"}
                />
              ))}
            </div>

            <Stagger className="border-gray-30 grid grid-cols-3 gap-4 border-t pt-8" stagger={0.1}>
              {FACTS.map((fact) => (
                <StaggerItem key={fact.label} className="flex flex-col gap-1">
                  <span className="text-price-lg text-black">
                    <Counter value={fact.value} suffix={fact.suffix} />
                  </span>
                  <span className="text-xs text-gray-50">{fact.label}</span>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="border-gray-30 flex items-center justify-between border-t pt-6">
              <div className="flex flex-col gap-1">
                <span className="text-label text-gray-40">Signed</span>
                <span
                  className="text-2xl font-bold tracking-tight text-black italic"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Soufiyan Benallal
                </span>
              </div>
              <span className="font-mono text-xs text-gray-50">Meknes, Morocco · Remote</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
