import { useState, type ReactNode } from "react";
import { Tabs, type TabItemType } from "./Tabs";

export type FilterTabItemType = TabItemType;

export type ActiveFilterItemType = {
  id: string;
  label: string;
  categoryId: string;
  categoryLabel: string;
  value: any;
};

export type FilterOptionType = {
  label: string;
  value: string;
};

export type FilterCategoryType = {
  id: string;
  label: string;
  options: FilterOptionType[];
};

export type FiltersPropsType = {
  tabs?: FilterTabItemType[];
  selectedTab?: string;
  onTabChange?: (tabId: string) => void;
  onAddTab?: () => void;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  filterCategories?: FilterCategoryType[];
  activeFilters?: ActiveFilterItemType[];
  onAddFilter?: (filter: ActiveFilterItemType) => void;
  onRemoveFilter?: (filter: ActiveFilterItemType) => void;
  onClearAllFilters?: () => void;
  onSaveView?: () => void;
  rightActions?: ReactNode;
};

export function Filters({
  tabs = [],
  selectedTab,
  onTabChange,
  onAddTab,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Searching all records",
  filterCategories = [],
  activeFilters = [],
  onAddFilter,
  onRemoveFilter,
  onClearAllFilters,
  onSaveView,
  rightActions,
}: FiltersPropsType): ReactNode {
  const [isSearchOpen, setIsSearchOpen] = useState(Boolean(searchValue));
  const [selectedCategory, setSelectedCategory] = useState<FilterCategoryType | null>(null);

  const hasTabs = tabs.length > 0;
  const hasActiveFilters = activeFilters.length > 0;
  const hasCategories = filterCategories.length > 0;
  const currentTab = selectedTab || (tabs[0]?.id ? String(tabs[0].id) : "all");

  const showSearchMode = isSearchOpen || !hasTabs;

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const handleCancelSearch = () => {
    setIsSearchOpen(false);
    onSearchChange?.("");
  };

  return (
    <s-stack direction="block" gap="small-200">
      {/* ── Mode 1: Tabs Mode ── */}
      {!showSearchMode ? (
        <s-stack direction="inline" justifyContent="space-between" alignItems="center">
          {/* View Tabs */}
          <s-stack direction="inline" gap="small-200" alignItems="center">
            <Tabs
              tabs={tabs}
              selectedTab={currentTab}
              onTabChange={(tabId) => onTabChange?.(String(tabId))}
            />

            {onAddTab && (
              <s-button
                variant="tertiary"
                icon="plus"
                onClick={onAddTab}
              />
            )}
          </s-stack>

          {/* Right Actions & Search Trigger */}
          <s-stack direction="inline" gap="small-200" alignItems="center">
            <s-button
              variant="secondary"
              icon="search"
              onClick={handleOpenSearch}
            />
            {rightActions}
          </s-stack>
        </s-stack>
      ) : (
        /* ── Mode 2: Search + Filter Mode ── */
        <s-stack direction="block" gap="small-200">
          {/* Top Bar: Search Input, Cancel, Save as */}
          <s-stack direction="inline" justifyContent="space-between" alignItems="center" gap="small-200">
            <div style={{ flex: 1 }}>
              <s-text-field
                label="Search"
                labelAccessibilityVisibility="exclusive"
                icon="search"
                value={searchValue}
                placeholder={searchPlaceholder}
                onInput={(e: any) => onSearchChange?.(e.target.value)}
              />
            </div>

            <s-stack direction="inline" gap="small-200" alignItems="center">
              {hasTabs && (
                <s-button
                  variant="tertiary"
                  onClick={handleCancelSearch}
                >
                  Cancel
                </s-button>
              )}

              {onSaveView && (
                <s-button
                  variant="secondary"
                  onClick={onSaveView}
                >
                  Save as
                </s-button>
              )}
            </s-stack>
          </s-stack>

          {/* Active Filter Chips & Add Filter Popover (Displayed during Search + Filter Mode) */}
          {(hasActiveFilters || hasCategories) && (
            <s-stack direction="inline" gap="small-200" alignItems="center">
              {activeFilters.map((f) => (
                <s-clickable-chip
                  key={f.id}
                  color="subdued"
                  removable
                  onRemove={() => onRemoveFilter?.(f)}
                >
                  {f.label}
                </s-clickable-chip>
              ))}

              {/* Add Filter Button & Category Selector Menu */}
              {hasCategories && (
                <>
                  <s-clickable-chip
                    commandFor="filters-menu"
                    color="subdued"
                  >
                    <s-icon slot="graphic" size="small" type="plus" />
                    Add filter
                  </s-clickable-chip>

                  <s-menu id="filters-menu" accessibilityLabel="filtersmenu">
                    {!selectedCategory ? (
                      <s-section heading="Filter by">
                        {filterCategories.map((cat) => (
                          <s-button
                            key={cat.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCategory(cat);
                            }}
                          >
                            {cat.label}
                          </s-button>
                        ))}
                      </s-section>
                    ) : (
                      <>
                        <s-button
                          icon="chevron-left"
                          onClick={() => setSelectedCategory(null)}
                        />
                        <s-text type="strong">{selectedCategory.label}</s-text>
                        <s-divider />
                        {selectedCategory.options.map((opt) => (
                          <s-button
                            key={opt.value}
                            onClick={() => {
                              onAddFilter?.({
                                id: `${selectedCategory.id}-${opt.value}`,
                                categoryId: selectedCategory.id,
                                categoryLabel: selectedCategory.label,
                                label: `${selectedCategory.label}: ${opt.label}`,
                                value: opt.value,
                              });
                              setSelectedCategory(null);
                            }}
                          >
                            {opt.label}
                          </s-button>
                        ))}
                      </>
                    )}
                  </s-menu>
                </>
              )}

              {hasActiveFilters && onClearAllFilters && (
                <s-clickable-chip
                  color="base"
                  onClick={onClearAllFilters}
                >
                  Clear all
                </s-clickable-chip>
              )}
            </s-stack>
          )}
        </s-stack>
      )}
    </s-stack>
  );
}

export default Filters;
