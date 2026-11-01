import { cn } from '../../lib/cn';

/** Each orbit is the same ellipse, turned; `at` is where its electron sits, in degrees around it. */
const ORBITS = [
  { rotate: 0, at: 200, colour: '#3B5BB5' },
  { rotate: 60, at: 40, colour: '#E07B39' },
  { rotate: 120, at: 300, colour: '#1F7A6A' },
];

type AtomOrbitProps = { className?: string };

/**
 * Thin-line atom with three electrons — the science thread of the summit. The
 * whole drawing turns as one layer on the compositor, so it never repaints.
 */
export default function AtomOrbit({ className }: AtomOrbitProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="-60 -60 120 120"
      className={cn('pointer-events-none select-none overflow-visible motion-safe:animate-spin-slow', className)}
      style={{ animationDuration: '26s' }}
    >
      {ORBITS.map((o) => {
        const a = (o.at * Math.PI) / 180;
        return (
          <g key={o.rotate} transform={`rotate(${o.rotate})`}>
            <ellipse rx="50" ry="18" fill="none" stroke="#C9A24A" strokeWidth="0.9" opacity="0.8" />
            <circle r="3" fill={o.colour} cx={50 * Math.cos(a)} cy={18 * Math.sin(a)} />
          </g>
        );
      })}
      <circle r="7" fill="#E9B954" />
      <circle r="11" fill="none" stroke="#E9B954" strokeOpacity="0.4" strokeWidth="0.8" />
    </svg>
  );
}
