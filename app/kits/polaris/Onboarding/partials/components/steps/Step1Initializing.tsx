import { useEffect, useRef, useState, type Dispatch } from 'react';
import { Check, Loader2 } from 'lucide-react';
import type { OnboardingAction, OnboardingState } from '../../types';
import { Card } from '../shared/ui';
import { cn } from '../../utils';

const TASK_INTERVAL_MS = 750;
const HOLD_AFTER_COMPLETE_MS = 550;
const FALLBACK_VISIBLE_AFTER_MS = 6500;

export function Step1Initializing({
  state,
  dispatch,
}: {
  state: OnboardingState;
  dispatch: Dispatch<OnboardingAction>;
}) {
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
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md p-8">
        <div className="ping-dot mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
          <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
        </div>

        <h1 className="text-center text-lg font-semibold tracking-tight text-gray-900">
          Setting up Journeva
        </h1>
        <p className="mx-auto mt-1 max-w-xs text-center text-sm text-gray-500">
          Sit tight — we&rsquo;re syncing your store and provisioning your revenue engine.
        </p>

        <ul className="mt-6 space-y-3">
          {state.syncTasks.map((task, i) => {
            const isDone = task.status === 'done';
            const isActive = !isDone && i === firstPendingIndex;
            return (
              <li
                key={task.id}
                className="animate-fade-in-up flex items-center gap-3"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <span
                  className={cn(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300',
                    isDone && 'animate-pop border-emerald-600 bg-emerald-600 text-white',
                    isActive && 'border-emerald-300 bg-white',
                    !isDone && !isActive && 'border-gray-200 bg-white'
                  )}
                >
                  {isDone ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                  {isActive ? <Loader2 className="h-3 w-3 animate-spin text-emerald-500" /> : null}
                </span>
                <span
                  className={cn(
                    'text-sm transition-colors duration-300',
                    isDone && 'text-gray-400',
                    isActive && 'font-medium text-gray-900',
                    !isDone && !isActive && 'text-gray-400'
                  )}
                >
                  {task.label}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all duration-500 ease-out"
            style={{ width: `${(doneCount / state.syncTasks.length) * 100}%` }}
          />
        </div>

        {showFallback && !state.syncComplete ? (
          <button
            type="button"
            onClick={() => dispatch({ type: 'FORCE_SYNC_COMPLETE' })}
            className="mt-5 w-full text-center text-xs font-medium text-gray-400 hover:text-gray-600 hover:underline"
          >
            Taking longer than usual? Continue anyway
          </button>
        ) : null}
      </Card>
    </div>
  );
}
