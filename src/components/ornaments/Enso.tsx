import { useId, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/cn';

type EnsoProps = {
  className?: string;
  color?: string;
};

/**
 * Ensō (円相) — the Zen brush circle, left open at the end. The stroke paints
 * itself in every time it scrolls into view (and unpaints on the way back up); a turbulence filter roughens the
 * edge like ink on paper.
 */
export default function Enso({ className, color = '#0E1A3D' }: EnsoProps) {
  const reduce = useReducedMotion();
  const filterId = `enso-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const ref = useRef<SVGSVGElement>(null);
  const painted = useScrollReveal(ref);
  return (
    <svg ref={ref} aria-hidden="true" focusable="false" viewBox="0 0 200 200" className={cn('pointer-events-none overflow-visible', className)}>
      <defs>
        <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="3.2" />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`} fill="none" stroke={color} strokeLinecap="round">
        <motion.path
          d="M118 12C160 20 190 58 188 102C186 150 146 188 98 188C50 188 12 150 12 102C12 60 40 26 80 15"
          strokeWidth="7"
          initial={reduce ? false : { pathLength: 0, opacity: 0.2 }}
          animate={
            painted
              ? { pathLength: 1, opacity: 0.9, transition: { duration: 2.2, ease: [0.6, 0.05, 0.25, 1] } }
              : { pathLength: 0, opacity: 0.2, transition: { duration: 0.9, ease: 'easeIn' } }
          }
        />
        <motion.path
          d="M112 22C150 32 178 64 176 104"
          strokeWidth="2"
          opacity="0.5"
          initial={reduce ? false : { pathLength: 0 }}
          animate={
            painted
              ? { pathLength: 1, transition: { duration: 1.4, delay: 0.5, ease: 'easeOut' } }
              : { pathLength: 0, transition: { duration: 0.6, ease: 'easeIn' } }
          }
        />
      </g>
    </svg>
  );
}
