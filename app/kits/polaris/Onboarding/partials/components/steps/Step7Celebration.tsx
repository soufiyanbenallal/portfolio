import { useEffect, type Dispatch } from 'react';
import { Check, Clock } from 'lucide-react';
import type { OnboardingActionType, OnboardingStateType } from '../../types';
import { Button, Card } from '../shared/ui';
import { Confetti } from '../shared/Confetti';
import { cn } from '../../utils';
import styles from './Step7Celebration.module.css';

export type Step7CelebrationPropsType = {
  state: OnboardingStateType;
  dispatch: Dispatch<OnboardingActionType>;
  onGoToDashboard?: () => void;
  onRestart?: () => void;
};

export function Step7Celebration({
  state,
  dispatch,
  onGoToDashboard,
  onRestart,
}: Step7CelebrationPropsType) {
  useEffect(() => {
    if (state.onboardingCompleted) return;
    // Mirrors the real integration point: persist onboarding_completed=true
    // (e.g. a Shopify app metafield or your own backend) once the merchant lands here.
    dispatch({ type: 'COMPLETE_ONBOARDING' });
  }, [state.onboardingCompleted, dispatch]);

  const toolsActivated = state.coreTools.length + state.optionalTools.filter((t) => t.configured).length;
  const embedActive = state.embedStatus === 'active';

  const rows = [
    { label: 'Catalog & currencies synced', done: true },
    { label: `${toolsActivated} revenue tool${toolsActivated === 1 ? '' : 's'} active`, done: true },
    {
      label: embedActive ? 'Theme embed active' : 'Theme embed pending activation',
      done: embedActive,
    },
  ];

  return (
    <div className={styles.container}>
      <Confetti />
      <Card className={styles.card}>
        <div className={styles.popBadge}>
          <Check style={{ height: '1.5rem', width: '1.5rem' }} strokeWidth={2.5} />
        </div>
        <h1 className={styles.title}>
          You&rsquo;re all set 🎉
        </h1>
        <p className={styles.subtitle}>
          Journeva is live on your store and already working in the background.
        </p>

        <div className={styles.summaryList}>
          {rows.map((row) => (
            <div key={row.label} className={styles.summaryItem}>
              <span
                className={cn(
                  row.done ? styles.itemIconDone : styles.itemIconPending
                )}
              >
                {row.done ? (
                  <Check style={{ height: '0.75rem', width: '0.75rem' }} strokeWidth={3} />
                ) : (
                  <Clock style={{ height: '0.75rem', width: '0.75rem' }} />
                )}
              </span>
              <span className={row.done ? styles.itemLabelDone : styles.itemLabelPending}>
                {row.label}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.actionSection}>
          <Button className={styles.fullWidthButton} onClick={onGoToDashboard}>
            Go to Revenue Dashboard
          </Button>
          <p className={styles.footnote}>
            Need to change anything? Everything&rsquo;s editable anytime from the Hub.
          </p>
        </div>

        {onRestart ? (
          <button
            type="button"
            onClick={onRestart}
            className={styles.replayButton}
          >
            Replay demo
          </button>
        ) : null}
      </Card>
    </div>
  );
}
