import React, { type ReactNode, useId } from "react";

export type ContentVariantType = "base" | "headingSm" | "headingMd" | "headingLg";

export type ContentPropsType = {
  children?: ReactNode;
  tooltip?: ReactNode;
  subdue?: boolean;
  underline?: boolean;
  variant?: ContentVariantType;
  id?: string;
};

export function Content({
  children,
  tooltip,
  subdue = false,
  underline = true,
  variant = "base",
  id: propId,
}: ContentPropsType): ReactNode {
  const autoId = useId();
  const id = propId || autoId;
  const content = children;
  const hasTooltip = Boolean(tooltip);

  if (!content) return null;

  const isHeading = variant.startsWith("heading");

  return (
    <>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          borderBlockEnd: hasTooltip && underline ? "2px dotted #cccccc" : "none",
        }}
      >
        {isHeading ? (
          <s-heading>
            <s-text interestFor={hasTooltip ? id : undefined}>{content}</s-text>
          </s-heading>
        ) : (
          <s-text tone={subdue ? "neutral" : undefined} interestFor={hasTooltip ? id : undefined}>
            {content}
          </s-text>
        )}
      </span>
      {tooltip && <s-tooltip id={id}>{tooltip}</s-tooltip>}
    </>
  );
}

export default Content;
