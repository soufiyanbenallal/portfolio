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
        "pointer-events-none fixed inset-0 z-0 select-none overflow-hidden opacity-10",
        className
      )}
    >
      {/* ── Continuous Global SVG Grid Pattern (32px cells + '+' crosshairs) ── */}
      {/* <svg
        className="absolute inset-0 h-full w-full stroke-slate-900/[0.4]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="editorial-global-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
            x="50%"
            y="0"
          >
            <path
              d="M.5 32V.5H32"
              fill="none"
              strokeWidth="1"
            />
            <path
              d="M-2.5 0h5M0 -2.5v5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="stroke-slate-900/[0.8]"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#editorial-global-grid)"
        />
      </svg> */}

      {/* ── Left Outer Margin: Minimalist Technical Diagonal Hatch Zone ── */}
      <div
        className="absolute top-0 bottom-0 left-0 w-[calc((100vw-min(100vw,72rem))/2)] hidden 2xl:flex flex-col justify-between p-4 border-r border-slate-900"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, rgba(15,23,42,1), rgba(15,23,42,1) 0.5px, transparent 1px, transparent 10px)",
        }}
      >
        
      </div>

      {/* ── Right Outer Margin: Minimalist Technical Diagonal Hatch Zone ── */}
      <div
        className="absolute top-0 bottom-0 right-0 w-[calc((100vw-min(100vw,72rem))/2)] hidden 2xl:flex flex-col justify-between items-end p-4 border-l border-slate-900"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(15,23,42,1), rgba(15,23,42,1) 0.5px, transparent 1px, transparent 10px)",
        }}
      >
      
      </div>

      
    </div>
  );
}
