import { useEffect, type Dispatch } from 'react';
import { Boxes, Check, Gift, Rocket, Zap } from 'lucide-react';
import type { OnboardingAction, OnboardingState, OptionalToolId } from '../../types';
import { Button, Card, IconTile } from '../shared/ui';
import { cn } from '../../utils';

const OPTIONAL_ICONS: Record<OptionalToolId, typeof Boxes> = {
  'volume-discounts': Boxes,
  'post-purchase-upsell': Rocket,
  'product-addons': Gift,
  'checkout-bumps': Zap,
};

export function Step5SequentialSetup({
  state,
  dispatch,
}: {
  state: OnboardingState;
  dispatch: Dispatch<OnboardingAction>;
}) {
  const queue = state.optionalTools.filter((tool) => tool.selected);
  const current = queue[state.queueIndex];
  const isLast = state.queueIndex >= queue.length - 1;

  // Default to the first preset the moment a tool becomes current, so
  // "Apply & continue" always has a sensible one-click choice ready.
  useEffect(() => {
    if (current && !current.selectedPresetId) {
      dispatch({ type: 'SELECT_PRESET', id: current.id, presetId: current.presets[0].id });
    }
  }, [current, dispatch]);

  // Guard: if the queue is ever empty when this step renders, leave immediately.
  useEffect(() => {
    if (!current) dispatch({ type: 'GO_NEXT' });
  }, [current, dispatch]);

  if (!current) return null;

  const Icon = OPTIONAL_ICONS[current.id];

  const advance = () => dispatch(isLast ? { type: 'GO_NEXT' } : { type: 'NEXT_IN_QUEUE' });

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <Card key={current.id} className="animate-fade-in-up w-full max-w-md p-8">
        <div className="mb-5 flex items-center justify-center gap-1.5">
          {queue.map((tool, i) => (
            <span
              key={tool.id}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === state.queueIndex ? 'w-6 bg-emerald-600' : 'w-1.5 bg-gray-200'
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <IconTile icon={<Icon className="h-5 w-5" />} />
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
              Tool {state.queueIndex + 1} of {queue.length}
            </p>
            <h1 className="text-base font-semibold text-gray-900">{current.name}</h1>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-500">{current.description}</p>

        <div role="radiogroup" aria-label={`${current.name} preset`} className="mt-5 space-y-2">
          {current.presets.map((preset) => {
            const selected = current.selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => dispatch({ type: 'SELECT_PRESET', id: current.id, presetId: preset.id })}
                className={cn(
                  'flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors duration-150',
                  selected
                    ? 'border-emerald-600 bg-emerald-50/60'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                    selected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-gray-300'
                  )}
                >
                  {selected ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : null}
                </span>
                <span>
                  <span className="block text-sm font-medium text-gray-900">{preset.label}</span>
                  <span className="block text-xs text-gray-500">{preset.description}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-7 flex flex-col items-center gap-2">
          <Button
            className="w-full"
            onClick={() => {
              dispatch({ type: 'CONFIRM_TOOL_CONFIG', id: current.id });
              advance();
            }}
          >
            Apply &amp; continue
          </Button>
          <button
            type="button"
            onClick={() => {
              dispatch({ type: 'DEFER_TOOL_CONFIG', id: current.id });
              advance();
            }}
            className="text-xs font-medium text-gray-400 hover:text-gray-600 hover:underline"
          >
            Configure later in Hub
          </button>
        </div>
      </Card>
    </div>
  );
}
