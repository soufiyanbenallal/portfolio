"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NavbarActionsPart } from "./navbar-actions.part";
import type { NavbarMobilePropsType } from "@/types";

const AVATAR = "/images/profile.jpeg";

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
          "flex flex-col overflow-hidden rounded-[24px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isPastHero ? "px-1.5 py-1" : "px-1.5 py-1"
        )}
      >
        {/* Top Header Row */}
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isPastHero ? "gap-2 px-1.5 py-1" : "gap-3 px-2 py-1.5"
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
                "border-gray-30 relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border transition-all duration-200 group-hover:scale-105 active:scale-95",
                isOpen ? "scale-105 border-black ring-2 ring-black/25" : "hover:border-gray-50"
              )}
            >
              <Image
                src={AVATAR}
                alt="Soufiyan Benallal"
                fill
                sizes="28px"
                className="object-cover"
              />
            </span>

            {/* Name collapses on scroll past hero to save mobile space */}
            <span
              className={cn(
                "overflow-hidden text-sm font-medium tracking-tight whitespace-nowrap text-black transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isPastHero
                  ? "pointer-events-none max-w-0 -translate-x-2 opacity-0"
                  : "max-w-[160px] translate-x-0 pr-1 opacity-100"
              )}
            >
              Soufiyan Benallal
            </span>
          </button>

          {/* Quick Actions past hero with smooth entrance transition */}
          <div
            className={cn(
              "flex items-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isPastHero
                ? "max-w-[120px] translate-x-0 scale-100 opacity-100"
                : "pointer-events-none max-w-0 translate-x-3 scale-75 overflow-hidden opacity-0"
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
            isOpen ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div className="border-gray-20 flex flex-col gap-3 border-t px-4 pt-3 pb-3.5">
              {navLinks.map((link, index) => (
                <div
                  key={link.label}
                  className={cn(
                    "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
                  )}
                  style={{
                    transitionDelay: isOpen ? `${50 + index * 40}ms` : "0ms",
                  }}
                >
                  <Link
                    href={resolveHref(link.href, link.isAnchor)}
                    onClick={(event) => onAnchorClick(event, link.href, link.isAnchor)}
                    className="hover:text-gray-60 block py-1 text-base font-medium text-black transition-colors"
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
