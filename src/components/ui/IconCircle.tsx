import type { LucideIcon } from 'lucide-react';
import { accentHoverTint, accentLine, accentLineBright, type Accent } from '../../lib/accents';
import { cn } from '../../lib/cn';

export type IconCircleSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const box: Record<IconCircleSize, string> = {
  '2xs': 'h-8 w-8',
  xs: 'h-10 w-10',
  sm: 'h-11 w-11',
  md: 'h-14 w-14',
  lg: 'h-[72px] w-[72px]',
  xl: 'h-[76px] w-[76px] sm:h-[88px] sm:w-[88px]',
};

const iconPx: Record<IconCircleSize, number> = { '2xs': 15, xs: 18, sm: 20, md: 24, lg: 30, xl: 34 };

type IconCircleProps = {
  icon: LucideIcon;
  accent?: Accent;
  size?: IconCircleSize;
  /** light = on cream/white, dark = on navy/night (brighter accents) */
  tone?: 'light' | 'dark';
  /** Background behind the outline — use a solid fill when a line runs behind the circle */
  fill?: 'transparent' | 'cream' | 'cream-2' | 'white' | 'navy';
  /** Hover: 8% accent tint + 2px lift (also triggered by a parent with `group`) */
  interactive?: boolean;
  className?: string;
};

const fills = {
  transparent: 'bg-transparent',
  cream: 'bg-cream',
  'cream-2': 'bg-cream-2',
  white: 'bg-white',
  navy: 'bg-navy-deep',
} as const;

/** Thin outlined circle with a centred line icon — the brochure's icon treatment. */
export default function IconCircle({
  icon: Icon,
  accent = 'royal',
  size = 'lg',
  tone = 'light',
  fill = 'transparent',
  interactive = true,
  className,
}: IconCircleProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-full border-[1.5px] transition duration-300 ease-out',
        box[size],
        fills[fill],
        tone === 'dark' ? accentLineBright[accent] : accentLine[accent],
        interactive && 'hover:-translate-y-0.5 group-hover:-translate-y-0.5',
        interactive && accentHoverTint[accent],
        className,
      )}
    >
      <Icon size={iconPx[size]} strokeWidth={1.5} aria-hidden="true" />
    </span>
  );
}
