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
        <div className="bg-popover border-border divide-border absolute top-full left-0 z-50 mt-2 w-72 divide-y overflow-hidden rounded-xl border shadow-xl">
          {selectedGroup ? (
            <div className="p-1">
              <button
                type="button"
                onClick={() => setSelectedGroupLabel(null)}
                className="text-muted-foreground hover:text-foreground border-border/40 mb-1 flex w-full items-center gap-1.5 border-b px-3 py-1.5 text-left text-xs font-bold"
              >
                ← Back to categories
              </button>

              <div className="max-h-60 space-y-0.5 overflow-y-auto">
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
                      className={`flex w-full flex-col rounded-lg p-2 text-left text-xs transition-colors ${
                        isSoon || isDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-muted"
                      }`}
                    >
                      <span className="text-foreground font-semibold">{getItemLabel(item)}</span>
                      {getItemDescription?.(item) && (
                        <span className="text-muted-foreground text-[10px]">
                          {getItemDescription(item)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="max-h-60 space-y-0.5 overflow-y-auto p-1">
              {groups.map((group, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={group.soon || group.disabled}
                  onClick={() => setSelectedGroupLabel(group.label)}
                  className="hover:bg-muted flex w-full items-center justify-between rounded-lg p-2.5 text-left text-xs transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="text-foreground block font-semibold">{group.label}</span>
                    {group.description && (
                      <span className="text-muted-foreground block text-[10px]">
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
