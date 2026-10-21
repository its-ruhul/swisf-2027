import { useRef, type ReactNode, type RefObject } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/** How a block enters: rise, slide in from a side, grow, grow while turning (circular art), or come into focus. */
export type RevealFrom = 'up' | 'left' | 'right' | 'scale' | 'turn' | 'blur';

/** Ease-out on the way in; its mirror image on the way out, so scrolling back up plays the entrance in reverse. */
export const EASE_IN_VIEW = [0.2, 0.7, 0.2, 1] as const;
export const EASE_OUT_OF_VIEW = [0.8, 0, 0.8, 0.3] as const;
/** The reverse runs a little quicker so it keeps up with scrolling back up. */
export const REVERSE_SPEED = 0.65;

const offscreen = {
  up: { opacity: 0, y: 32 },
  left: { opacity: 0, x: -56 },
  right: { opacity: 0, x: 56 },
  scale: { opacity: 0, scale: 0.9, y: 20 },
  turn: { opacity: 0, scale: 0.82, rotate: -10 },
  blur: { opacity: 0, y: 18, filter: 'blur(10px)' },
} as const;

/** Variants for one block entering from `from` (0.7–1.1s ease-out) and leaving the same way. */
export function revealVariants(from: RevealFrom = 'up', delay = 0): Variants {
  const duration = from === 'up' ? 0.7 : from === 'turn' ? 1.1 : 0.85;
  return {
    hidden: { ...offscreen[from], transition: { duration: duration * REVERSE_SPEED, ease: EASE_OUT_OF_VIEW } },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      ...(from === 'blur' && { filter: 'blur(0px)' }),
      transition: { duration, ease: EASE_IN_VIEW, delay },
    },
  };
}

/** Fade up 32px, 0.7s ease-out. */
export const fadeUp: Variants = revealVariants('up');

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger direct <RevealItem> children by 0.1s (last one first on the way out) instead of animating this block */
  stagger?: boolean;
  /** Direction the block enters from (ignored with `stagger`) */
  from?: RevealFrom;
  delay?: number;
  as?: 'div' | 'ul' | 'ol';
  id?: string;
};

/**
 * Scroll-reveal wrapper: plays every time the block scrolls into view and in
 * reverse when you scroll back up past it (see useScrollReveal).
 */
export default function Reveal({ children, className, stagger = false, from = 'up', delay = 0, as = 'div', id }: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const shown = useScrollReveal(ref);

  const variants: Variants = stagger
    ? {
        hidden: { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
        show: { transition: { staggerChildren: 0.1, delayChildren: delay } },
      }
    : revealVariants(from, delay);

  if (reduce) {
    if (as === 'ul') return <ul id={id} className={className}>{children}</ul>;
    if (as === 'ol') return <ol id={id} className={className}>{children}</ol>;
    return <div id={id} className={className}>{children}</div>;
  }

  const motionProps = {
    id,
    className,
    initial: 'hidden',
    animate: shown ? 'show' : 'hidden',
    variants,
  } as const;

  if (as === 'ul') return <motion.ul ref={ref as RefObject<HTMLUListElement>} {...motionProps}>{children}</motion.ul>;
  if (as === 'ol') return <motion.ol ref={ref as RefObject<HTMLOListElement>} {...motionProps}>{children}</motion.ol>;
  return <motion.div ref={ref as RefObject<HTMLDivElement>} {...motionProps}>{children}</motion.div>;
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  /** Direction this item enters from (default: up) */
  from?: RevealFrom;
  as?: 'div' | 'li';
};

/** Child of a staggered <Reveal>. */
export function RevealItem({ children, className, from = 'up', as = 'div' }: RevealItemProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return as === 'li' ? <li className={className}>{children}</li> : <div className={className}>{children}</div>;
  }
  const variants = from === 'up' ? fadeUp : revealVariants(from);
  return as === 'li' ? (
    <motion.li className={className} variants={variants}>
      {children}
    </motion.li>
  ) : (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
