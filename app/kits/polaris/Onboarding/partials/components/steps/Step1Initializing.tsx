import { useEffect, useRef, useState, type Dispatch } from 'react';
import { Check, Loader2 } from 'lucide-react';
import type { OnboardingActionType, OnboardingStateType } from '../../types';
import { Card } from '../shared/ui';
import { cn } from '../../utils';
import styles from './Step1Initializing.module.css';

const TASK_INTERVAL_MS = 750;
const HOLD_AFTER_COMPLETE_MS = 550;
const FALLBACK_VISIBLE_AFTER_MS = 6500;

export type Step1InitializingPropsType = {
  state: OnboardingStateType;
  dispatch: Dispatch<OnboardingActionType>;
};

export function Step1Initializing({
  state,
  dispatch,
}: Step1InitializingPropsType) {
  const [showFallback, setShowFallback] = useState(false);
  const hasAdvanced = useRef(false);

  // Safety net: never trap a merchant behind a spinner indefinitely.
  useEffect(() => {
    const timer = window.setTimeout(() => setShowFallback(true), FALLBACK_VISIBLE_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // Advance one checklist item at a time, at a pace that feels real but never drags.
  useEffect(() => {
    if (state.syncComplete) return;
    const timer = window.setTimeout(() => dispatch({ type: 'ADVANCE_SYNC_TASK' }), TASK_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [state.syncTasks, state.syncComplete, dispatch]);

  // Once everything is provisioned, hold for a beat so the final check registers, then move on.
  useEffect(() => {
    if (!state.syncComplete || hasAdvanced.current) return;
    hasAdvanced.current = true;
    const timer = window.setTimeout(() => dispatch({ type: 'GO_NEXT' }), HOLD_AFTER_COMPLETE_MS);
    return () => window.clearTimeout(timer);
  }, [state.syncComplete, dispatch]);

  const doneCount = state.syncTasks.filter((task) => task.status === 'done').length;
  const firstPendingIndex = state.syncTasks.findIndex((task) => task.status !== 'done');

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.pingDot}>
          <Loader2 className={styles.spinner} />
        </div>

        <h1 className={styles.title}>
          Setting up Journeva
        </h1>
        <p className={styles.subtitle}>
          Sit tight — we&rsquo;re syncing your store and provisioning your revenue engine.
        </p>

        <ul className={styles.taskList}>
          {state.syncTasks.map((task, i) => {
            const isDone = task.status === 'done';
            const isActive = !isDone && i === firstPendingIndex;
            return (
              <li
                key={task.id}
                className={styles.taskItem}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <span
                  className={cn(
                    styles.statusIcon,
                    isDone && styles.statusIconDone,
                    isActive && styles.statusIconActive,
                    !isDone && !isActive && styles.statusIconPending
                  )}
                >
                  {isDone ? <Check style={{ height: '0.75rem', width: '0.75rem' }} strokeWidth={3} /> : null}
                  {isActive ? <Loader2 className={styles.itemSpinner} /> : null}
                </span>
                <span
                  className={cn(
                    styles.taskLabel,
                    isDone && styles.taskLabelDone,
                    isActive && styles.taskLabelActive,
                    !isDone && !isActive && styles.taskLabelPending
                  )}
                >
                  {task.label}
                </span>
              </li>
            );
          })}
        </ul>

        <div className={styles.progressTrack}>
          <div
            className={styles.progressBar}
            style={{ width: `${(doneCount / state.syncTasks.length) * 100}%` }}
          />
        </div>

        {showFallback && !state.syncComplete ? (
          <button
            type="button"
            onClick={() => dispatch({ type: 'FORCE_SYNC_COMPLETE' })}
            className={styles.fallbackButton}
          >
            Taking longer than usual? Continue anyway
          </button>
        ) : null}
      </Card>
    </div>
  );
}
