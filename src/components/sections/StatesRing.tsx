import type { StateItem } from '../../data/home';
import { accentHex } from '../../lib/accents';
import { cn } from '../../lib/cn';
import MandalaWatermark from '../ornaments/MandalaWatermark';

const SIZE = 560;
const C = SIZE / 2;
const RING_R = 150;
const LABEL_R = 176;
const CORE_R = 84;
const HUB_R = 24;

type StatesRingProps = {
  states: StateItem[];
  /** Index of the highlighted state (shared with the state chips on phones) */
  active: number | null;
  onActiveChange: (index: number | null) => void;
  className?: string;
};

/**
 * "One stage for eight states": the eight Northeast states around a central
 * dharma wheel whose eight spokes point at them, with a small sun at the hub.
 * Hover or tap a state to enlarge its dot, light its spoke and show a tooltip
 * (on phones the state chips below drive the highlight instead);
 * Meghalaya (host state) pulses continuously.
 */
export default function StatesRing({ states, active, onActiveChange: setActive, className }: StatesRingProps) {
  const points = states.map((state, i) => {
    const angle = ((-90 + (i * 360) / states.length) * Math.PI) / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      ...state,
      i,
      x: C + cos * RING_R,
      y: C + sin * RING_R,
      lx: C + cos * (state.host ? LABEL_R + 8 : LABEL_R),
      ly: C + sin * LABEL_R,
      anchor: cos > 0.3 ? 'start' : cos < -0.3 ? 'end' : 'middle',
      baseline: sin < -0.3 ? 'auto' : sin > 0.3 ? 'hanging' : 'middle',
      sx: C + cos * (CORE_R + 6),
      sy: C + sin * (CORE_R + 6),
    } as const;
  });

  const summary = `${states.map((s) => s.name).join(', ')}. ${states.find((s) => s.host)?.name ?? ''} is the host state.`;

  return (
    <div className={cn('relative', className)}>
      <div className="absolute inset-[4%] motion-safe:animate-spin-slower">
        <MandalaWatermark className="h-full w-full" opacity={0.22} color="#D9C29A" />
      </div>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={`The eight Northeast states around one stage: ${summary}`} className="relative block h-auto w-full overflow-visible">
        {/* faint outer circle */}
        <circle cx={C} cy={C} r={232} fill="none" stroke="#E7DCC8" strokeWidth="1" />

        {/* dashed spokes */}
        <g stroke="#CDB98F" strokeWidth="1" strokeDasharray="2 5">
          {points.map((p) => (
            <line key={`spoke-${p.name}`} x1={p.sx} y1={p.sy} x2={p.x} y2={p.y} />
          ))}
        </g>

        {/* dashed saffron ring (slowly turning) */}
        <circle cx={C} cy={C} r={RING_R} fill="none" stroke="#E07B39" strokeWidth="1.5" strokeDasharray="5 7" className="ring-spin" />

        {/* centre: a dharma wheel — one spoke for each of the eight states */}
        <circle cx={C} cy={C} r={CORE_R + 10} fill="none" stroke="#E7DCC8" strokeWidth="1" />
        <circle cx={C} cy={C} r={CORE_R} fill="#0E1A3D" stroke="#C9A24A" strokeWidth="2" />
        <circle cx={C} cy={C} r={CORE_R - 9} fill="none" stroke="#C9A24A" strokeWidth="1" opacity="0.55" />
        <g strokeLinecap="round">
          {points.map((p) => {
            const isActive = active === p.i;
            const ux = (p.x - C) / RING_R;
            const uy = (p.y - C) / RING_R;
            return (
              <g key={`wheel-${p.name}`}>
                <line
                  x1={C + ux * HUB_R}
                  y1={C + uy * HUB_R}
                  x2={C + ux * (CORE_R - 9)}
                  y2={C + uy * (CORE_R - 9)}
                  stroke={isActive ? '#F29A5E' : '#C9A24A'}
                  strokeWidth={isActive ? 3 : 1.6}
                  className="transition-all duration-200"
                />
                {/* the knob where each spoke meets the rim */}
                <circle
                  cx={C + ux * CORE_R}
                  cy={C + uy * CORE_R}
                  r={isActive ? 5.5 : 4}
                  fill={isActive ? '#F29A5E' : '#E9B954'}
                  stroke="#0E1A3D"
                  strokeWidth="1.5"
                  className="transition-all duration-200"
                />
              </g>
            );
          })}
        </g>
        <circle cx={C} cy={C} r={HUB_R} fill="#0A1230" stroke="#C9A24A" strokeWidth="1.5" />
        {/* a small sun at the hub, its rays between the spokes: where India's sun rises first */}
        <circle cx={C} cy={C} r={7} fill="#E9B954" />
        <g stroke="#E6CF94" strokeWidth="1.6" strokeLinecap="round">
          {Array.from({ length: 8 }, (_, i) => {
            const a = ((i + 0.5) * Math.PI) / 4;
            return <line key={i} x1={C + Math.cos(a) * 11} y1={C + Math.sin(a) * 11} x2={C + Math.cos(a) * 17} y2={C + Math.sin(a) * 17} />;
          })}
        </g>

        {/* states */}
        {points.map((p) => {
          const isActive = active === p.i;
          const colour = accentHex[p.accent];
          return (
            <g
              key={p.name}
              className="cursor-pointer"
              onMouseEnter={() => setActive(p.i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(active === p.i ? null : p.i)}
            >
              {/* generous invisible hit area for touch */}
              <circle cx={p.x} cy={p.y} r={22} fill="transparent" />
              {p.host && <circle cx={p.x} cy={p.y} r={10} fill={colour} className="svg-pulse" />}
              <circle
                cx={p.x}
                cy={p.y}
                r={p.host ? 10 : 7}
                fill={colour}
                stroke="#FAF6EE"
                strokeWidth="2"
                className="transition-transform duration-200 ease-out [transform-box:fill-box] [transform-origin:center]"
                style={{ transform: isActive ? 'scale(1.45)' : 'scale(1)' }}
              />
              <text
                x={p.lx}
                y={p.ly}
                textAnchor={p.anchor}
                dominantBaseline={p.baseline}
                className="hidden sm:inline"
                fill={p.host ? '#AA531B' : '#0E1A3D'}
                fontSize={p.host ? 15 : 13}
                fontWeight={p.host ? 700 : 500}
                letterSpacing={p.host ? 2.6 : 2}
              >
                {p.name.toUpperCase()}
              </text>
              {p.host && (
                <text
                  x={p.lx}
                  y={p.ly + 22}
                  textAnchor={p.anchor}
                  dominantBaseline="middle"
                  className="hidden sm:inline"
                  fill="#4A5068"
                  fontSize="10.5"
                  fontWeight="500"
                  letterSpacing="3"
                >
                  HOST STATE
                </text>
              )}
            </g>
          );
        })}

        {/* tooltip (too small to read on phones, where the chip lights up instead) */}
        {active !== null && (
          <g pointerEvents="none" className="hidden sm:inline" transform={`translate(${points[active].x} ${points[active].y - 30})`}>
            <rect
              x={-(points[active].name.length * 4.4 + 18)}
              y={-26}
              width={points[active].name.length * 8.8 + 36}
              height={points[active].host ? 40 : 30}
              rx={8}
              fill="#0E1A3D"
              stroke="#C9A24A"
              strokeWidth="1"
            />
            <text x={0} y={-11} textAnchor="middle" dominantBaseline="middle" fill="#FAF6EE" fontSize="13" fontWeight="600">
              {points[active].name}
            </text>
            {points[active].host && (
              <text x={0} y={6} textAnchor="middle" dominantBaseline="middle" fill="#F29A5E" fontSize="10" fontWeight="500" letterSpacing="2">
                HOST STATE
              </text>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
