import { ReactNode, useEffect } from "react";

export type TabItemType = {
  id: string | number;
  content?: string;
  label?: string;
  description?: string;
  badge?: string | number;
  icon?: ReactNode;
  disabled?: boolean;
};

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

export const Tabs = <T extends string | number>({
  tabs,
  selectedTab,
  onTabChange,
  showBadge = true,
  showContent = true,
  rightSide,
}: TabsPropsType<T>): ReactNode => {
  useEffect(() => {
    if (selectedTab === null && tabs.length > 0) {
      onTabChange(tabs[0].id as T);
    }
  }, [selectedTab, tabs, onTabChange]);

  return (
    <s-stack direction="inline" justifyContent="space-between" alignItems="center">
      <s-stack direction="inline" gap="small-500" alignItems="center">
        {tabs
          .filter((tab) => !tab.disabled)
          .map((tab) => {
            const isSelected = selectedTab === tab.id;
            return (
              <div
                key={`tab-${tab.id}`}

                style={{
                  borderRadius: "0.5rem",
                  backgroundColor: isSelected ? "#f0f0f0" : "transparent",
                }}
              >
                <s-button variant="tertiary" onClick={() => onTabChange(tab.id as T)}>
                  {showContent && (tab.content ?? tab.label)}
                  {showBadge && tab.badge !== undefined ? ` (${tab.badge})` : ""}
                </s-button>
              </div>
            );
          })}
      </s-stack>

      {rightSide && (
        <s-stack direction="inline" gap="small-200">
          {rightSide}
        </s-stack>
      )}
    </s-stack>
  );
};

export default Tabs;
