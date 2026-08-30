import { ChevronLeft } from 'lucide-react';
import type { OnboardingStepId } from '../../types';
import { STEP_LABELS } from '../../constants';
import { cn } from '../../utils';

const NO_BACK_STEPS: OnboardingStepId[] = ['initializing', 'revenue-foundation', 'celebration'];

function LogoMark() {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm">
      <span className="text-sm font-bold text-white">J</span>
    </div>
  );
}

export function ProgressHeader({
  step,
  stepIndex,
  totalSteps,
  onBack,
  onExit,
}: {
  step: OnboardingStepId;
  stepIndex: number;
  totalSteps: number;
  onBack: () => void;
  onExit?: () => void;
}) {
  const canGoBack = !NO_BACK_STEPS.includes(step);
  const percent = Math.round(((stepIndex + 1) / totalSteps) * 100);

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-5 py-3">
        <div className="flex w-8 justify-start">
          {canGoBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <LogoMark />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-gray-900">Journeva</p>
          <p className="truncate text-xs text-gray-500">
            Step {stepIndex + 1} of {totalSteps} · {STEP_LABELS[step]}
          </p>
        </div>

        {onExit && step !== 'celebration' ? (
          <button
            type="button"
            onClick={onExit}
            className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            Exit setup
          </button>
        ) : null}
      </div>
      <div className="h-1 w-full bg-gray-100">
        <div
          className={cn('h-full bg-emerald-600 transition-[width] duration-500 ease-out')}
          style={{ width: `${percent}%` }}
        />
      </div>
    </header>
  );
}
