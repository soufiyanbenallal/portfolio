import type { ReactNode } from "react";
import type { AiRecommendationsPropsType } from "./types";
import { RecommendationItemPart } from "./partials/RecommendationItem";
import { Content } from "../ui/typography/Content";

export * from "./types";

export function AiRecommendations({
  title = "AI recommendations",
  tooltip,
  subtitle = "Order history basket mining and high-impact revenue opportunities for your store.",
  badgeLabel = "AI strategy copilot",
  items = [],
  dismissable = false,
  onDismiss,
  onItemDismiss,
}: AiRecommendationsPropsType): ReactNode {
  return (
    <s-box
      padding="large"
      border="base"
      borderRadius="large"
      background="base"
      inlineSize="100%"
      maxInlineSize="720px"
    >
      <s-stack direction="block" gap="base">
        {/* Card Header */}
        <s-stack direction="block" gap="small-200">
          <s-grid gridTemplateColumns="auto 1fr auto" gap="small-200" alignItems="center">
            <s-icon type="star" tone="info" size="base" />
            <Content variant="headingMd" tooltip={tooltip}>
              {title}
            </Content>

            {dismissable && onDismiss ? (
              <s-button
                variant="tertiary"
                tone="neutral"
                icon="x"
                onClick={onDismiss}
                accessibilityLabel="Dismiss recommendations"
              />
            ) : null}
          </s-grid>

          {subtitle ? <s-paragraph color="subdued">{subtitle}</s-paragraph> : null}

          {badgeLabel ? (
            <s-stack direction="inline">
              <s-badge tone="info">{badgeLabel}</s-badge>
            </s-stack>
          ) : null}
        </s-stack>

        <s-divider direction="inline" color="base" />

        {/* Recommendations List */}
        <s-stack direction="block" gap="base">
          {items.map((item) => (
            <RecommendationItemPart
              key={item.id}
              item={item}
              onDismiss={onItemDismiss ? () => onItemDismiss(item) : item.onDismiss}
            />
          ))}
        </s-stack>
      </s-stack>
    </s-box>
  );
}

export default AiRecommendations;
