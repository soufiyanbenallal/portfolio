import { useState } from "react";

export type FilterPropsType = {
  queryValue?: string;
  onQueryChange?: (value: string) => void;
  onQueryClear?: () => void;
  placeholder?: string;
  tabs?: { id: string; label: string }[];
  selectedTab?: string;
  onTabChange?: (tabId: string) => void;
};

// Compatibility alias
export type FilterProps = FilterPropsType;

export function Filter({
  queryValue = "",
  onQueryChange,
  onQueryClear,
  placeholder = "Search...",
  tabs,
  selectedTab,
  onTabChange,
}: FilterPropsType): JSX.Element {
  const [internalQuery, setInternalQuery] = useState(queryValue);

  const handleQuery = (val: string) => {
    setInternalQuery(val);
    onQueryChange?.(val);
  };

  const handleClear = () => {
    setInternalQuery("");
    onQueryClear?.();
  };

  return (
    <div className="space-y-3 p-3 bg-card rounded-xl border border-border">
      {tabs && tabs.length > 0 && (
        <div className="flex items-center gap-1.5 border-b border-border/60 pb-2">
          {tabs.map((t) => {
            const isSelected = selectedTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onTabChange?.(t.id)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="relative">
        <input
          type="text"
          value={internalQuery}
          onChange={(e) => handleQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full text-xs px-3 py-2 pr-8 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {internalQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default Filter;
