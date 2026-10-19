import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type EyebrowTone = 'saffron' | 'navy' | 'royal' | 'teal' | 'violet' | 'crimson' | 'cream' | 'gold';

const tones: Record<EyebrowTone, string> = {
  saffron: 'text-saffron-ink',
  navy: 'text-navy',
  royal: 'text-royal',
  teal: 'text-teal-ink',
  violet: 'text-violet',
  crimson: 'text-crimson',
  cream: 'text-cream',
  gold: 'text-gold-soft',
};

type EyebrowProps = {
  children: ReactNode;
  tone?: EyebrowTone;
  as?: 'p' | 'span' | 'div' | 'h2' | 'h3' | 'h4';
  id?: string;
  className?: string;
};

/** Small, widely-tracked uppercase label (Poppins 500, 12–13px, 0.35em). */
export default function Eyebrow({ children, tone = 'saffron', as: Tag = 'p', id, className }: EyebrowProps) {
  return (
    <Tag id={id} className={cn('eyebrow', tones[tone], className)}>
      {children}
    </Tag>
  );
}
