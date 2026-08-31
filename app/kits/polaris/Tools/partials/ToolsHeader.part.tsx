import type { ReactNode } from "react";

type ToolsHeaderPropsType = {
  subtitle: string;
};

export function ToolsHeaderPart({ subtitle }: ToolsHeaderPropsType): ReactNode {
  return (
    <s-stack direction="block" gap="small-200">
      <s-paragraph color="subdued">{subtitle}</s-paragraph>
    </s-stack>
  );
}
