import React from "react";

export type InsightCardPropsType = {
  title: string;
  value: string | number;
  icon?: string | React.ReactNode;
  description?: string;
  points?: boolean;
  currency?: boolean | string;
};

// Compatibility alias
export type InsightCardProps = InsightCardPropsType;

export function InsightCard({
  title,
  value,
  icon,
  description,
  points,
  currency,
}: InsightCardPropsType): JSX.Element {
  return (
    <div className="p-5 rounded-xl border border-border bg-card shadow-xs flex flex-col justify-between space-y-3">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 overflow-hidden">
            {typeof icon === "string" ? (
              <img src={icon} alt="" className="w-full h-full object-contain" />
            ) : (
              icon
            )}
          </div>
        )}
        <div className="space-y-1 min-w-0">
          <span className="text-xs font-semibold text-muted-foreground block truncate">
            {title}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-foreground tracking-tight">{value}</span>
            {points && <span className="text-xs text-muted-foreground">Points</span>}
            {typeof currency === "string" && (
              <span className="text-xs text-muted-foreground">{currency}</span>
            )}
          </div>
        </div>
      </div>

      {description && (
        <p className="text-xs text-muted-foreground border-t border-border/60 pt-2">
          {description}
        </p>
      )}
    </div>
  );
}

export default InsightCard;
