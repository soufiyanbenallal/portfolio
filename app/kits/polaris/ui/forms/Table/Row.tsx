import React from "react";

export type RowDataType = {
  id: string;
  [key: string]: React.ReactNode;
};

// Compatibility alias
export type RowData = RowDataType;

export type RowPropsType = {
  id: string;
  columns: string[];
  data: RowDataType;
  selected?: boolean;
  position?: number;
  isParent?: boolean;
  childrenRows?: RowPropsType[];
};

// Compatibility alias
export type RowProps = RowPropsType;

export const Row = ({ id, columns, data, childrenRows = [] }: RowPropsType): JSX.Element => {
  return (
    <>
      <s-table-row key={id}>
        {columns.map((column, index) => (
          <s-table-cell key={index}>
            <span className="text-xs text-foreground font-medium">{data[column]}</span>
          </s-table-cell>
        ))}
      </s-table-row>

      {childrenRows.length > 0 &&
        childrenRows.map((childRow) => <Row key={childRow.id} {...childRow} />)}
    </>
  );
};

export default Row;
