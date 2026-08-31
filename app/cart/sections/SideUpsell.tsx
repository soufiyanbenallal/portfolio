import type { UpsellProduct } from '../types';
import styles from './SideUpsell.module.css';

export interface SideUpsellProps {
  heading: string;
  badge?: string;
  products: UpsellProduct[];
  currency: string;
  onAdd: (product: UpsellProduct) => void;
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export function SideUpsell({ heading, badge, products, currency, onAdd }: SideUpsellProps) {
  if (products.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.headingRow}>
        <h3 className={styles.heading}>{heading}</h3>
        {badge && <span className={styles.badge}>{badge}</span>}
      </div>
      <div className={styles.list}>
        {products.map((product) => (
          <div className={styles.card} key={product.id}>
            <div className={styles.imageWrap}>
              <img className={styles.image} src={product.image} alt={product.title} loading="lazy" />
            </div>
            <div className={styles.info}>
              <span className={styles.title}>{product.title}</span>
              <div className={styles.priceRow}>
                <span className={styles.price}>{formatMoney(product.price, currency)}</span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className={styles.comparePrice}>{formatMoney(product.compareAtPrice, currency)}</span>
                )}
              </div>
            </div>
            <button
              type="button"
              className={styles.addButton}
              onClick={() => onAdd(product)}
              aria-label={`Add ${product.title} to cart`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
