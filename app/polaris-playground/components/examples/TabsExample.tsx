"use client";

import React, { useState, type ReactNode } from "react";
import { Tabs } from "@/app/kits/polaris/ui/layouts/Tabs";

export function TabsExample(): ReactNode {
  const [selectedTab, setSelectedTab] = useState<string | number>("all");

  const tabs = [
    { id: "all", content: "All Products", badge: 48 },
    { id: "active", content: "Active", badge: 36 },
    { id: "draft", content: "Drafts", badge: 12 },
    { id: "archived", content: "Archived", badge: 0 },
  ];

  return (
    <div className="w-full max-w-2xl space-y-4">
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={(tabId) => setSelectedTab(tabId)}
      />

      <div className="rounded-xl border border-border bg-card p-6 text-center text-xs text-muted-foreground">
        Currently viewing tab: <strong className="text-foreground capitalize">{String(selectedTab)}</strong>
      </div>
    </div>
  );
}

export default TabsExample;
