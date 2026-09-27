"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SPRINGS } from "@/lib/motion.config";
import { NavbarActionsPart } from "./navbar-actions.part";
import { Reveal } from "./navbar-reveal.part";
import type { NavbarDesktopPropsType } from "@/types";

export function NavbarDesktopPart({
  isCollapsed,
  showPrimary,
  navLinks,
  activeSection,
  isHomepage,
  onAnchorClick,
  onOpenContact,
  resolveHref,
}: NavbarDesktopPropsType) {
  // "Contact" is an action on the right; listing it as a link too would give
  // the same dialog two different doors.
  const links = navLinks.filter((link) => link.href !== "#contact");

  return (
    <div className="hidden h-11 items-center gap-1 pr-1.5 pl-1.5 md:flex">
      <Link
        href="/"
        onClick={(event) => onAnchorClick(event, "#hero", true)}
        className="group hover:bg-raised flex h-8 items-center gap-2.5 rounded-full pr-3 pl-0.5 transition-colors"
      >
        <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full">
          <Image
            src="/images/profile.jpeg"
            alt=""
            fill
            sizes="28px"
            className="object-cover"
            loading="eager"
          />
        </span>
        <span className="text-ink text-sm font-medium tracking-tight whitespace-nowrap">
          Soufiyan Benallal
        </span>
      </Link>

      <Reveal open={!isCollapsed}>
        <nav aria-label="Primary" className="flex items-center gap-0.5 px-2">
          <span className="bg-line-2 mr-2 h-4 w-px" aria-hidden="true" />
          {links.map((link) => {
            const isActive = isHomepage && link.isAnchor && link.href.slice(1) === activeSection;
            return (
              <Link
                key={link.label}
                href={resolveHref(link.href, link.isAnchor)}
                onClick={(event) => onAnchorClick(event, link.href, link.isAnchor)}
                aria-current={isActive ? "true" : undefined}
                tabIndex={isCollapsed ? -1 : undefined}
                className={cn(
                  "relative flex h-7 items-center rounded-full px-3 text-[13px] transition-colors",
                  isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    transition={SPRINGS.indicator}
                    className="bg-line absolute inset-0 rounded-full"
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
          <span className="bg-line-2 ml-2 h-4 w-px" aria-hidden="true" />
        </nav>
      </Reveal>

      <NavbarActionsPart
        collapsed={isCollapsed}
        showPrimary={showPrimary}
        onOpenContact={onOpenContact}
      />
    </div>
  );
}
