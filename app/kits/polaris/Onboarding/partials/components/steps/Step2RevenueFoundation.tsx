import type { Dispatch } from 'react';
import { BarChart3, Check, Layers, PanelRightOpen } from 'lucide-react';
import type { CoreToolId, OnboardingAction, OnboardingState } from '../../types';
import { Badge, Button, Card, IconTile } from '../shared/ui';

const CORE_ICONS: Record<CoreToolId, typeof PanelRightOpen> = {
  'cart-drawer': PanelRightOpen,
  fbt: Layers,
  analytics: BarChart3,
};

export function Step2RevenueFoundation({
  state,
  dispatch,
}: {
  state: OnboardingState;
  dispatch: Dispatch<OnboardingAction>;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6 text-center">
        <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <Check className="h-5 w-5" strokeWidth={2.5} />
        </span>
        <h1 className="text-xl font-semibold tracking-tight text-gray-900">
          Your revenue foundation is ready
        </h1>
        <p className="mx-auto mt-1.5 max-w-md text-sm text-gray-500">
          We&rsquo;ve already configured the essentials — nothing to set up, nothing to break.
        </p>
      </div>

      <div className="space-y-3">
        {state.coreTools.map((tool, i) => {
          const Icon = CORE_ICONS[tool.id];
          return (
            <Card
              key={tool.id}
              className="animate-fade-in-up flex items-center gap-4 p-4"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <IconTile icon={<Icon className="h-5 w-5" />} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">{tool.name}</p>
                <p className="mt-0.5 text-sm text-gray-500">{tool.description}</p>
              </div>
              <Badge tone="green">Active</Badge>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col items-center gap-2">
        <Button className="w-full sm:w-auto sm:px-10" onClick={() => dispatch({ type: 'GO_NEXT' })}>
          Continue
        </Button>
        <p className="text-xs text-gray-400">Fully customizable anytime from the Hub.</p>
      </div>
    </div>
  );
}
