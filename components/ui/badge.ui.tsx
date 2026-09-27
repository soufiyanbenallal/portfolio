"use client";

import React from "react";
import { cn } from "@/lib/utils";

type AvailabilityBadgePropsType = {
  text?: string;
  className?: string;
};

/**
 * Line Grid "announcement pill": no border, no fill — a status dot and
 * 13px muted text. Green is a status colour, not the accent. Static on
 * purpose: the page's one ambient motion is the beam.
 */
export function AvailabilityBadgeUi({
  text = "Available for new projects",
  className,
}: AvailabilityBadgePropsType) {
  return (
    <div
      className={cn(
        "text-ink-muted inline-flex items-center gap-2 text-[13px] select-none",
        className
      )}
    >
      <span className="bg-green h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
}

type TagBadgePropsType = {
  children: React.ReactNode;
  variant?: "light" | "dark" | "outline";
  className?: string;
};

/** Chip: 6px radius, hairline edge, mono meta text. */
export function TagBadgeUi({ children, variant = "light", className }: TagBadgePropsType) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[6px] px-2 py-0.5 font-mono text-[11px] transition-colors",
        variant === "light" && "border-line-2 bg-surface text-ink-muted border",
        variant === "dark" && "bg-ink text-white",
        variant === "outline" && "border-line-2 text-ink border bg-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
