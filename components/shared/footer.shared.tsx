"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "motion/react";
import { useReducedMotionSafe } from "@/hooks/use-media-query.hook";
import { Icons } from "@/components/ui/social-icons.ui";
import { socialLinksData, navLinksData } from "@/data/client-logos.data";
import { Container } from "@/components/shared/container.shared";
import { CAL_LINK } from "@/components/shared/cal-embed.shared";
import { PERSPECTIVE, SPRINGS, SCROLL_OFFSETS } from "@/lib/motion.config";

const EMAIL = "joseph@launchnow.design";
const WORDMARK = "JOSEPH";

/* -------------------------------------------------------------------- *
 * Wordmark
 * -------------------------------------------------------------------- */

function WordmarkLetter({
  letter,
  index,
  total,
  progress,
}: {
  letter: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Letters resolve left to right across the reveal, each over its own
  // overlapping slice — a single stagger delay would fire them all at once
  // regardless of how fast the reader is scrolling.
  const start = 0.15 + (index / total) * 0.45;
  const end = start + 0.3;

  const y = useTransform(progress, [start, end], ["55%", "0%"]);
  const rotateX = useTransform(progress, [start, end], [72, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        className="inline-block"
        style={{
          y,
          rotateX,
          opacity,
          transformPerspective: PERSPECTIVE.far,
          transformOrigin: "50% 100%",
        }}
      >
        {letter}
      </motion.span>
    </span>
  );
}

/* -------------------------------------------------------------------- *
 * Footer
 * -------------------------------------------------------------------- */

/**
 * Footer.
 *
 * Its content rises as the footer enters, which reads as the page lifting to
 * uncover something that was already there rather than a block sliding in
 * from below. The oversized wordmark resolves letter by letter against that
 * movement, so the last thing on the page finishes assembling exactly as the
 * reader arrives at the bottom.
 */
export function FooterShared() {
  const footerRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const prefersReducedMotion = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: SCROLL_OFFSETS.entering,
  });
  const progress = useSpring(scrollYProgress, SPRINGS.scroll);

  const contentY = useTransform(progress, [0, 0.8], [60, 0]);
  const contentOpacity = useTransform(progress, [0, 0.45], [0.3, 1]);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        `${new Date().toLocaleTimeString("en-GB", {
          timeZone: "Europe/London",
          hour: "2-digit",
          minute: "2-digit",
        })} GMT`,
      );
    };
    updateTime();
    const interval = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied; the address stays readable regardless.
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative z-10 w-full overflow-hidden bg-black text-white"
    >
      <motion.div
        className="will-change-transform"
        style={
          prefersReducedMotion
            ? undefined
            : { y: contentY, opacity: contentOpacity }
        }
      >
        <Container
          className="flex flex-col gap-16 pb-[120px] pt-16 md:gap-24 md:pb-[180px] lg:pb-[211px]"
        >
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            {/* Contact */}
            <div className="flex flex-col gap-6 md:col-span-5">
              <div>
                <span className="text-label mb-2 block text-white/50">
                  Speak to me
                </span>
                <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
                  Email or book a call.
                </h2>
              </div>

              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
                >
                  <Icons.Mail className="size-4 text-white/70" />
                  <span>{copied ? "Copied to clipboard!" : EMAIL}</span>
                </button>

                <button
                  type="button"
                  data-cal-link={CAL_LINK}
                  data-cal-config='{"layout":"month_view"}'
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-gray-20"
                >
                  <Icons.Calendar className="size-4 text-black" />
                  <span>Book a call</span>
                </button>
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
              <nav aria-label="Footer" className="flex flex-col gap-3">
                <span className="text-label mb-1 block text-white/50">Menu</span>
                {navLinksData.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href.startsWith("#") ? `/${item.href}` : item.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col gap-3">
                <span className="text-label mb-1 block text-white/50">Social</span>
                {socialLinksData.slice(0, 5).map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {social.platform}
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-label mb-1 block text-white/50">Legal</span>
                <Link
                  href="/terms"
                  transitionTypes={["nav-forward"]}
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Terms of service
                </Link>
                <Link
                  href="/privacy-policy"
                  transitionTypes={["nav-forward"]}
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Privacy policy
                </Link>
                <div className="mt-4 border-t border-white/10 pt-3">
                  <span className="block text-xs text-white/50">
                    Based in London / Remote
                  </span>
                  <span className="mt-0.5 block font-mono text-xs text-white/70">
                    {currentTime || "—— GMT"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Wordmark */}
          <div className="flex w-full select-none flex-col items-center pt-4">
            <div className="relative">
              <span className="absolute left-0 block h-full w-px bg-linear-to-b from-transparent via-white/20 to-transparent" />
              <span className="absolute right-0 block h-full w-px bg-linear-to-b from-transparent via-white/20 to-transparent" />
              <span className="absolute top-0 block h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />
              <span className="absolute bottom-0 block h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />

              {[
                "-top-2 -left-2",
                "-bottom-2 -left-2",
                "-bottom-2 -right-2",
                "-top-2 -right-2",
              ].map((position) => (
                <span
                  key={position}
                  className={`absolute ${position} flex size-4 items-center justify-center`}
                >
                  <span className="absolute h-4 w-px bg-white/50" />
                  <span className="absolute h-px w-4 bg-white/50" />
                </span>
              ))}

              <p
                aria-hidden="true"
                className="w-full px-12 py-6 text-center text-[18vw] font-bold uppercase text-white/90"
                style={{ lineHeight: 1, fontFamily: "Fragment Mono" }}
              >
                {prefersReducedMotion
                  ? WORDMARK
                  : Array.from(WORDMARK).map((letter, index) => (
                      <WordmarkLetter
                        key={index}
                        letter={letter}
                        index={index}
                        total={WORDMARK.length}
                        progress={progress}
                      />
                    ))}
              </p>
              <span className="sr-only">Joseph Alexander</span>
            </div>

            <div className="mt-8 flex w-full flex-col items-center justify-between pt-6 font-mono text-xs text-white/50 sm:flex-row">
              <span>
                © {new Date().getFullYear()} Joseph Alexander. All rights
                reserved.
              </span>
              <span className="mt-2 sm:mt-0">
                Designed &amp; engineered with craft.
              </span>
            </div>
          </div>
        </Container>
      </motion.div>
    </footer>
  );
}
