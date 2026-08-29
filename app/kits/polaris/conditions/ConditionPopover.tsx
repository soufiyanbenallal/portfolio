import { useState, useMemo, useRef, useEffect } from "react";

export type ConditionPopoverGroupType<T> = {
  label: string;
  description?: string;
  icon?: any;
  items: T[];
  soon?: boolean;
  disabled?: boolean;
};


export type ConditionPopoverPropsType<T> = {
  groups: ConditionPopoverGroupType<T>[];
  onSelectItem: (item: T) => void;
  isItemActive?: (item: T) => boolean;
  buttonText?: string;
  getItemLabel: (item: T) => string;
  getItemDescription?: (item: T) => string | undefined;
  getItemDisabled?: (item: T) => boolean;
  getItemSoon?: (item: T) => boolean;
};


export function ConditionPopover<T>({
  groups,
  onSelectItem,
  isItemActive,
  buttonText = "Add new condition",
  getItemLabel,
  getItemDescription,
  getItemDisabled,
  getItemSoon,
}: ConditionPopoverPropsType<T>): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroupLabel, setSelectedGroupLabel] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedGroupLabel(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedGroup = useMemo(
    () => groups.find((g) => g.label === selectedGroupLabel),
    [groups, selectedGroupLabel]
  );

  const handleSelect = (item: T) => {
    onSelectItem(item);
    setIsOpen(false);
    setSelectedGroupLabel(null);
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <s-button
        variant="secondary"
        onClick={() => {
          setIsOpen(!isOpen);
          setSelectedGroupLabel(null);
        }}
      >
        + {buttonText}
      </s-button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-72 bg-popover border border-border rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-border">
          {selectedGroup ? (
            <div className="p-1">
              <button
                type="button"
                onClick={() => setSelectedGroupLabel(null)}
                className="w-full text-left px-3 py-1.5 text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1.5 border-b border-border/40 mb-1"
              >
                ← Back to categories
              </button>

              <div className="max-h-60 overflow-y-auto space-y-0.5">
                {selectedGroup.items.map((item, idx) => {
                  const isSoon = getItemSoon ? getItemSoon(item) : false;
                  const isDisabled = getItemDisabled
                    ? getItemDisabled(item)
                    : isItemActive
                      ? isItemActive(item)
                      : false;

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isSoon || isDisabled}
                      onClick={() => handleSelect(item)}
                      className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex flex-col ${
                        isSoon || isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-muted"
                      }`}
                    >
                      <span className="font-semibold text-foreground">{getItemLabel(item)}</span>
                      {getItemDescription?.(item) && (
                        <span className="text-[10px] text-muted-foreground">
                          {getItemDescription(item)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-1 max-h-60 overflow-y-auto space-y-0.5">
              {groups.map((group, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={group.soon || group.disabled}
                  onClick={() => setSelectedGroupLabel(group.label)}
                  className="w-full text-left p-2.5 rounded-lg text-xs hover:bg-muted transition-colors flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold text-foreground block">{group.label}</span>
                    {group.description && (
                      <span className="text-[10px] text-muted-foreground block">
                        {group.description}
                      </span>
                    )}
                  </div>
                  <span className="text-muted-foreground text-xs">→</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ConditionPopover;
