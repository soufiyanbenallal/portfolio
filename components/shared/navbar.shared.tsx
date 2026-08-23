"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";
import { navLinksData } from "@/data/client-logos.data";
import { Icons } from "@/components/ui/social-icons.ui";
import { CAL_LINK } from "@/components/shared/cal-embed.shared";
import { usePortfolioStore } from "@/lib/portfolio.store";
import { useActiveSection } from "@/hooks/use-active-section.hook";
import { SPRINGS, DURATIONS, EASINGS } from "@/lib/motion.config";

const AVATAR =
  "https://framerusercontent.com/images/pKKKvDTDIMbGXt4SKNGc5PEgrkU.jpg?width=64&height=64";

/**
 * Floating navigation with morphing actions on scroll.
 *
 * In the Hero section:
 *  - Displays profile avatar + name and navigation links ([Work, Services, Stack...]).
 *
 * Scrolled past the Hero section:
 *  - Morphs into a sleek compact pill containing avatar + name and two circular quick actions:
 *    1. Send email (triggers contact dialog)
 *    2. Book a call (triggers Cal.com scheduler)
 */
export function NavbarShared() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const openContact = usePortfolioStore((state) => state.openContact);
  const openBooking = usePortfolioStore((state) => state.openBooking);
  const lenis = useLenis();

  const sectionIds = useMemo(
    () =>
      navLinksData
        .filter((link) => link.isAnchor && link.href.startsWith("#"))
        .map((link) => link.href.slice(1)),
    [],
  );
  const activeSection = useActiveSection(sectionIds, isHomepage);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    if (!isHomepage) {
      setIsPastHero(true);
      return;
    }
    const heroEl = document.getElementById("hero");
    const heroBottom = heroEl ? heroEl.offsetTop + heroEl.offsetHeight - 140 : 450;

    setIsPastHero((current) => {
      // Hysteresis: prevent flickering when reader scrolls right at threshold
      if (!current && value > heroBottom) return true;
      if (current && value < heroBottom - 80) return false;
      return current;
    });
  });

  // Initial check on mount
  useEffect(() => {
    if (!isHomepage) {
      setIsPastHero(true);
      return;
    }
    const heroEl = document.getElementById("hero");
    const heroBottom = heroEl ? heroEl.offsetTop + heroEl.offsetHeight - 140 : 450;
    setIsPastHero(window.scrollY > heroBottom);
  }, [isHomepage]);

  // Escape closes the mobile sheet
  useEffect(() => {
    if (!isMobileOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isMobileOpen]);

  const handleAnchorClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string, isAnchor?: boolean) => {
      setIsMobileOpen(false);
      if (!isAnchor || !isHomepage || !href.startsWith("#")) return;

      event.preventDefault();
      if (href === "#contact") {
        openContact();
        return;
      }

      const target = document.getElementById(href.slice(1));
      if (!target) return;

      if (lenis) lenis.scrollTo(target, { offset: -96, duration: 0.7 });
      else target.scrollIntoView({ block: "start" });
    },
    [isHomepage, lenis, openContact],
  );

  const resolveHref = (href: string, isAnchor?: boolean) =>
    isHomepage ? href : isAnchor ? `/${href}` : href;

  return (
    <header
      className="fixed left-1/2 top-6 z-40 w-auto max-w-[calc(100vw-32px)] -translate-x-1/2 backdrop-blur-md"
      style={{ viewTransitionName: "site-header" }}
    >
      {/* ── Desktop ── */}
      <motion.nav
        layout
        className={cn(
          "hidden select-none items-center rounded-[32px] border border-gray-30 bg-white/75 text-sm shadow-xs backdrop-blur-md transition-[padding,gap] duration-300 md:flex",
          isPastHero ? "gap-4 px-2.5 py-1.5 pl-3.5" : "gap-12 px-4 py-2.5 lg:gap-16",
        )}
      >
        <Link
          href="/"
          onClick={(event) => handleAnchorClick(event, "#hero", true)}
          className="group flex items-center gap-2.5"
        >
          <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-gray-30">
            <Image
              src={AVATAR}
              alt="Joseph Alexander"
              fill
              sizes="28px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </span>
          <motion.span
            layout="position"
            className="whitespace-nowrap text-sm font-medium tracking-tight text-black"
          >
            Joseph Alexander
          </motion.span>
        </Link>

        <AnimatePresence mode="popLayout" initial={false}>
          {!isPastHero ? (
            <motion.div
              key="nav-links"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              transition={{ duration: 0.2, ease: EASINGS.standard }}
              className="flex items-center gap-1 lg:gap-2"
            >
              {navLinksData.map((link) => {
                const isActive =
                  isHomepage && link.isAnchor && link.href.slice(1) === activeSection;

                return (
                  <Link
                    key={link.label}
                    href={resolveHref(link.href, link.isAnchor)}
                    onClick={(event) => handleAnchorClick(event, link.href, link.isAnchor)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                      isActive ? "text-black" : "text-gray-60 hover:text-black",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={SPRINGS.indicator}
                        className="absolute inset-0 -z-10 rounded-full bg-gray-20"
                      />
                    )}
                    {link.label}
                  </Link>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="nav-actions"
              initial={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
              transition={{ duration: 0.25, ease: EASINGS.overshoot }}
              className="flex items-center gap-2"
            >
              {/* Email action */}
              <button
                type="button"
                onClick={openContact}
                data-cursor="grow"
                aria-label="Send email"
                title="Send email"
                className="group relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(0,0,0,0.18)] transition-all duration-200 hover:scale-105 hover:bg-[#1a1a1a] active:scale-95"
              >
                <Icons.Mail className="h-4 w-4 text-white transition-transform duration-200 group-hover:scale-110" />
              </button>

              {/* Book a call action */}
              <button
                type="button"
                data-cal-link={CAL_LINK}
                data-cal-config='{"layout":"month_view"}'
                onClick={openBooking}
                data-cursor="grow"
                aria-label="Book a call"
                title="Book a call"
                className="group relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-[0_2px_6px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1)] transition-all duration-200 hover:scale-105 hover:bg-gray-50 active:scale-95"
              >
                <Icons.Calendar className="h-4 w-4 text-black transition-transform duration-200 group-hover:scale-110" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Mobile ── */}
      <div className="md:hidden">
        <motion.div
          layout
          transition={SPRINGS.nav}
          className="flex flex-col overflow-hidden rounded-[24px] border border-gray-30 bg-white/85 shadow-sm backdrop-blur-lg"
        >
          <div className="flex min-w-[280px] items-center justify-between gap-3 px-3.5 py-2">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-2"
            >
              <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full border border-gray-30">
                <Image
                  src={AVATAR}
                  alt="Joseph Alexander"
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </span>
              <span className="text-sm font-medium text-black">
                Joseph Alexander
              </span>
            </Link>

            <div className="flex items-center gap-1.5">
              <AnimatePresence initial={false}>
                {isPastHero && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1.5"
                  >
                    <button
                      type="button"
                      onClick={openContact}
                      aria-label="Send email"
                      className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-black text-white shadow-xs transition-transform active:scale-95"
                    >
                      <Icons.Mail className="h-3.5 w-3.5 text-white" />
                    </button>
                    <button
                      type="button"
                      data-cal-link={CAL_LINK}
                      data-cal-config='{"layout":"month_view"}'
                      onClick={openBooking}
                      aria-label="Book a call"
                      className="flex h-7.5 w-7.5 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-xs transition-transform active:scale-95"
                    >
                      <Icons.Calendar className="h-3.5 w-3.5 text-black" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileOpen}
                onClick={() => setIsMobileOpen((open) => !open)}
                className="flex items-center gap-1 rounded-full p-1.5 transition-colors hover:bg-gray-20"
              >
                {[0, 1, 2].map((index) => (
                  <motion.span
                    key={index}
                    animate={{
                      scale: isMobileOpen ? 1.35 : 1,
                      opacity: isMobileOpen && index === 1 ? 0.35 : 1,
                    }}
                    transition={{
                      duration: DURATIONS.fast,
                      delay: index * 0.04,
                      ease: EASINGS.overshoot,
                    }}
                    className="h-1.5 w-1.5 rounded-full bg-black"
                  />
                ))}
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {isMobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={SPRINGS.nav}
                className="flex flex-col gap-3 border-t border-gray-20 px-4 pb-4 pt-3"
              >
                {navLinksData.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: DURATIONS.base,
                      delay: 0.05 + index * 0.05,
                      ease: EASINGS.entrance,
                    }}
                  >
                    <Link
                      href={resolveHref(link.href, link.isAnchor)}
                      onClick={(event) =>
                        handleAnchorClick(event, link.href, link.isAnchor)
                      }
                      className="block py-1 text-base font-medium text-black transition-colors hover:text-gray-60"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  );
}
