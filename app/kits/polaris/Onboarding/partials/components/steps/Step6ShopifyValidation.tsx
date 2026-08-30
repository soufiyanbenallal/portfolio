import { useEffect, useRef, type Dispatch } from "react";
import { Check, ExternalLink, RefreshCw } from "lucide-react";
import type { OnboardingActionType, OnboardingStateType } from "../../types";
import { Button, Card } from "../shared/ui";
import { cn, getThemeEditorDeepLink } from "../../utils";
import styles from "./Step6ShopifyValidation.module.css";

const CHECK_DURATION_MS = 2600;

export type Step6ShopifyValidationPropsType = {
  state: OnboardingStateType;
  dispatch: Dispatch<OnboardingActionType>;
};

export function Step6ShopifyValidation({ state, dispatch }: Step6ShopifyValidationPropsType) {
  const checkTimeout = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(checkTimeout.current), []);

  const runCheck = () => {
    dispatch({ type: "SET_EMBED_STATUS", status: "checking" });
    window.clearTimeout(checkTimeout.current);
    checkTimeout.current = window.setTimeout(() => {
      dispatch({ type: "SET_EMBED_STATUS", status: "active" });
    }, CHECK_DURATION_MS);
  };

  const openThemeEditor = () => {
    // In production this opens a real tab via the deep link below; the
    // sandboxed demo simulates the round trip instead of navigating away.
    void getThemeEditorDeepLink("example.myshopify.com", "current", "journeva");
    runCheck();
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1 className={styles.title}>Activate your theme embed</h1>
        <p className={styles.subtitle}>
          One click enables Journeva&rsquo;s cart drawer and upsells on your storefront.
        </p>

        <button type="button" onClick={openThemeEditor} className={styles.editorButton}>
          <span>
            <span className={styles.editorButtonTitle}>Open Theme Editor</span>
            <span className={styles.editorButtonSubtitle}>Opens Shopify in a new tab</span>
          </span>
          <ExternalLink className={styles.editorButtonIcon} />
        </button>

        <div className={styles.statusCard}>
          <div className={styles.statusLeft}>
            {state.embedStatus === "active" ? (
              <span className={styles.checkCircle}>
                <Check style={{ height: "0.75rem", width: "0.75rem" }} strokeWidth={3} />
              </span>
            ) : (
              <span
                className={cn(
                  styles.dot,
                  state.embedStatus === "checking" ? styles.dotChecking : styles.dotIdle
                )}
              />
            )}
            <span className={styles.statusText}>
              {state.embedStatus === "active"
                ? "Theme embed active"
                : state.embedStatus === "checking"
                  ? "Checking installation status…"
                  : "Not detected yet"}
            </span>
          </div>
          <button
            type="button"
            onClick={runCheck}
            disabled={state.embedStatus === "checking"}
            className={styles.recheckButton}
          >
            <RefreshCw
              className={cn(styles.recheckIcon, state.embedStatus === "checking" && styles.spinner)}
            />
            Recheck
          </button>
        </div>

        <div className={styles.actionWrapper}>
          <Button className={styles.fullWidthButton} onClick={() => dispatch({ type: "GO_NEXT" })}>
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
}
