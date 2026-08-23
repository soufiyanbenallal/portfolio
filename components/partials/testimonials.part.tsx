"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { testimonialsData } from "@/data/testimonials.data";
import { Icons } from "@/components/ui/social-icons.ui";
import { Container } from "@/components/shared/container.shared";
import { TextReveal } from "@/components/motion/text-reveal.motion";
import { Reveal } from "@/components/motion/reveal.motion";
import { useIsDesktop, useReducedMotionSafe } from "@/hooks/use-media-query.hook";
import { PERSPECTIVE, SPRINGS, DURATIONS, EASINGS } from "@/lib/motion.config";
import type { TestimonialItemType } from "@/types";

const happyClientAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80",
];

const TESTIMONIALS = testimonialsData.slice(0, 6);

/* -------------------------------------------------------------------- *
 * Card
 * -------------------------------------------------------------------- */

function TestimonialCard({ testimonial }: { testimonial: TestimonialItemType }) {
  return (
    <figure className="flex h-full min-h-[280px] w-full flex-col justify-between rounded-2xl border border-gray-30 bg-white p-6 card-shadow">
      <blockquote className="flex-1 text-sm leading-[1.65] text-black-90">
        <span className="mr-1 text-2xl leading-none text-gray-40">&ldquo;</span>
        {testimonial.quote}
        <span className="ml-0.5 text-2xl leading-none text-gray-40">&rdquo;</span>
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-gray-20 pt-5">
        {testimonial.avatar && (
          <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-gray-30">
            <Image
              src={testimonial.avatar}
              alt={testimonial.author}
              fill
              sizes="36px"
              className="object-cover"
            />
          </span>
        )}
        <span className="flex flex-col">
          <span className="text-xs font-semibold text-black">
            {testimonial.author}
          </span>
          <span className="text-xs text-gray-50">
            {testimonial.role} at {testimonial.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/* -------------------------------------------------------------------- *
 * Coverflow
 * -------------------------------------------------------------------- */

/**
 * A 3D coverflow rather than a grid.
 *
 * Cards are laid out around the active index in real depth: neighbours are
 * pushed back in Z and yawed towards the centre, so the row curves away
 * instead of sliding flat. Only the centre card is interactive and in the
 * tab order — the others are `aria-hidden`, because a carousel that leaves
 * six cards focusable is a keyboard trap dressed as a feature.
 *
 * Drag and arrow keys both move the index; the layout animation between
 * positions is a spring, so a flick overshoots and settles like a physical
 * rack of cards.
 */
function TestimonialCoverflow() {
  const [active, setActive] = useState(Math.floor(TESTIMONIALS.length / 2));

  const move = useCallback((delta: number) => {
    setActive((current) =>
      Math.min(TESTIMONIALS.length - 1, Math.max(0, current + delta)),
    );
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      }
    },
    [move],
  );

  return (
    <div className="flex flex-col gap-8">
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative h-[340px] w-full cursor-grab overflow-hidden rounded-2xl active:cursor-grabbing"
        style={{ perspective: PERSPECTIVE.far }}
      >
        <motion.div
          className="stage-3d absolute inset-0"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_event, info) => {
            if (info.offset.x < -60 || info.velocity.x < -400) move(1);
            else if (info.offset.x > 60 || info.velocity.x > 400) move(-1);
          }}
        >
          {TESTIMONIALS.map((testimonial, index) => {
            const distance = index - active;
            const absolute = Math.abs(distance);
            const isActive = distance === 0;

            return (
              <motion.div
                key={testimonial.id}
                className="absolute left-1/2 top-1/2 w-[300px] sm:w-[360px]"
                initial={false}
                animate={{
                  x: `calc(-50% + ${distance * 62}%)`,
                  y: "-50%",
                  z: -absolute * 170,
                  rotateY: distance * -22,
                  opacity: absolute > 2 ? 0 : 1 - absolute * 0.22,
                  filter: isActive ? "blur(0px)" : `blur(${absolute * 1.2}px)`,
                }}
                transition={SPRINGS.carousel}
                style={{ zIndex: TESTIMONIALS.length - absolute }}
                aria-hidden={!isActive}
              >
                <div className={isActive ? "" : "pointer-events-none select-none"}>
                  <TestimonialCard testimonial={testimonial} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Position rail. `layoutId` moves one indicator between slots rather
          than fading six of them in and out. */}
      <div className="flex items-center justify-center gap-2">
        {TESTIMONIALS.map((testimonial, index) => (
          <button
            key={testimonial.id}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show testimonial from ${testimonial.author}`}
            aria-current={index === active}
            className="relative h-1.5 w-8 cursor-pointer rounded-full bg-gray-30"
          >
            {index === active && (
              <motion.span
                layoutId="testimonial-indicator"
                transition={SPRINGS.indicator}
                className="absolute inset-0 rounded-full bg-black"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- *
 * Section
 * -------------------------------------------------------------------- */

export function TestimonialsPart() {
  const isDesktop = useIsDesktop();
  const prefersReducedMotion = useReducedMotionSafe();
  const useCoverflow = isDesktop && !prefersReducedMotion;

  return (
    <div className="w-full">
      <Container className="flex flex-col gap-12 py-16 md:gap-16 md:py-24 lg:py-32">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <TextReveal
            as="h2"
            by="word"
            text="Hear from what my clients have to say."
            className="max-w-[460px] text-h2-sm text-black"
          />

          <Reveal preset="fade" delay={0.2}>
            <div className="flex shrink-0 items-center gap-3">
              <div className="flex -space-x-2.5">
                {happyClientAvatars.map((src, i) => (
                  <span
                    key={i}
                    className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-20 ring-2 ring-white"
                  >
                    <Image src={src} alt="" fill sizes="32px" className="object-cover" />
                  </span>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Icons.Star key={i} className="h-3 w-3 text-black" />
                  ))}
                </div>
                <span className="mt-0.5 whitespace-nowrap text-[11px] font-semibold text-black">
                  99+ Happy clients
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {useCoverflow ? (
          <TestimonialCoverflow />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: DURATIONS.slow,
                  delay: (index % 2) * 0.08,
                  ease: EASINGS.entrance,
                }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
