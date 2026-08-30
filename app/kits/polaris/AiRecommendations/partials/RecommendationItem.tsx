import type { ReactNode } from "react";
import type { AiRecommendationItemType } from "../types";
import { Content } from "../../ui/typography/Content";
import { AiRecommendationIllustration } from "./AiRecommendationIllustration";

export type RecommendationItemPartPropsType = {
  item: AiRecommendationItemType;
  onDismiss?: (item: AiRecommendationItemType) => void;
};

export function RecommendationItemPart({
  item,
  onDismiss,
}: RecommendationItemPartPropsType): ReactNode {
  const {
    title,
    tooltip,
    description,
    liftBadge,
    imageSrc,
    imageAlt,
    media,
    primaryAction,
    secondaryAction,
    dismissable,
    dismissLabel,
  } = item;

  const handleDismiss = item.onDismiss || (onDismiss ? () => onDismiss(item) : undefined);
  const showDismiss = dismissable !== false;

  const renderMedia = (): ReactNode => {
    if (media !== undefined) return media;
    if (imageSrc) {
      return <s-image src={imageSrc} alt={imageAlt || title} aspectRatio="1/0.5" />;
    }
    return <AiRecommendationIllustration />;
  };

  return (
    <s-section>
      <s-grid gridTemplateColumns="1fr auto" gap="small-400" alignItems="start">
        <s-grid
          gridTemplateColumns="@container (inline-size <= 480px) 1fr, auto auto"
          gap="base"
          alignItems="center"
        >
          <s-grid gap="small-200">
            {liftBadge ? (
              <s-stack direction="inline" gap="small-200" justifyContent="space-between">
                <Content variant="headingBase" tooltip={tooltip}>
                  {title}
                </Content>
                <s-badge
                  tone={liftBadge.tone || "success"}
                  icon={(liftBadge.icon || "arrow-up") as any}
                >
                  {liftBadge.text}
                </s-badge>
              </s-stack>
            ) : (
              <Content variant="headingBase" tooltip={tooltip}>
                {title}
              </Content>
            )}

            <s-paragraph>{description}</s-paragraph>

            {(primaryAction || secondaryAction) && (
              <s-stack direction="inline" gap="small-200">
                {primaryAction && (
                  <s-button
                    variant={primaryAction.variant || "primary"}
                    tone={primaryAction.tone}
                    icon={primaryAction.icon as any}
                    onClick={primaryAction.onClick}
                    loading={primaryAction.loading}
                    disabled={primaryAction.disabled}
                  >
                    {primaryAction.label}
                  </s-button>
                )}

                {secondaryAction && (
                  <s-button
                    tone={secondaryAction.tone || "neutral"}
                    variant={secondaryAction.variant || "tertiary"}
                    icon={secondaryAction.icon as any}
                    onClick={secondaryAction.onClick}
                    loading={secondaryAction.loading}
                    disabled={secondaryAction.disabled}
                  >
                    {secondaryAction.label}
                  </s-button>
                )}
              </s-stack>
            )}
          </s-grid>

          <s-stack alignItems="center">
            <s-box maxInlineSize="200px" borderRadius="base" overflow="hidden">
              {renderMedia()}
            </s-box>
          </s-stack>
        </s-grid>

        {showDismiss && (
          <s-button
            icon="x"
            tone="neutral"
            variant="tertiary"
            accessibilityLabel={dismissLabel || "Dismiss card"}
            onClick={handleDismiss}
          />
        )}
      </s-grid>
    </s-section>
  );
}

export default RecommendationItemPart;
