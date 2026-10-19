import { useId } from 'react';
import lanternsPair from '../../assets/images/lanterns-pair.webp';
import lanternsString from '../../assets/images/lanterns-string.webp';
import { cn } from '../../lib/cn';

type LanternProps = {
  className?: string;
  /** Gentle sway from the top (disabled for reduced motion) */
  sway?: boolean;
  /** Seconds of offset so neighbouring lanterns don't move in sync */
  delay?: number;
  /** Length of the hanging string in SVG units */
  stringLength?: number;
};

/** Red paper lantern with gold caps and tassel (inline SVG). */
export default function Lantern({ className, sway = true, delay = 0, stringLength = 40 }: LanternProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const body = `lb-${uid}`;
  const glow = `lg-${uid}`;
  const top = stringLength;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 80 ${top + 130}`}
      className={cn('origin-top-center overflow-visible', sway && 'motion-safe:animate-sway', className)}
      style={{ animationDelay: `${delay}s` }}
    >
      <defs>
        <radialGradient id={body} cx="0.42" cy="0.4" r="0.65">
          <stop offset="0" stopColor="#FF8A5B" />
          <stop offset="0.45" stopColor="#E0362F" />
          <stop offset="1" stopColor="#8E1B1B" />
        </radialGradient>
        <radialGradient id={glow}>
          <stop offset="0" stopColor="#FF9B5E" stopOpacity="0.45" />
          <stop offset="1" stopColor="#FF9B5E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <line x1="40" y1="0" x2="40" y2={top} stroke="#8E1B1B" strokeWidth="1.2" />
      <ellipse cx="40" cy={top + 50} rx="40" ry="44" fill={`url(#${glow})`} />
      {/* top cap */}
      <rect x="28" y={top} width="24" height="8" rx="2" fill="#C9A24A" />
      {/* body */}
      <path
        d={`M40 ${top + 8}C10 ${top + 8} 6 ${top + 30} 6 ${top + 50}S10 ${top + 92} 40 ${top + 92}S74 ${top + 70} 74 ${top + 50}S70 ${top + 8} 40 ${top + 8}Z`}
        fill={`url(#${body})`}
      />
      {/* ribs */}
      <g fill="none" stroke="#7A1414" strokeOpacity="0.45" strokeWidth="1">
        <ellipse cx="40" cy={top + 50} rx="12" ry="42" />
        <ellipse cx="40" cy={top + 50} rx="24" ry="42" />
        <line x1="40" y1={top + 8} x2="40" y2={top + 92} />
      </g>
      {/* gold bands */}
      <g stroke="#E6CF94" strokeOpacity="0.8" strokeWidth="1.2" fill="none">
        <path d={`M14 ${top + 24}Q40 ${top + 18} 66 ${top + 24}`} />
        <path d={`M14 ${top + 76}Q40 ${top + 82} 66 ${top + 76}`} />
      </g>
      {/* bottom cap + tassel */}
      <rect x="28" y={top + 90} width="24" height="8" rx="2" fill="#C9A24A" />
      <circle cx="40" cy={top + 103} r="3" fill="#C9A24A" />
      <g stroke="#B5122B" strokeWidth="1.4" strokeLinecap="round">
        {[34, 37, 40, 43, 46].map((x) => (
          <line key={x} x1={x} y1={top + 106} x2={x + (x - 40) * 0.25} y2={top + 128} />
        ))}
      </g>
    </svg>
  );
}

type HangingLanternsProps = {
  /** "pair" — two lanterns on a diagonal string; "string" — a full row of lanterns */
  variant: 'pair' | 'string';
  className?: string;
  sway?: boolean;
};

/**
 * The brochure's watercolour lanterns (raster), with a gentle sway.
 * "string" repeats the row of lanterns across the full width at the container's height.
 */
export function HangingLanterns({ variant, className, sway = true }: HangingLanternsProps) {
  if (variant === 'string') {
    return (
      <div aria-hidden="true" className={cn('pointer-events-none flex select-none justify-center overflow-hidden', className)}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={cn('h-full shrink-0', i % 2 === 1 && '-scale-x-100')}>
            <img
              src={lanternsString}
              alt=""
              width={1440}
              height={604}
              loading="lazy"
              decoding="async"
              draggable={false}
              className={cn('block h-full w-auto max-w-none origin-top-center', sway && 'motion-safe:animate-sway-slow')}
              style={{ animationDelay: `${i * 0.7}s` }}
            />
          </div>
        ))}
      </div>
    );
  }
  const img = { src: lanternsPair, width: 900, height: 463 };
  return (
    <div aria-hidden="true" className={cn('pointer-events-none select-none', className)}>
      <img
        src={img.src}
        alt=""
        width={img.width}
        height={img.height}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={cn('block h-auto w-full origin-top-center', sway && 'motion-safe:animate-sway-slow')}
      />
    </div>
  );
}
