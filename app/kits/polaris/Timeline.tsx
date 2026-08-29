import React, { Fragment } from "react";

const DAY_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const TIME_FORMAT: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
};

function formatDateTime(
  value: string | Date,
  options?: Intl.DateTimeFormatOptions
): string {
  try {
    const d = typeof value === "string" ? new Date(value) : value;
    return new Intl.DateTimeFormat("en-US", options).format(d);
  } catch {
    return String(value);
  }
}

export type TimelineItemType = {
  timestamp: string | Date;
  timelineEvent: React.ReactNode;
  tone?: "critical" | "caution" | "success" | "base" | string;
  icon?: React.ReactNode;
  url?: string;
};

// Compatibility alias
export type TimelineItem = TimelineItemType;

export type TimelinePropsType = {
  items?: TimelineItemType[];
};

// Compatibility alias
export type TimelineProps = TimelinePropsType;

export function Timeline({ items }: TimelinePropsType): React.ReactNode {
  let lastDate: string | null = null;

  return (
    <s-stack direction="block" gap="small-200">
      {items && items.length > 0 ? (
        items.map((item, index) => {
          const currentDate = formatDateTime(item.timestamp, DAY_FORMAT);
          const showDate = currentDate !== lastDate;
          lastDate = currentDate;

          const badgeTone =
            item.tone === "critical"
              ? "critical"
              : item.tone === "caution"
                ? "warning"
                : item.tone === "success"
                  ? "success"
                  : "info";

          return (
            <Fragment key={index}>
              {showDate && (
                <s-box paddingBlockStart="base" paddingBlockEnd="small-200">
                  <s-text type="strong">
                    {formatDateTime(item.timestamp, DAY_FORMAT)}
                  </s-text>
                </s-box>
              )}

              <s-box paddingBlock="small-200">
                <s-stack direction="inline" justifyContent="space-between" alignItems="center">
                  <s-stack direction="inline" gap="small-200" alignItems="center">
                    <s-badge tone={badgeTone}>●</s-badge>
                    {item.url ? (
                      <s-link href={item.url}>{item.timelineEvent}</s-link>
                    ) : (
                      <s-text>{item.timelineEvent}</s-text>
                    )}
                  </s-stack>

                  <s-text tone="neutral">
                    {formatDateTime(item.timestamp, TIME_FORMAT)}
                  </s-text>
                </s-stack>
              </s-box>
              <s-divider />
            </Fragment>
          );
        })
      ) : (
        <s-box padding="base">
          <s-text tone="neutral">No timeline events available.</s-text>
        </s-box>
      )}
    </s-stack>
  );
}

export default Timeline;
