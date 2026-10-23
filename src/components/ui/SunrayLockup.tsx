import logoDark from '../../assets/logos/swisf-emblem.webp';
import logoLight from '../../assets/logos/swisf-emblem.webp';
import { site } from '../../data/site';
import { cssVars } from '../../lib/cssVars';
import { cn } from '../../lib/cn';

type SunrayLockupProps = {
  /** light = navy wordmark for cream backgrounds, dark = cream wordmark for navy backgrounds */
  tone?: 'light' | 'dark';
  /** A glint of light sweeping across the logo */
  glint?: boolean;
  /** Width class, e.g. "w-48" — the height follows the artwork's 800 × 718 proportions */
  className?: string;
};

/** The full official logo: sunrise emblem, SUNRAY, World Innovation Summit & Festival, SWISF · 2027. */
export default function SunrayLockup({ tone = 'light', glint = false, className }: SunrayLockupProps) {
  const src = tone === 'dark' ? logoDark : logoLight;
  return (
    <span className={cn('relative inline-block', className ?? 'w-48 sm:w-56')} style={{ aspectRatio: '800 / 718' }}>
      <img
        src={src}
        alt={`${site.name} logo`}
        width={800}
        height={718}
        loading="lazy"
        decoding="async"
        className="block h-full w-full"
      />
      {glint && (
        <span
          aria-hidden="true"
          className="glint pointer-events-none absolute inset-0"
          style={cssVars({ '--dur': '9s' }, { WebkitMaskImage: `url(${src})`, maskImage: `url(${src})` })}
        />
      )}
    </span>
  );
}
