import styles from "./PromoProgressBar.module.css";

export interface PromoTier {
  threshold: number;
  label: string;
  reachedLabel: string;
}

export interface PromoProgressBarProps {
  subtotal: number;
  currency: string;
  tiers: PromoTier[];
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

export function PromoProgressBar({ subtotal, currency, tiers }: PromoProgressBarProps) {
  if (tiers.length === 0) return null;

  const sorted = [...tiers].sort((a, b) => a.threshold - b.threshold);
  const maxThreshold = sorted[sorted.length - 1].threshold;
  const progressPct = Math.min(100, (subtotal / maxThreshold) * 100);

  const nextTier = sorted.find((t) => subtotal < t.threshold);
  const message = nextTier ? (
    <>
      Spend{" "}
      <span className={styles.messageAccent}>
        {formatMoney(nextTier.threshold - subtotal, currency)}
      </span>{" "}
      more to unlock <span className={styles.messageAccent}>{nextTier.label}</span>
    </>
  ) : (
    <span className={styles.messageAccent}>{sorted[sorted.length - 1].reachedLabel}</span>
  );

  return (
    <div className={styles.wrapper}>
      <p className={styles.message}>{message}</p>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={Math.round(progressPct)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={styles.fill} style={{ width: `${progressPct}%` }} />
        {sorted.map((tier) => {
          const reached = subtotal >= tier.threshold;
          const leftPct = Math.min(100, (tier.threshold / maxThreshold) * 100);
          return (
            <span
              key={tier.threshold}
              className={`${styles.markerDot} ${reached ? styles.markerDotReached : ""}`}
              style={{ left: `${leftPct}%` }}
            />
          );
        })}
      </div>
      <div className={styles.markers}>
        {sorted.map((tier) => (
          <span
            key={tier.threshold}
            className={`${styles.marker} ${subtotal >= tier.threshold ? styles.markerReached : ""}`}
          >
            {tier.label}
          </span>
        ))}
      </div>
    </div>
  );
}
