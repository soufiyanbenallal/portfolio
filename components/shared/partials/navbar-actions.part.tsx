"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/social-icons.ui";
import { CAL_LINK } from "@/components/shared/cal-embed.shared";
import type { NavbarActionsPropsType } from "@/types";
import { ButtonUi } from "@/components/ui/button.ui";

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
        isCompact ? "gap-1.5" : "animate-nav-pop-in gap-2",
        className
      )}
    >
      {/* Email action */}
      <ButtonUi
        type="button"
        size="icon-sm"
        onClick={onOpenContact}
        data-cursor="grow"
        aria-label="Send email"
        title="Send email"
      >
        <Icons.Mail
          className={cn(
            "text-white transition-transform duration-200 group-hover:scale-110",
            isCompact ? "h-3.5 w-3.5" : "h-4 w-4"
          )}
        />
      </ButtonUi>

      {/* Book a call action */}
      <ButtonUi
        type="button"
        data-cal-link={CAL_LINK}
        data-cal-config='{"layout":"month_view"}'
        onClick={onOpenBooking}
        data-cursor="grow"
        aria-label="Book a call"
        title="Book a call"
        size="icon-sm"
        variant="secondary"
      >
        <Icons.Calendar
          className={cn(
            "text-black transition-transform duration-200 group-hover:scale-110",
            isCompact ? "h-3.5 w-3.5" : "h-4 w-4"
          )}
        />
      </ButtonUi>
    </div>
  );
}
