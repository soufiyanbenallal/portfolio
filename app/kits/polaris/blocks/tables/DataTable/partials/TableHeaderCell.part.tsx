"use client";

import React, { type ReactNode } from "react";
import type { TableColumnType } from "../types";
import { Content } from "@/app/kits/polaris/ui/typography/Content";

export type TableHeaderCellPropsType = {
  column: TableColumnType;
};

export function TableHeaderCellPart({ column }: TableHeaderCellPropsType): ReactNode {
  return (
    <s-table-header>
      <Content
        underline={false}
        tooltip={column.tooltipContent}
      >
        {column.title}
      </Content>
    </s-table-header>
  );
}

export default TableHeaderCellPart;
