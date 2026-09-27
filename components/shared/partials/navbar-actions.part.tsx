"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/social-icons.ui";
import { CAL_LINK } from "@/components/shared/cal-embed.shared";
import { Reveal } from "./navbar-reveal.part";
import type { NavbarActionsPropsType } from "@/types";

/**
 * The pill's actions. Expanded, they carry their labels; collapsed, only
 * their icons remain — the labels fold away rather than the buttons
 * disappearing, so the pill shrinks around the same two targets.
 */
export function NavbarActionsPart({
  collapsed,
  showPrimary,
  onOpenContact,
  className,
}: NavbarActionsPropsType) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <button
        type="button"
        onClick={onOpenContact}
        data-cursor="grow"
        aria-label="Contact"
        className="text-ink-muted hover:text-ink hover:bg-raised flex size-7 cursor-pointer items-center justify-center rounded-full transition-colors"
      >
        <Icons.Mail className="h-3.5 w-3.5 shrink-0" />
      </button>

      <button
        type="button"
        data-cal-link={CAL_LINK}
        data-cal-config='{"layout":"month_view"}'
        data-cursor="grow"
        aria-label="Book a call"
        className="animate-nav-pop-in bg-ink hover:bg-ink-2 flex size-7 cursor-pointer items-center justify-center rounded-full text-white transition-colors"
      >
        <Icons.Calendar className="h-3.5 w-3.5 shrink-0" />
      </button>
    </div>
  );
}
