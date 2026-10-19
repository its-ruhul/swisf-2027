import { cn } from '../../lib/cn';

const C = 50;
const R = 48.5;

function point(deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: C + R * Math.cos(rad), y: C + R * Math.sin(rad) };
}

/** Arc from `from` to `to` degrees (screen angles, 0 = right, 90 = down), drawn counter-clockwise. */
function arc(from: number, to: number) {
  const a = point(from);
  const b = point(to);
  const sweep = (from - to + 360) % 360;
  return `M${a.x} ${a.y}A${R} ${R} 0 ${sweep > 180 ? 1 : 0} 0 ${b.x} ${b.y}`;
}

type ArcFrameProps = {
  className?: string;
  color?: string;
};

/**
 * Thin saffron arc framing a circular image, with a dot at one end and a small
 * ring at the other — the brochure's festival / next-generation treatment.
 */
export default function ArcFrame({ className, color = '#E07B39' }: ArcFrameProps) {
  const start = point(-62);
  const end = point(152);
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 100 100" className={cn('pointer-events-none overflow-visible', className)}>
      <g fill="none" stroke={color} strokeWidth="0.45" strokeLinecap="round">
        <path d={arc(-62, 152)} />
        <path d={arc(118, 64)} />
      </g>
      <circle cx={start.x} cy={start.y} r="1.3" fill={color} />
      <circle cx={end.x} cy={end.y} r="0.9" fill="none" stroke={color} strokeWidth="0.45" />
    </svg>
  );
}
