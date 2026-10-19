import { useMemo } from 'react';
import { cn } from '../../lib/cn';

/** Small deterministic PRNG so the star field is identical on every render. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type StarFieldProps = {
  count?: number;
  seed?: number;
  className?: string;
};

/** Scattered, softly twinkling stars for the night sections. */
export default function StarField({ count = 110, seed = 2027, className }: StarFieldProps) {
  const stars = useMemo(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: rand() * 1000,
      y: rand() * 1000,
      r: rand() < 0.12 ? 1.6 + rand() * 0.8 : 0.6 + rand() * 0.8,
      twinkle: rand() < 0.35,
      delay: (rand() * 4).toFixed(2),
      opacity: 0.35 + rand() * 0.55,
    }));
  }, [count, seed]);

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      className={cn('pointer-events-none select-none', className)}
    >
      {stars.map((s) => (
        <circle
          key={s.id}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill={s.r > 1.5 ? '#F6E7C1' : '#FFFFFF'}
          opacity={s.opacity}
          className={s.twinkle ? 'motion-safe:animate-twinkle' : undefined}
          style={s.twinkle ? { animationDelay: `${s.delay}s` } : undefined}
        />
      ))}
    </svg>
  );
}
