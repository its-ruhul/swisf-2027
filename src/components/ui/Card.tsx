import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { accentText, accentTextBright, type Accent } from '../../lib/accents';
import { cn } from '../../lib/cn';
import IconCircle, { type IconCircleSize } from './IconCircle';

type CardProps = {
  children: ReactNode;
  /** light = white card; dark = translucent card with a gold border (night sections) */
  tone?: 'light' | 'dark';
  as?: 'div' | 'article' | 'li' | 'section' | 'aside';
  /** Lift + gold border on hover */
  hoverLift?: boolean;
  className?: string;
  id?: string;
};

/** White card with a thin warm border, rounded-2xl and a soft shadow. */
export default function Card({ children, tone = 'light', as: Tag = 'div', hoverLift = false, className, id }: CardProps) {
  return (
    <Tag
      id={id}
      className={cn(
        'relative rounded-2xl p-6 sm:p-7',
        tone === 'dark'
          ? 'border border-gold/45 bg-white/[0.045] shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-[2px]'
          : 'border border-line bg-white shadow-card',
        hoverLift && 'transition duration-300 ease-out hover:-translate-y-1 hover:border-gold hover:shadow-lift',
        className,
      )}
    >
      {children}
    </Tag>
  );
}

type CardWithIconProps = {
  icon: LucideIcon;
  accent?: Accent;
  /** Small spaced label above the title, e.g. "BY DAY" */
  eyebrow?: string;
  /** Eyebrow colour if it differs from the icon accent */
  eyebrowAccent?: Accent;
  title: string;
  text?: ReactNode;
  tone?: 'light' | 'dark';
  as?: 'div' | 'article' | 'li';
  titleAs?: 'h3' | 'h4' | 'p';
  hoverLift?: boolean;
  iconSize?: IconCircleSize;
  className?: string;
  /** Extra content under the text (links, etc.) */
  children?: ReactNode;
};

/** Card with an outlined icon circle on the left and eyebrow + title + text on the right. */
export function CardWithIcon({
  icon,
  accent = 'royal',
  eyebrow,
  eyebrowAccent,
  title,
  text,
  tone = 'light',
  as = 'div',
  titleAs: TitleTag = 'h3',
  hoverLift = false,
  iconSize = 'md',
  className,
  children,
}: CardWithIconProps) {
  const eyebrowColour = tone === 'dark' ? accentTextBright[eyebrowAccent ?? accent] : accentText[eyebrowAccent ?? accent];
  return (
    <Card tone={tone} as={as} hoverLift={hoverLift} className={cn('group flex items-start gap-4 sm:gap-5', className)}>
      <IconCircle icon={icon} accent={accent} size={iconSize} tone={tone} fill={tone === 'dark' ? 'transparent' : 'white'} />
      <div className="min-w-0 flex-1 pt-0.5">
        {eyebrow && <p className={cn('eyebrow mb-1', eyebrowColour)}>{eyebrow}</p>}
        <TitleTag className={cn('card-title', tone === 'dark' && 'text-cream')}>{title}</TitleTag>
        {text && (
          <p className={cn('mt-2 text-[15px] leading-relaxed', tone === 'dark' ? 'text-cream/80' : 'text-ink-muted')}>{text}</p>
        )}
        {children}
      </div>
    </Card>
  );
}
