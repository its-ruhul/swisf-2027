import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/cn';

type SealProps = {
  /** One to four characters, set top-to-bottom (e.g. 日出, "sunrise") */
  glyphs: string;
  /** English meaning, read by screen readers and shown on hover */
  meaning: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizes = {
  sm: 'h-12 w-12 text-[17px] p-1',
  md: 'h-16 w-16 text-[22px] p-1.5',
  lg: 'h-20 w-20 text-[28px] p-2',
} as const;

/**
 * A crimson hanko / chop seal — the red stamp that signs East Asian
 * calligraphy. It "stamps" into place the first time it scrolls into view.
 */
export default function Seal({ glyphs, meaning, size = 'md', className }: SealProps) {
  const reduce = useReducedMotion();
  const chars = Array.from(glyphs);
  const twoColumns = chars.length > 2;
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
      <span
        aria-hidden="true"
        className={cn(
          'font-glyph h-full w-full rounded-[3px] border border-cream/70 leading-none',
          twoColumns
            ? 'grid grid-flow-col grid-rows-2 place-items-center [direction:rtl]'
            : 'flex flex-col items-center justify-center gap-[0.08em]',
        )}
      >
        {chars.map((c, i) => (
          <span key={`${c}-${i}`} className="block">
            {c}
          </span>
        ))}
      </span>
    </motion.span>
  );
}

type GlyphWatermarkProps = {
  glyphs: string;
  className?: string;
};

/** Very large, very faint vertical calligraphy used as a background texture. */
export function GlyphWatermark({ glyphs, className }: GlyphWatermarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn('font-glyph pointer-events-none absolute select-none leading-none [writing-mode:vertical-rl]', className)}
    >
      {glyphs}
    </span>
  );
}
