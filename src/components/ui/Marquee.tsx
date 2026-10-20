import { Fragment } from 'react';
import { cssVars } from '../../lib/cssVars';
import { cn } from '../../lib/cn';
import { Diamond } from './DividerLabel';

type MarqueeProps = {
  items: readonly string[];
  /** Seconds for one full loop */
  duration?: number;
  /** Move right instead of left */
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
  diamondClassName?: string;
  label?: string;
};

/**
 * Endless ticker. The list is rendered twice and the track slides by half its
 * width, so the loop is seamless; the copy is hidden from screen readers.
 */
export default function Marquee({
  items,
  duration = 40,
  reverse = false,
  className,
  itemClassName,
  diamondClassName = 'bg-saffron',
  label,
}: MarqueeProps) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} aria-label={hidden ? undefined : label} className="flex shrink-0 items-center">
      {items.map((item) => (
        <Fragment key={item}>
          <li className={cn('whitespace-nowrap px-5 sm:px-7', itemClassName)}>{item}</li>
          <li aria-hidden="true" className="flex items-center">
            <Diamond className={diamondClassName} />
          </li>
        </Fragment>
      ))}
    </ul>
  );

  return (
    <div className={cn('relative flex overflow-hidden', className)}>
      <div
        className="marquee-track flex w-max motion-safe:animate-marquee"
        style={cssVars({ '--marquee-dur': `${duration}s` }, reverse ? { animationDirection: 'reverse' } : undefined)}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
