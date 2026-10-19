import { cn } from '../../lib/cn';

type Ring = { r: number; petals: number; len: number; width: number; offset?: number };

const RINGS: Ring[] = [
  { r: 18, petals: 8, len: 34, width: 12 },
  { r: 46, petals: 12, len: 46, width: 16, offset: 0.5 },
  { r: 86, petals: 16, len: 58, width: 19 },
  { r: 136, petals: 24, len: 62, width: 17, offset: 0.5 },
  { r: 190, petals: 32, len: 54, width: 13 },
];

function petalPath(r: number, len: number, w: number) {
  const tip = r + len;
  const mid = r + len * 0.45;
  return `M${r} 0Q${mid} ${w} ${tip} 0Q${mid} ${-w} ${r} 0Z`;
}

type MandalaWatermarkProps = {
  className?: string;
  /** Stroke colour */
  color?: string;
  /** Overall opacity (brochure watermark ≈ 0.08) */
  opacity?: number;
};

/** Very faint lotus / mandala line pattern used behind headings and diagrams. */
export default function MandalaWatermark({ className, color = '#C9A24A', opacity = 0.08 }: MandalaWatermarkProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="-260 -260 520 520"
      className={cn('pointer-events-none select-none', className)}
      style={{ opacity }}
    >
      <g fill="none" stroke={color} strokeWidth="1.4">
        {RINGS.map((ring) => (
          <g key={ring.r}>
            {Array.from({ length: ring.petals }, (_, i) => {
              const angle = ((i + (ring.offset ?? 0)) * 360) / ring.petals;
              return <path key={i} d={petalPath(ring.r, ring.len, ring.width)} transform={`rotate(${angle})`} />;
            })}
          </g>
        ))}
        <circle r="12" />
        <circle r="248" />
        <circle r="254" strokeDasharray="2 6" />
      </g>
    </svg>
  );
}
