// Tools Kit — Type Definitions

import { IconType } from "../Timeline";

// ─── Status & Action Types ────────────────────────────────────────────────────

export type ToolStatusType = "active" | "needs_setup" | "locked" | "inactive";

export type ToolActionVariantType = "switch" | "setup" | "upgrade";

// ─── Tool Item ────────────────────────────────────────────────────────────────

export type ToolItemType = {
  id: string;
  name: string;
  /** Optional pill tag shown beside the name (e.g. "Core Default") */
  tag?: string;
  description: string;
  status: ToolStatusType;
  actionVariant: ToolActionVariantType;
  /** Label for the action button (setup / upgrade). Not needed for switch. */
  actionLabel?: string;
  onToggle?: (id: string, active: boolean) => void;
  onAction?: (id: string) => void;
};

// ─── Category ─────────────────────────────────────────────────────────────────

export type ToolCategoryType = {
  id: string;
  title: string;
  icon: IconType;
  tools: ToolItemType[];
};

// ─── Stats Summary ────────────────────────────────────────────────────────────

export type ToolsStatsSummaryType = {
  activeCount: number;
  needsSetupCount: number;
  lockedCount: number;
  totalCount: number;
};

// ─── Component Prop Types ─────────────────────────────────────────────────────

export type ToolsPropsType = {
  /** Initial category/tool configuration. Defaults to TOOLS_CATEGORIES_DEFAULT. */
  categories?: ToolCategoryType[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export type ToolsStatsPropsType = {
  summary: ToolsStatsSummaryType;
};

export type ToolsCategorySectionPropsType = {
  category: ToolCategoryType;
  onToggle: (toolId: string, active: boolean) => void;
  onAction: (toolId: string) => void;
};

export type ToolItemRowPropsType = {
  tool: ToolItemType;
  isLast?: boolean;
  onToggle: (toolId: string, active: boolean) => void;
  onAction: (toolId: string) => void;
};
