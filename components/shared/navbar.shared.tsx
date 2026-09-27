"use client";

import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
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
 * Scroll distance at which the hero's own booking CTA has left the screen.
 * The desktop rig fades its copy out within the first ~0.6 viewport of
 * scroll, and the stacked mobile hero scrolls it off in about the same
 * distance — the whole 500vh rig is far too late to wait for.
 */
function getHeroCtaThreshold() {
  return window.innerHeight * 0.6;
}

/** Scroll distance before the pill is allowed to collapse. */
const COLLAPSE_AFTER = 120;
/** Minimum movement that counts as a change of scroll direction. */
const DIRECTION_THRESHOLD = 6;

/**
 * Site navigation — a floating pill.
 *
 * Expanded, it carries the name, the section links and both actions.
 * Scrolling down folds it to the avatar, the name and two icon actions, so
 * it gets out of the content's way; scrolling up, hovering it, or tabbing
 * into it unfolds it again. The folding is width-only (grid tracks going
 * 0fr ↔ 1fr), so the pill resizes smoothly around its own content.
 *
 * Past the hero, the primary "Book a call" joins the actions — the hero
 * carries its own booking CTA, so the page never shows two at once.
 */
export function NavbarShared({ className }: NavbarSharedPropsType) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const lastScrollY = useRef(0);
  const openContact = usePortfolioStore((state) => state.openContact);
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
    // Direction, with a small dead zone so trackpad jitter can't flap it.
    const delta = value - lastScrollY.current;
    if (Math.abs(delta) >= DIRECTION_THRESHOLD || value < COLLAPSE_AFTER) {
      lastScrollY.current = value;
      const next = value >= COLLAPSE_AFTER && delta > 0;
      setIsScrolledDown((current) => (current === next ? current : next));
    }

    if (!isHomepage) {
      setIsPastHero(true);
      return;
    }
    const threshold = getHeroCtaThreshold();

    setIsPastHero((current) => {
      // Hysteresis: prevent flickering when reader scrolls right at threshold
      if (!current && value > threshold) return true;
      if (current && value < threshold - 80) return false;
      return current;
    });
  });

  // A page restored mid-scroll (reload, back navigation) starts past the
  // hero: measure once, in the first frame. Inner pages need no check —
  // `showPrimary` already covers them.
  useEffect(() => {
    if (!isHomepage) return;
    const frame = requestAnimationFrame(() =>
      setIsPastHero(window.scrollY > getHeroCtaThreshold())
    );
    return () => cancelAnimationFrame(frame);
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

  const isCollapsed = isScrolledDown && !isHovered && !hasFocus && !isMobileOpen;
  const showPrimary = isPastHero || !isHomepage;

  return (
    <header
      className={cn(
        // `w-max`: a box positioned at left: 50% would otherwise shrink-to-fit
        // into half the viewport and clip the expanded pill's last items.
        "fixed inset-x-3 top-3 z-50 rounded-[28px] backdrop-blur-sm md:inset-x-auto md:top-4 md:left-1/2 md:w-max md:max-w-[calc(100vw-2rem)] md:-translate-x-1/2",
        className
      )}
      style={{ viewTransitionName: "site-header" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setHasFocus(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHasFocus(false);
      }}
    >
      <div
        className={cn(
          "border-line-2 bg-bg/80 shadow-float overflow-hidden border backdrop-blur-sm transition-[border-radius] duration-300",
          isMobileOpen ? "rounded-[18px]" : "rounded-[26px]"
        )}
      >
        {/* ── Desktop ── */}
        <NavbarDesktopPart
          isCollapsed={isCollapsed}
          showPrimary={showPrimary}
          navLinks={navLinksData}
          activeSection={activeSection}
          isHomepage={isHomepage}
          onAnchorClick={handleAnchorClick}
          onOpenContact={openContact}
          resolveHref={resolveHref}
        />

        {/* ── Mobile ── */}
        <NavbarMobilePart
          isCollapsed={isCollapsed}
          showPrimary={showPrimary}
          isOpen={isMobileOpen}
          navLinks={navLinksData}
          onToggle={() => setIsMobileOpen((open) => !open)}
          onAnchorClick={handleAnchorClick}
          onOpenContact={openContact}
          resolveHref={resolveHref}
        />
      </div>
    </header>
  );
}
