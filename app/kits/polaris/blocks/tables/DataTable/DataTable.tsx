"use client";

import React, { useState, useMemo, type ReactNode } from "react";
import type { DataTablePropsType } from "./types";
import { Card } from "@/app/kits/polaris/ui/layouts/Card";
import { TableHeaderCellPart } from "./partials/TableHeaderCell.part";
import { TableRowPart } from "./partials/TableRow.part";
import { TableFilterBarPart } from "./partials/TableFilterBar.part";
import { TableActiveFiltersPart } from "./partials/TableActiveFilters.part";

export function DataTable<T = any>({
  title,
  tooltipContent,
  description,
  columns,
  rows = [],
  selectable = false,
  selectedRowIds = [],
  onSelectionChange,
  tabs,
  selectedTab,
  onTabChange,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  filterCategories,
  activeFilters,
  onAddFilter,
  onRemoveFilter,
  onClearAllFilters,
  onCancelSearch,
  onSaveView,
  onSortClick,
  rightActions,
  emptyStateHeading = "No records found",
  emptyStateMessage = "Try adjusting your search or active filters to find what you are looking for.",
  id,
}: DataTablePropsType<T>): ReactNode {
  const [internalSelectedIds, setInternalSelectedIds] = useState<(string | number)[]>(selectedRowIds);

  const currentSelectedIds = onSelectionChange ? selectedRowIds : internalSelectedIds;

  const handleToggleSelect = (rowId: string | number) => {
    const next = currentSelectedIds.includes(rowId)
      ? currentSelectedIds.filter((id) => id !== rowId)
      : [...currentSelectedIds, rowId];

    if (onSelectionChange) {
      onSelectionChange(next);
    } else {
      setInternalSelectedIds(next);
    }
  };

  const allSelected = useMemo(() => {
    if (rows.length === 0) return false;
    return rows.every((r) => currentSelectedIds.includes(r.id));
  }, [rows, currentSelectedIds]);

  const handleSelectAll = () => {
    const next = allSelected ? [] : rows.map((r) => r.id);
    if (onSelectionChange) {
      onSelectionChange(next);
    } else {
      setInternalSelectedIds(next);
    }
  };

  const hasRowActions = useMemo(() => {
    return rows.some((r) => r.actions && r.actions.length > 0);
  }, [rows]);

  const hasFilterBar = Boolean(tabs || searchValue !== undefined || searchPlaceholder || onSearchChange);
  const hasActiveFilters = Boolean((activeFilters && activeFilters.length > 0) || (filterCategories && filterCategories.length > 0));

  return (
    <Card
      id={id}
      title={title}
      tooltipContent={tooltipContent}
      description={description}
      rightActions={rightActions}
      padding="base"
    >
      <s-stack direction="block" gap="base">
        {/* Search, Tabs, & Quick Action Bar */}
        {hasFilterBar && (
          <TableFilterBarPart
            tabs={tabs}
            selectedTab={selectedTab}
            onTabChange={onTabChange}
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            searchPlaceholder={searchPlaceholder}
            onCancelSearch={onCancelSearch}
            onSaveView={onSaveView}
            onSortClick={onSortClick}
          />
        )}

        {/* Active Filter Chips & Add Filter Button */}
        {hasActiveFilters && (
          <TableActiveFiltersPart
            activeFilters={activeFilters}
            filterCategories={filterCategories}
            onAddFilter={onAddFilter}
            onRemoveFilter={onRemoveFilter}
            onClearAll={onClearAllFilters}
          />
        )}

        {/* Polaris Table Container */}
        {rows.length > 0 ? (
          <div style={{ overflowX: "auto", width: "100%" }}>
            <s-table>
              <s-table-header-row>
                {selectable && (
                  <s-table-header>
                    <s-checkbox
                      checked={allSelected}
                      onChange={handleSelectAll}
                    />
                  </s-table-header>
                )}

                {columns.map((col) => (
                  <TableHeaderCellPart key={col.id} column={col} />
                ))}

                {hasRowActions && (
                  <s-table-header>
                    <s-text type="strong">Actions</s-text>
                  </s-table-header>
                )}
              </s-table-header-row>

              <s-table-body>
                {rows.map((row, idx) => (
                  <TableRowPart
                    key={row.id}
                    row={row}
                    columns={columns}
                    index={idx}
                    selectable={selectable}
                    isSelected={currentSelectedIds.includes(row.id)}
                    onToggleSelect={handleToggleSelect}
                  />
                ))}
              </s-table-body>
            </s-table>
          </div>
        ) : (
          /* Empty State */
          <s-box padding="large-100">
            <s-stack direction="block" gap="small-200" alignItems="center">
              <s-icon type="search" tone="neutral" />
              <s-text type="strong">{emptyStateHeading}</s-text>
              <s-text tone="neutral">{emptyStateMessage}</s-text>
              {(onClearAllFilters || onSearchChange) && (
                <s-button
                  variant="secondary"
                  onClick={() => {
                    onSearchChange?.("");
                    onClearAllFilters?.();
                  }}
                >
                  Reset filters
                </s-button>
              )}
            </s-stack>
          </s-box>
        )}
      </s-stack>
    </Card>
  );
}

export * from "./types";
export default DataTable;
