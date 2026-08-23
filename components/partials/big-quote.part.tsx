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
  const progress = useSpring(scrollYProgress, SPRINGS.scrollHeavy);

  const rotateX = useTransform(progress, [0, 0.5, 1], [11, 0, -9]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.94, 1, 0.97]);
  const y = useTransform(progress, [0, 1], [40, -40]);

  return (
    <div className="w-full">
      <Container className="py-16 md:py-24">
        <div ref={ref} style={{ perspective: PERSPECTIVE.far }}>
          <motion.figure
            className="flex flex-col items-center gap-8 text-center"
            style={
              prefersReducedMotion
                ? undefined
                : { rotateX, scale, y, transformOrigin: "50% 50%" }
            }
          >
            <blockquote className="max-w-[820px]">
              <ScrollDimmedText
                as="span"
                text="“Working with Joseph felt like having a seasoned design partner who truly understood our vision for KYMA and brought it to life in ways we hadn't even imagined.”"
                className="justify-center text-[clamp(18px,2.2vw,28px)] font-medium leading-[1.4] tracking-[-0.02em] text-black"
                dimClassName="text-black"
              />
            </blockquote>

            <Reveal preset="fadeUp" delay={0.15}>
              <figcaption className="flex items-center gap-3">
                <span className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-30">
                  <Image
                    src="https://framerusercontent.com/images/M8GPTQEgwDo7tuEUdEAzTRzQ5w.jpg"
                    alt="Thomas Weber"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </span>
                <span className="flex flex-col text-left">
                  <span className="text-sm font-semibold text-black">
                    Thomas Weber
                  </span>
                  <span className="text-xs text-gray-50">
                    Co-founder of KYMA
                  </span>
                </span>
              </figcaption>
            </Reveal>
          </motion.figure>
        </div>
      </Container>
    </div>
  );
}
