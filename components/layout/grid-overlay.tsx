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
        "pointer-events-none fixed inset-0 z-0 select-none overflow-hidden",
        className
      )}
    >
      {/* ── Continuous Global SVG Grid Pattern (32px cells + '+' crosshairs) ── */}
      <svg
        className="absolute inset-0 h-full w-full stroke-slate-900/[0.04] dark:stroke-white/[0.035]"
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
            {/* 32px Square Grid lines */}
            <path
              d="M.5 32V.5H32"
              fill="none"
              strokeWidth="1"
            />
            {/* Subtle '+' Crosshair at every 32px intersection */}
            <path
              d="M-2.5 0h5M0 -2.5v5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="stroke-slate-900/[0.08] dark:stroke-white/[0.07]"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#editorial-global-grid)"
        />
      </svg>

      {/* ── Left Outer Margin: Minimalist Technical Diagonal Hatch Zone ── */}
      <div
        className="absolute top-0 bottom-0 left-0 w-[calc((100vw-min(100vw,72rem))/2)] hidden 2xl:flex flex-col justify-between p-4 border-r border-slate-900/[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, rgba(15,23,42,0.02), rgba(15,23,42,0.02) 1px, transparent 1px, transparent 10px)",
        }}
      >
        <div className="flex items-center gap-2 text-[9px] font-mono text-slate-400/40 uppercase tracking-widest">
          <span className="w-1 h-1 rounded-full bg-slate-400/40" />
          <span>GTR_L // FORBIDDEN_ZONE</span>
        </div>
        <div className="text-[9px] font-mono text-slate-400/30 rotate-90 origin-bottom-left tracking-widest">
          LAT: 51.5074° N · 0.1278° W
        </div>
      </div>

      {/* ── Right Outer Margin: Minimalist Technical Diagonal Hatch Zone ── */}
      <div
        className="absolute top-0 bottom-0 right-0 w-[calc((100vw-min(100vw,72rem))/2)] hidden 2xl:flex flex-col justify-between items-end p-4 border-l border-slate-900/[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(15,23,42,0.02), rgba(15,23,42,0.02) 1px, transparent 1px, transparent 10px)",
        }}
      >
        <div className="flex items-center gap-2 text-[9px] font-mono text-slate-400/40 uppercase tracking-widest">
          <span>GTR_R // FORBIDDEN_ZONE</span>
          <span className="w-1 h-1 rounded-full bg-slate-400/40" />
        </div>
        <div className="text-[9px] font-mono text-slate-400/30 -rotate-90 origin-bottom-right tracking-widest">
          SYS // EDITORIAL_GRID
        </div>
      </div>

      
    </div>
  );
}
