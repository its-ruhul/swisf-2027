import { cssVars } from '../../lib/cssVars';
import { cn } from '../../lib/cn';

/** Position in % of the box; size scales the burst. */
type Burst = { x: number; y: number; size: number; colour: string; dur: number; delay: number };

const BURSTS: Burst[] = [
  { x: 46, y: 15, size: 40, colour: '#F29A5E', dur: 6.5, delay: 0.4 },
  { x: 88, y: 20, size: 38, colour: '#BC9BF3', dur: 7.2, delay: 2.6 },
  { x: 70, y: 8, size: 30, colour: '#E6CF94', dur: 5.8, delay: 4.1 },
  { x: 30, y: 7, size: 26, colour: '#5CC8AE', dur: 8, delay: 5.4 },
  { x: 96, y: 57, size: 30, colour: '#E5455F', dur: 6.9, delay: 1.7 },
];

const RAYS = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2;
  const reach = i % 2 === 0 ? 48 : 36;
  return { x1: Math.cos(a) * 6, y1: Math.sin(a) * 6, x2: Math.cos(a) * reach, y2: Math.sin(a) * reach };
});

/**
 * Fireworks bursting over the festival. Each burst is its own small SVG that
 * blooms and fades on a loop, so it animates on the compositor without repainting.
 * Give it a position and size: `className` must make it `absolute`.
 */
export default function Fireworks({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none select-none', className)}>
      {BURSTS.map((b) => (
        <svg
          key={`${b.x}-${b.y}`}
          focusable="false"
          viewBox="-50 -50 100 100"
          className="firework absolute"
          style={cssVars(
            { '--dur': `${b.dur}s`, '--delay': `${b.delay}s` },
            { left: `${b.x}%`, top: `${b.y}%`, width: `max(${b.size * 0.22}%, ${b.size * 2.2}px)`, aspectRatio: '1', translate: '-50% -50%' },
          )}
        >
          <g stroke={b.colour} strokeLinecap="round" strokeWidth="2.6">
            {RAYS.map((ray) => (
              <line key={ray.x2} x1={ray.x1} y1={ray.y1} x2={ray.x2} y2={ray.y2} />
            ))}
          </g>
          <circle r="5" fill={b.colour} />
        </svg>
      ))}
    </div>
  );
}
