import React from "react";
import { cn } from "@/lib/utils";

export type GridOverlayPropsType = {
  className?: string;
};

export function GridOverlay({ className }: GridOverlayPropsType) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-50 select-none",
        className
      )}
    >
      {/* ── Left Outer Margin: Minimalist Technical Diagonal Hatch Zone ── */}
      <div
        className="absolute top-0 bottom-0 left-0 hidden w-[calc((100vw-min(100vw,72rem))/2)] flex-col justify-between border-r-[0.5px] border-[#ccc] p-4 lg:flex"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #ccc, #ccc, transparent 0.5px, transparent 6px)",
        }}
      ></div>

      {/* ── Right Outer Margin: Minimalist Technical Diagonal Hatch Zone ── */}
      <div
        className="absolute top-0 right-0 bottom-0 hidden w-[calc((100vw-min(100vw,72rem))/2)] flex-col items-end justify-between border-l-[0.5px] border-[#ccc] p-4 lg:flex"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #ccc, #ccc, transparent 0.5px, transparent 6px)",
        }}
      ></div>
    </div>
  );
}
