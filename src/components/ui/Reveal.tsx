import type { ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

/** How a block enters: rise, slide in from a side, grow, grow while turning (circular art), or come into focus. */
export type RevealFrom = 'up' | 'left' | 'right' | 'scale' | 'turn' | 'blur';

const EASE = [0.2, 0.7, 0.2, 1] as const;

const offscreen = {
  up: { opacity: 0, y: 32 },
  left: { opacity: 0, x: -56 },
  right: { opacity: 0, x: 56 },
  scale: { opacity: 0, scale: 0.9, y: 20 },
  turn: { opacity: 0, scale: 0.82, rotate: -10 },
  blur: { opacity: 0, y: 18, filter: 'blur(10px)' },
} as const;

/** Variants for one block entering from `from` (0.7–0.9s, ease-out). */
export function revealVariants(from: RevealFrom = 'up', delay = 0): Variants {
  return {
    hidden: offscreen[from],
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      ...(from === 'blur' && { filter: 'blur(0px)', transitionEnd: { filter: 'none' } }),
      transition: { duration: from === 'up' ? 0.7 : from === 'turn' ? 1.1 : 0.85, ease: EASE, delay },
    },
  };
}

/** Fade up 32px, 0.7s ease-out. */
export const fadeUp: Variants = revealVariants('up');

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger direct <RevealItem> children by 0.1s instead of animating this block */
  stagger?: boolean;
  /** Direction the block enters from (ignored with `stagger`) */
  from?: RevealFrom;
  delay?: number;
  /** Fraction visible before triggering (default 20%) */
  amount?: number;
  as?: 'div' | 'ul' | 'ol';
  id?: string;
};

/** Scroll-reveal wrapper: triggers once when 20% of the block is visible. */
export default function Reveal({ children, className, stagger = false, from = 'up', delay = 0, amount = 0.2, as = 'div', id }: RevealProps) {
  const reduce = useReducedMotion();

  const variants: Variants = stagger
    ? { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: delay } } }
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
    whileInView: 'show',
    viewport: { once: true, amount },
    variants,
  } as const;

  if (as === 'ul') return <motion.ul {...motionProps}>{children}</motion.ul>;
  if (as === 'ol') return <motion.ol {...motionProps}>{children}</motion.ol>;
  return <motion.div {...motionProps}>{children}</motion.div>;
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
