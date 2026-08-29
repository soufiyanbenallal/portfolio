"use client";

import React, { useState, Fragment, type ReactNode } from "react";
import type { TableColumnType, TableRowType } from "../types";
import { TableRowActionsMenuPart } from "./TableRowActionsMenu.part";

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

export function TableRowPart({
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
  const hasSubRows = Boolean(row.subRows && row.subRows.length > 0);

  return (
    <Fragment>
      <s-table-row>
        {selectable && (
          <s-table-cell>
            {!isSubRow ? (
              <s-checkbox
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
                      onClick={() => setExpanded((prev) => !prev)}
                    />
                  )}
                  {isSubRow && (
                    <div style={{ paddingLeft: "28px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
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

        {row.actions && row.actions.length > 0 && (
          <s-table-cell>
            <TableRowActionsMenuPart actions={row.actions} row={row.data} />
          </s-table-cell>
        )}
      </s-table-row>

      {/* Expandable Sub-Rows */}
      {hasSubRows && expanded && row.subRows?.map((subRow, subIdx) => (
        <TableRowPart
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

export default TableRowPart;
