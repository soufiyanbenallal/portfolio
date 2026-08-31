import type { ReactNode } from "react";
import type { ToolItemRowPropsType } from "../types";
import Content from "../../ui/typography/Content";

export function ToolItemRowPart({
  tool,
  isLast = false,
  onToggle,
  onAction,
}: ToolItemRowPropsType): ReactNode {
  const isActive = tool.status === "active";
  const isLocked = tool.status === "locked";
  const isNeedsSetup = tool.status === "needs_setup";

  return (
    <s-box padding="base">
      <s-stack direction="inline" gap="base" alignItems="center">
        {/* Left: name, tag, description */}
        <div style={{ flex: 1 }}>
          <s-stack gap="small-200">
            <s-stack direction="inline" gap="base">
              <Content variant="headingBase">{tool.name}</Content>
              {tool.tag && <s-badge>{tool.tag}</s-badge>}
            </s-stack>
            <s-text color="subdued">{tool.description}</s-text>
          </s-stack>
        </div>
        {/* Right: badge + action */}
        <s-stack alignItems="end" gap="small-200">
          {/* Status badge */}
          {isActive && (
            <s-badge tone="success" icon="check">
              Active
            </s-badge>
          )}
          {isNeedsSetup && (
            <s-badge tone="critical" icon="alert-triangle">
              Needs Setup
            </s-badge>
          )}
          {isLocked && (
            <s-badge icon="lock" tone="info">
              Plan Upgrade
            </s-badge>
          )}
          {tool.status === "inactive" && (
            <s-badge tone="caution" icon="alert-diamond">
              Inactive
            </s-badge>
          )}

          {/* Action — switch or button */}
          {tool.actionVariant === "switch" && (
            <s-switch
              aria-checked={isActive}
              checked={isActive}
              aria-label={`Toggle ${tool.name}`}
              onChange={() => onToggle(tool.id, !isActive)}
            />
          )}

          {tool.actionVariant === "setup" && (
            <s-button variant="primary" onClick={() => onAction(tool.id)}>
              {tool.actionLabel ?? "Set Up"}
            </s-button>
          )}

          {tool.actionVariant === "upgrade" && (
            <s-button onClick={() => onAction(tool.id)}>
              {tool.actionLabel ?? "Upgrade to Pro"}
            </s-button>
          )}
        </s-stack>
      </s-stack>
    </s-box>
  );
}
