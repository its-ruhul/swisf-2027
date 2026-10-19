import { Fragment } from 'react';
import { site } from '../../data/site';
import { cn } from '../../lib/cn';
import { Diamond } from './DividerLabel';

type MottoProps = {
  orientation?: 'vertical' | 'horizontal';
  tone?: 'cream' | 'navy';
  /** Tighter spacing and smaller type (footer) */
  compact?: boolean;
  /** Vertical alignment of the stack */
  align?: 'start' | 'end';
  className?: string;
};

/** "INNOVATE ◆ INSPIRE ◆ CELEBRATE" — spaced letters with saffron diamonds. */
export default function Motto({ orientation = 'vertical', tone = 'cream', compact = false, align = 'start', className }: MottoProps) {
  const vertical = orientation === 'vertical';
  return (
    <p
      className={cn(
        'font-medium uppercase tracking-[0.5em]',
        compact ? 'text-[11px] sm:text-[12px]' : 'text-[12px] sm:text-[13px]',
        vertical
          ? cn('flex flex-col', compact ? 'gap-3' : 'gap-5', align === 'end' ? 'items-start md:items-end' : 'items-start')
          : 'flex flex-wrap items-center justify-center gap-x-4 gap-y-2',
        tone === 'cream' ? 'text-cream' : 'text-navy',
        className,
      )}
    >
      {site.motto.map((word, i) => (
        <Fragment key={word}>
          {i > 0 && <Diamond className={cn('bg-saffron', vertical && 'ml-3 md:mx-3')} />}
          <span className={cn(vertical && '[margin-right:-0.5em]')}>{word}</span>
        </Fragment>
      ))}
    </p>
  );
}
