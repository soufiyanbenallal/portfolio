"use client";

import React, { useState, type ReactNode } from "react";
import { Tabs } from "~/components/ui/layouts/Tabs";

export function TabsExample(): ReactNode {
  const [selectedTab, setSelectedTab] = useState<string | number>("all");

  const tabs = [
    { id: "all", content: "All Products", badge: 48 },
    { id: "active", content: "Active", badge: 36 },
    { id: "draft", content: "Drafts", badge: 12 },
    { id: "archived", content: "Archived", badge: 0 },
  ];

  return (
    <s-page>
      <s-stack direction="block" gap="base">
        <Tabs
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={(tabId) => setSelectedTab(tabId)}
        />

        <s-box padding="base" borderWidth="base" borderRadius="base" background="base">
          <s-text tone="neutral">Currently viewing tab: {String(selectedTab)}</s-text>
        </s-box>
      </s-stack>
    </s-page>
  );
}

export default TabsExample;
