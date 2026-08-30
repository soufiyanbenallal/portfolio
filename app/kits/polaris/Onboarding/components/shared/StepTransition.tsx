import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "../../onboarding.module.css";

export type StepTransitionPropsType = {
  stepKey: string;
  children: ReactNode;
};

export function StepTransition({ stepKey, children }: StepTransitionPropsType) {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const [renderedKey, setRenderedKey] = useState(stepKey);
  const activeKey = useRef(stepKey);
  const lastChildren = useRef(children);

  const showingCurrent = renderedKey === stepKey;
  if (showingCurrent) {
    // Not mid-transition: always keep this in sync so same-step re-renders
    // (e.g. the Step 1 checklist ticking, or a form field changing) show up
    // immediately, with no animation replay.
    lastChildren.current = children;
  }

  useEffect(() => {
    if (activeKey.current === stepKey) return;
    setPhase("exit");
    const timeout = window.setTimeout(() => {
      activeKey.current = stepKey;
      setRenderedKey(stepKey);
      setPhase("enter");
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    }, 180);
    return () => window.clearTimeout(timeout);
    // Re-run only when the step identity changes, not on every content re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepKey]);

  return (
    <div
      key={renderedKey}
      className={phase === "enter" ? styles.stepPanelEnter : styles.stepPanelExit}
    >
      {showingCurrent ? children : lastChildren.current}
    </div>
  );
}
