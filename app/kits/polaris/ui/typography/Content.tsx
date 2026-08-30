import { type CSSProperties, type ReactNode, useId } from "react";

export type ContentVariantType = "base" | "headingBase" | "headingMd" | "headingLg";

export type ContentPropsType = {
  children?: ReactNode;
  tooltip?: ReactNode;
  subdue?: boolean;
  underline?: boolean;
  variant?: ContentVariantType;
  id?: string;
  style?: CSSProperties;
  className?: string;
  tone?: "auto" | "info" | "success" | "neutral" | "caution" | "warning" | "critical" | undefined;
};

const VARIANT_CONFIG_MAP: Record<
  ContentVariantType,
  {
    fontSize: string;
    lineHeight: string;
    fontWeight?: number | string;
  }
> = {
  base: {
    fontSize: "0.8125rem",
    lineHeight: "1.25rem",
  },
  headingBase: {
    fontSize: "0.8125rem",
    lineHeight: "1.25rem",
    fontWeight: 600,
  },
  headingMd: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
    fontWeight: 700,
  },
  headingLg: {
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
    fontWeight: 700,
  },
};

export function Content({
  children,
  tooltip,
  subdue = false,
  underline = true,
  variant = "base",
  id: propId,
  style,
  className,
  tone,
}: ContentPropsType): ReactNode {
  const autoId = useId();
  const id = propId || autoId;
  const content = children;
  const hasTooltip = Boolean(tooltip);

  if (!content) return null;

  const config = VARIANT_CONFIG_MAP[variant] || VARIANT_CONFIG_MAP.base;

  const typographyStyle = {
    lineHeight: config.lineHeight,
    "--s-global-font-weight-26021": config.fontWeight,
    "--s-global-font-size-26021": config.fontSize,
  } as CSSProperties;

  return (
    <>
      <span
        className={className}
        style={{
          borderBlockEnd: hasTooltip && underline ? "2px dotted #cccccc" : "none",
          ...typographyStyle,
          ...style,
        }}
      >
        <s-text
          tone={tone}
          color={subdue ? "subdued" : undefined}
          interestFor={hasTooltip ? id : undefined}
        >
          {content}
        </s-text>
      </span>
      {tooltip && <s-tooltip id={id}>{tooltip}</s-tooltip>}
    </>
  );
}

export default Content;
