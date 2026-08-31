import type { CartItem } from "../types";
import styles from "./CartItems.module.css";

export interface CartItemsProps {
  items: CartItem[];
  currency: string;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

export function CartItems({ items, currency, onUpdateQuantity, onRemoveItem }: CartItemsProps) {
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3 3H5L5.8 6M5.8 6L7 15H18L20 6H5.8Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="19" r="1.4" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="17" cy="19" r="1.4" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <p className={styles.emptyTitle}>Your cart is empty</p>
        <p>Add something you'll love.</p>
      </div>
    );
  }

  return (
    <ul className={styles.list} style={{ listStyle: "none", margin: 0 }}>
      {items.map((item) => (
        <li className={styles.item} key={item.id}>
          <div className={styles.imageWrap}>
            <img className={styles.image} src={item.image} alt={item.title} loading="lazy" />
          </div>
          <div className={styles.info}>
            <p className={styles.itemTitle}>{item.title}</p>
            {item.variantTitle && <p className={styles.variant}>{item.variantTitle}</p>}
            <div className={styles.priceRow}>
              <span className={styles.price}>{formatMoney(item.price, currency)}</span>
              {item.compareAtPrice && item.compareAtPrice > item.price && (
                <span className={styles.comparePrice}>
                  {formatMoney(item.compareAtPrice, currency)}
                </span>
              )}
            </div>
            <div className={styles.stepper}>
              <button
                type="button"
                className={styles.stepperButton}
                onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                aria-label={`Decrease quantity of ${item.title}`}
              >
                −
              </button>
              <span className={styles.stepperValue}>{item.quantity}</span>
              <button
                type="button"
                className={styles.stepperButton}
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                aria-label={`Increase quantity of ${item.title}`}
              >
                +
              </button>
            </div>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => onRemoveItem(item.id)}
              aria-label={`Remove ${item.title} from cart`}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M2 4H14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                <path
                  d="M4 4V13C4 13.55 4.45 14 5 14H11C11.55 14 12 13.55 12 13V4"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
                <path
                  d="M6.5 4V2.5C6.5 2.22 6.72 2 7 2H9C9.28 2 9.5 2.22 9.5 2.5V4"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
              </svg>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
