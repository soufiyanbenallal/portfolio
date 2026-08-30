"use client";

import React, { type ReactNode } from "react";

export type TimelineFilterBarPropsType = {
  search: string;
  onSearchChange: (val: string) => void;
  filterTone: string;
  onFilterToneChange: (tone: string) => void;
  searchable?: boolean;
  allowFilter?: boolean;
};

export function TimelineFilterBarPart({
  search,
  onSearchChange,
  filterTone,
  onFilterToneChange,
  searchable = true,
  allowFilter = true,
}: TimelineFilterBarPropsType): ReactNode {
  return (
    <s-stack direction="inline" justifyContent="space-between" alignItems="center" gap="small-200">
      {searchable && (
        <s-search-field
          value={search}
          onInput={(e: any) => onSearchChange(e.target.value)}
          placeholder="Filter timeline activity..."
        />
      )}

      {allowFilter && (
        <s-stack direction="inline" gap="small-200" alignItems="center">
          <s-button
            variant={filterTone === "all" ? "primary" : "secondary"}
            onClick={() => onFilterToneChange("all")}
          >
            All
          </s-button>
          <s-button
            variant={filterTone === "success" ? "primary" : "secondary"}
            onClick={() => onFilterToneChange("success")}
          >
            Success
          </s-button>
          <s-button
            variant={filterTone === "warning" ? "primary" : "secondary"}
            onClick={() => onFilterToneChange("warning")}
          >
            Warnings
          </s-button>
          <s-button
            variant={filterTone === "critical" ? "primary" : "secondary"}
            onClick={() => onFilterToneChange("critical")}
          >
            Alerts
          </s-button>
        </s-stack>
      )}
    </s-stack>
  );
}

export default TimelineFilterBarPart;
