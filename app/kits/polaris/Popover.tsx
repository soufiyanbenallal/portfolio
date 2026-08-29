import { useState, useRef, useEffect } from "react";
import { useUpdateState } from "~/commons/utils/state/hooks/useUpdateState";
import { useAppState } from "../utils/state/hooks/useAppState";

export type PopoverOptionType = {
  id?: string | number;
  label: string;
  value: string;
  isHeader?: boolean;
};

// Compatibility alias
export type PopoverOption = PopoverOptionType;

export type PopoverPropsType = {
  segments: PopoverOptionType[];
  label?: string;
  withSearch?: boolean;
  stateKey?: string;
  index?: number;
  value?: any;
  field?: string;
  showAll?: boolean;
  disabled?: boolean;
  requiredIndicator?: boolean;
  fullWidth?: boolean;
  onChange?: (selected: PopoverOptionType) => void;
  disabledOptions?: string[];
};

// Compatibility alias
export type PopoverProps = PopoverPropsType;

export function Popover({
  segments = [],
  label,
  withSearch = false,
  stateKey,
  index,
  value,
  field,
  disabled = false,
  requiredIndicator = false,
  fullWidth = false,
  onChange,
  disabledOptions = [],
}: PopoverPropsType): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleState = useUpdateState();
  const state = useAppState(stateKey ?? "");

  const selectedSegment = segments.find((item) => item.value == value) || segments[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: PopoverOptionType) => {
    if (disabledOptions.includes(option.value)) return;

    onChange?.(option);

    if (stateKey) {
      if (index !== undefined && field !== undefined) {
        const updatedState = Array.isArray(state) ? [...state] : [];
        updatedState[index] = {
          ...updatedState[index],
          [field]: option.value,
        };
        handleState(stateKey, updatedState);
      } else {
        handleState(stateKey, option.value);
      }
    }

    setIsOpen(false);
  };

  const filteredSegments = segments.filter((seg) =>
    seg.label.toLowerCase().includes(query.toLowerCase().trim())
  );

  return (
    <div ref={popoverRef} className={`relative ${fullWidth ? "w-full" : "inline-block"}`}>
      {label && (
        <label className="block text-xs font-semibold text-foreground mb-1">
          {label}
          {requiredIndicator && <span className="text-destructive ml-0.5">*</span>}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left text-xs px-3 py-2 rounded-lg border border-border bg-card text-foreground hover:bg-muted/30 focus:outline-none focus:ring-1 focus:ring-primary flex items-center justify-between gap-2 shadow-xs transition-colors disabled:opacity-50"
      >
        <span className="truncate">{selectedSegment?.label || "Select option..."}</span>
        <span className="text-muted-foreground text-[10px]">▼</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 w-full min-w-[200px] bg-popover border border-border rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-border">
          {withSearch && (
            <div className="p-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full text-xs px-2.5 py-1.5 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                autoFocus
              />
            </div>
          )}

          <div className="max-h-56 overflow-y-auto p-1">
            {filteredSegments.length === 0 ? (
              <div className="p-3 text-center text-xs text-muted-foreground">No options found</div>
            ) : (
              filteredSegments.map((item, idx) => {
                if (item.isHeader) {
                  return (
                    <div
                      key={item.id ?? idx}
                      className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      {item.label}
                    </div>
                  );
                }

                const isSelected = selectedSegment?.value === item.value;
                const isDisabled = disabledOptions.includes(item.value);

                return (
                  <button
                    key={item.id ?? idx}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleSelect(item)}
                    className={`w-full text-left px-2.5 py-1.5 text-xs rounded-md transition-colors flex items-center justify-between ${
                      isSelected
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground hover:bg-muted"
                    } ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}`}
                  >
                    <span>{item.label}</span>
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

export default Popover;
