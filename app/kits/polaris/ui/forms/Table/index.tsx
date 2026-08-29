import React from "react";

export type ColumnType = {
  title: string;
  alignment?: "start" | "center" | "end";
};

// Compatibility alias
export type Column = ColumnType;

export type DataRowType = {
  id: string;
  children?: DataRowType[];
  [key: string]: unknown;
};

// Compatibility alias
export type DataRow = DataRowType;

export type TablePropsType = {
  columns: ColumnType[];
  data: DataRowType[];
  resourceName?: { singular: string; plural: string };
  bulkActions?: any[];
  selectable?: boolean;
  emptyState?: { title: string; description?: string };
};

// Compatibility alias
export type TableProps = TablePropsType;

export const Table = ({ columns, data, emptyState }: TablePropsType): JSX.Element => {
  if (data.length === 0 && emptyState) {
    return (
      <div className="p-8 text-center bg-card rounded-xl border border-border space-y-2">
        <h3 className="text-sm font-semibold text-foreground">{emptyState.title}</h3>
        {emptyState.description && (
          <p className="text-xs text-muted-foreground">{emptyState.description}</p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <s-table>
        <s-table-header-row>
          {columns.map((col, idx) => (
            <s-table-header key={idx}>{col.title}</s-table-header>
          ))}
        </s-table-header-row>
        <s-table-body>
          {data.map((row) => (
            <s-table-row key={row.id}>
              {columns.map((col, idx) => (
                <s-table-cell key={idx}>{(row[col.title] as React.ReactNode) ?? null}</s-table-cell>
              ))}
            </s-table-row>
          ))}
        </s-table-body>
      </s-table>
    </div>
  );
};

export default Table;
