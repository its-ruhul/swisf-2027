import { useMemo } from 'react';
import { cn } from '../../lib/cn';
import { mulberry32 } from '../../lib/random';

type StarFieldProps = {
  count?: number;
  seed?: number;
  className?: string;
};

/**
 * Scattered, softly twinkling stars for the night sections. Most are one still
 * SVG; the few that twinkle are separate elements, so their opacity animates on
 * the compositor and the (full-screen) SVG never has to repaint.
 */
export default function StarField({ count = 110, seed = 2027, className }: StarFieldProps) {
  const stars = useMemo(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: rand() * 1000,
      y: rand() * 1000,
      r: rand() < 0.12 ? 1.6 + rand() * 0.8 : 0.6 + rand() * 0.8,
      twinkle: rand() < 0.2,
      delay: (rand() * 4).toFixed(2),
      opacity: 0.35 + rand() * 0.55,
    }));
  }, [count, seed]);

  const colour = (r: number) => (r > 1.5 ? '#F6E7C1' : '#FFFFFF');

  return (
    <div aria-hidden="true" className={cn('pointer-events-none select-none', className)}>
      <svg focusable="false" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        {stars
          .filter((s) => !s.twinkle)
          .map((s) => (
            <circle key={s.id} cx={s.x} cy={s.y} r={s.r} fill={colour(s.r)} opacity={s.opacity} />
          ))}
      </svg>
      {stars
        .filter((s) => s.twinkle)
        .map((s) => (
          <span
            key={s.id}
            className="absolute rounded-full motion-safe:animate-twinkle"
            style={{
              left: `${s.x / 10}%`,
              top: `${s.y / 10}%`,
              width: s.r * 2.6,
              height: s.r * 2.6,
              backgroundColor: colour(s.r),
              opacity: s.opacity,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
    </div>
  );
}
