"use client";

import React, { useState, type ReactNode } from "react";
import type { TableActiveFilterItemType, TableFilterCategoryType } from "../types";

export type TableActiveFiltersPropsType = {
  activeFilters?: TableActiveFilterItemType[];
  filterCategories?: TableFilterCategoryType[];
  onAddFilter?: (filter: TableActiveFilterItemType) => void;
  onRemoveFilter?: (filter: TableActiveFilterItemType) => void;
  onClearAll?: () => void;
};

export function TableActiveFiltersPart({
  activeFilters = [],
  filterCategories = [],
  onAddFilter,
  onRemoveFilter,
  onClearAll,
}: TableActiveFiltersPropsType): ReactNode {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TableFilterCategoryType | null>(null);

  const hasFilters = activeFilters.length > 0;
  const hasCategories = filterCategories.length > 0;

  if (!hasFilters && !hasCategories) return null;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
      {/* Active Filter Chips */}
      {activeFilters.map((filter) => (
        <div
          key={filter.id}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "#f1f2f3",
            borderRadius: "6px",
            padding: "4px 8px",
            fontSize: "13px",
            color: "#202223",
          }}
        >
          <span>{filter.label}</span>
          <button
            type="button"
            onClick={() => onRemoveFilter?.(filter)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0 2px",
              fontWeight: "bold",
              color: "#6d7175",
            }}
          >
            ×
          </button>
        </div>
      ))}

      {/* Add filter button & Popover */}
      {hasCategories && (
        <div style={{ position: "relative", display: "inline-block" }}>
          <s-button
            variant="secondary"
            icon="plus"
            onClick={() => {
              setPopoverOpen((prev) => !prev);
              setSelectedCategory(null);
            }}
          >
            Add filter
          </s-button>

          {popoverOpen && (
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "100%",
                zIndex: 50,
                marginTop: "4px",
                minWidth: "200px",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)",
                border: "1px solid #e5e7eb",
                padding: "8px",
              }}
            >
              {!selectedCategory ? (
                /* Category Selection */
                <s-stack direction="block" gap="small-200">
                  <s-text type="strong">Filter by</s-text>
                  {filterCategories.map((cat) => (
                    <s-button
                      key={cat.id}
                      variant="tertiary"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat.label}
                    </s-button>
                  ))}
                </s-stack>
              ) : (
                /* Option Selection */
                <s-stack direction="block" gap="small-200">
                  <s-stack direction="inline" justifyContent="space-between" alignItems="center">
                    <s-button
                      variant="tertiary"
                      icon="chevron-left"
                      onClick={() => setSelectedCategory(null)}
                    />
                    <s-text type="strong">{selectedCategory.label}</s-text>
                  </s-stack>
                  <s-divider />
                  {selectedCategory.options.map((opt) => (
                    <s-button
                      key={opt.value}
                      variant="tertiary"
                      onClick={() => {
                        onAddFilter?.({
                          id: `${selectedCategory.id}-${opt.value}`,
                          categoryId: selectedCategory.id,
                          categoryLabel: selectedCategory.label,
                          label: `${selectedCategory.label}: ${opt.label}`,
                          value: opt.value,
                        });
                        setPopoverOpen(false);
                        setSelectedCategory(null);
                      }}
                    >
                      {opt.label}
                    </s-button>
                  ))}
                </s-stack>
              )}
            </div>
          )}
        </div>
      )}

      {/* Clear All button */}
      {hasFilters && (
        <s-button
          variant="tertiary"
          onClick={onClearAll}
        >
          Clear all
        </s-button>
      )}
    </div>
  );
}

export default TableActiveFiltersPart;
