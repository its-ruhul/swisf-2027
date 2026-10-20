import { useId } from 'react';
import { cn } from '../../lib/cn';

const R = 20;

/** One fan of concentric half-rings, filled so lower rows overlap upper ones. */
function Fan({ cx, cy, fill, stroke }: { cx: number; cy: number; fill: string; stroke: string }) {
  const arc = (r: number) => `M${cx - r} ${cy}A${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  return (
    <g>
      <path d={`${arc(R)}Z`} fill={fill} />
      {[R, R * 0.75, R * 0.5, R * 0.25].map((r) => (
        <path key={r} d={arc(r)} fill="none" stroke={stroke} strokeWidth="1" />
      ))}
    </g>
  );
}

type SeigaihaProps = {
  /** Must match the background behind the pattern */
  background: string;
  /** Line colour */
  color?: string;
  /** Scale of the waves (1 = 40px wide fans) */
  scale?: number;
  className?: string;
};

/**
 * Seigaiha (青海波, "blue ocean waves") — the Japanese wave pattern, drawn as
 * a repeating SVG pattern. Use at a low opacity as a section texture.
 */
export default function Seigaiha({ background, color = '#C9A24A', scale = 1, className }: SeigaihaProps) {
  const id = `seigaiha-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg aria-hidden="true" focusable="false" className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}>
      <defs>
        <pattern id={id} width={R * 2} height={R} patternUnits="userSpaceOnUse" patternTransform={`scale(${scale})`}>
          <rect width={R * 2} height={R} fill={background} />
          <Fan cx={0} cy={R / 2} fill={background} stroke={color} />
          <Fan cx={R * 2} cy={R / 2} fill={background} stroke={color} />
          <Fan cx={R} cy={R} fill={background} stroke={color} />
          <Fan cx={0} cy={R * 1.5} fill={background} stroke={color} />
          <Fan cx={R * 2} cy={R * 1.5} fill={background} stroke={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
