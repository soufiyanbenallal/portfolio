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
        "pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-10 select-none",
        className
      )}
    >
      {/* ── Left Outer Margin: Minimalist Technical Diagonal Hatch Zone ── */}
      <div
        className="absolute top-0 bottom-0 left-0 hidden w-[calc((100vw-min(100vw,72rem))/2)] flex-col justify-between border-r border-slate-900 p-4 2xl:flex"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, rgba(15,23,42,1), rgba(15,23,42,1) 0.5px, transparent 1px, transparent 10px)",
        }}
      ></div>

      {/* ── Right Outer Margin: Minimalist Technical Diagonal Hatch Zone ── */}
      <div
        className="absolute top-0 right-0 bottom-0 hidden w-[calc((100vw-min(100vw,72rem))/2)] flex-col items-end justify-between border-l border-slate-900 p-4 2xl:flex"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(15,23,42,1), rgba(15,23,42,1) 0.5px, transparent 1px, transparent 10px)",
        }}
      ></div>
    </div>
  );
}
