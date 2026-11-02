import { useRef } from 'react';
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

const NODE_GLOW = 'radial-gradient(closest-side, #FFE2A8 0%, rgba(242, 162, 79, 0.75) 35%, rgba(224, 123, 57, 0) 100%)';

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
        {v.nodes.map(([nx, ny, size], i) => (
          <span
            key={`${nx}-${ny}`}
            aria-hidden="true"
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${nx}%`, top: `${ny}%`, width: `${(32 * size * 100) / v.width}%`, aspectRatio: '1' }}
          >
            {i === 0 && <span className="svg-pulse absolute inset-[6%] rounded-full border border-[#F2A24F]" />}
            <span className="globe-node block h-full w-full rounded-full" style={cssVars({ '--delay': `${(i * 0.45) % 3}s` }, { background: NODE_GLOW })} />
          </span>
        ))}
      </div>
    </motion.div>
  );
}
