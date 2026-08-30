"use client";

import React from "react";
import { cn } from "@/lib/utils";

type AvailabilityBadgePropsType = {
  text?: string;
  className?: string;
};

export function AvailabilityBadgeUi({
  text = "Available for August'25",
  className,
}: AvailabilityBadgePropsType) {
  return (
    <div
      className={cn(
        "border-gray-30 inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 font-mono text-xs text-black shadow-xs select-none",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="bg-availability-green absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
        <span className="bg-availability-green relative inline-flex h-2 w-2 rounded-full" />
      </span>
      <span>{text}</span>
    </div>
  );
}

type TagBadgePropsType = {
  children: React.ReactNode;
  variant?: "light" | "dark" | "outline";
  className?: string;
};

export function TagBadgeUi({ children, variant = "light", className }: TagBadgePropsType) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
        variant === "light" && "bg-gray-10 text-gray-60 border-gray-30 border",
        variant === "dark" && "bg-black text-white",
        variant === "outline" && "border-gray-30 border bg-transparent text-black",
        className
      )}
    >
      {children}
    </span>
  );
}
