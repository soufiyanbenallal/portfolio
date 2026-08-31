import type { UpsellProduct } from "../types";
import styles from "./ProductUpsell.module.css";

export interface ProductUpsellProps {
  heading: string;
  layout: "carousel" | "grid";
  products: UpsellProduct[];
  currency: string;
  onAdd: (product: UpsellProduct) => void;
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

export function ProductUpsell({ heading, layout, products, currency, onAdd }: ProductUpsellProps) {
  if (products.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>{heading}</h3>
      <div className={layout === "grid" ? styles.grid : styles.carousel}>
        {products.map((product) => (
          <article className={styles.card} key={product.id}>
            <div className={styles.cardImageWrap}>
              <img
                className={styles.cardImage}
                src={product.image}
                alt={product.title}
                loading="lazy"
              />
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardTitle}>{product.title}</p>
              <span className={styles.cardPrice}>{formatMoney(product.price, currency)}</span>
              <button type="button" className={styles.addButton} onClick={() => onAdd(product)}>
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
