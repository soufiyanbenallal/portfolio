"use client";

import React, { type ReactNode } from "react";

const DAY_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export function formatDayDate(val: string | Date): string {
  try {
    const d = typeof val === "string" ? new Date(val) : val;
    return new Intl.DateTimeFormat("en-US", DAY_FORMAT).format(d);
  } catch {
    return String(val);
  }
}

export type TimelineDateHeaderPropsType = {
  dateString: string;
  count?: number;
};

export function TimelineDateHeaderPart({
  dateString,
  count,
}: TimelineDateHeaderPropsType): ReactNode {
  return (
    <s-box paddingBlockStart="base" paddingBlockEnd="small-200">
      <s-stack direction="inline" justifyContent="space-between" alignItems="center">
        <s-text type="strong">{dateString}</s-text>
        {typeof count === "number" && (
          <s-badge tone="neutral">
            {count} {count === 1 ? "event" : "events"}
          </s-badge>
        )}
      </s-stack>
    </s-box>
  );
}

export default TimelineDateHeaderPart;
