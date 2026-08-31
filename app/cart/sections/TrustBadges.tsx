import type { TrustBadge } from '../types';
import styles from './TrustBadges.module.css';

export interface TrustBadgesProps {
  badges: TrustBadge[];
}

export function TrustBadges({ badges }: TrustBadgesProps) {
  if (badges.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      {badges.map((badge) => (
        <div className={styles.badge} key={badge.id}>
          <span className={styles.icon} aria-hidden="true">
            {badge.icon}
          </span>
          <span className={styles.label}>{badge.label}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * A handful of ready-made icons so this section works out of the box.
 * Swap or extend freely — TrustBadge.icon accepts any ReactNode.
 */
export const DEFAULT_TRUST_ICONS = {
  secureCheckout: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="9" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6.5 9V6.5C6.5 4.6 8 3 10 3C12 3 13.5 4.6 13.5 6.5V9" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  freeReturns: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 10C4 6.7 6.7 4 10 4C12.5 4 14.6 5.6 15.5 7.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M15.5 4V7.8H11.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 10C16 13.3 13.3 16 10 16C7.5 16 5.4 14.4 4.5 12.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M4.5 16V12.2H8.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  fastShipping: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2 5H11V13H2V5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M11 8H14.5L17 10.5V13H11V8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="5.5" cy="14.5" r="1.3" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="13.5" cy="14.5" r="1.3" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  ),
};
