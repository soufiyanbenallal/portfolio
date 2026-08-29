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

function LocalDateTime({
  value,
  options,
}: {
  value: string | Date;
  options?: Intl.DateTimeFormatOptions;
}): React.ReactNode {
  return <span>{formatDateTime(value, options)}</span>;
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
    <div className="space-y-4">
      {items && items.length > 0 ? (
        items.map((item, index) => {
          const currentDate = formatDateTime(item.timestamp, DAY_FORMAT);
          const showDate = currentDate !== lastDate;
          lastDate = currentDate;

          const toneClass =
            item.tone === "critical" || item.tone === "caution"
              ? "bg-destructive text-destructive-foreground"
              : item.tone === "success"
                ? "bg-emerald-500 text-white"
                : "bg-muted text-muted-foreground";

          return (
            <Fragment key={index}>
              {showDate && (
                <div className="pt-3 pb-1">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <LocalDateTime value={item.timestamp} options={DAY_FORMAT} />
                  </span>
                </div>
              )}

              <div className="grid grid-cols-[24px_1fr_auto] gap-3 items-center py-1.5 border-b border-border/40">
                <div className="flex items-center justify-center">
                  <div className={`w-2.5 h-2.5 rounded-full ${toneClass} ring-2 ring-background`} />
                </div>
                <div className="text-xs text-foreground flex items-center gap-2">
                  {item.icon}
                  {item.url ? (
                    <a
                      href={item.url}
                      className="hover:underline font-medium text-foreground flex items-center gap-1"
                    >
                      <span>{item.timelineEvent}</span>
                      <span>→</span>
                    </a>
                  ) : (
                    <span>{item.timelineEvent}</span>
                  )}
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <LocalDateTime value={item.timestamp} options={TIME_FORMAT} />
                </div>
              </div>
            </Fragment>
          );
        })
      ) : (
        <div className="p-6 text-center text-xs text-muted-foreground">
          No timeline events available.
        </div>
      )}
    </div>
  );
}

export default Timeline;
