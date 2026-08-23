"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/social-icons.ui";
import { CAL_LINK } from "@/components/shared/cal-embed.shared";
import type { NavbarActionsPropsType } from "@/types";

export function NavbarActionsPart({
  variant = "default",
  onOpenContact,
  onOpenBooking,
  className,
}: NavbarActionsPropsType) {
  const isCompact = variant === "compact";

  return (
    <div
      className={cn(
        "flex items-center",
        isCompact ? "gap-1.5" : "gap-2 animate-nav-pop-in",
        className,
      )}
    >
      {/* Email action */}
      <button
        type="button"
        onClick={onOpenContact}
        data-cursor="grow"
        aria-label="Send email"
        title="Send email"
        className={cn(
          "group relative flex cursor-pointer items-center justify-center rounded-full bg-black text-white transition-all duration-200 active:scale-95",
          isCompact
            ? "h-7.5 w-7.5 shadow-xs hover:scale-105"
            : "h-9 w-9 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(0,0,0,0.18)] hover:scale-105 hover:bg-[#1a1a1a]",
        )}
      >
        <Icons.Mail
          className={cn(
            "text-white transition-transform duration-200 group-hover:scale-110",
            isCompact ? "h-3.5 w-3.5" : "h-4 w-4",
          )}
        />
      </button>

      {/* Book a call action */}
      <button
        type="button"
        data-cal-link={CAL_LINK}
        data-cal-config='{"layout":"month_view"}'
        onClick={onOpenBooking}
        data-cursor="grow"
        aria-label="Book a call"
        title="Book a call"
        className={cn(
          "group relative flex cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-black transition-all duration-200 active:scale-95",
          isCompact
            ? "h-7.5 w-7.5 shadow-xs hover:scale-105"
            : "h-9 w-9 shadow-[0_2px_6px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1)] hover:scale-105 hover:bg-gray-50",
        )}
      >
        <Icons.Calendar
          className={cn(
            "text-black transition-transform duration-200 group-hover:scale-110",
            isCompact ? "h-3.5 w-3.5" : "h-4 w-4",
          )}
        />
      </button>
    </div>
  );
}
