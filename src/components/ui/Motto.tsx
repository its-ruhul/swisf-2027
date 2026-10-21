import { Fragment } from 'react';
import { site } from '../../data/site';
import { cn } from '../../lib/cn';
import { Diamond } from './DividerLabel';

type MottoProps = {
  orientation?: 'vertical' | 'horizontal';
  tone?: 'cream' | 'navy';
  /** Tighter spacing and smaller type (footer); the letter-spacing also tightens on phones so it fits one line */
  compact?: boolean;
  /** Alignment: of the stack when vertical, of the row when horizontal */
  align?: 'start' | 'center' | 'end';
  className?: string;
};

/** "INNOVATE ◆ INSPIRE ◆ CELEBRATE" — spaced letters with saffron diamonds. */
export default function Motto({ orientation = 'vertical', tone = 'cream', compact = false, align = 'start', className }: MottoProps) {
  const vertical = orientation === 'vertical';
  return (
    <p
      className={cn(
        'font-medium uppercase',
        compact ? 'text-[11px] tracking-[0.3em] sm:text-[12px] sm:tracking-[0.5em]' : 'text-[12px] tracking-[0.5em] sm:text-[13px]',
        vertical
          ? cn('flex flex-col', compact ? 'gap-3' : 'gap-5', align === 'end' ? 'items-start md:items-end' : 'items-start')
          : cn(
              'flex flex-wrap items-center gap-y-2',
              compact ? 'gap-x-3 sm:gap-x-4' : 'gap-x-4',
              align === 'start' ? 'justify-start' : align === 'end' ? 'justify-end' : 'justify-center',
            ),
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
