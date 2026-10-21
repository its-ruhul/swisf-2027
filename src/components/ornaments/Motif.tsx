import type { ReactNode } from 'react';

export type MotifName = 'sun' | 'blossom' | 'knot' | 'lantern' | 'lotus' | 'cloud' | 'mountains';

/** A point on a circle; degrees counter-clockwise from 3 o'clock, as on paper. */
const polar = (cx: number, cy: number, r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy - r * Math.sin(a)).toFixed(2)}`;
};

const SUN_RAYS = [25, 57, 90, 123, 155].map((deg) => `M${polar(24, 29, 13, deg)}L${polar(24, 29, 18.5, deg)}`).join('');

/** Line art on a 48 × 48 grid, drawn in currentColor. */
const MOTIFS: Record<MotifName, ReactNode> = {
  // rising sun over the waves
  sun: (
    <>
      <path d="M5 29H43M14 29A10 10 0 0 1 34 29" />
      <path d={SUN_RAYS} />
      <path d="M8 35q4-3 8 0t8 0t8 0t8 0M14 40.5q2.5-2 5 0t5 0t5 0t5 0" />
    </>
  ),
  // five-petal plum blossom
  blossom: (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <path key={i} d="M24 19.5C18 17.5 17 9.5 24 7.5C31 9.5 30 17.5 24 19.5Z" transform={`rotate(${i * 72} 24 24)`} />
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <path key={`s${i}`} d="M24 20V14.5" transform={`rotate(${36 + i * 72} 24 24)`} />
      ))}
      <circle cx="24" cy="24" r="2.4" fill="currentColor" stroke="none" />
    </>
  ),
  // endless knot: a woven lattice with a loop at each corner
  knot: (
    <g transform="rotate(45 24 24)">
      <rect x="15" y="15" width="18" height="18" rx="1" />
      <path d="M21 15V33M27 15V33M15 21H33M15 27H33" />
      <circle cx="12.5" cy="12.5" r="3.5" />
      <circle cx="35.5" cy="12.5" r="3.5" />
      <circle cx="35.5" cy="35.5" r="3.5" />
      <circle cx="12.5" cy="35.5" r="3.5" />
    </g>
  ),
  // paper lantern with ribs and a tassel
  lantern: (
    <>
      <path d="M24 3V9" />
      <rect x="17.5" y="9" width="13" height="3.5" rx="1" />
      <ellipse cx="24" cy="24.5" rx="13" ry="12" />
      <ellipse cx="24" cy="24.5" rx="6.5" ry="12" />
      <path d="M24 12.5V36.5" />
      <rect x="17.5" y="36.5" width="13" height="3.5" rx="1" />
      <path d="M22 40V46M24 40V47M26 40V46" />
    </>
  ),
  // lotus rising from still water
  lotus: (
    <>
      <path d="M24 9C29.5 15 29.5 25 24 33C18.5 25 18.5 15 24 9Z" />
      <path d="M24 33C17 31 12 25 11.5 17.5C18 19.5 22 25 24 33ZM24 33C31 31 36 25 36.5 17.5C30 19.5 26 25 24 33Z" />
      <path d="M24 33C15 35.5 8 32 5 26.5C12 25.5 19 28 24 33ZM24 33C33 35.5 40 32 43 26.5C36 25.5 29 28 24 33Z" />
      <path d="M9 39H39M15 43.5H33" />
    </>
  ),
  // auspicious cloud with curled edges and trailing wind
  cloud: (
    <>
      <path d="M8 34H38A6 6 0 0 0 38 22A7 7 0 0 0 25 18A6 6 0 0 0 14 21A6.5 6.5 0 0 0 8 34Z" />
      <path d="M38 28.5A2.6 2.6 0 1 0 35.4 25.9M27 23.5A3 3 0 1 0 24 20.5M15.5 29A2.6 2.6 0 1 1 13 26.4" />
      <path d="M4 40H20M24 40H44M12 45H34" />
    </>
  ),
  // the Northeast hills, mist and the sun rising behind them
  mountains: (
    <>
      <circle cx="34" cy="13" r="4.5" />
      <path d="M3 36L13 22L19 29L28 16L36 27L41 22L45 28" />
      <path d="M3 41C10 35 16 35 22 39C28 35 36 34 45 40" />
      <path d="M8 45.5H26M30 45.5H40" />
    </>
  ),
};

type MotifProps = {
  name: MotifName;
  strokeWidth?: number;
  className?: string;
};

/** Oriental line-art motif (decorative): sun, plum blossom, endless knot, lantern, lotus, cloud or mountains. */
export default function Motif({ name, strokeWidth = 1.8, className }: MotifProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {MOTIFS[name]}
    </svg>
  );
}
