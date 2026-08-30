import type { ReactNode } from "react";
import type { AiRecommendationItemType } from "../types";

export type RecommendationItemPartPropsType = {
  item: AiRecommendationItemType;
};

export function RecommendationItemPart({ item }: RecommendationItemPartPropsType): ReactNode {
  const { title, description, liftBadge, imageSrc, primaryAction } = item;

  return (
    <s-box padding="base" border="base" borderRadius="base" background="base" inlineSize="100%">
      <s-stack direction="block" gap="base">
        <s-grid gridTemplateColumns="auto 1fr" gap="base" alignItems="start">
          <s-thumbnail src={imageSrc || ""} alt={title} size="large" />

          <s-stack direction="block" gap="small-100">
            <s-grid gridTemplateColumns="1fr auto" gap="base" alignItems="start">
              <s-heading>{title}</s-heading>

              {liftBadge && (
                <s-badge
                  tone={liftBadge.tone || "success"}
                  icon={(liftBadge.icon || "arrow-up") as any}
                >
                  {liftBadge.text}
                </s-badge>
              )}
            </s-grid>

            <s-paragraph color="subdued">{description}</s-paragraph>
          </s-stack>
        </s-grid>

        <s-button
          variant="primary"
          icon={(primaryAction.icon || "plus") as any}
          onClick={primaryAction.onClick}
          loading={primaryAction.loading}
          disabled={primaryAction.disabled}
        >
          {primaryAction.label}
        </s-button>
      </s-stack>
    </s-box>
  );
}

export default RecommendationItemPart;
