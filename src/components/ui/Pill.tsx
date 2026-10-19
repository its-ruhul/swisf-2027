import type { ReactNode } from 'react';
import { accentBorder, type Accent } from '../../lib/accents';
import { cn } from '../../lib/cn';

type PillProps = {
  children: ReactNode;
  accent?: Accent;
  as?: 'span' | 'li';
  className?: string;
};

/** Outlined rounded tag with an accent border and navy text. */
export default function Pill({ children, accent = 'royal', as: Tag = 'span', className }: PillProps) {
  return (
    <Tag
      className={cn(
        'inline-flex items-center justify-center rounded-full border-[1.5px] bg-white/70 px-5 py-2 text-sm text-navy transition duration-200 hover:-translate-y-0.5 hover:bg-white',
        accentBorder[accent],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
