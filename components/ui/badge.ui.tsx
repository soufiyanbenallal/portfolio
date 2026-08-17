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
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-30 shadow-xs text-xs font-mono text-black select-none",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-availability-green opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-availability-green" />
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

export function TagBadgeUi({
  children,
  variant = "light",
  className,
}: TagBadgePropsType) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
        variant === "light" && "bg-gray-10 text-gray-60 border border-gray-30",
        variant === "dark" && "bg-black text-white",
        variant === "outline" && "bg-transparent text-black border border-gray-30",
        className
      )}
    >
      {children}
    </span>
  );
}
