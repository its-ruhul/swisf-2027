import { cssVars } from '../../lib/cssVars';
import { cn } from '../../lib/cn';

type Burst = { x: number; y: number; r: number; colour: string; dur: number; delay: number };

const BURSTS: Burst[] = [
  { x: 46, y: 9, r: 40, colour: '#F29A5E', dur: 6.5, delay: 0.4 },
  { x: 88, y: 12, r: 38, colour: '#BC9BF3', dur: 7.2, delay: 2.6 },
  { x: 70, y: 5, r: 30, colour: '#E6CF94', dur: 5.8, delay: 4.1 },
  { x: 30, y: 4, r: 26, colour: '#5CC8AE', dur: 8, delay: 5.4 },
  { x: 96, y: 34, r: 30, colour: '#E5455F', dur: 6.9, delay: 1.7 },
];

/** Fireworks bursting over the festival — SVG rays that bloom and fade on a loop. */
export default function Fireworks({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 100 60"
      preserveAspectRatio="xMidYMid slice"
      className={cn('pointer-events-none select-none', className)}
    >
      {BURSTS.map((b) => (
        <g
          key={`${b.x}-${b.y}`}
          className="firework"
          style={cssVars({ '--dur': `${b.dur}s`, '--delay': `${b.delay}s` })}
          stroke={b.colour}
          strokeLinecap="round"
        >
          {Array.from({ length: 16 }, (_, i) => {
            const a = (i / 16) * Math.PI * 2;
            const inner = b.r * 0.012;
            const outer = b.r * (i % 2 === 0 ? 0.1 : 0.075);
            return (
              <line
                key={i}
                x1={b.x + Math.cos(a) * inner}
                y1={b.y + Math.sin(a) * inner}
                x2={b.x + Math.cos(a) * outer}
                y2={b.y + Math.sin(a) * outer}
                strokeWidth={0.28}
              />
            );
          })}
          <circle cx={b.x} cy={b.y} r={b.r * 0.012} fill={b.colour} stroke="none" />
        </g>
      ))}
    </svg>
  );
}
