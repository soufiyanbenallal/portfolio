"use client";

import React, { useCallback, useMemo, useState, type ReactNode } from "react";
import type {
  ToolCategoryType,
  ToolItemType,
  ToolsPropsType,
  ToolsStatsSummaryType,
} from "./types";
import { TOOLS_CATEGORIES_DEFAULT } from "./constants";
import { ToolsHeaderPart } from "./partials/ToolsHeader.part";
import { ToolsCategorySectionPart } from "./partials/ToolsCategorySection.part";

export * from "./types";
export * from "./constants";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function computeSummary(categories: ToolCategoryType[]): ToolsStatsSummaryType {
  const allTools = categories.flatMap((c) => c.tools);
  return {
    activeCount: allTools.filter((t) => t.status === "active").length,
    needsSetupCount: allTools.filter((t) => t.status === "needs_setup").length,
    lockedCount: allTools.filter((t) => t.status === "locked").length,
    totalCount: allTools.length,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Tools({
  categories: initialCategories = TOOLS_CATEGORIES_DEFAULT,
  subtitle = "Turn on the tools that boost Average Order Value and Conversion Rate across every touchpoint of your store.",
}: ToolsPropsType): ReactNode {
  const [categories, setCategories] = useState<ToolCategoryType[]>(initialCategories);

  const summary = useMemo(() => computeSummary(categories), [categories]);

  /** Optimistically toggle a tool's status between active / inactive */
  const handleToggle = useCallback((toolId: string, active: boolean) => {
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        tools: cat.tools.map((tool): ToolItemType => {
          if (tool.id !== toolId) return tool;
          return { ...tool, status: active ? "active" : "inactive" };
        }),
      }))
    );
  }, []);

  /** Placeholder for setup / upgrade actions */
  const handleAction = useCallback((_toolId: string) => {
    // Host apps wire this to navigation or a modal
  }, []);

  return (
    <s-page inlineSize="large" heading="Tools revenue">
      <s-link slot="breadcrumb-actions" href="/app/puzzles">
        Puzzles
      </s-link>
      <s-button
        slot="secondary-actions"
        icon="refresh"
        tone="neutral"
        accessibilityLabel="Search"
      ></s-button>

      <s-stack slot="accessory" direction="inline" gap="small">
        <s-badge icon="search" tone="success">
          Active {summary.activeCount}
        </s-badge>
        <s-badge icon="lock" tone="info">
          Locked {summary.lockedCount}
        </s-badge>
        <s-badge icon="search" tone="critical">
          Need setup {summary.needsSetupCount}
        </s-badge>
      </s-stack>

      <s-stack direction="block" gap="large">
        {/* Header */}
        <ToolsHeaderPart subtitle={subtitle} />

        {/* Stats cards + health bar */}
        {/* <ToolsStatsPart summary={summary} /> */}

        {/* Category sections */}
        <s-stack direction="block" gap="large">
          {categories.map((category, i) => (
            <ToolsCategorySectionPart
              key={category.id}
              category={category}
              onToggle={handleToggle}
              onAction={handleAction}
            />
          ))}
        </s-stack>
      </s-stack>
    </s-page>
  );
}

export default Tools;
