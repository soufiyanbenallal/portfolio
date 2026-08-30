import React from "react";
import type { OnboardingStepIdType, StepConfigItemType } from "../../types";
import styles from "./ProgressHeader.module.css";

export type ProgressHeaderPropsType = {
  stepIndex: number;
  steps: StepConfigItemType[];
  onGoToStep?: (step: OnboardingStepIdType) => void;
};

export function ProgressHeader({ stepIndex, steps, onGoToStep }: ProgressHeaderPropsType) {
  return (
    <s-stack direction="inline" gap="small-100" alignItems="center" justifyContent="center">
      {steps.map((item, idx) => {
        const isCompleted = idx < stepIndex;
        const isCurrent = idx === stepIndex;

        return (
          <React.Fragment key={item.id}>
            {idx > 0 && (
              <span
                className={isCompleted ? styles.lineCompleted : styles.line}
                aria-hidden="true"
              />
            )}
            {isCompleted ? (
              <span className={styles.clickableWrapper}>
                <s-clickable
                  onClick={() => onGoToStep?.(item.id)}
                  accessibilityLabel={`Go back to ${item.label}`}
                >
                  <s-badge tone="success" size="large-100" icon="check">
                    {item.label}
                  </s-badge>
                </s-clickable>
              </span>
            ) : isCurrent ? (
              <s-badge tone="info" size="large-100" icon={item.icon}>
                {item.label}
              </s-badge>
            ) : (
              <s-badge tone="auto" size="large-100" icon={item.icon}>
                {item.label}
              </s-badge>
            )}
          </React.Fragment>
        );
      })}
    </s-stack>
  );
}
