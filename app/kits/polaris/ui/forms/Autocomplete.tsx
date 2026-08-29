import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { useAppState } from "../utils/state/hooks/useAppState";
import { useUpdateState } from "../utils/state/hooks/useUpdateState";
import DirectAPI from "../service/DirectAPI";
import { useCommonsT } from "~/commons/providers";
import { searchForCollections, fetchCollection } from "../api/graphql/query/collections";
import { debounce } from "../utils/debounce";

export type QueryIdType = 7 | 8 | 9 | 10;

export type AutocompletePropsType = {
  id: QueryIdType;
  index?: number;
  value?: any;
  stateKey?: string;
  field?: string;
  prefix?: React.ReactNode;
  connectedLeft?: React.ReactNode;
  allowMultiple?: boolean;
  disabled?: boolean;
  onChange?: (selectedOptions: string[]) => void;
  autoUpdate?: boolean;
  allowRemove?: boolean;
};


export function Autocomplete({
  id,
  index,
  value,
  stateKey,
  field,
  prefix,
  connectedLeft,
  allowMultiple = true,
  disabled = false,
  onChange,
  autoUpdate = true,
}: AutocompletePropsType): JSX.Element {
  const ct = useCommonsT();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<{ value: string; label: string; smart?: boolean }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleState = useUpdateState();
  const state = useAppState(stateKey ?? "");

  const getQuery = (qid: QueryIdType, cursor: string | null) => {
    const queries = {
      7: `{ collections(first: 250) { nodes { id title ruleSet { rules { condition } } } pageInfo { hasNextPage endCursor } } }`,
      8: `{ productTypes(first: 1000${cursor ? `, after: "${cursor}"` : ""}) { nodes pageInfo { hasNextPage endCursor } } }`,
      9: `{ productTags(first: 5000${cursor ? `, after: "${cursor}"` : ""}) { nodes pageInfo { hasNextPage endCursor } } }`,
      10: `{ productVendors(first: 1000${cursor ? `, after: "${cursor}"` : ""}) { nodes pageInfo { hasNextPage endCursor } } }`,
    };
    return queries[qid];
  };

  const loadInitialData = useCallback(async () => {
    setLoading(true);
    try {
      if (id === 7) {
        const collections = await fetchCollection([]);
        if (Array.isArray(collections)) {
          setOptions(
            collections.map((c: any) => ({
              value: c.id,
              label: c.title,
              smart: !!c.ruleSet?.rules?.length,
            }))
          );
        }
      } else {
        const query = getQuery(id, null);
        const res = await DirectAPI.query(query);
        const key = id === 8 ? "productTypes" : id === 9 ? "productTags" : "productVendors";
        const nodes = res?.[key]?.nodes ?? [];
        setOptions(nodes.map((n: string) => ({ value: n, label: n })));
      }
    } catch (e) {
      // fallback
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  useEffect(() => {
    if (value !== undefined && value !== null) {
      const arr = Array.isArray(value) ? value : [String(value)];
      setSelectedOptions(arr);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    let next: string[];
    if (allowMultiple) {
      next = selectedOptions.includes(val)
        ? selectedOptions.filter((o) => o !== val)
        : [...selectedOptions, val];
    } else {
      next = [val];
      setIsOpen(false);
    }

    setSelectedOptions(next);
    onChange?.(next);

    if (autoUpdate && stateKey) {
      if (index !== undefined && field !== undefined && Array.isArray(state)) {
        const updated = [...state];
        updated[index] = { ...updated[index], [field]: allowMultiple ? next : next[0] };
        handleState(stateKey, updated);
      } else {
        handleState(stateKey, allowMultiple ? next : next[0]);
      }
    }
  };

  const removeOption = (val: string) => {
    const next = selectedOptions.filter((o) => o !== val);
    setSelectedOptions(next);
    onChange?.(next);
    if (autoUpdate && stateKey) {
      if (index !== undefined && field !== undefined && Array.isArray(state)) {
        const updated = [...state];
        updated[index] = { ...updated[index], [field]: next };
        handleState(stateKey, updated);
      } else {
        handleState(stateKey, next);
      }
    }
  };

  const filteredOptions = useMemo(() => {
    return options.filter((o) => o.label.toLowerCase().includes(inputValue.toLowerCase().trim()));
  }, [options, inputValue]);

  return (
    <div ref={containerRef} className="space-y-2 relative w-full">
      {/* Selected Tags */}
      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pb-1">
          {selectedOptions.map((opt) => {
            const found = options.find((o) => o.value === opt);
            const label = found?.label || opt;
            return (
              <span
                key={opt}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20"
              >
                <span>{label}</span>
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => removeOption(opt)}
                    className="hover:text-destructive font-bold text-xs"
                  >
                    ×
                  </button>
                )}
              </span>
            );
          })}
        </div>
      )}

      {/* Input */}
      <div className="relative flex items-center">
        {connectedLeft && <div className="mr-2">{connectedLeft}</div>}
        {prefix && <div className="absolute left-3 text-muted-foreground">{prefix}</div>}
        <input
          type="text"
          value={inputValue}
          disabled={disabled}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          placeholder={ct("commons.autocomplete.search") || "Search or add..."}
          className={`w-full text-xs py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-xs ${
            prefix ? "pl-8 pr-3" : "px-3"
          }`}
        />
        {loading && (
          <div className="absolute right-3">
            <s-spinner size="base" />
          </div>
        )}
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-full bg-popover border border-border rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-border">
          <div className="max-h-56 overflow-y-auto p-1">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-center text-xs text-muted-foreground">
                No matching options
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = selectedOptions.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center justify-between ${
                      isSelected
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <span className="text-primary font-bold">✓</span>}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Autocomplete;
