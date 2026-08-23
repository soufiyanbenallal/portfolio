"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";
import { navLinksData } from "@/data/client-logos.data";
import { usePortfolioStore } from "@/lib/portfolio.store";
import { useActiveSection } from "@/hooks/use-active-section.hook";
import { SPRINGS, DURATIONS, EASINGS } from "@/lib/motion.config";

const AVATAR =
  "https://framerusercontent.com/images/pKKKvDTDIMbGXt4SKNGc5PEgrkU.jpg?width=64&height=64";

/**
 * Floating navigation.
 *
 * Three things are worth noting:
 *
 *  - `viewTransitionName: "site-header"` plus the CSS in globals.css freezes
 *    the bar during route transitions. Without a fixed reference point the
 *    whole viewport appears to slide, not just the content.
 *
 *  - The active-section pill is a single element moved between links with
 *    `layoutId`, so it travels along the bar instead of six pills fading in
 *    and out of place.
 *
 *  - Anchor clicks are handed to Lenis rather than `scrollIntoView`, because
 *    the browser's native smooth scroll and Lenis fight for the same scroll
 *    position and the jump stutters.
 */
export function NavbarShared() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [isCompact, setIsCompact] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const openContact = usePortfolioStore((state) => state.openContact);
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
    setIsCompact((current) => {
      // Hysteresis: a single threshold makes the bar flicker between states
      // when the reader parks right on top of it.
      if (!current && value > 80) return true;
      if (current && value < 40) return false;
      return current;
    });
  });

  // Escape closes the mobile sheet, matching the dialogs elsewhere.
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

      if (lenis) lenis.scrollTo(target, { offset: -96, duration: 1.1 });
      else target.scrollIntoView({ block: "start" });
    },
    [isHomepage, lenis, openContact],
  );

  const resolveHref = (href: string, isAnchor?: boolean) =>
    isHomepage ? href : isAnchor ? `/${href}` : href;

  return (
    <header
      className="fixed left-1/2 top-6 z-40 w-auto max-w-[calc(100vw-32px)] -translate-x-1/2"
      style={{ viewTransitionName: "site-header" }}
    >
      {/* ── Desktop ── */}
      <motion.nav
        layout
        transition={SPRINGS.nav}
        className={cn(
          "hidden select-none items-center rounded-[32px] border border-gray-30 bg-white/70 text-sm shadow-xs backdrop-blur-md transition-[padding,gap] duration-300 md:flex",
          isCompact ? "gap-6 px-3.5 py-2" : "gap-12 px-4 py-2.5 lg:gap-16",
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

        <div
          className={cn(
            "flex items-center transition-[gap] duration-300",
            isCompact ? "gap-1" : "gap-1 lg:gap-2",
          )}
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
        </div>
      </motion.nav>

      {/* ── Mobile ── */}
      <div className="md:hidden">
        <motion.div
          layout
          transition={SPRINGS.nav}
          className="flex flex-col overflow-hidden rounded-[24px] border border-gray-30 bg-white/85 shadow-sm backdrop-blur-lg"
        >
          <div className="flex min-w-[280px] items-center justify-between gap-4 px-4 py-2.5">
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
