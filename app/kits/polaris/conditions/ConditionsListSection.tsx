import React, { useState, useEffect } from "react";
import { ConditionPopover, type ConditionPopoverGroupType } from "./ConditionPopover";

export type ConditionsListSectionPropsType<T> = {
  title?: string;
  description?: string;
  headerActions?: React.ReactNode;
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  emptyState?: React.ReactNode;
  popoverGroups: ConditionPopoverGroupType<T>[];
  onSelectItem: (item: T) => void;
  isItemActive?: (item: T) => boolean;
  getItemLabel: (item: T) => string;
  getItemDescription?: (item: T) => string | undefined;
  getItemDisabled?: (item: T) => boolean;
  getItemSoon?: (item: T) => boolean;
  addButtonText?: string;
  grouped?: boolean;
  onGroupedChange?: (grouped: boolean) => void;
  getItemGroupKey?: (item: any) => string;
  allowGroupToggle?: boolean;
  storageKey?: string;
};

export function ConditionsListSection<T>({
  title,
  description,
  headerActions,
  items,
  renderItem,
  emptyState,
  popoverGroups,
  onSelectItem,
  isItemActive,
  getItemLabel,
  getItemDescription,
  getItemDisabled,
  getItemSoon,
  addButtonText,
  grouped: initialGrouped = false,
  onGroupedChange,
  getItemGroupKey,
  allowGroupToggle = false,
  storageKey,
}: ConditionsListSectionPropsType<T>): JSX.Element {
  const [isGrouped, setIsGrouped] = useState(initialGrouped);

  useEffect(() => {
    if (storageKey && typeof localStorage !== "undefined") {
      const saved = localStorage.getItem(storageKey);
      if (saved !== null) {
        setIsGrouped(saved === "true");
      }
    }
  }, [storageKey]);

  const handleToggleGroupMode = (val: boolean) => {
    setIsGrouped(val);
    onGroupedChange?.(val);
    if (storageKey && typeof localStorage !== "undefined") {
      localStorage.setItem(storageKey, String(val));
    }
  };

  const renderContent = () => {
    if (items.length === 0 && emptyState) {
      return emptyState;
    }

    if (isGrouped && getItemGroupKey) {
      const groups = items.reduce(
        (acc, item) => {
          const key = getItemGroupKey(item);
          if (!acc[key]) acc[key] = [];
          acc[key].push(item);
          return acc;
        },
        {} as Record<string, any[]>
      );

      return (
        <div className="space-y-4">
          {(Object.entries(groups) as [string, any[]][]).map(([groupKey, groupItems]) => (
            <div key={groupKey} className="space-y-2">
              <h4 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                {groupKey.charAt(0).toUpperCase() + groupKey.slice(1)}
              </h4>
              <div className="space-y-2">
                {groupItems.map((item, idx) => (
                  <React.Fragment key={`${groupKey}-${idx}`}>
                    {renderItem(item, idx)}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {items.map((item, idx) => (
          <React.Fragment key={idx}>{renderItem(item, idx)}</React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {(title || headerActions || allowGroupToggle) && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            {title && <h3 className="text-foreground text-sm font-bold">{title}</h3>}
            {description && <p className="text-muted-foreground text-xs">{description}</p>}
          </div>
          <div className="flex items-center gap-2">
            {headerActions}
            {allowGroupToggle && items.length > 0 && (
              <s-button variant="tertiary" onClick={() => handleToggleGroupMode(!isGrouped)}>
                {isGrouped ? "List view" : "Grouped view"}
              </s-button>
            )}
          </div>
        </div>
      )}

      {renderContent()}

      <div className="pt-2">
        <ConditionPopover
          groups={popoverGroups}
          onSelectItem={onSelectItem}
          isItemActive={isItemActive}
          getItemLabel={getItemLabel}
          getItemDescription={getItemDescription}
          getItemDisabled={getItemDisabled}
          getItemSoon={getItemSoon}
          buttonText={addButtonText}
        />
      </div>
    </div>
  );
}

export default ConditionsListSection;
