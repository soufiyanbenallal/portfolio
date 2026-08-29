import type { ReactNode } from "react";

export type TableColumnAlignType = "start" | "center" | "end";

export type TableColumnType<T = any> = {
  id: string;
  title: ReactNode;
  tooltipContent?: ReactNode;
  align?: TableColumnAlignType;
  width?: string;
  renderCell: (data: T, index: number, isSubRow?: boolean) => ReactNode;
};

export type TableRowActionType = {
  id: string;
  label: string;
  icon?: string;
  destructive?: boolean;
  section?: string;
  onClick: (row: any) => void;
};

export type TableRowType<T = any> = {
  id: string | number;
  data: T;
  subRows?: TableRowType<T>[];
  selected?: boolean;
  disabled?: boolean;
  actions?: TableRowActionType[];
};

export type TableTabItemType = {
  id: string;
  label: string;
  badge?: number | string;
};

export type TableActiveFilterItemType = {
  id: string;
  label: string;
  categoryId: string;
  categoryLabel: string;
  value: any;
};

export type TableFilterOptionType = {
  label: string;
  value: string;
};

export type TableFilterCategoryType = {
  id: string;
  label: string;
  options: TableFilterOptionType[];
};

export type DataTablePropsType<T = any> = {
  title?: ReactNode;
  tooltipContent?: ReactNode;
  description?: ReactNode;
  columns: TableColumnType<T>[];
  rows: TableRowType<T>[];
  selectable?: boolean;
  selectedRowIds?: (string | number)[];
  onSelectionChange?: (selectedIds: (string | number)[]) => void;
  tabs?: TableTabItemType[];
  selectedTab?: string;
  onTabChange?: (tabId: string) => void;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (search: string) => void;
  filterCategories?: TableFilterCategoryType[];
  activeFilters?: TableActiveFilterItemType[];
  onAddFilter?: (filter: TableActiveFilterItemType) => void;
  onRemoveFilter?: (filter: TableActiveFilterItemType) => void;
  onClearAllFilters?: () => void;
  onCancelSearch?: () => void;
  onSaveView?: () => void;
  onSortClick?: () => void;
  rightActions?: ReactNode;
  emptyStateHeading?: string;
  emptyStateMessage?: string;
  id?: string;
};

// Compatibility alias
export type DataTableProps<T = any> = DataTablePropsType<T>;
