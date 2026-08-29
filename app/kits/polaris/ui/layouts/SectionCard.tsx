import React from "react";

export type SectionCardPropsType = {
  title: string | React.ReactNode;
  icon?: React.ReactNode;
  description?: string | React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  onDismiss?: () => void;
  padding?: "tight" | "base" | "loose" | "none";
  id?: string;
  className?: string;
  hideDivider?: boolean;
};

// Compatibility alias
export type SectionCardProps = SectionCardPropsType;

export function SectionCard({
  title,
  icon,
  description,
  actions,
  children,
  onDismiss,
  padding = "base",
  id,
  className = "",
}: SectionCardPropsType): JSX.Element {
  const paddingClass =
    padding === "none" ? "" : padding === "tight" ? "p-3" : padding === "loose" ? "p-6" : "p-5";

  return (
    <div
      id={id}
      className={`rounded-xl border border-border bg-card shadow-xs ${paddingClass} ${className} space-y-4`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {icon && <div className="text-primary">{icon}</div>}
          <div>
            <h3 className="text-sm font-bold text-foreground">{title}</h3>
            {typeof description === "string" && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {actions}
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="text-muted-foreground hover:text-foreground text-xs p-1"
              aria-label="Dismiss"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Children Content */}
      {children}
    </div>
  );
}

export default SectionCard;
