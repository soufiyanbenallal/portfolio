"use client";

import React, { useState } from "react";
import type { ResourceFilterToolbarPropsType, ActiveFilterItemType } from "./types";
import { FilterChip } from "./partials/FilterChip.part";

export function ResourceFilterToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Filter items...",
  filterCategories = [],
  activeFilters = [],
  onAddFilter,
  onRemoveFilter,
  onClearAllFilters,
  primaryAction,
  totalCount,
  className = "",
}: ResourceFilterToolbarPropsType) {
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  const handleSelectOption = (
    categoryId: string,
    categoryLabel: string,
    value: string,
    label: string
  ) => {
    // Check if already active
    const exists = activeFilters.some(
      (f) => f.categoryId === categoryId && f.value === value
    );
    if (!exists && onAddFilter) {
      onAddFilter({ categoryId, categoryLabel, value, label });
    }
    setFilterDropdownOpen(false);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Top Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Left Side: Search + Filter Popover */}
        <div className="flex items-center gap-2 flex-1 max-w-xl">
          {/* Search Box */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-8 py-2 text-xs rounded-lg border border-border bg-card focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors placeholder:text-muted-foreground/60"
            />
            {searchValue && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-muted-foreground hover:text-foreground"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Filter Categories Popover Toggle */}
          {filterCategories.length > 0 && (
            <div className="relative">
              <s-button
                variant="secondary"
                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                icon="filter"
              >
                Filters {activeFilters.length > 0 ? `(${activeFilters.length})` : ""}
              </s-button>

              {filterDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setFilterDropdownOpen(false)}
                  />
                  <div className="absolute right-0 sm:left-0 sm:right-auto mt-2 w-56 rounded-xl border border-border bg-card shadow-lg z-30 p-2 space-y-3 animate-in fade-in zoom-in-95 duration-150">
                    {filterCategories.map((cat) => (
                      <div key={cat.id} className="space-y-1">
                        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-2 block">
                          {cat.label}
                        </span>
                        <div className="space-y-0.5">
                          {cat.options.map((opt) => {
                            const isSelected = activeFilters.some(
                              (f) => f.categoryId === cat.id && f.value === opt.value
                            );
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() =>
                                  handleSelectOption(cat.id, cat.label, opt.value, opt.label)
                                }
                                className={`w-full text-left px-2 py-1.5 rounded-md text-xs flex items-center justify-between transition-colors ${
                                  isSelected
                                    ? "bg-primary/10 text-primary font-semibold"
                                    : "text-foreground hover:bg-muted"
                                }`}
                              >
                                <span>{opt.label}</span>
                                {isSelected && (
                                  <svg className="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Total Count & Primary Action CTA */}
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
          {typeof totalCount === "number" && (
            <span className="text-xs text-muted-foreground hidden md:inline-block">
              {totalCount} results
            </span>
          )}

          {primaryAction && (
            <s-button variant="primary" onClick={primaryAction.onClick}>
              {primaryAction.label}
            </s-button>
          )}
        </div>
      </div>

      {/* Active Filter Chips Row */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="text-xs text-muted-foreground font-medium">Applied:</span>
          {activeFilters.map((filter) => (
            <FilterChip
              key={`${filter.categoryId}-${filter.value}`}
              filter={filter}
              onRemove={() => onRemoveFilter(filter)}
            />
          ))}
          <button
            type="button"
            onClick={onClearAllFilters}
            className="text-xs text-primary hover:underline font-medium ml-1"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}

export * from "./types";
