"use client";

import React, { useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { TextCycleUi } from "@/components/ui/text-cycle.ui";
import { Icons } from "@/components/ui/social-icons.ui";
import { socialLinksData } from "@/data/client-logos.data";
import { Container } from "@/components/shared/container.shared";
import { Reveal } from "@/components/motion/reveal.motion";
import { Magnetic } from "@/components/motion/magnetic.motion";
import { usePortfolioStore } from "@/lib/portfolio.store";
import { SPRINGS } from "@/lib/motion.config";

const EMAIL = "joseph@launchnow.design";

/**
 * Closing call to action.
 *
 * A spotlight tracks the pointer across the black card. It is a single
 * `radial-gradient` driven by two springed MotionValues rather than a moving
 * element, so nothing is added to the layer tree and there is no React render
 * per pointer move — the gradient position is written straight to the style.
 */
export function MegaCtaPart() {
  const cardRef = useRef<HTMLDivElement>(null);
  const openBooking = usePortfolioStore((state) => state.openBooking);
  const openContact = usePortfolioStore((state) => state.openContact);
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);
  const smoothX = useSpring(spotlightX, SPRINGS.pointer);
  const smoothY = useSpring(spotlightY, SPRINGS.pointer);
  const spotlightOpacity = useSpring(useMotionValue(0), SPRINGS.pointer);

  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${smoothX}% ${smoothY}%, rgba(255,255,255,0.09), transparent 65%)`;

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || event.pointerType !== "mouse") return;
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      spotlightX.set(((event.clientX - rect.left) / rect.width) * 100);
      spotlightY.set(((event.clientY - rect.top) / rect.height) * 100);
      spotlightOpacity.set(1);
    },
    [prefersReducedMotion, spotlightX, spotlightY, spotlightOpacity],
  );

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard is permission-gated; the address stays visible either way.
    }
  }, []);

  return (
    <div id="contact" className="w-full select-none">
      <Container className="py-12 md:py-24 lg:py-32">
        <Reveal preset="card3D">
          <div
            ref={cardRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={() => spotlightOpacity.set(0)}
            className="relative flex flex-col justify-between gap-12 overflow-hidden rounded-[28px] bg-black p-8 text-white shadow-2xl sm:p-12 md:gap-16 md:p-16"
          >
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: spotlight, opacity: spotlightOpacity }}
            />

            <div className="relative flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-availability-green opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-availability-green" />
                </span>
                <span className="text-label text-white/70">
                  Available for new projects
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-white/20"
                >
                  <Icons.Mail className="h-3.5 w-3.5" />
                  <span>{copied ? "Copied to clipboard!" : EMAIL}</span>
                </button>

                <Magnetic strength={0.25}>
                  <button
                    type="button"
                    onClick={openBooking}
                    data-cursor="grow"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-all hover:bg-gray-20"
                  >
                    <Icons.Calendar className="h-3.5 w-3.5" />
                    <span>Book a call</span>
                  </button>
                </Magnetic>
              </div>
            </div>

            <div className="relative flex max-w-2xl flex-col gap-4 py-4">
              <h2 className="text-3xl font-medium leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
                Let&apos;s <TextCycleUi words={["design", "build", "create", "scale"]} />{" "}
                <br />
                incredible work together.
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
                Have a product idea or need an experienced full-stack designer to
                lead your brand and engineering? Let&apos;s discuss how we can
                partner up.
              </p>
            </div>

            <div className="relative flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
              <Magnetic strength={0.3} innerStrength={0.14}>
                <button
                  type="button"
                  onClick={openContact}
                  data-cursor="grow"
                  className="inline-flex h-13 cursor-pointer items-center gap-2.5 rounded-full bg-white px-8 text-base font-semibold text-black shadow-lg transition-colors hover:bg-gray-10"
                >
                  Start a conversation
                  <Icons.ArrowUpRight className="h-4 w-4 text-black" />
                </button>
              </Magnetic>

              <div className="flex items-center gap-4 font-mono text-xs text-white/60">
                {socialLinksData.slice(0, 4).map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    {social.platform.split(" ")[0]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
