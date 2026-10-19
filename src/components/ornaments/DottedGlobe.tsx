import { useId, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import globeDark from '../../assets/images/globe-dark.webp';
import globeLight from '../../assets/images/globe-light.webp';
import { cssVars } from '../../lib/cssVars';
import { cn } from '../../lib/cn';

type Node = [x: number, y: number, size: number];

const VARIANTS = {
  dark: {
    src: globeDark,
    width: 900,
    height: 755,
    alt: 'Navy dot-matrix globe centred on Asia, with glowing orange city lights linked to Northeast India and a gold orbit ring',
    // node positions as % of the image, measured from the artwork
    nodes: [
      [52.1, 44.7, 1.5],
      [41.3, 48.9, 0.8],
      [43.8, 43.0, 0.8],
      [31.8, 42.9, 0.7],
      [20.2, 59.9, 0.7],
      [74.0, 32.4, 0.7],
      [79.2, 80.0, 0.8],
      [54.1, 47.9, 0.6],
    ] as Node[],
  },
  light: {
    src: globeLight,
    width: 820,
    height: 690,
    alt: 'White dot-matrix globe with orange glowing nodes over Northeast India and an orbit ring',
    nodes: [
      [52.2, 44.7, 1.5],
      [43.4, 43.3, 0.7],
      [48.0, 46.2, 0.6],
      [60.2, 62.4, 0.7],
      [79.2, 79.0, 0.7],
      [73.8, 32.5, 0.6],
    ] as Node[],
  },
} as const;

type DottedGlobeProps = {
  variant?: 'dark' | 'light';
  className?: string;
  /** Above-the-fold usage: load eagerly with high priority */
  priority?: boolean;
  /** Decorative (empty alt) or meaningful image */
  decorative?: boolean;
};

/**
 * Dot-matrix globe (Asia centred) with glowing orange nodes and an orbit ring.
 * Gently rotates and parallaxes on scroll; nodes pulse softly.
 */
export default function DottedGlobe({ variant = 'dark', className, priority = false, decorative = false }: DottedGlobeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const gid = `node-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const v = VARIANTS[variant];

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [36, -36]);
  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-4, 4]);

  // React 18 passes the lowercase attribute straight through to the DOM.
  const priorityAttrs = priority ? { fetchpriority: 'high' } : {};

  return (
    <motion.div ref={ref} style={{ y, rotate }} className={cn('relative', className)}>
      <div className="relative motion-safe:animate-float">
        <img
          src={v.src}
          alt={decorative ? '' : v.alt}
          aria-hidden={decorative ? true : undefined}
          width={v.width}
          height={v.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          className="block h-auto w-full select-none"
          {...priorityAttrs}
        />
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox={`0 0 ${v.width} ${v.height}`}
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <radialGradient id={gid}>
              <stop offset="0" stopColor="#FFE2A8" stopOpacity="1" />
              <stop offset="0.35" stopColor="#F2A24F" stopOpacity="0.75" />
              <stop offset="1" stopColor="#E07B39" stopOpacity="0" />
            </radialGradient>
          </defs>
          {v.nodes.map(([nx, ny, size], i) => {
            const cx = (nx / 100) * v.width;
            const cy = (ny / 100) * v.height;
            return (
              <g key={`${nx}-${ny}`}>
                {i === 0 && (
                  <circle cx={cx} cy={cy} r={14} fill="none" stroke="#F2A24F" strokeWidth="1.5" className="svg-pulse" />
                )}
                <circle
                  cx={cx}
                  cy={cy}
                  r={16 * size}
                  fill={`url(#${gid})`}
                  className="globe-node"
                  style={cssVars({ '--delay': `${(i * 0.45) % 3}s` })}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </motion.div>
  );
}
