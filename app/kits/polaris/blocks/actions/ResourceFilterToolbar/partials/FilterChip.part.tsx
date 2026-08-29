"use client";

import React from "react";
import type { ActiveFilterItemType } from "../types";

export type FilterChipPropsType = {
  filter: ActiveFilterItemType;
  onRemove: () => void;
};

export function FilterChip({ filter, onRemove }: FilterChipPropsType) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-muted text-foreground border border-border/80 transition-colors">
      <span className="text-muted-foreground font-medium">{filter.categoryLabel}:</span>
      <span className="font-semibold">{filter.label}</span>
      <button
        type="button"
        onClick={onRemove}
        className="p-0.5 hover:bg-background/80 rounded-full text-muted-foreground hover:text-foreground transition-colors"
        aria-label={`Remove filter ${filter.categoryLabel}: ${filter.label}`}
      >
        <svg className="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </span>
  );
}
