import cloudA from '../../assets/images/gold-cloud-a.webp';
import cloudB from '../../assets/images/gold-cloud-b.webp';
import { cn } from '../../lib/cn';

const SOURCES = {
  a: { src: cloudA, width: 900, height: 579 },
  b: { src: cloudB, width: 800, height: 428 },
} as const;

type GoldCloudProps = {
  /** Two cloud shapes from the brochure */
  variant?: 'a' | 'b';
  /** Mirror horizontally */
  flip?: boolean;
  /** Slow ±8px drift (12s loop). Disabled automatically for reduced motion. */
  drift?: boolean;
  /** Load immediately (use for clouds in the first viewport) */
  eager?: boolean;
  /** Positioning / sizing classes, e.g. "right-0 top-8 w-64 opacity-80" */
  className?: string;
};

/** Gold Chinese/Tibetan-style auspicious cloud outline (decorative). */
export default function GoldCloud({ variant = 'a', flip = false, drift = true, eager = false, className }: GoldCloudProps) {
  const cloud = SOURCES[variant];
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute select-none', className)}>
      <div className={cn(flip && '-scale-x-100')}>
        <img
          src={cloud.src}
          alt=""
          width={cloud.width}
          height={cloud.height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          className={cn('block h-auto w-full', drift && 'motion-safe:animate-drift')}
        />
      </div>
    </div>
  );
}
