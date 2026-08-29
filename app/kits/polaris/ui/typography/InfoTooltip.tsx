import React, { type ReactNode, useId } from "react";

export type InfoTooltipPropsType = {
  label: string;
  tooltip: string;
  variant?: "bodyMd" | "bodySm" | "headingSm" | "headingMd";
  fontWeight?: "regular" | "medium" | "semibold" | "bold";
  tone?: "subdued" | "success" | "critical" | "caution";
};

// Compatibility alias
export type InfoTooltipProps = InfoTooltipPropsType;

export function InfoTooltip({ label, tooltip }: InfoTooltipPropsType): ReactNode {
  const id = useId();

  return (
    <s-stack direction="inline" gap="small-200" alignItems="center">
      <s-text interestFor={id}>{label}</s-text>
      <s-icon type="info" interestFor={id} tone="neutral" />
      <s-tooltip id={id}>{tooltip}</s-tooltip>
    </s-stack>
  );
}

export default InfoTooltip;
