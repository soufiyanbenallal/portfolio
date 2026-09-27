"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/social-icons.ui";
import { CAL_LINK } from "@/components/shared/cal-embed.shared";
import { Reveal } from "./navbar-reveal.part";
import type { NavbarMobilePropsType } from "@/types";

export function NavbarMobilePart({
  isCollapsed,
  showPrimary,
  isOpen,
  navLinks,
  onToggle,
  onAnchorClick,
  resolveHref,
}: NavbarMobilePropsType) {
  return (
    <div className="md:hidden">
      <div className="flex h-12 items-center justify-between gap-2 pr-1.5 pl-1.5">
        <Link
          href="/"
          onClick={(event) => onAnchorClick(event, "#hero", true)}
          className="flex h-9 items-center rounded-full pl-1"
        >
          <span className="ring-line-2 relative h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1">
            <Image src="/images/profile.jpeg" alt="" fill sizes="28px" className="object-cover" loading="eager" />
          </span>
          <Reveal open={!isCollapsed || isOpen}>
            <span className="text-ink pr-1 pl-2.5 text-sm font-medium tracking-tight">Soufiyan Benallal</span>
          </Reveal>
        </Link>

        <div className="flex items-center gap-1">
          {showPrimary && (
            <button
              type="button"
              data-cal-link={CAL_LINK}
              data-cal-config='{"layout":"month_view"}'
              aria-label="Book a call"
              className="animate-nav-pop-in bg-ink flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white"
            >
              <Icons.Calendar className="h-3.5 w-3.5" />
            </button>
          )}
          {/* Two hairlines that cross into an X. */}
          <button
            type="button"
            onClick={onToggle}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            className="hover:bg-raised relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors"
          >
            <span className={cn("bg-ink ease-entrance absolute h-px w-3.5 transition-transform duration-300", isOpen ? "rotate-45" : "-translate-y-0.75")} />
            <span className={cn("bg-ink ease-entrance absolute h-px w-3.5 transition-transform duration-300", isOpen ? "-rotate-45" : "translate-y-0.75")} />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "ease-entrance grid transition-[grid-template-rows,opacity] duration-300",
          isOpen ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <nav aria-label="Primary" className="border-line divide-line flex flex-col divide-y border-t">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={resolveHref(link.href, link.isAnchor)}
                onClick={(event) => onAnchorClick(event, link.href, link.isAnchor)}
                tabIndex={isOpen ? undefined : -1}
                className="text-ink hover:bg-raised flex items-center justify-between px-4 py-3 text-[15px] transition-colors"
              >
                {link.label}
                <span className="text-ink-faint font-mono text-[11px]" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
