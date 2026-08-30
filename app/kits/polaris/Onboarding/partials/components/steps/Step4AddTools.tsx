import type { Dispatch } from "react";
import { Boxes, Gift, Rocket, Zap } from "lucide-react";
import type { OnboardingActionType, OnboardingStateType, OptionalToolIdType } from "../../types";
import { Badge, Button, Card, IconTile, ToggleSwitch } from "../shared/ui";
import { cn } from "../../utils";
import styles from "./Step4AddTools.module.css";

const OPTIONAL_ICONS: Record<OptionalToolIdType, typeof Boxes> = {
  "volume-discounts": Boxes,
  "post-purchase-upsell": Rocket,
  "product-addons": Gift,
  "checkout-bumps": Zap,
};

export type Step4AddToolsPropsType = {
  state: OnboardingStateType;
  dispatch: Dispatch<OnboardingActionType>;
};

export function Step4AddTools({ state, dispatch }: Step4AddToolsPropsType) {
  const selectedCount = state.optionalTools.filter((tool) => tool.selected).length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Add more revenue tools</h1>
        <p className={styles.subtitle}>
          Optional, high-impact modules. Nothing here is required to launch.
        </p>
      </div>

      <div className={styles.toolGrid}>
        {state.optionalTools.map((tool, i) => {
          const Icon = OPTIONAL_ICONS[tool.id];
          return (
            <Card
              key={tool.id}
              className={cn(styles.toolCard, tool.selected && styles.toolCardSelected)}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={styles.cardHeader}>
                <IconTile
                  icon={<Icon style={{ height: "1.25rem", width: "1.25rem" }} />}
                  tone={tool.selected ? "green" : "gray"}
                />
                <ToggleSwitch
                  checked={tool.selected}
                  onChange={() => dispatch({ type: "TOGGLE_OPTIONAL_TOOL", id: tool.id })}
                  label={`Enable ${tool.name}`}
                />
              </div>
              <p className={styles.toolName}>{tool.name}</p>
              <p className={styles.toolDescription}>{tool.description}</p>
              <div className={styles.badgeWrapper}>
                <Badge tone="gray">{tool.impact}</Badge>
              </div>
            </Card>
          );
        })}
      </div>

      <p className={styles.footnote}>
        *Illustrative benchmarks — your own Analytics will show real lift once live.
      </p>

      <div className={styles.bottomBar}>
        <div className={styles.bottomBarInner}>
          <p className={styles.bottomBarText}>
            {selectedCount === 0
              ? "No tools selected yet"
              : `${selectedCount} tool${selectedCount > 1 ? "s" : ""} selected`}
          </p>
          <Button onClick={() => dispatch({ type: "GO_NEXT" })}>
            {selectedCount === 0
              ? "Skip for now"
              : `Set up ${selectedCount} tool${selectedCount > 1 ? "s" : ""}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
