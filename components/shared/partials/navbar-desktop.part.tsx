"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NavbarActionsPart } from "./navbar-actions.part";
import type { NavbarDesktopPropsType } from "@/types";

const AVATAR =
  "https://framerusercontent.com/images/pKKKvDTDIMbGXt4SKNGc5PEgrkU.jpg?width=64&height=64";

export function NavbarDesktopPart({
  isPastHero,
  navLinks,
  activeSection,
  isHomepage,
  onAnchorClick,
  onOpenContact,
  onOpenBooking,
  resolveHref,
}: NavbarDesktopPropsType) {
  return (
    <nav
      className={cn(
        "hidden items-center rounded-[32px] text-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none md:flex",
        isPastHero ? "gap-4 px-2.5 py-1.5 pl-3.5" : "gap-12 px-4 py-2.5 lg:gap-16"
      )}
    >
      <Link
        href="/"
        onClick={(event) => onAnchorClick(event, "#hero", true)}
        className="group flex items-center gap-2.5"
      >
        <span className="border-gray-30 relative h-7 w-7 shrink-0 overflow-hidden rounded-full border">
          <Image
            src={AVATAR}
            alt="Joseph Alexander"
            fill
            sizes="28px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </span>
        <span className="text-sm font-medium tracking-tight whitespace-nowrap text-black transition-colors duration-200">
          Joseph Alexander
        </span>
      </Link>

      {!isPastHero ? (
        <div className="animate-nav-fade-in flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = isHomepage && link.isAnchor && link.href.slice(1) === activeSection;

            return (
              <Link
                key={link.label}
                href={resolveHref(link.href, link.isAnchor)}
                onClick={(event) => onAnchorClick(event, link.href, link.isAnchor)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gray-20 text-black shadow-2xs"
                    : "text-gray-60 hover:bg-gray-10/70 hover:text-black"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      ) : (
        <NavbarActionsPart
          variant="default"
          onOpenContact={onOpenContact}
          onOpenBooking={onOpenBooking}
        />
      )}
    </nav>
  );
}
