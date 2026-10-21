import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type DiamondProps = { className?: string };

/** Small rotated square used throughout the brochure as a separator. */
export function Diamond({ className }: DiamondProps) {
  return <span aria-hidden="true" className={cn('inline-block h-1.5 w-1.5 shrink-0 rotate-45', className ?? 'bg-navy')} />;
}

type Tone = 'navy' | 'saffron' | 'cream' | 'gold';

const toneText: Record<Tone, string> = {
  navy: 'text-navy',
  saffron: 'text-saffron-ink',
  cream: 'text-cream',
  gold: 'text-gold-soft',
};

type DividerLabelProps = {
  children: ReactNode;
  /** Label colour */
  tone?: Tone;
  /** Colour of the short rules either side */
  line?: 'gold' | 'saffron';
  /** Adds a small diamond at each outer end (as on the brochure cover) */
  diamonds?: boolean;
  diamondClassName?: string;
  align?: 'center' | 'left';
  as?: 'p' | 'h2' | 'h3' | 'span' | 'div';
  id?: string;
  className?: string;
  /** Extra classes for the label itself (e.g. tighter tracking on phones) */
  labelClassName?: string;
};

/**
 * The brochure's signature label: a spaced, uppercase label centred between two
 * short gold rules — e.g. "—— AT A GLANCE ——".
 */
export default function DividerLabel({
  children,
  tone = 'navy',
  line = 'gold',
  diamonds = false,
  diamondClassName,
  align = 'center',
  as: Tag = 'p',
  id,
  className,
  labelClassName,
}: DividerLabelProps) {
  const rule = cn('h-px shrink-0', line === 'saffron' ? 'bg-saffron' : 'bg-gold');
  return (
    <div className={cn('flex items-center gap-3 sm:gap-4', align === 'center' ? 'justify-center' : 'justify-start', className)}>
      {diamonds && <Diamond className={diamondClassName} />}
      {align === 'center' && <span aria-hidden="true" className={cn(rule, 'w-6 xs:w-10 sm:w-14')} />}
      <Tag id={id} className={cn('eyebrow min-w-0 text-balance', align === 'center' && 'text-center', toneText[tone], '[margin-right:-0.35em]', labelClassName)}>
        {children}
      </Tag>
      <span aria-hidden="true" className={cn(rule, 'w-6 xs:w-10 sm:w-14')} />
      {diamonds && <Diamond className={diamondClassName} />}
    </div>
  );
}
