"use client";

import React, { useState, Fragment, useMemo, useId, type ReactNode, type JSX } from "react";
import { Content } from "../typography/Content";

export type TableColumnAlignType = "start" | "center" | "end";
export type TableColumnFormatType = JSX.IntrinsicElements["s-table-header"]["format"];
export type TableButtonCommandType = JSX.IntrinsicElements["s-button"]["command"];

export type TableColumnType<T = any> = {
  id: string;
  title: ReactNode;
  tooltip?: ReactNode;
  format?: TableColumnFormatType;
  listSlot?: "primary" | "secondary";
  align?: TableColumnAlignType;
  width?: string;
  renderCell: (data: T, index: number, isSubRow?: boolean) => ReactNode;
};

export type TableTableRowActionType = {
  id: string;
  label: string;
  icon?: string;
  destructive?: boolean;
  section?: string;
  onClick: (row: any) => void;
};

export type TableRowActionType = TableTableRowActionType;

export type TableRowType<T = any> = {
  id: string | number;
  data: T;
  subRows?: TableRowType<T>[];
  selected?: boolean;
  disabled?: boolean;
  actions?: TableTableRowActionType[];
};

export type TableBulkActionType = {
  id: string;
  label: string;
  icon?: string;
  destructive?: boolean;
  commandFor?: string;
  command?: TableButtonCommandType;
  onClick?: (selectedIds: (string | number)[]) => void;
};

export type TableRowPropsType = {
  row: TableRowType;
  columns: TableColumnType[];
  index: number;
  selectable?: boolean;
  isSelected?: boolean;
  onToggleSelect?: (id: string | number) => void;
  isSubRow?: boolean;
  defaultExpanded?: boolean;
};

