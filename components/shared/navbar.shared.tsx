"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useScroll, useMotionValueEvent } from "motion/react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";
import { SCROLL } from "@/lib/motion.config";
import { navLinksData } from "@/data/client-logos.data";
import { usePortfolioStore } from "@/lib/portfolio.store";
import { useActiveSection } from "@/hooks/use-active-section.hook";
import { NavbarDesktopPart } from "./partials/navbar-desktop.part";
import { NavbarMobilePart } from "./partials/navbar-mobile.part";
import type { NavbarSharedPropsType } from "@/types";

/**
 * Floating navigation with morphing actions on scroll.
 *
 * In the Hero section:
 *  - Displays profile avatar + name and navigation links ([Work, Services, Blog, Contact]).
 *
 * Scrolled past the Hero section:
 *  - Morphs into a sleek compact pill containing avatar + name and two circular quick actions:
 *    1. Send email (triggers contact dialog)
 *    2. Book a call (triggers Cal.com scheduler)
 *
 * Performance-optimized:
 *  - Uses 100% native GPU-accelerated CSS and Tailwind v4 transitions for layout and animations.
 *  - Uses lightweight motion scroll event with hysteresis to avoid redundant re-renders.
 */
export function NavbarShared({ className }: NavbarSharedPropsType) {
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
    []
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

      if (lenis)
        lenis.scrollTo(target, { offset: SCROLL.anchorOffset, duration: SCROLL.jumpDuration });
      else target.scrollIntoView({ block: "start" });
    },
    [isHomepage, lenis, openContact]
  );

  const resolveHref = useCallback(
    (href: string, isAnchor?: boolean) => (isHomepage ? href : isAnchor ? `/${href}` : href),
    [isHomepage]
  );

  return (
    <header
      className={cn(
        "fixed top-6 left-1/2 z-40 w-auto max-w-[calc(100vw-32px)] min-w-60 -translate-x-1/2 rounded-3xl border border-gray-30/70 bg-white/60 shadow-[0_0_15px_rgba(0,0,0,0.05)] backdrop-blur-sm",
        className
      )}
      style={{ viewTransitionName: "site-header" }}
    >
      {/* ── Desktop ── */}
      <NavbarDesktopPart
        isPastHero={isPastHero}
        navLinks={navLinksData}
        activeSection={activeSection}
        isHomepage={isHomepage}
        onAnchorClick={handleAnchorClick}
        onOpenContact={openContact}
        onOpenBooking={openBooking}
        resolveHref={resolveHref}
      />

      {/* ── Mobile ── */}
      <NavbarMobilePart
        isPastHero={isPastHero}
        isOpen={isMobileOpen}
        navLinks={navLinksData}
        isHomepage={isHomepage}
        onToggle={() => setIsMobileOpen((open) => !open)}
        onClose={() => setIsMobileOpen(false)}
        onAnchorClick={handleAnchorClick}
        onOpenContact={openContact}
        onOpenBooking={openBooking}
        resolveHref={resolveHref}
      />
    </header>
  );
}
