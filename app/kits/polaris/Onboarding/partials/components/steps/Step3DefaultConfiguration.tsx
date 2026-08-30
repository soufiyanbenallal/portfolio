import { useId, type Dispatch } from 'react';
import { Truck } from 'lucide-react';
import type { OnboardingActionType, OnboardingStateType } from '../../types';
import { CURRENCIES, SAMPLE_CART_TOTAL } from '../../constants';
import { Button, Card } from '../shared/ui';
import { formatCurrency } from '../../utils';
import styles from './Step3DefaultConfiguration.module.css';

export type Step3DefaultConfigurationPropsType = {
  state: OnboardingStateType;
  dispatch: Dispatch<OnboardingActionType>;
};

export function Step3DefaultConfiguration({
  state,
  dispatch,
}: Step3DefaultConfigurationPropsType) {
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
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.iconBadge}>
          <Truck style={{ height: '1.25rem', width: '1.25rem' }} />
        </div>
        <h1 className={styles.title}>
          One quick detail
        </h1>
        <p className={styles.subtitle}>
          Set your free shipping threshold — we&rsquo;ll handle the rest.
        </p>

        <div className={styles.inputRow}>
          <div className={styles.currencySelectWrapper}>
            <label htmlFor={currencyId} className={styles.srOnly}>
              Currency
            </label>
            <select
              id={currencyId}
              value={state.storeCurrency}
              onChange={(e) => dispatch({ type: 'SET_CURRENCY', currency: e.target.value })}
              className={styles.currencySelect}
            >
              {CURRENCIES.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.amountInputWrapper}>
            <label htmlFor={amountId} className={styles.srOnly}>
              Free shipping threshold amount
            </label>
            <input
              id={amountId}
              type="text"
              inputMode="decimal"
              value={threshold}
              onChange={(e) => handleAmountChange(e.target.value)}
              className={styles.amountInput}
            />
          </div>
        </div>

        <div className={styles.previewBox}>
          <p className={styles.previewHeader}>
            Cart preview
          </p>
          <div className={styles.previewRow}>
            <span className={styles.previewLabel}>Sample cart total</span>
            <span className={styles.previewValue}>
              {formatCurrency(SAMPLE_CART_TOTAL, state.storeCurrency)}
            </span>
          </div>
          <div className={styles.previewTrack}>
            <div
              className={styles.previewBar}
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className={styles.previewMessage}>
            {qualifies
              ? 'This cart qualifies for free shipping.'
              : `Add ${formatCurrency(remaining, state.storeCurrency)} more for free shipping.`}
          </p>
        </div>

        <div className={styles.actionGroup}>
          <Button
            className={styles.fullWidthButton}
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
            className={styles.skipButton}
          >
            Skip for now — I&rsquo;ll set this later
          </button>
        </div>
      </Card>
    </div>
  );
}
