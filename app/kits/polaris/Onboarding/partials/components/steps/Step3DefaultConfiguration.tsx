import { useId, type Dispatch } from 'react';
import { Truck } from 'lucide-react';
import type { OnboardingAction, OnboardingState } from '../../types';
import { CURRENCIES, SAMPLE_CART_TOTAL } from '../../constants';
import { Button, Card } from '../shared/ui';
import { formatCurrency } from '../../utils';

export function Step3DefaultConfiguration({
  state,
  dispatch,
}: {
  state: OnboardingState;
  dispatch: Dispatch<OnboardingAction>;
}) {
  const amountId = useId();
  const currencyId = useId();

  const threshold = state.freeShippingThreshold;
  const remaining = Math.max(0, threshold - SAMPLE_CART_TOTAL);
  const qualifies = SAMPLE_CART_TOTAL >= threshold && threshold > 0;
  const percent = threshold > 0 ? Math.min(100, (SAMPLE_CART_TOTAL / threshold) * 100) : 100;

  const handleAmountChange = (value: string) => {
    const parsed = Number(value.replace(/[^0-9.]/g, ''));
    dispatch({ type: 'SET_THRESHOLD', amount: Number.isFinite(parsed) ? Math.max(0, parsed) : 0 });
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md p-8">
        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <Truck className="h-5 w-5" />
        </div>
        <h1 className="text-center text-lg font-semibold tracking-tight text-gray-900">
          One quick detail
        </h1>
        <p className="mx-auto mt-1 max-w-xs text-center text-sm text-gray-500">
          Set your free shipping threshold — we&rsquo;ll handle the rest.
        </p>

        <div className="mt-6 flex gap-2">
          <div className="w-24">
            <label htmlFor={currencyId} className="sr-only">
              Currency
            </label>
            <select
              id={currencyId}
              value={state.storeCurrency}
              onChange={(e) => dispatch({ type: 'SET_CURRENCY', currency: e.target.value })}
              className="h-11 w-full rounded-lg border border-gray-300 bg-white px-2 text-sm text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              {CURRENCIES.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor={amountId} className="sr-only">
              Free shipping threshold amount
            </label>
            <input
              id={amountId}
              type="text"
              inputMode="decimal"
              value={threshold}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            />
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
            Cart preview
          </p>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-gray-500">Sample cart total</span>
            <span className="font-medium text-gray-900">
              {formatCurrency(SAMPLE_CART_TOTAL, state.storeCurrency)}
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-emerald-600 transition-all duration-500 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-2 text-sm font-medium text-emerald-700">
            {qualifies
              ? 'This cart qualifies for free shipping.'
              : `Add ${formatCurrency(remaining, state.storeCurrency)} more for free shipping.`}
          </p>
        </div>

        <div className="mt-7 flex flex-col items-center gap-2">
          <Button
            className="w-full"
            onClick={() => {
              dispatch({ type: 'CONFIRM_THRESHOLD' });
              dispatch({ type: 'GO_NEXT' });
            }}
          >
            Save &amp; continue
          </Button>
          <button
            type="button"
            onClick={() => dispatch({ type: 'GO_NEXT' })}
            className="text-xs font-medium text-gray-400 hover:text-gray-600 hover:underline"
          >
            Skip for now — I&rsquo;ll set this later
          </button>
        </div>
      </Card>
    </div>
  );
}
