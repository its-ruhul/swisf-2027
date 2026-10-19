import type { ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

/** Fade up 24px, 0.6s ease-out. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger direct <RevealItem> children by 0.08s instead of fading this block */
  stagger?: boolean;
  delay?: number;
  /** Fraction visible before triggering (default 20%) */
  amount?: number;
  as?: 'div' | 'ul' | 'ol';
  id?: string;
};

/** Scroll-reveal wrapper: triggers once when 20% of the block is visible. */
export default function Reveal({ children, className, stagger = false, delay = 0, amount = 0.2, as = 'div', id }: RevealProps) {
  const reduce = useReducedMotion();

  const variants: Variants = stagger
    ? { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: delay } } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay } },
      };

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
  as?: 'div' | 'li';
};

/** Child of a staggered <Reveal>. */
export function RevealItem({ children, className, as = 'div' }: RevealItemProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return as === 'li' ? <li className={className}>{children}</li> : <div className={className}>{children}</div>;
  }
  return as === 'li' ? (
    <motion.li className={className} variants={fadeUp}>
      {children}
    </motion.li>
  ) : (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
