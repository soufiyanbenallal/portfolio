import { ReactNode, useEffect } from "react";

export type TabItemType = {
  id: string | number;
  content?: string;
  description?: string;
  badge?: string | number;
  icon?: ReactNode;
  disabled?: boolean;
};

// Compatibility alias
export type TabItem = TabItemType;

export type TabsPropsType<T = string | number> = {
  tabs: TabItemType[];
  selectedTab: T | null;
  onTabChange: (tabId: T) => void;
  showBadge?: boolean;
  showContent?: boolean;
  showTooltip?: boolean;
  rightSide?: ReactNode;
  className?: string;
};

// Compatibility alias
export type TabsProps<T = string | number> = TabsPropsType<T>;

export const Tabs = <T extends string | number>({
  tabs,
  selectedTab,
  onTabChange,
  showBadge = true,
  showContent = true,
  rightSide,
  className = "",
}: TabsPropsType<T>): ReactNode => {
  useEffect(() => {
    if (selectedTab === null && tabs.length > 0) {
      onTabChange(tabs[0].id as T);
    }
  }, [selectedTab, tabs, onTabChange]);

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-2 p-1 bg-muted/60 rounded-xl border border-border ${className}`}
    >
      <div className="flex flex-wrap items-center gap-1">
        {tabs
          .filter((tab) => !tab.disabled)
          .map((tab) => {
            const isSelected = selectedTab === tab.id;
            return (
              <button
                key={`tab-${tab.id}`}
                type="button"
                onClick={() => onTabChange(tab.id as T)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-card text-foreground shadow-xs border border-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                title={tab.description}
              >
                {tab.icon && <span>{tab.icon}</span>}
                {showContent && tab.content && <span>{tab.content}</span>}
                {showBadge && tab.badge !== undefined && (
                  <s-badge tone={isSelected ? "info" : "neutral"}>{String(tab.badge)}</s-badge>
                )}
              </button>
            );
          })}
      </div>

      {rightSide && <div className="flex items-center gap-2">{rightSide}</div>}
    </div>
  );
};

export default Tabs;
