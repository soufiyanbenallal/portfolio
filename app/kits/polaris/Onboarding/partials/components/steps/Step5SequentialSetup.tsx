import { useEffect, type Dispatch } from "react";
import { Boxes, Check, Gift, Rocket, Zap } from "lucide-react";
import type { OnboardingActionType, OnboardingStateType, OptionalToolIdType } from "../../types";
import { Button, Card, IconTile } from "../shared/ui";
import { cn } from "../../utils";
import styles from "./Step5SequentialSetup.module.css";

const OPTIONAL_ICONS: Record<OptionalToolIdType, typeof Boxes> = {
  "volume-discounts": Boxes,
  "post-purchase-upsell": Rocket,
  "product-addons": Gift,
  "checkout-bumps": Zap,
};

export type Step5SequentialSetupPropsType = {
  state: OnboardingStateType;
  dispatch: Dispatch<OnboardingActionType>;
};

export function Step5SequentialSetup({ state, dispatch }: Step5SequentialSetupPropsType) {
  const queue = state.optionalTools.filter((tool) => tool.selected);
  const current = queue[state.queueIndex];
  const isLast = state.queueIndex >= queue.length - 1;

  // Default to the first preset the moment a tool becomes current, so
  // "Apply & continue" always has a sensible one-click choice ready.
  useEffect(() => {
    if (current && !current.selectedPresetId) {
      dispatch({ type: "SELECT_PRESET", id: current.id, presetId: current.presets[0].id });
    }
  }, [current, dispatch]);

  // Guard: if the queue is ever empty when this step renders, leave immediately.
  useEffect(() => {
    if (!current) dispatch({ type: "GO_NEXT" });
  }, [current, dispatch]);

  if (!current) return null;

  const Icon = OPTIONAL_ICONS[current.id];

  const advance = () => dispatch(isLast ? { type: "GO_NEXT" } : { type: "NEXT_IN_QUEUE" });

  return (
    <div className={styles.container}>
      <Card key={current.id} className={styles.card}>
        <div className={styles.pillContainer}>
          {queue.map((tool, i) => (
            <span
              key={tool.id}
              className={cn(
                styles.pill,
                i === state.queueIndex ? styles.pillActive : styles.pillInactive
              )}
            />
          ))}
        </div>

        <div className={styles.toolHeader}>
          <IconTile icon={<Icon style={{ height: "1.25rem", width: "1.25rem" }} />} />
          <div>
            <p className={styles.toolHeaderBadge}>
              Tool {state.queueIndex + 1} of {queue.length}
            </p>
            <h1 className={styles.toolTitle}>{current.name}</h1>
          </div>
        </div>
        <p className={styles.toolDescription}>{current.description}</p>

        <div role="radiogroup" aria-label={`${current.name} preset`} className={styles.radioGroup}>
          {current.presets.map((preset) => {
            const selected = current.selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() =>
                  dispatch({ type: "SELECT_PRESET", id: current.id, presetId: preset.id })
                }
                className={cn(styles.radioItem, selected && styles.radioItemSelected)}
              >
                <span
                  className={cn(styles.radioIndicator, selected && styles.radioIndicatorSelected)}
                >
                  {selected ? (
                    <Check style={{ height: "0.625rem", width: "0.625rem" }} strokeWidth={3} />
                  ) : null}
                </span>
                <span>
                  <span className={styles.presetLabel}>{preset.label}</span>
                  <span className={styles.presetDescription}>{preset.description}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className={styles.actionGroup}>
          <Button
            className={styles.fullWidthButton}
            onClick={() => {
              dispatch({ type: "CONFIRM_TOOL_CONFIG", id: current.id });
              advance();
            }}
          >
            Apply &amp; continue
          </Button>
          <button
            type="button"
            onClick={() => {
              dispatch({ type: "DEFER_TOOL_CONFIG", id: current.id });
              advance();
            }}
            className={styles.deferButton}
          >
            Configure later in Hub
          </button>
        </div>
      </Card>
    </div>
  );
}
