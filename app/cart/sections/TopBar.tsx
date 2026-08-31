import styles from "./TopBar.module.css";

export interface TopBarProps {
  title: string;
  itemCount: number;
  showItemCount: boolean;
  onClose: () => void;
  closeAriaLabel?: string;
}

export function TopBar({ title, itemCount, showItemCount, onClose, closeAriaLabel }: TopBarProps) {
  return (
    <div className={styles.topBar}>
      <div className={styles.titleRow}>
        <h2 className={styles.title}>{title}</h2>
        {showItemCount && (
          <span className={styles.count}>
            ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>
        )}
      </div>
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label={closeAriaLabel ?? "Close cart"}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M1 1L15 15M15 1L1 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
