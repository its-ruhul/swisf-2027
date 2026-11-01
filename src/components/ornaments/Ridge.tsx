import { useId, useMemo } from 'react';
import { cn } from '../../lib/cn';
import { mulberry32 } from '../../lib/random';

const WIDTH = 1600;
const HEIGHT = 300;
const SEGMENTS = 128;
/** One peak or valley per this many segments, before the detail goes in */
const PEAK_EVERY = 16;
/** The crests stay in the top part of the box, so the range is always solid down to its bottom edge */
const CREST_ZONE = 0.72;

/** A mountain skyline by midpoint displacement; the same seed always draws the same range. */
function ridgePath(seed: number, rough: number, tilt: number) {
  const rand = mulberry32(seed);
  const heights = new Array<number>(SEGMENTS + 1).fill(0);
  for (let i = 0; i <= SEGMENTS; i += PEAK_EVERY) heights[i] = rand();
  for (let step = PEAK_EVERY, spread = 0.55; step > 1; step /= 2, spread *= rough) {
    for (let i = step / 2; i < SEGMENTS; i += step) {
      heights[i] = (heights[i - step / 2] + heights[i + step / 2]) / 2 + (rand() - 0.5) * spread;
    }
  }
  const low = Math.min(...heights);
  const high = Math.max(...heights);
  const points = heights.map((h, i) => {
    const t = i / SEGMENTS;
    const level = (h - low) / (high - low);
    // tilt lifts one end of the range and lowers the other
    const lifted = level * (1 - Math.abs(tilt)) + (tilt > 0 ? t : 1 - t) * Math.abs(tilt);
    return `${(t * WIDTH).toFixed(1)} ${((1 - lifted) * (HEIGHT * CREST_ZONE - 4) + 4).toFixed(1)}`;
  });
  return `M0 ${HEIGHT}L${points.join('L')}L${WIDTH} ${HEIGHT}Z`;
}

type RidgeProps = {
  seed: number;
  /** Colour along the crests and at the foot of the range */
  from: string;
  to: string;
  /** Whiten the highest peaks */
  snow?: boolean;
  /** 0.4 rolling hills, 0.6 jagged peaks */
  rough?: number;
  /** 0–1: how far the range climbs towards the right */
  tilt?: number;
  /** Size and position, e.g. "absolute inset-x-0 bottom-0 h-40" */
  className?: string;
};

/** One layer of a mountain range, drawn in SVG and stretched to fill its box. */
export default function Ridge({ seed, from, to, snow = false, rough = 0.56, tilt = 0, className }: RidgeProps) {
  const id = `ridge-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const path = useMemo(() => ridgePath(seed, rough, tilt), [seed, rough, tilt]);
  return (
    <svg aria-hidden="true" focusable="false" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" className={cn('pointer-events-none block w-full select-none', className)}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          {snow && <stop offset="0.1" stopColor="#FFFFFF" />}
          <stop offset={snow ? 0.3 : 0} stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <path d={path} fill={`url(#${id})`} />
    </svg>
  );
}
