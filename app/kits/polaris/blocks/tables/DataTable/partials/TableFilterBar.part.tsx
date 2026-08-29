"use client";

import React, { type ReactNode } from "react";
import type { TableTabItemType } from "../types";

export type TableFilterBarPropsType = {
  tabs?: TableTabItemType[];
  selectedTab?: string;
  onTabChange?: (tabId: string) => void;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  onCancelSearch?: () => void;
  onSaveView?: () => void;
  onSortClick?: () => void;
  rightActions?: ReactNode;
};

export function TableFilterBarPart({
  tabs,
  selectedTab,
  onTabChange,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search by name, product, or order...",
  onCancelSearch,
  onSaveView,
  onSortClick,
  rightActions,
}: TableFilterBarPropsType): ReactNode {
  return (
    <s-stack direction="block" gap="small-200">
      {/* Tabs Row */}
      {tabs && tabs.length > 0 && (
        <s-stack direction="inline" justifyContent="space-between" alignItems="center">
          <s-stack direction="inline" gap="small-200" alignItems="center">
            {tabs.map((t) => {
              const isActive = (selectedTab || tabs[0].id) === t.id;
              return (
                <s-button
                  key={t.id}
                  variant={isActive ? "primary" : "secondary"}
                  onClick={() => onTabChange?.(t.id)}
                >
                  {t.label}
                  {t.badge !== undefined && ` (${t.badge})`}
                </s-button>
              );
            })}
          </s-stack>

          {rightActions && (
            <s-stack direction="inline" gap="small-200" alignItems="center">
              {rightActions}
            </s-stack>
          )}
        </s-stack>
      )}

      {/* Search and Quick Actions Bar */}
      <s-stack direction="inline" justifyContent="space-between" alignItems="center" gap="small-200">
        <div style={{ flex: 1 }}>
          <s-search-field
            value={searchValue}
            placeholder={searchPlaceholder}
            onInput={(e: any) => onSearchChange?.(e.target.value)}
          />
        </div>

        <s-stack direction="inline" gap="small-200" alignItems="center">
          {searchValue && (
            <s-button
              variant="tertiary"
              onClick={() => {
                onSearchChange?.("");
                onCancelSearch?.();
              }}
            >
              Cancel
            </s-button>
          )}

          {onSaveView && (
            <s-button variant="secondary" onClick={onSaveView}>
              Save as
            </s-button>
          )}

          {onSortClick && (
            <s-button
              variant="secondary"
              icon="sort"
              onClick={onSortClick}
            />
          )}
        </s-stack>
      </s-stack>
    </s-stack>
  );
}

export default TableFilterBarPart;
