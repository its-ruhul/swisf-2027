import { useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/cn';

const ORBITS = [
  { rotate: 0, dur: 5.5, colour: '#3B5BB5' },
  { rotate: 60, dur: 7, colour: '#E07B39' },
  { rotate: 120, dur: 6.2, colour: '#1F7A6A' },
];

type AtomOrbitProps = { className?: string };

/** Thin-line atom with electrons travelling along three orbits — the science thread of the summit. */
export default function AtomOrbit({ className }: AtomOrbitProps) {
  const reduce = useReducedMotion();
  return (
    <svg aria-hidden="true" focusable="false" viewBox="-60 -60 120 120" className={cn('pointer-events-none select-none overflow-visible', className)}>
      {ORBITS.map((o) => {
        const path = 'M-50 0A50 18 0 1 0 50 0A50 18 0 1 0 -50 0';
        return (
          <g key={o.rotate} transform={`rotate(${o.rotate})`}>
            <path d={path} fill="none" stroke="#C9A24A" strokeWidth="0.9" opacity="0.8" />
            <circle r="3" fill={o.colour} cx={reduce ? -50 : 0}>
              {!reduce && <animateMotion dur={`${o.dur}s`} repeatCount="indefinite" path={path} />}
            </circle>
          </g>
        );
      })}
      <circle r="7" fill="#E9B954" />
      <circle r="11" fill="none" stroke="#E9B954" strokeOpacity="0.4" strokeWidth="0.8" />
    </svg>
  );
}
