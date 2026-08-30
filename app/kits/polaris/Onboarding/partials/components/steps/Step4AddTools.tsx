import type { Dispatch } from 'react';
import { Boxes, Gift, Rocket, Zap } from 'lucide-react';
import type { OnboardingAction, OnboardingState, OptionalToolId } from '../../types';
import { Badge, Button, Card, IconTile, ToggleSwitch } from '../shared/ui';
import { cn } from '../../utils';

const OPTIONAL_ICONS: Record<OptionalToolId, typeof Boxes> = {
  'volume-discounts': Boxes,
  'post-purchase-upsell': Rocket,
  'product-addons': Gift,
  'checkout-bumps': Zap,
};

export function Step4AddTools({
  state,
  dispatch,
}: {
  state: OnboardingState;
  dispatch: Dispatch<OnboardingAction>;
}) {
  const selectedCount = state.optionalTools.filter((tool) => tool.selected).length;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 pb-28">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-semibold tracking-tight text-gray-900">
          Add more revenue tools
        </h1>
        <p className="mx-auto mt-1.5 max-w-md text-sm text-gray-500">
          Optional, high-impact modules. Nothing here is required to launch.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {state.optionalTools.map((tool, i) => {
          const Icon = OPTIONAL_ICONS[tool.id];
          return (
            <Card
              key={tool.id}
              className={cn(
                'animate-fade-in-up p-4 transition-shadow duration-200',
                tool.selected && 'ring-1 ring-emerald-600/30'
              )}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start justify-between gap-2">
                <IconTile icon={<Icon className="h-5 w-5" />} tone={tool.selected ? 'green' : 'gray'} />
                <ToggleSwitch
                  checked={tool.selected}
                  onChange={() => dispatch({ type: 'TOGGLE_OPTIONAL_TOOL', id: tool.id })}
                  label={`Enable ${tool.name}`}
                />
              </div>
              <p className="mt-3 text-sm font-medium text-gray-900">{tool.name}</p>
              <p className="mt-0.5 text-sm text-gray-500">{tool.description}</p>
              <div className="mt-2">
                <Badge tone="gray">{tool.impact}</Badge>
              </div>
            </Card>
          );
        })}
      </div>

      <p className="mt-4 text-center text-[11px] text-gray-400">
        *Illustrative benchmarks — your own Analytics will show real lift once live.
      </p>

      <div className="fixed inset-x-0 bottom-0 border-t border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-4">
          <p className="text-sm text-gray-500">
            {selectedCount === 0 ? 'No tools selected yet' : `${selectedCount} tool${selectedCount > 1 ? 's' : ''} selected`}
          </p>
          <Button onClick={() => dispatch({ type: 'GO_NEXT' })}>
            {selectedCount === 0 ? 'Skip for now' : `Set up ${selectedCount} tool${selectedCount > 1 ? 's' : ''}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
