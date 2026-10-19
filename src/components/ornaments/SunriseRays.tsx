import { useId } from 'react';
import { cssVars } from '../../lib/cssVars';
import { cn } from '../../lib/cn';

type SunriseRaysProps = {
  className?: string;
  /** Rays fade in one after another, the sun rises 20px, then rays pulse slowly */
  animated?: boolean;
  /** Number of rays (brochure ≈ 41) */
  rays?: number;
  /** Small 4-point star above the sun */
  star?: boolean;
  /** Accessible title; omit for purely decorative use */
  title?: string;
};

const CX = 200;
const CY = 196;

/**
 * Half-sun emblem: gold gradient disc on a horizon, concentric arcs, a fan of
 * radiating rays, a crimson diamond at the base and a 4-point star above.
 */
export default function SunriseRays({ className, animated = true, rays = 41, star = true, title }: SunriseRaysProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const ids = {
    ray: `ray-${uid}`,
    sun: `sun-${uid}`,
    glow: `glow-${uid}`,
    horizon: `hor-${uid}`,
    clip: `clip-${uid}`,
  };

  const lines = Array.from({ length: rays }, (_, i) => {
    const t = rays === 1 ? 0.5 : i / (rays - 1);
    const angle = Math.PI * (0.055 + t * 0.89);
    const long = i % 2 === 0;
    const envelope = 112 + 64 * Math.pow(Math.sin(angle), 3);
    const r0 = 66;
    const r1 = long ? envelope : envelope * 0.8;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      key: i,
      long,
      x1: CX - cos * r0,
      y1: CY - sin * r0,
      x2: CX - cos * r1,
      y2: CY - sin * r1,
    };
  });

  return (
    <svg
      viewBox="0 0 400 214"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      className={cn('overflow-visible', className)}
    >
      <defs>
        {/* userSpaceOnUse: bounding-box gradients vanish on perfectly vertical/horizontal lines */}
        <linearGradient id={ids.ray} gradientUnits="userSpaceOnUse" x1="0" y1="18" x2="0" y2={CY}>
          <stop offset="0" stopColor="#E6CF94" stopOpacity="0.55" />
          <stop offset="1" stopColor="#C9A24A" />
        </linearGradient>
        <linearGradient id={ids.sun} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F9DE8F" />
          <stop offset="0.55" stopColor="#E9B954" />
          <stop offset="1" stopColor="#C98D2B" />
        </linearGradient>
        <radialGradient id={ids.glow} cx="0.5" cy="1" r="0.5">
          <stop offset="0" stopColor="#F6D88A" stopOpacity="0.6" />
          <stop offset="1" stopColor="#F6D88A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={ids.horizon} gradientUnits="userSpaceOnUse" x1="8" y1="0" x2="392" y2="0">
          <stop offset="0" stopColor="#C9A24A" stopOpacity="0" />
          <stop offset="0.25" stopColor="#C9A24A" />
          <stop offset="0.75" stopColor="#C9A24A" />
          <stop offset="1" stopColor="#C9A24A" stopOpacity="0" />
        </linearGradient>
        <clipPath id={ids.clip}>
          <rect x="0" y="0" width="400" height={CY} />
        </clipPath>
      </defs>

      {/* soft glow behind the sun */}
      <ellipse cx={CX} cy={CY} rx="120" ry="90" fill={`url(#${ids.glow})`} />

      {/* rays */}
      <g className={cn(animated && 'sun-rays-pulse')} stroke={`url(#${ids.ray})`} strokeLinecap="round">
        {lines.map((l) => (
          <line
            key={l.key}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            strokeWidth={l.long ? 1.5 : 1}
            className={animated ? 'sun-ray' : undefined}
            style={animated ? cssVars({ '--d': `${0.25 + l.key * 0.028}s` }) : undefined}
          />
        ))}
      </g>

      {/* concentric arcs */}
      <g fill="none" stroke="#C9A24A" strokeWidth="1.2">
        {[44, 51, 58].map((r) => (
          <path key={r} d={`M${CX - r} ${CY}A${r} ${r} 0 0 1 ${CX + r} ${CY}`} opacity={r === 58 ? 0.7 : 0.95} />
        ))}
      </g>

      {/* the rising sun */}
      <g clipPath={`url(#${ids.clip})`}>
        <path
          className={animated ? 'sun-disc' : undefined}
          d={`M${CX - 36} ${CY}A36 36 0 0 1 ${CX + 36} ${CY}Z`}
          fill={`url(#${ids.sun})`}
        />
      </g>

      {/* horizon */}
      <line x1="8" y1={CY} x2="392" y2={CY} stroke={`url(#${ids.horizon})`} strokeWidth="1.6" />

      {/* crimson diamond */}
      <rect x={CX - 5} y={CY - 5} width="10" height="10" fill="#B5122B" transform={`rotate(45 ${CX} ${CY})`} />

      {/* 4-point star */}
      {star && (
        <path
          d={`M${CX} ${CY - 132}l2.4 6.6 6.6 2.4-6.6 2.4-2.4 6.6-2.4-6.6-6.6-2.4 6.6-2.4z`}
          fill="#C9A24A"
          className={animated ? 'sun-ray' : undefined}
          style={animated ? cssVars({ '--d': '1.6s' }) : undefined}
        />
      )}
    </svg>
  );
}
