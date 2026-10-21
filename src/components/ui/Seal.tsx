import { motion, useReducedMotion } from 'framer-motion';
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
  sm: 'h-12 w-12 p-1',
  md: 'h-16 w-16 p-1.5',
  lg: 'h-20 w-20 p-2',
} as const;

/**
 * A crimson hanko / chop seal — the red stamp that signs East Asian
 * paintings — carved with a line-art motif. It "stamps" into place the first
 * time it scrolls into view.
 */
export default function Seal({ motif, meaning, size = 'md', className }: SealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      role="img"
      aria-label={`Seal: ${meaning}`}
      title={meaning}
      className={cn(
        'inline-flex shrink-0 -rotate-6 select-none rounded-[6px] bg-crimson text-cream shadow-[0_6px_16px_-6px_rgba(181,18,43,0.7)]',
        sizes[size],
        className,
      )}
      // uneven ink, darker towards the edges
      style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, transparent 40%, rgba(122,12,29,0.55) 100%)' }}
      initial={reduce ? false : { scale: 1.6, opacity: 0, rotate: -14 }}
      whileInView={{ scale: 1, opacity: 1, rotate: -6 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 16 }}
    >
      <span aria-hidden="true" className="flex h-full w-full items-center justify-center rounded-[3px] border border-cream/70">
        <Motif name={motif} strokeWidth={2.6} className="h-[84%] w-[84%]" />
      </span>
    </motion.span>
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
