"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NavbarActionsPart } from "./navbar-actions.part";
import type { NavbarMobilePropsType } from "@/types";

const AVATAR =
  "https://framerusercontent.com/images/pKKKvDTDIMbGXt4SKNGc5PEgrkU.jpg?width=64&height=64";

export function NavbarMobilePart({
  isPastHero,
  isOpen,
  navLinks,
  onToggle,
  onClose,
  onAnchorClick,
  onOpenContact,
  onOpenBooking,
  resolveHref,
}: NavbarMobilePropsType) {
  return (
    <div className="md:hidden">
      <div
        className={cn(
          "flex flex-col overflow-hidden rounded-[24px] border border-gray-30 bg-white/85 shadow-sm backdrop-blur-lg transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isPastHero ? "px-1.5 py-1" : "px-1.5 py-1",
        )}
      >
        {/* Top Header Row */}
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isPastHero ? "gap-2 px-1.5 py-1" : "gap-3 px-2 py-1.5",
          )}
        >
          {/* Avatar button that toggles the menu, with collapsible name */}
          <button
            type="button"
            onClick={onToggle}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            className="group flex cursor-pointer items-center gap-2 rounded-full select-none focus:outline-none"
          >
            <span
              className={cn(
                "relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-30 transition-all duration-200 active:scale-95 group-hover:scale-105",
                isOpen
                  ? "ring-2 ring-black/25 border-black scale-105"
                  : "hover:border-gray-50",
              )}
            >
              <Image
                src={AVATAR}
                alt="Joseph Alexander"
                fill
                sizes="28px"
                className="object-cover"
              />
            </span>

            {/* Name collapses on scroll past hero to save mobile space */}
            <span
              className={cn(
                "whitespace-nowrap text-sm font-medium tracking-tight text-black transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden",
                isPastHero
                  ? "max-w-0 opacity-0 -translate-x-2 pointer-events-none"
                  : "max-w-[160px] opacity-100 translate-x-0 pr-1",
              )}
            >
              Joseph Alexander
            </span>
          </button>

          {/* Quick Actions past hero with smooth entrance transition */}
          <div
            className={cn(
              "flex items-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isPastHero
                ? "scale-100 opacity-100 max-w-[120px] translate-x-0"
                : "scale-75 opacity-0 max-w-0 overflow-hidden pointer-events-none translate-x-3",
            )}
          >
            <NavbarActionsPart
              variant="compact"
              onOpenContact={onOpenContact}
              onOpenBooking={onOpenBooking}
            />
          </div>
        </div>

        {/* Collapsible Mobile Menu with native CSS Grid animation */}
        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0 pointer-events-none",
          )}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-3 border-t border-gray-20 px-4 pb-3.5 pt-3">
              {navLinks.map((link, index) => (
                <div
                  key={link.label}
                  className={cn(
                    "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-3 opacity-0",
                  )}
                  style={{
                    transitionDelay: isOpen ? `${50 + index * 40}ms` : "0ms",
                  }}
                >
                  <Link
                    href={resolveHref(link.href, link.isAnchor)}
                    onClick={(event) =>
                      onAnchorClick(event, link.href, link.isAnchor)
                    }
                    className="block py-1 text-base font-medium text-black transition-colors hover:text-gray-60"
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
