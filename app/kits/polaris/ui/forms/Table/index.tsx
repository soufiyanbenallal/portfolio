import React from "react";

export type ColumnType = {
  title: string;
  alignment?: "start" | "center" | "end";
};

export type DataRowType = {
  id: string;
  children?: DataRowType[];
  [key: string]: unknown;
};

export type TablePropsType = {
  columns: ColumnType[];
  data: DataRowType[];
  resourceName?: { singular: string; plural: string };
  bulkActions?: any[];
  selectable?: boolean;
  emptyState?: { title: string; description?: string };
};

export const Table = ({ columns, data, emptyState }: TablePropsType): JSX.Element => {
  if (data.length === 0 && emptyState) {
    return (
      <div className="bg-card border-border space-y-2 rounded-xl border p-8 text-center">
        <h3 className="text-foreground text-sm font-semibold">{emptyState.title}</h3>
        {emptyState.description && (
          <p className="text-muted-foreground text-xs">{emptyState.description}</p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-card border-border overflow-hidden rounded-xl border">
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
