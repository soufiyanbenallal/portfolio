import styles from './Footer.module.css';

export interface FooterProps {
  subtotal: number;
  currency: string;
  showSubtotal: boolean;
  subtotalNote?: string;
  checkoutLabel: string;
  continueShoppingLabel?: string;
  disabled: boolean;
  onCheckout: () => void;
  onContinueShopping?: () => void;
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export function Footer({
  subtotal,
  currency,
  showSubtotal,
  subtotalNote,
  checkoutLabel,
  continueShoppingLabel,
  disabled,
  onCheckout,
  onContinueShopping,
}: FooterProps) {
  return (
    <div className={styles.footer}>
      {showSubtotal && (
        <div className={styles.subtotalRow}>
          <span className={styles.subtotalLabel}>Subtotal</span>
          <span className={styles.subtotalValue}>{formatMoney(subtotal, currency)}</span>
        </div>
      )}
      {subtotalNote && <p className={styles.note}>{subtotalNote}</p>}
      <button type="button" className={styles.checkoutButton} disabled={disabled} onClick={onCheckout}>
        {checkoutLabel}
      </button>
      {continueShoppingLabel && onContinueShopping && (
        <button type="button" className={styles.continueLink} onClick={onContinueShopping}>
          {continueShoppingLabel}
        </button>
      )}
    </div>
  );
}
