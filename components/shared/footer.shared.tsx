"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "motion/react";
import { useReducedMotionSafe } from "@/hooks/use-media-query.hook";
import { Icons } from "@/components/ui/social-icons.ui";
import { ButtonUi } from "@/components/ui/button.ui";
import { socialLinksData, navLinksData } from "@/data/client-logos.data";
import { Section } from "@/components/shared/section.shared";
import { CAL_LINK } from "@/components/shared/cal-embed.shared";
import { PERSPECTIVE, SPRINGS, SCROLL_OFFSETS } from "@/lib/motion.config";

const EMAIL = "benallalsoufiane1@gmail.com";
const WORDMARK = "SOUFIYAN";

/* -------------------------------------------------------------------- *
 * Wordmark
 * -------------------------------------------------------------------- */

// Filled with a top-to-bottom fade so the letters dissolve at exactly the
// rate the rails beside them run out. Applied per letter: a transformed
// child breaks `background-clip: text` set on its parent.
const WORDMARK_FILL = "from-gray-40 bg-linear-to-b to-transparent bg-clip-text text-transparent";

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
  const start = 0.1 + (index / total) * 0.45;
  const end = start + 0.35;

  const y = useTransform(progress, [start, end], ["55%", "0%"]);
  const rotateX = useTransform(progress, [start, end], [72, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        className={`inline-block ${WORDMARK_FILL}`}
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

const LINK_CLASS = "text-ink-muted hover:text-ink transition-colors";

/**
 * Footer — Line Grid recipe: link cells on the page background, a meta
 * row, then the frame keeps going without borders while its rails fade
 * out. The oversized wordmark sits in that fading zone and resolves letter
 * by letter as the reader arrives, so the last thing on the page finishes
 * assembling exactly at the bottom.
 */
export function FooterShared() {
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const prefersReducedMotion = useReducedMotionSafe();

  // Keyed to the wordmark itself arriving at the bottom of the page: an
  // offset that waits for the footer's top to reach the viewport's top can
  // never complete, because the document ends first.
  const { scrollYProgress } = useScroll({
    target: wordmarkRef,
    offset: SCROLL_OFFSETS.arriving,
  });
  const progress = useSpring(scrollYProgress, SPRINGS.scroll);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        `${new Date().toLocaleTimeString("en-GB", {
          timeZone: "Africa/Casablanca",
          hour: "2-digit",
          minute: "2-digit",
        })} GMT+1`
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
    <footer className="relative z-10 w-full">
      <Section as="div" aria-label="Footer">
        <div className="cells *:bg-bg! grid-cols-2 text-[13px] md:grid-cols-12">
          {/* Contact */}
          <div className="col-span-2 flex flex-col gap-6 p-6 sm:p-8 md:col-span-6">
            <div className="flex flex-col gap-2">
              <span className="text-label text-ink-faint">Contact</span>
              <h2 className="text-ink text-[28px] leading-[1.1] font-medium tracking-[-0.035em] text-balance sm:text-[32px]">
                Have a product to build?{" "}
                <span className="text-ink-soft">Email me or book a call.</span>
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <ButtonUi
                type="button"
                data-cal-link={CAL_LINK}
                data-cal-config='{"layout":"month_view"}'
                data-cursor="grow"
                leftIcon={<Icons.Calendar className="h-3.5 w-3.5" />}
              >
                Book a call
              </ButtonUi>
              <ButtonUi
                type="button"
                variant="secondary"
                onClick={handleCopyEmail}
                aria-live="polite"
                leftIcon={
                  copied ? (
                    <Icons.Check className="text-green h-3.5 w-3.5" />
                  ) : (
                    <Icons.Copy className="text-ink-faint h-3.5 w-3.5" />
                  )
                }
              >
                {copied ? "Copied to clipboard" : EMAIL}
              </ButtonUi>
            </div>
          </div>

          {/* Menu */}
          <nav aria-label="Footer" className="p-6 sm:p-8 md:col-span-2">
            <div className="text-ink mb-3 font-medium">Menu</div>
            <ul className="space-y-2">
              {navLinksData
                .filter((item) => item.href !== "#contact")
                .map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href.startsWith("#") ? `/${item.href}` : item.href}
                      className={LINK_CLASS}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          {/* Social */}
          <div className="p-6 sm:p-8 md:col-span-2">
            <div className="text-ink mb-3 font-medium">Elsewhere</div>
            <ul className="space-y-2">
              {socialLinksData.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK_CLASS}
                  >
                    {social.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + location */}
          <div className="col-span-2 flex flex-col justify-between gap-6 p-6 sm:p-8 md:col-span-2">
            <div>
              <div className="text-ink mb-3 font-medium">Legal</div>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" transitionTypes={["nav-forward"]} className={LINK_CLASS}>
                    Terms of service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    transitionTypes={["nav-forward"]}
                    className={LINK_CLASS}
                  >
                    Privacy policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-ink-muted flex items-center gap-2 whitespace-nowrap">
                <span className="bg-green h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true" />
                Meknes, Morocco
              </span>
              <span className="text-ink-faint text-[12px]">Remote worldwide</span>
              <span className="text-ink-faint font-mono text-[11px] whitespace-nowrap tabular-nums">
                {currentTime || "--:-- GMT+1"}
              </span>
            </div>
          </div>
        </div>

        {/* Meta row */}
        <div className="border-line text-ink-faint flex flex-col justify-between gap-1 border-t px-6 py-4 font-mono text-[11px] sm:flex-row sm:px-8">
          <span>© {new Date().getFullYear()} Soufiyan Benallal</span>
          <span>Designed &amp; engineered by hand</span>
        </div>
      </Section>

      {/* The rails run out and fade; the wordmark dissolves with them. */}
      <div
        ref={wordmarkRef}
        className="frame h-19 overflow-clip border-x-0 select-none sm:h-31 md:h-46"
        aria-hidden="true"
      >
        {/* At x = 0 / right 0: with `border-x-0` the box edge is exactly
            where the rails above were drawn. */}
        <span className="from-line-3 absolute inset-y-0 left-0 w-[0.5px] bg-linear-to-b to-transparent" />
        <span className="from-line-3 absolute inset-y-0 right-0 w-[0.5px] bg-linear-to-b to-transparent" />

        <p
          className="px-4 pt-6 text-center text-[clamp(56px,18vw,294px)] leading-none font-black sm:text-[clamp(56px,18.5vw,294px)] md:text-[clamp(56px,14.5vw,294px)]"
          style={{ perspective: PERSPECTIVE.far }}
        >
          {prefersReducedMotion ? (
            <span className={WORDMARK_FILL}>{WORDMARK}</span>
          ) : (
            Array.from(WORDMARK).map((letter, index) => (
              <WordmarkLetter
                key={index}
                letter={letter}
                index={index}
                total={WORDMARK.length}
                progress={progress}
              />
            ))
          )}
        </p>
      </div>
    </footer>
  );
}
