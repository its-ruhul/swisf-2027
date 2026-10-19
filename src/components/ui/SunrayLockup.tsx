import { site } from '../../data/site';
import { cn } from '../../lib/cn';
import SunriseRays from '../ornaments/SunriseRays';

type SunrayLockupProps = {
  tone?: 'light' | 'dark';
  size?: 'sm' | 'md';
  className?: string;
  animated?: boolean;
};

/** Sunrise emblem + SUNRAY wordmark + "World Innovation Summit & Festival" + "SWISF · 2027". */
export default function SunrayLockup({ tone = 'light', size = 'md', className, animated = false }: SunrayLockupProps) {
  const dark = tone === 'dark';
  return (
    <div className={cn('flex flex-col items-center text-center', className)}>
      <SunriseRays animated={animated} className={size === 'sm' ? 'w-32' : 'w-44 sm:w-52'} />
      <p
        className={cn(
          'mt-1 font-display font-medium leading-none tracking-[0.08em]',
          size === 'sm' ? 'text-3xl' : 'text-4xl sm:text-[2.75rem]',
          dark ? 'text-cream' : 'text-navy',
        )}
      >
        {site.wordmark}
      </p>
      <p
        className={cn(
          'mt-3 max-w-[18rem] text-[11px] font-medium uppercase leading-relaxed tracking-[0.3em] [margin-right:-0.3em]',
          dark ? 'text-gold-soft' : 'text-gold-ink',
        )}
      >
        World Innovation Summit &amp; Festival
      </p>
      <p
        className={cn(
          'mt-2 text-[12px] font-medium uppercase tracking-[0.35em] [margin-right:-0.35em]',
          dark ? 'text-crimson-light' : 'text-crimson',
        )}
      >
        {site.subWordmark}
      </p>
    </div>
  );
}
