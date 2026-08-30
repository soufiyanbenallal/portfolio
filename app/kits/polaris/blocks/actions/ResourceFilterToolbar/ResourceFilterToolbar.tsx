"use client";

import React from "react";
import { FilterChip } from "./partials/FilterChip.part";

export type FilterCategoryOptionType = {
  value: string;
  label: string;
};

export type FilterCategoryItemType = {
  id: string;
  label: string;
  options: FilterCategoryOptionType[];
};

export type ActiveFilterItemType = {
  categoryId: string;
  categoryLabel: string;
  value: string;
  label: string;
};

export type ResourceFilterToolbarPropsType = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filterCategories?: FilterCategoryItemType[];
  activeFilters: ActiveFilterItemType[];
  onAddFilter?: (filter: ActiveFilterItemType) => void;
  onRemoveFilter: (filter: ActiveFilterItemType) => void;
  onClearAllFilters: () => void;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: string;
  };
  totalCount?: number;
  className?: string;
};

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
}: ResourceFilterToolbarPropsType) {
  return (
    <s-stack direction="block" gap="base">
      {/* Top Search & Filter Bar */}
      <s-stack direction="inline" justifyContent="space-between" alignItems="center">
        {/* Left Side: Search + Filter Popover */}
        <s-stack direction="inline" gap="small-200" alignItems="center">
          <s-search-field
            value={searchValue}
            onInput={(e: any) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
          />

          {filterCategories.map((cat) => (
            <s-select
              key={cat.id}
              label={cat.label}
              onChange={(e: any) => {
                const opt = cat.options.find((o) => o.value === e.target.value);
                if (opt && onAddFilter) {
                  onAddFilter({
                    categoryId: cat.id,
                    categoryLabel: cat.label,
                    value: opt.value,
                    label: opt.label,
                  });
                }
              }}
            >
              <s-option value="">Filter by {cat.label}</s-option>
              {cat.options.map((opt) => (
                <s-option key={opt.value} value={opt.value}>
                  {opt.label}
                </s-option>
              ))}
            </s-select>
          ))}
        </s-stack>

        {/* Right Side: Total Count & Primary Action CTA */}
        <s-stack direction="inline" gap="small-200" alignItems="center">
          {typeof totalCount === "number" && <s-text tone="neutral">{totalCount} results</s-text>}

          {primaryAction && (
            <s-button variant="primary" onClick={primaryAction.onClick}>
              {primaryAction.label}
            </s-button>
          )}
        </s-stack>
      </s-stack>

      {/* Active Filter Chips Row */}
      {activeFilters.length > 0 && (
        <s-stack direction="inline" gap="small-200" alignItems="center">
          <s-text tone="neutral">Applied:</s-text>
          {activeFilters.map((filter) => (
            <FilterChip
              key={`${filter.categoryId}-${filter.value}`}
              filter={filter}
              onRemove={() => onRemoveFilter(filter)}
            />
          ))}
          <s-button variant="secondary" onClick={onClearAllFilters}>
            Clear all
          </s-button>
        </s-stack>
      )}
    </s-stack>
  );
}

export default ResourceFilterToolbar;
