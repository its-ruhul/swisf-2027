import { useId, useMemo } from 'react';
import { cssVars } from '../../lib/cssVars';
import { cn } from '../../lib/cn';
import { mulberry32 } from '../../lib/random';

/**
 * Lightweight CSS particle layers. Every particle is a single element animated
 * with transform/opacity only, positions are seeded so they never jump between
 * renders, and all of them are hidden under prefers-reduced-motion.
 */

type LayerProps = {
  count?: number;
  seed?: number;
  className?: string;
};

/** Glowing gold motes drifting upwards. */
export function GoldDust({ count = 28, seed = 7, className }: LayerProps) {
  const motes = useMemo(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rand() * 100,
      bottom: rand() * 30 - 8,
      size: 2 + rand() * 3.5,
      dur: 11 + rand() * 12,
      delay: -rand() * 20,
      sway: (rand() - 0.5) * 80,
      rise: -(45 + rand() * 50),
      opacity: 0.45 + rand() * 0.5,
    }));
  }, [count, seed]);

  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {motes.map((m) => (
        <span
          key={m.id}
          className="dust absolute rounded-full"
          style={cssVars(
            {
              '--dur': `${m.dur}s`,
              '--delay': `${m.delay}s`,
              '--sway': `${m.sway}px`,
              '--rise': `${m.rise}vh`,
              '--o': m.opacity,
            },
            {
              left: `${m.left}%`,
              bottom: `${m.bottom}%`,
              width: m.size,
              height: m.size,
              background: 'radial-gradient(circle, #FFF1C9 0%, #E9B954 45%, rgba(233,185,84,0) 72%)',
              boxShadow: `0 0 ${m.size * 3}px rgba(246, 199, 107, 0.65)`,
            },
          )}
        />
      ))}
    </div>
  );
}

/** Plum-blossom petals drifting down across a section. */
export function FallingPetals({ count = 14, seed = 11, className }: LayerProps) {
  const petals = useMemo(() => {
    const rand = mulberry32(seed);
    const colours = ['#E5455F', '#F4A6B5', '#F7C6CF', '#E07B39'];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rand() * 100,
      size: 9 + rand() * 9,
      dur: 13 + rand() * 12,
      delay: -rand() * 24,
      sway: (rand() - 0.5) * 160,
      spin: (rand() > 0.5 ? 1 : -1) * (360 + rand() * 360),
      colour: colours[Math.floor(rand() * colours.length)],
    }));
  }, [count, seed]);

  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {petals.map((p) => (
        <svg
          key={p.id}
          viewBox="0 0 20 20"
          className="petal absolute top-0"
          style={cssVars(
            { '--dur': `${p.dur}s`, '--delay': `${p.delay}s`, '--sway': `${p.sway}px`, '--spin': `${p.spin}deg` },
            { left: `${p.left}%`, width: p.size, height: p.size },
          )}
        >
          <path d="M10 1C14 5 16 10 10 19C4 10 6 5 10 1Z" fill={p.colour} fillOpacity="0.85" />
          <path d="M10 4V15" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="0.8" />
        </svg>
      ))}
    </div>
  );
}

/** Paper sky lanterns rising slowly through the night sky. */
export function SkyLanterns({ count = 9, seed = 23, className }: LayerProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const lanterns = useMemo(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: 4 + rand() * 92,
      size: 10 + rand() * 12,
      dur: 18 + rand() * 16,
      delay: -rand() * 30,
      sway: (rand() - 0.5) * 90,
    }));
  }, [count, seed]);

  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {lanterns.map((l) => (
        <div
          key={l.id}
          className="sky-lantern absolute bottom-0 h-full"
          style={cssVars({ '--dur': `${l.dur}s`, '--delay': `${l.delay}s`, '--sway': `${l.sway}px`, '--rise': '-100%' }, { left: `${l.left}%` })}
        >
          <svg viewBox="0 0 20 26" className="lantern-flicker absolute bottom-0" style={{ width: l.size, height: l.size * 1.3 }}>
            <defs>
              <radialGradient id={`sl-${uid}-${l.id}`} cx="0.5" cy="0.75" r="0.75">
                <stop offset="0" stopColor="#FFE7A8" />
                <stop offset="0.45" stopColor="#F29A5E" />
                <stop offset="1" stopColor="#B5122B" />
              </radialGradient>
            </defs>
            <ellipse cx="10" cy="15" rx="12" ry="12" fill="#F29A5E" opacity="0.22" />
            <path d="M4 3h12l2 18H2z" fill={`url(#sl-${uid}-${l.id})`} />
            <path d="M5 21h10" stroke="#FFE7A8" strokeWidth="1.2" />
          </svg>
        </div>
      ))}
    </div>
  );
}
