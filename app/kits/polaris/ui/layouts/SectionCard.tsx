import React, { type ReactNode } from "react";

export type SectionCardPropsType = {
  title: string | ReactNode;
  icon?: ReactNode;
  description?: string | ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  onDismiss?: () => void;
  padding?: "tight" | "base" | "loose" | "none";
  id?: string;
  className?: string;
  hideDivider?: boolean;
};


export function SectionCard({
  title,
  icon,
  description,
  actions,
  children,
  onDismiss,
  id,
}: SectionCardPropsType): ReactNode {
  return (
    <s-box id={id} padding="base" borderWidth="base" borderRadius="base" background="base">
      <s-stack direction="block" gap="base">
        {/* Header */}
        <s-stack direction="inline" justifyContent="space-between" alignItems="center">
          <s-stack direction="inline" gap="small-200" alignItems="center">
            {icon}
            <s-stack direction="block" gap="none">
              {typeof title === "string" ? <s-heading>{title}</s-heading> : title}
              {typeof description === "string" ? (
                <s-text tone="neutral">{description}</s-text>
              ) : (
                description
              )}
            </s-stack>
          </s-stack>

          <s-stack direction="inline" gap="small-200" alignItems="center">
            {actions}
            {onDismiss && (
              <s-button variant="secondary" onClick={onDismiss} icon="x" />
            )}
          </s-stack>
        </s-stack>

        {/* Children Content */}
        {children}
      </s-stack>
    </s-box>
  );
}

export default SectionCard;
