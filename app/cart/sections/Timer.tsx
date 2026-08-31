import { useEffect, useState } from 'react';
import styles from './Timer.module.css';

export interface TimerProps {
  minutes: number;
  message: string;
  expiredMessage: string;
  /** If false, the countdown restarts from `minutes` every time the drawer opens. */
  persist: boolean;
  isOpen: boolean;
}

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function Timer({ minutes, message, expiredMessage, persist, isOpen }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);

  // Restart the countdown on open unless the caller wants it to persist
  // across opens/closes (e.g. tied to a reservation created on add-to-cart).
  useEffect(() => {
    if (isOpen && !persist) {
      setSecondsLeft(minutes * 60);
    }
  }, [isOpen, persist, minutes]);

  useEffect(() => {
    if (!isOpen || secondsLeft <= 0) return;
    const id = window.setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [isOpen, secondsLeft]);

  const expired = secondsLeft <= 0;

  return (
    <div className={styles.timer} role="timer" aria-live="polite">
      <span className={styles.icon} aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8.5" r="6" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 5.5V8.5L10 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M6 1.5H10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </span>
      {expired ? (
        <span className={styles.expired}>{expiredMessage}</span>
      ) : (
        <span>
          {message} <span className={styles.clock}>{formatTime(secondsLeft)}</span>
        </span>
      )}
    </div>
  );
}
