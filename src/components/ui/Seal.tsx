import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { cn } from '../../lib/cn';
import Motif, { type MotifName } from '../ornaments/Motif';

type SealProps = {
  /** The line-art motif carved into the seal (e.g. "blossom") */
  motif: MotifName;
  /** What the seal stands for, read by screen readers and shown on hover */
  meaning: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizes = {
  sm: { box: 'h-12 w-12', pad: 'p-1' },
  md: { box: 'h-16 w-16', pad: 'p-1.5' },
  lg: { box: 'h-20 w-20', pad: 'p-2' },
} as const;

/**
 * A crimson hanko / chop seal — the red stamp that signs East Asian
 * paintings — carved with a line-art motif. It "stamps" into place every time
 * it scrolls into view, and lifts off again when you scroll back up past it.
 */
export default function Seal({ motif, meaning, size = 'md', className }: SealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const stamped = useScrollReveal(ref);
  // the outer box stays put and is what the scroll trigger watches; only the stamp inside scales and turns
  return (
    <span ref={ref} role="img" aria-label={`Seal: ${meaning}`} title={meaning} className={cn('inline-flex shrink-0 select-none', sizes[size].box, className)}>
      <motion.span
        className={cn(
          'flex h-full w-full -rotate-6 rounded-[6px] bg-crimson text-cream shadow-[0_6px_16px_-6px_rgba(181,18,43,0.7)]',
          sizes[size].pad,
        )}
        // uneven ink, darker towards the edges
        style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, transparent 40%, rgba(122,12,29,0.55) 100%)' }}
        initial={reduce ? false : { scale: 1.6, opacity: 0, rotate: -14 }}
        animate={
          stamped
            ? { scale: 1, opacity: 1, rotate: -6, transition: { type: 'spring', stiffness: 260, damping: 16 } }
            : { scale: 1.6, opacity: 0, rotate: -14, transition: { duration: 0.35, ease: 'easeIn' } }
        }
      >
        <span aria-hidden="true" className="flex h-full w-full items-center justify-center rounded-[3px] border border-cream/70">
          <Motif name={motif} strokeWidth={2.6} className="h-[84%] w-[84%]" />
        </span>
      </motion.span>
    </span>
  );
}

type MotifWatermarkProps = {
  motif: MotifName;
  /** Position, width and a faint text colour, e.g. "right-[2%] top-[16%] w-40 text-navy/[0.05]" */
  className?: string;
};

/** Very large, very faint oriental line art used as a background texture. */
export function MotifWatermark({ motif, className }: MotifWatermarkProps) {
  return <Motif name={motif} strokeWidth={1.1} className={cn('pointer-events-none absolute select-none', className)} />;
}
