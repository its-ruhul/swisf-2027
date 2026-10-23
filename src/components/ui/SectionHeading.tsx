import { useRef } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/cn';
import { EASE_IN_VIEW, EASE_OUT_OF_VIEW, REVERSE_SPEED } from './Reveal';

type SectionHeadingProps = {
  /** First line — navy (cream on dark backgrounds) */
  line1: string;
  /** Second line — saffron */
  line2: string;
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  /** Each line rises out of a mask, one after the other, every time the heading scrolls into view (as in the hero), and sinks back when you scroll up past it */
  reveal?: boolean;
  className?: string;
};

const lines: Variants = {
  hidden: { transition: { staggerChildren: 0.08, staggerDirection: -1 } },
  show: { transition: { staggerChildren: 0.14 } },
};
const lineUp: Variants = {
  hidden: { y: '105%', transition: { duration: 0.9 * REVERSE_SPEED, ease: EASE_OUT_OF_VIEW } },
  show: { y: '0%', transition: { duration: 0.9, ease: EASE_IN_VIEW } },
};

/**
 * Two-line uppercase section heading — the brochure's signature pattern,
 * e.g. "WELCOME" / "TO WISF 2027".
 */
export default function SectionHeading({
  line1,
  line2,
  as: Tag = 'h2',
  id,
  align = 'left',
  tone = 'light',
  reveal = false,
  className,
}: SectionHeadingProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useScrollReveal(ref);
  const line1Class = cn('block', tone === 'dark' ? 'text-cream' : 'text-navy');
  const line2Class = cn('block', tone === 'dark' ? 'text-saffron-bright' : 'text-saffron-ink-lg');

  if (reveal && !reduce) {
    // the padding keeps descenders inside the mask; the negative margin keeps the layout unchanged
    const mask = 'block overflow-hidden pb-[0.08em] -mb-[0.08em]';
    return (
      <Tag id={id} className={cn('heading-2', align === 'center' && 'text-center', className)}>
        <motion.span ref={ref} className="block" variants={lines} initial="hidden" animate={shown ? 'show' : 'hidden'}>
          <span className={mask}>
            <motion.span className={line1Class} variants={lineUp}>
              {line1}
            </motion.span>
          </span>{' '}
          <span className={mask}>
            <motion.span className={line2Class} variants={lineUp}>
              {line2}
            </motion.span>
          </span>
        </motion.span>
      </Tag>
    );
  }

  return (
    <Tag id={id} className={cn('heading-2', align === 'center' && 'text-center', className)}>
      <span className={line1Class}>{line1}</span>{' '}
      <span className={line2Class}>{line2}</span>
    </Tag>
  );
}
