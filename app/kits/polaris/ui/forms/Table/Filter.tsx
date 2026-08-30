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
    <div className="bg-card border-border space-y-3 rounded-xl border p-3">
      {tabs && tabs.length > 0 && (
        <div className="border-border/60 flex items-center gap-1.5 border-b pb-2">
          {tabs.map((t) => {
            const isSelected = selectedTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onTabChange?.(t.id)}
                className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
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
          className="border-border bg-background text-foreground focus:ring-primary w-full rounded-lg border px-3 py-2 pr-8 text-xs focus:ring-1 focus:outline-none"
        />
        {internalQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2.5 -translate-y-1/2 text-xs"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default Filter;
