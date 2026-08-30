import { useEffect, type Dispatch } from 'react';
import { Check, Clock } from 'lucide-react';
import type { OnboardingAction, OnboardingState } from '../../types';
import { Button, Card } from '../shared/ui';
import { Confetti } from '../shared/Confetti';
import { cn } from '../../utils';

export function Step7Celebration({
  state,
  dispatch,
  onGoToDashboard,
  onRestart,
}: {
  state: OnboardingState;
  dispatch: Dispatch<OnboardingAction>;
  onGoToDashboard?: () => void;
  onRestart?: () => void;
}) {
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
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-10">
      <Confetti />
      <Card className="animate-scale-in relative w-full max-w-md p-8">
        <div className="animate-pop mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <Check className="h-6 w-6" strokeWidth={2.5} />
        </div>
        <h1 className="text-center text-xl font-semibold tracking-tight text-gray-900">
          You&rsquo;re all set 🎉
        </h1>
        <p className="mx-auto mt-1 max-w-xs text-center text-sm text-gray-500">
          Journeva is live on your store and already working in the background.
        </p>

        <div className="mt-6 space-y-2.5">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center gap-2.5 text-sm">
              <span
                className={cn(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                  row.done ? 'bg-emerald-600 text-white' : 'bg-amber-50 text-amber-600'
                )}
              >
                {row.done ? <Check className="h-3 w-3" strokeWidth={3} /> : <Clock className="h-3 w-3" />}
              </span>
              <span className={row.done ? 'text-gray-700' : 'text-gray-500'}>{row.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Button className="w-full" onClick={onGoToDashboard}>
            Go to Revenue Dashboard
          </Button>
          <p className="mt-3 text-center text-xs text-gray-400">
            Need to change anything? Everything&rsquo;s editable anytime from the Hub.
          </p>
        </div>

        {onRestart ? (
          <button
            type="button"
            onClick={onRestart}
            className="mt-4 w-full text-center text-[11px] font-medium text-gray-300 hover:text-gray-500"
          >
            Replay demo
          </button>
        ) : null}
      </Card>
    </div>
  );
}
