import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '../../lib/cn';

type SectionHeadingProps = {
  /** First line — navy (cream on dark backgrounds) */
  line1: string;
  /** Second line — saffron */
  line2: string;
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  /** Each line rises out of a mask, one after the other, when the heading scrolls into view (as in the hero) */
  reveal?: boolean;
  className?: string;
};

const lines: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.14 } } };
const lineUp: Variants = {
  hidden: { y: '105%' },
  show: { y: '0%', transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] } },
};

/**
 * Two-line uppercase section heading — the brochure's signature pattern,
 * e.g. "WELCOME" / "TO SWISF 2027".
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
  const line1Class = cn('block', tone === 'dark' ? 'text-cream' : 'text-navy');
  const line2Class = cn('block', tone === 'dark' ? 'text-saffron-bright' : 'text-saffron-ink-lg');

  if (reveal && !reduce) {
    // the padding keeps descenders inside the mask; the negative margin keeps the layout unchanged
    const mask = 'block overflow-hidden pb-[0.08em] -mb-[0.08em]';
    return (
      <Tag id={id} className={cn('heading-2', align === 'center' && 'text-center', className)}>
        <motion.span className="block" variants={lines} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }}>
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
