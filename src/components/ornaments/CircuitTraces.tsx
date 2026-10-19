import { cssVars } from '../../lib/cssVars';
import { cn } from '../../lib/cn';

type Trace = { d: string; end: [number, number]; dots?: Array<[number, number]> };

/** PCB-style traces dropping from the top edge, as on the brochure cover. */
const TRACES: Trace[] = [
  { d: 'M14 0V118L34 138V214', end: [34, 214], dots: [[34, 176]] },
  { d: 'M28 0V84L52 108V170', end: [52, 170] },
  { d: 'M44 0V52L74 82V248', end: [74, 248], dots: [[74, 150]] },
  { d: 'M60 0V26L92 58V132', end: [92, 132] },
  { d: 'M82 0V96L104 118V196', end: [104, 196] },
  { d: 'M104 0V44L124 64V104', end: [124, 104] },
  { d: 'M126 0V70L146 90V228', end: [146, 228], dots: [[146, 160]] },
  { d: 'M152 0V32L172 52V150', end: [172, 150] },
  { d: 'M178 0V110L160 128V176', end: [160, 176] },
  { d: 'M202 0V24L224 46V92', end: [224, 92] },
  { d: 'M0 262H46L64 280H120', end: [120, 280] },
  { d: 'M0 278H30L48 296H92', end: [92, 296] },
];

/** A lighter subset for small corners. */
const LIGHT = [0, 2, 4, 6, 8, 10];

type CircuitTracesProps = {
  className?: string;
  /** Travelling glow along the traces */
  animated?: boolean;
  density?: 'full' | 'light';
  /** Mirror for use in other corners */
  flip?: 'none' | 'x' | 'y' | 'xy';
  /** Fill of the hollow terminals — match the background behind */
  terminalFill?: string;
};

/** Thin gold PCB traces with hollow circle terminals and a faint travelling glow. */
export default function CircuitTraces({
  className,
  animated = true,
  density = 'full',
  flip = 'none',
  terminalFill = '#0A1230',
}: CircuitTracesProps) {
  const traces = density === 'full' ? TRACES : TRACES.filter((_, i) => LIGHT.includes(i));
  const flipClass = {
    none: '',
    x: '-scale-x-100',
    y: '-scale-y-100',
    xy: 'rotate-180',
  }[flip];

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 240 300"
      fill="none"
      className={cn('pointer-events-none select-none', flipClass, className)}
    >
      <g stroke="#C9A24A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        {traces.map((t) => (
          <path key={t.d} d={t.d} />
        ))}
      </g>
      {animated && (
        <g stroke="#F4DFA6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {traces.map((t, i) => (
            <path
              key={`glow-${t.d}`}
              d={t.d}
              pathLength={100}
              className="circuit-glow"
              style={cssVars({ '--dur': `${5.5 + (i % 4) * 1.3}s`, '--delay': `${(i * 0.9) % 5}s` })}
            />
          ))}
        </g>
      )}
      <g stroke="#C9A24A" strokeWidth="1.2">
        {traces.map((t) => (
          <circle key={`end-${t.d}`} cx={t.end[0]} cy={t.end[1]} r="3.4" fill={terminalFill} />
        ))}
      </g>
      <g fill="#C9A24A">
        {traces.flatMap((t) => (t.dots ?? []).map(([x, y]) => <circle key={`dot-${t.d}-${x}-${y}`} cx={x} cy={y} r="1.6" />))}
      </g>
    </svg>
  );
}
