"use client";

import React, { type ReactNode } from "react";
import type { TimelineItemType, TimelineEventToneType, IconType } from "../Timeline";

const TIME_FORMAT: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
};

function formatTime(val: string | Date): string {
  try {
    const d = typeof val === "string" ? new Date(val) : val;
    return new Intl.DateTimeFormat("en-US", TIME_FORMAT).format(d);
  } catch {
    return String(val);
  }
}

export type TimelineItemPartPropsType = {
  item: TimelineItemType;
};

export function TimelineItemPart({ item }: TimelineItemPartPropsType): ReactNode {
  const displayTitle = item.title ?? item.timelineEvent;
  const tone = (item.tone as TimelineEventToneType) || "neutral";

  const badgeTone =
    tone === "critical"
      ? "critical"
      : tone === "warning"
        ? "warning"
        : tone === "success"
          ? "success"
          : "info";

  return (
    <s-box padding="base" borderWidth="base" borderRadius="base" background="base">
      <s-stack direction="block" gap="small-200">
        {/* Header Row: Icon + Title + Tag + Time */}
        <s-stack direction="inline" justifyContent="space-between" alignItems="center">
          <s-stack direction="inline" gap="small-200" alignItems="center">
            {item.icon ? (
              <s-icon type={item.icon as IconType} tone={tone} />
            ) : (
              <s-badge tone={badgeTone}>●</s-badge>
            )}

            {item.url ? (
              <s-link href={item.url}>
                <s-text type="strong">{displayTitle}</s-text>
              </s-link>
            ) : (
              <s-text type="strong">{displayTitle}</s-text>
            )}

            {item.tag && <s-badge tone={badgeTone}>{item.tag}</s-badge>}
          </s-stack>

          <s-text tone="neutral">{formatTime(item.timestamp)}</s-text>
        </s-stack>

        {/* Description / Secondary text */}
        {item.description && (
          <s-paragraph>{item.description}</s-paragraph>
        )}

        {/* Actor and Actions footer */}
        {(item.actor || (item.actions && item.actions.length > 0)) && (
          <s-stack direction="inline" justifyContent="space-between" alignItems="center">
            {item.actor ? (
              <s-text tone="neutral">Triggered by: {item.actor}</s-text>
            ) : (
              <s-box />
            )}

            {item.actions && item.actions.length > 0 && (
              <s-stack direction="inline" gap="small-200" alignItems="center">
                {item.actions.map((act, i) => (
                  <s-button
                    key={i}
                    variant={act.variant || "secondary"}
                    onClick={act.onClick}
                  >
                    {act.label}
                  </s-button>
                ))}
              </s-stack>
            )}
          </s-stack>
        )}
      </s-stack>
    </s-box>
  );
}

export default TimelineItemPart;
