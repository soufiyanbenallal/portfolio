import React from "react";
import { cn } from "@/lib/utils";

/**
 * Folds inline content to zero width and back. A `0fr → 1fr` grid track
 * animates to the content's natural width, so the pill resizes smoothly
 * around whatever is inside without measuring anything.
 */
export function Reveal({
  open,
  children,
  className,
}: {
  open: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden={!open}
      className={cn(
        "ease-entrance grid transition-[grid-template-columns,opacity] duration-500",
        open ? "grid-cols-[1fr] opacity-100" : "pointer-events-none grid-cols-[0fr] opacity-0",
        className
      )}
    >
      <span className="min-w-0 overflow-hidden whitespace-nowrap">{children}</span>
    </span>
  );
}
