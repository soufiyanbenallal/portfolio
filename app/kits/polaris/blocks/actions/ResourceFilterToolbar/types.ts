export type FilterCategoryOptionType = {
  value: string;
  label: string;
};

export type FilterCategoryItemType = {
  id: string;
  label: string;
  options: FilterCategoryOptionType[];
};

export type ActiveFilterItemType = {
  categoryId: string;
  categoryLabel: string;
  value: string;
  label: string;
};

export type ResourceFilterToolbarPropsType = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filterCategories?: FilterCategoryItemType[];
  activeFilters: ActiveFilterItemType[];
  onAddFilter?: (filter: ActiveFilterItemType) => void;
  onRemoveFilter: (filter: ActiveFilterItemType) => void;
  onClearAllFilters: () => void;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: string;
  };
  totalCount?: number;
  className?: string;
};
