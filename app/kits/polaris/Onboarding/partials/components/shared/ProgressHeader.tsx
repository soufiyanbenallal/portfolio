import { ChevronLeft } from 'lucide-react';
import type { OnboardingStepIdType } from '../../types';
import { STEP_LABELS } from '../../constants';
import { cn } from '../../utils';
import styles from './ProgressHeader.module.css';

const NO_BACK_STEPS: OnboardingStepIdType[] = ['initializing', 'revenue-foundation', 'celebration'];

function LogoMark() {
  return (
    <div className={styles.logoMark}>
      <span className={styles.logoText}>J</span>
    </div>
  );
}

export type ProgressHeaderPropsType = {
  step: OnboardingStepIdType;
  stepIndex: number;
  totalSteps: number;
  onBack: () => void;
  onExit?: () => void;
};

export function ProgressHeader({
  step,
  stepIndex,
  totalSteps,
  onBack,
  onExit,
}: ProgressHeaderPropsType) {
  const canGoBack = !NO_BACK_STEPS.includes(step);
  const percent = Math.round(((stepIndex + 1) / totalSteps) * 100);

  return (
    <s-stack direction="inline" gap="base" alignItems='center'>
      <s-clickable blockSize='0' maxInlineSize='none'>
        <s-badge tone="success" size='large-100' icon="view">Active</s-badge>
      </s-clickable>
      <span className={styles.line}></span>
      <s-badge tone="warning" size='large-100' icon="clock">Scheduled</s-badge>
      <span className={styles.line}></span>
      <s-badge tone="critical" size='large-100' icon='adjust'>Archived</s-badge>
      <span className={styles.line}></span>
      <s-badge tone="critical" size='large-100' icon='alert-octagon'>Archived</s-badge>
  </s-stack>
  );
  // return (
  //   <header className={styles.header}>
  //     <div className={styles.inner}>
  //       <div className={styles.backContainer}>
  //         {canGoBack ? (
  //           <button
  //             type="button"
  //             onClick={onBack}
  //             aria-label="Go back"
  //             className={styles.backButton}
  //           >
  //             <ChevronLeft className="h-4 w-4" />
  //           </button>
  //         ) : null}
  //       </div>

  //       <LogoMark />
  //       <div className={styles.titleContainer}>
  //         <p className={styles.title}>Journeva</p>
  //         <p className={styles.subtitle}>
  //           Step {stepIndex + 1} of {totalSteps} · {STEP_LABELS[step]}
  //         </p>
  //       </div>

  //       {onExit && step !== 'celebration' ? (
  //         <button
  //           type="button"
  //           onClick={onExit}
  //           className={styles.exitButton}
  //         >
  //           Exit setup
  //         </button>
  //       ) : null}
  //     </div>
  //     <div className={styles.progressTrack}>
  //       <div
  //         className={cn(styles.progressBar)}
  //         style={{ width: `${percent}%` }}
  //       />
  //     </div>
  //   </header>
  // );
}
