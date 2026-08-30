import { useMemo } from 'react';

const COLORS = ['#059669', '#10b981', '#34d399', '#f59e0b', '#111827'];
const PIECE_COUNT = 60;

interface Piece {
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  rotate: number;
}

export function Confetti() {
  const pieces = useMemo<Piece[]>(
    () =>
      Array.from({ length: PIECE_COUNT }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2.6 + Math.random() * 1.6,
        size: 6 + Math.random() * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotate: Math.random() * 360,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pieces.map((piece, i) => (
        <span
          key={i}
          className="animate-confetti-fall absolute top-0 block rounded-sm"
          style={{
            left: `${piece.left}%`,
            width: piece.size,
            height: piece.size * 0.4,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${piece.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
