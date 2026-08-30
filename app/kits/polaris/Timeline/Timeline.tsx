"use client";

import React, { useState, useMemo, Fragment, type ReactNode, type JSX } from "react";
import { TimelineItemPart } from "./partials/TimelineItem.part";
import { TimelineDateHeaderPart, formatDayDate } from "./partials/TimelineDateHeader.part";
import { TimelineFilterBarPart } from "./partials/TimelineFilterBar.part";

export type TimelineIconType = JSX.IntrinsicElements["s-icon"]["type"];
export type IconType = TimelineIconType;

export type TimelineEventToneType =
  "auto" | "success" | "info" | "neutral" | "warning" | "critical";

export type TimelineActionItemType = {
  label: string;
  onClick?: () => void;
  url?: string;
  variant?: "primary" | "secondary" | "tertiary";
};

export type TimelineItemType = {
  id: string;
  timestamp: string | Date;
  title: ReactNode;
  timelineEvent?: ReactNode;
  description?: ReactNode;
  actor?: string;
  actorAvatar?: string;
  icon?: TimelineIconType | string;
  tone?: TimelineEventToneType | string;
  tag?: string;
  url?: string;
  actions?: TimelineActionItemType[];
  metadata?: Record<string, string>;
};

export type TimelinePropsType = {
  title?: string;
  subtitle?: string;
  items?: TimelineItemType[];
  searchable?: boolean;
  allowFilter?: boolean;
  pageSize?: number;
  emptyStateHeading?: string;
  emptyStateMessage?: string;
  onRefresh?: () => void;
  className?: string;
};

export function Timeline({
  title = "Store Activity & Audit Trail",
  subtitle = "Complete chronological log of store automations, catalog syncs, and staff actions.",
  items = [],
  searchable = true,
  allowFilter = true,
  pageSize = 10,
  emptyStateHeading = "No activity found",
  emptyStateMessage = "There are no timeline events matching the current search or filter criteria.",
  onRefresh,
}: TimelinePropsType): ReactNode {
  const [search, setSearch] = useState("");
  const [filterTone, setFilterTone] = useState("all");
  const [visibleCount, setVisibleCount] = useState(pageSize);

  // Filter items by search query and tone filter
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const titleStr =
        typeof item.title === "string"
          ? item.title
          : typeof item.timelineEvent === "string"
            ? item.timelineEvent
            : "";
      const descStr = typeof item.description === "string" ? item.description : "";
      const actorStr = item.actor || "";
      const tagStr = item.tag || "";

      const fullText = `${titleStr} ${descStr} ${actorStr} ${tagStr}`.toLowerCase();
      const matchesSearch = !search || fullText.includes(search.toLowerCase().trim());
      const matchesTone = filterTone === "all" || item.tone === filterTone;

      return matchesSearch && matchesTone;
    });
  }, [items, search, filterTone]);

  // Group paginated items by calendar date
  const paginatedItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const groupedByDate = useMemo(() => {
    const groups: { date: string; items: TimelineItemType[] }[] = [];
    let currentDate = "";
    let currentList: TimelineItemType[] = [];

    for (const item of paginatedItems) {
      const dateStr = formatDayDate(item.timestamp);
      if (dateStr !== currentDate) {
        if (currentList.length > 0) {
          groups.push({ date: currentDate, items: currentList });
        }
        currentDate = dateStr;
        currentList = [item];
      } else {
        currentList.push(item);
      }
    }

    if (currentList.length > 0) {
      groups.push({ date: currentDate, items: currentList });
    }

    return groups;
  }, [paginatedItems]);

  const hasMore = filteredItems.length > visibleCount;

  return (
    <s-section>
      <s-box padding="base" borderWidth="base" borderRadius="base" background="base">
        <s-stack direction="block" gap="base">
          {/* Header */}
          <s-stack direction="inline" justifyContent="space-between" alignItems="center">
            <s-stack direction="block" gap="none">
              <s-heading>{title}</s-heading>
              {subtitle && <s-text tone="neutral">{subtitle}</s-text>}
            </s-stack>

            <s-stack direction="inline" gap="small-200" alignItems="center">
              <s-badge tone="info">{filteredItems.length} total events</s-badge>
              {onRefresh && (
                <s-button variant="secondary" onClick={onRefresh} icon="refresh">
                  Refresh
                </s-button>
              )}
            </s-stack>
          </s-stack>

          {/* Search & Filter Toolbar */}
          {(searchable || allowFilter) && (
            <TimelineFilterBarPart
              search={search}
              onSearchChange={setSearch}
              filterTone={filterTone}
              onFilterToneChange={setFilterTone}
              searchable={searchable}
              allowFilter={allowFilter}
            />
          )}

          <s-divider />

          {/* Grouped Timeline Events List */}
          {groupedByDate.length > 0 ? (
            <s-stack direction="block" gap="small-200">
              {groupedByDate.map((group) => (
                <Fragment key={group.date}>
                  <TimelineDateHeaderPart dateString={group.date} count={group.items.length} />
                  <s-stack direction="block" gap="small-200">
                    {group.items.map((item) => (
                      <TimelineItemPart key={item.id} item={item} />
                    ))}
                  </s-stack>
                </Fragment>
              ))}

              {/* Load More Pagination */}
              {hasMore && (
                <s-box paddingBlockStart="base">
                  <s-stack direction="inline" justifyContent="center">
                    <s-button
                      variant="secondary"
                      onClick={() => setVisibleCount((prev) => prev + pageSize)}
                    >
                      Load older events ({filteredItems.length - visibleCount} remaining)
                    </s-button>
                  </s-stack>
                </s-box>
              )}
            </s-stack>
          ) : (
            /* Empty State */
            <s-box padding="base">
              <s-stack direction="block" gap="small-200" alignItems="center">
                <s-icon type="search" tone="neutral" />
                <s-text type="strong">{emptyStateHeading}</s-text>
                <s-text tone="neutral">{emptyStateMessage}</s-text>
                {(search || filterTone !== "all") && (
                  <s-button
                    variant="secondary"
                    onClick={() => {
                      setSearch("");
                      setFilterTone("all");
                    }}
                  >
                    Clear filters
                  </s-button>
                )}
              </s-stack>
            </s-box>
          )}
        </s-stack>
      </s-box>
    </s-section>
  );
}

export default Timeline;
