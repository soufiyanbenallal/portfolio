"use client";

import React, { type ReactNode, type JSX } from "react";
import { Content } from "../typography/Content";

export type IconType = JSX.IntrinsicElements["s-icon"]["type"];
export type CardPaddingType = "none" | "small-300" | "small-200" | "base" | "large-100";
export type CardBackgroundType = "base" | "subdued" | "transparent";

export type CardPropsType = {
  title?: ReactNode;
  tooltipContent?: ReactNode;
  description?: ReactNode;
  icon?: IconType | string;
  rightActions?: ReactNode;
  children?: ReactNode;
  padding?: "none" | "base";
  id?: string;
  hideDivider?: boolean;
};

export function Card({
  title,
  tooltipContent,
  description,
  icon,
  rightActions,
  children,
  padding = "base",
  id,
  hideDivider = false,
}: CardPropsType): ReactNode {
  const hasHeader = title || description || icon || rightActions;

  return (
    <s-section id={id} padding={padding}>
      <s-stack direction="block" gap="base">
        {hasHeader && (
          <s-stack direction="inline" justifyContent="space-between" alignItems="center">
            <s-stack direction="block" gap="none">
              {title && (
                <s-stack direction="inline" gap="small-200" alignItems="center">
                  {icon && <s-icon type={icon as IconType} tone="neutral" />}
                  <Content tooltip={tooltipContent} variant="headingMd">
                    {title}
                  </Content>
                </s-stack>
              )}
              {description && <s-text tone="neutral">{description}</s-text>}
            </s-stack>

            {rightActions && (
              <s-stack direction="inline" gap="small-200" alignItems="center">
                {rightActions}
              </s-stack>
            )}
          </s-stack>
        )}

        {hasHeader && children && !hideDivider && <s-divider />}

        {children}
      </s-stack>
    </s-section>
  );
}

export default Card;
