import { useEffect, useRef, type Dispatch } from 'react';
import { Check, ExternalLink, RefreshCw } from 'lucide-react';
import type { OnboardingAction, OnboardingState } from '../../types';
import { Button, Card } from '../shared/ui';
import { cn, getThemeEditorDeepLink } from '../../utils';

const CHECK_DURATION_MS = 2600;

export function Step6ShopifyValidation({
  state,
  dispatch,
}: {
  state: OnboardingState;
  dispatch: Dispatch<OnboardingAction>;
}) {
  const checkTimeout = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(checkTimeout.current), []);

  const runCheck = () => {
    dispatch({ type: 'SET_EMBED_STATUS', status: 'checking' });
    window.clearTimeout(checkTimeout.current);
    checkTimeout.current = window.setTimeout(() => {
      dispatch({ type: 'SET_EMBED_STATUS', status: 'active' });
    }, CHECK_DURATION_MS);
  };

  const openThemeEditor = () => {
    // In production this opens a real tab via the deep link below; the
    // sandboxed demo simulates the round trip instead of navigating away.
    void getThemeEditorDeepLink('example.myshopify.com', 'current', 'journeva');
    runCheck();
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-center text-lg font-semibold tracking-tight text-gray-900">
          Activate your theme embed
        </h1>
        <p className="mx-auto mt-1 max-w-xs text-center text-sm text-gray-500">
          One click enables Journeva&rsquo;s cart drawer and upsells on your storefront.
        </p>

        <button
          type="button"
          onClick={openThemeEditor}
          className={cn(
            'mt-6 flex w-full items-center justify-between rounded-xl border p-4 text-left transition-colors duration-150',
            'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/40',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500'
          )}
        >
          <span>
            <span className="block text-sm font-medium text-gray-900">Open Theme Editor</span>
            <span className="block text-xs text-gray-500">Opens Shopify in a new tab</span>
          </span>
          <ExternalLink className="h-4 w-4 shrink-0 text-gray-400" />
        </button>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
          <div className="flex items-center gap-2.5">
            {state.embedStatus === 'active' ? (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
            ) : (
              <span
                className={cn(
                  'ping-dot h-2.5 w-2.5 rounded-full',
                  state.embedStatus === 'checking' ? 'bg-amber-500 text-amber-500' : 'bg-gray-300 text-gray-300'
                )}
              />
            )}
            <span className="text-sm text-gray-700">
              {state.embedStatus === 'active'
                ? 'Theme embed active'
                : state.embedStatus === 'checking'
                ? 'Checking installation status…'
                : 'Not detected yet'}
            </span>
          </div>
          <button
            type="button"
            onClick={runCheck}
            disabled={state.embedStatus === 'checking'}
            className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-gray-700 disabled:opacity-50"
          >
            <RefreshCw className={cn('h-3 w-3', state.embedStatus === 'checking' && 'animate-spin')} />
            Recheck
          </button>
        </div>

        <div className="mt-7">
          <Button className="w-full" onClick={() => dispatch({ type: 'GO_NEXT' })}>
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
}
