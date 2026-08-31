import { Fragment, type ReactNode } from "react";
import type { ToolsCategorySectionPropsType } from "../types";
import { ToolItemRowPart } from "./ToolItemRow.part";
import Content from "../../ui/typography/Content";

export function ToolsCategorySectionPart({
  category,
  onToggle,
  onAction,
}: ToolsCategorySectionPropsType): ReactNode {
  return (
    <s-stack direction="block" gap="small-200">
      {/* Category header row */}
      <s-stack direction="inline" gap="small" justifyContent="space-between" alignItems="center">
        <s-stack direction="inline" gap="small-300" alignItems="center">
          <s-icon type={category.icon} />
          <Content tooltip={category.title} variant="headingBase">
            {category.title}
          </Content>
        </s-stack>
        <Content subdue>
          {category.tools.length} {category.tools.length === 1 ? "tool" : "tools"}
        </Content>
      </s-stack>

      {/* Tool card group */}
      <s-section padding="none">
        {category.tools.map((tool, i) => (
          <Fragment key={tool.id}>
            <ToolItemRowPart
              tool={tool}
              isLast={i === category.tools.length - 1}
              onToggle={onToggle}
              onAction={onAction}
            />
            <s-divider />
          </Fragment>
        ))}
      </s-section>
    </s-stack>
  );
}
