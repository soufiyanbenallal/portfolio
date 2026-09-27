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
 * readable, and only then. The words illuminate as they arrive. The page
 * pins this section while the services slide up over it.
 */
export function BigQuotePart() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: SCROLL_OFFSETS.throughViewport,
  });
  // A spring output, not the raw scroll value — so these array transforms
  // run in JS in step with the scroll (see hero/work-deck.timeline.ts `ramp`).
  const progress = useSpring(scrollYProgress, SPRINGS.scroll);

  const rotateX = useTransform(progress, [0, 0.5, 1], [11, 0, -9]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.94, 1, 0.97]);
  const y = useTransform(progress, [0, 1], [40, -40]);

  return (
    <div className="">
      <Container className="flex min-h-dvh flex-col items-center justify-center py-20">
        <div
          className="dots fade-edges pointer-events-none absolute inset-0 opacity-70"
          aria-hidden="true"
        />
        <div ref={ref} className="w-full" style={{ perspective: PERSPECTIVE.far }}>
          <motion.figure
            className="flex flex-col items-center gap-8 text-center will-change-transform"
            style={
              prefersReducedMotion ? undefined : { rotateX, scale, y, transformOrigin: "50% 50%" }
            }
          >
            <blockquote className="max-w-205">
              <ScrollDimmedText
                as="span"
                text="“Good software is a business decision first. I design the architecture, lead the team and ship the code — so the product holds up on launch day and long after.”"
                className="text-ink justify-center text-[clamp(18px,2.2vw,28px)] leading-[1.4] font-medium tracking-[-0.02em]"
                dimClassName="text-ink"
              />
            </blockquote>

            <Reveal preset="fadeUp" delay={0.15}>
              <figcaption className="flex items-center gap-3">
                <span className="border-line-2 relative h-10 w-10 overflow-hidden rounded-full border">
                  <Image
                    src="/images/profile.jpeg"
                    alt="Soufiyan Benallal"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </span>
                <span className="flex flex-col text-left">
                  <span className="text-ink text-sm font-semibold">Soufiyan Benallal</span>
                  <span className="text-ink-faint text-xs">Lead Full Stack Developer</span>
                </span>
              </figcaption>
            </Reveal>
          </motion.figure>
        </div>
      </Container>
    </div>
  );
}
