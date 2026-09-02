"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useReducedMotionSafe } from "@/hooks/use-media-query.hook";
import { Container } from "@/components/shared/container.shared";
import { ScrollDimmedText } from "@/components/motion/text-reveal.motion";
import { Reveal } from "@/components/motion/reveal.motion";
import { PERSPECTIVE, SPRINGS, SCROLL_OFFSETS } from "@/lib/motion.config";

/**
 * Pull quote.
 *
 * Sits on its own plane: the block rotates on the X axis as it crosses the
 * viewport — lying back on approach, flat at centre, tipping away on exit —
 * so the quote physically faces the reader at the exact moment it is
 * readable, and only then. The words illuminate as they arrive.
 */
export function BigQuotePart() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: SCROLL_OFFSETS.throughViewport,
  });
  const progress = useSpring(scrollYProgress, SPRINGS.scroll);

  const rotateX = useTransform(progress, [0, 0.5, 1], [11, 0, -9]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.94, 1, 0.97]);
  const y = useTransform(progress, [0, 1], [40, -40]);

  return (
    <div className="sticky! top-0 scroll-mt-40 bg-white">
      <Container className="flex min-h-dvh flex-col items-center justify-center py-20">
        <GridBackground />

        <div ref={ref} className="w-full" style={{ perspective: PERSPECTIVE.far }}>
          <motion.figure
            className="flex flex-col items-center gap-8 text-center will-change-transform"
            style={
              !prefersReducedMotion ? undefined : { rotateX, scale, y, transformOrigin: "50% 50%" }
            }
          >
            <blockquote className="max-w-205">
              <ScrollDimmedText
                as="span"
                text="“Success is often achieved by those who don’t know that failure is inevitable.”"
                className="justify-center text-[clamp(18px,2.2vw,28px)] leading-[1.4] font-medium tracking-[-0.02em] text-black"
                dimClassName="text-black"
              />
            </blockquote>

            {/* gradient glow */}
            <div className=""></div>

            {/*  */}
            <Reveal preset="fadeUp" delay={0.15}>
              <figcaption className="flex items-center gap-3">
                <span className="border-gray-30 relative h-10 w-10 overflow-hidden rounded-full border">
                  <Image
                    src="/images/profile.jpeg"
                    alt="Soufiyan Benallal"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </span>
                <span className="flex flex-col text-left">
                  <span className="text-sm font-semibold text-black">Soufiyan Benallal</span>
                  <span className="text-xs text-gray-50">Lead Full Stack Developer</span>
                </span>
              </figcaption>
            </Reveal>
          </motion.figure>
        </div>
      </Container>
    </div>
  );
}

function GridBackground() {
  return (
    <div className="pointer-events-none bg-white opacity-30">
      {/* ── Left Outer Margin: Minimalist Technical Diagonal Hatch Zone ── */}
      <div
        className="absolute top-0 bottom-0 left-0 hidden w-full flex-col justify-between border-r-[0.5] border-[#ccc] p-4 2xl:flex"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #ccc, #ccc, transparent 1px, transparent 6px)",
        }}
      ></div>

      {/* ── Right Outer Margin: Minimalist Technical Diagonal Hatch Zone ── */}
      <div
        className="absolute top-0 right-0 bottom-0 hidden w-full flex-col items-end justify-between border-l-[0.5] border-[#ccc] p-4 2xl:flex"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #ccc, #ccc, transparent 1px, transparent 6px)",
        }}
      ></div>
    </div>
  );
}