export function Row({
  row,
  columns,
  index,
  selectable = false,
  isSelected = false,
  onToggleSelect,
  isSubRow = false,
  defaultExpanded = true,
}: TableRowPropsType): ReactNode {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [actionsOpen, setActionsOpen] = useState(false);
  const hasSubRows = Boolean(row.subRows && row.subRows.length > 0);
  const hasActions = Boolean(row.actions && row.actions.length > 0);
  const checkboxId = useId();

  return (
    <Fragment>
      <s-table-row clickDelegate={selectable && !isSubRow ? checkboxId : undefined}>
        {selectable && (
          <s-table-cell>
            {!isSubRow ? (
              <s-checkbox
                id={checkboxId}
                checked={isSelected}
                disabled={row.disabled}
                onChange={() => onToggleSelect?.(row.id)}
              />
            ) : (
              <div style={{ width: "20px" }} />
            )}
          </s-table-cell>
        )}

        {columns.map((col, colIdx) => {
          const isFirstCol = colIdx === 0;

          return (
            <s-table-cell key={col.id}>
              {isFirstCol ? (
                <s-stack direction="inline" gap="small-200" alignItems="center">
                  {hasSubRows && (
                    <s-button
                      variant="tertiary"
                      icon={expanded ? "chevron-down" : "chevron-right"}
                      onClick={(e) => {
                        e?.stopPropagation?.();
                        setExpanded((prev) => !prev);
                      }}
                    />
                  )}
                  {isSubRow && (
                    <div style={{ paddingLeft: "24px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <s-icon type="chevron-right" tone="neutral" />
                    </div>
                  )}
                  {col.renderCell(row.data, index, isSubRow)}
                </s-stack>
              ) : (
                col.renderCell(row.data, index, isSubRow)
              )}
            </s-table-cell>
          );
        })}

        {hasActions && (
          <s-table-cell>
            <div style={{ position: "relative", display: "inline-block" }}>
              <s-button
                variant="tertiary"
                icon="menu-horizontal"
                onClick={(e) => {
                  e?.stopPropagation?.();
                  setActionsOpen((prev) => !prev);
                }}
              />

              {actionsOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "100%",
                    zIndex: 50,
                    marginTop: "4px",
                    minWidth: "200px",
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)",
                    border: "1px solid #e5e7eb",
                    padding: "6px",
                  }}
                >
                  {row.actions?.map((act) => (
                    <div key={act.id} style={{ marginBottom: "2px" }}>
                      <s-button
                        variant="tertiary"
                        tone={act.destructive ? "critical" : "auto"}
                        icon={act.icon as any}
                        onClick={() => {
                          setActionsOpen(false);
                          act.onClick(row.data);
                        }}
                      >
                        {act.label}
                      </s-button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </s-table-cell>
        )}
      </s-table-row>

      {/* Sub-Rows recursive rendering */}
      {hasSubRows && expanded && row.subRows?.map((subRow, subIdx) => (
        <Row
          key={subRow.id}
          row={subRow}
          columns={columns}
          index={subIdx}
          selectable={selectable}
          isSelected={false}
          isSubRow={true}
        />
      ))}
    </Fragment>
  );
}

export type TablePropsType<T = any> = {
  columns: TableColumnType<T>[];
  rows: TableRowType<T>[];
  selectable?: boolean;
  selectedRowIds?: (string | number)[];
  onSelectionChange?: (selectedIds: (string | number)[]) => void;
  bulkActions?: TableBulkActionType[];
  bulkActionsSlot?: ReactNode;
  filters?: ReactNode;
  emptyStateHeading?: string;
  emptyStateMessage?: string;
  onResetFilters?: () => void;
  accessibilityLabel?: string;
};


export function Table<T = any>({
  columns,
  rows = [],
  selectable = false,
  selectedRowIds = [],
  onSelectionChange,
  bulkActions = [],
  bulkActionsSlot,
  filters,
  emptyStateHeading = "No records found",
  emptyStateMessage = "Try adjusting your search or active filters.",
  onResetFilters,
  accessibilityLabel = "Data table section",
}: TablePropsType<T>): ReactNode {
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

  return (
    <s-section padding="none" accessibilityLabel={accessibilityLabel}>
      <s-table>
        {/* Native Polaris Filters Slot */}
        {filters && <div slot="filters">{filters}</div>}

        {/* Native Polaris bulkActions Slot */}
        {(bulkActions.length > 0 || bulkActionsSlot) && (
          <s-stack slot={"bulkActions" as any} direction="inline" gap="small-200" alignItems="center">
            {bulkActionsSlot ?? (
              <Fragment>
                {bulkActions.map((action) => (
                  <s-button
                    key={action.id}
                    variant="secondary"
                    tone={action.destructive ? "critical" : "auto"}
                    icon={action.icon as any}
                    commandFor={action.commandFor as any}
                    command={action.command}
                    onClick={() => action.onClick?.(currentSelectedIds)}
                  >
                    {action.label}
                  </s-button>
                ))}
              </Fragment>
            )}
          </s-stack>
        )}

        {/* Table Header */}
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
            <s-table-header
              key={col.id}
              format={col.format}
              listSlot={col.listSlot}
            >
              <Content
                tooltip={col.tooltip}
                underline={Boolean(col.tooltip)}
              >
                {col.title}
              </Content>
            </s-table-header>
          ))}

          {hasRowActions && (
            <s-table-header>
              <s-text type="strong">Actions</s-text>
            </s-table-header>
          )}
        </s-table-header-row>

        {/* Table Body */}
        {rows.length > 0 ? (
          <s-table-body>
            {rows.map((row, idx) => (
              <Row
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
        ) : null}
      </s-table>

      {/* Empty State */}
      {rows.length === 0 && (
        <s-box padding="large-100">
          <s-stack direction="block" gap="small-200" alignItems="center">
            <s-icon type="search" tone="neutral" />
            <s-text type="strong">{emptyStateHeading}</s-text>
            <s-text tone="neutral">{emptyStateMessage}</s-text>
            {onResetFilters && (
              <s-button variant="secondary" onClick={onResetFilters}>
                Reset filters
              </s-button>
            )}
          </s-stack>
        </s-box>
      )}
    </s-section>
  );
}

export default Table;
