import { Link } from 'react-router-dom';
import bseLogoLight from '../../assets/logos/bse-logo-light.webp';
import bseLogo from '../../assets/logos/bse-logo.webp';
import { site } from '../../data/site';
import { cn } from '../../lib/cn';
import SwisfEmblem from './SwisfEmblem';

type LogoLockupProps = {
  /** light = on cream, dark = on navy / over the hero photo */
  tone?: 'light' | 'dark';
  showBse?: boolean;
  /** Hide the BSE half between `lg` and `xl` to keep the desktop navbar on one line */
  compactBse?: boolean;
  /** Wrap the SWISF half in a link to the home page */
  homeLink?: boolean;
  className?: string;
};

/** SWISF emblem + "SWISF 2027" | gold divider | BSE logo over "Co-powered by". */
export default function LogoLockup({ tone = 'light', showBse = true, compactBse = false, homeLink = false, className }: LogoLockupProps) {
  const dark = tone === 'dark';

  const swisf = (
    <span className="flex items-center gap-2.5 sm:gap-3">
      <SwisfEmblem eager glint className="h-8 sm:h-9" />
      <span
        className={cn(
          'whitespace-nowrap text-[14px] font-bold tracking-[0.2em] transition-colors duration-300 sm:text-[15px]',
          dark ? 'text-cream' : 'text-navy',
        )}
      >
        {site.shortName.toUpperCase()}
      </span>
    </span>
  );

  return (
    <div className={cn('flex items-center gap-3 sm:gap-4', className)}>
      {homeLink ? (
        <Link to="/" aria-label={`${site.shortName} — home`} className="flex min-h-[44px] items-center rounded-lg">
          {swisf}
        </Link>
      ) : (
        swisf
      )}
      {showBse && (
        <span className={cn('items-center gap-3 sm:gap-4', compactBse ? 'hidden xl:flex' : 'hidden xs:flex')}>
          <span aria-hidden="true" className={cn('h-9 w-px', dark ? 'bg-gold-soft/60' : 'bg-gold')} />
          <span className="flex flex-col items-center">
            <img
              src={dark ? bseLogoLight : bseLogo}
              alt="BSE — Bombay Stock Exchange"
              width={450}
              height={246}
              decoding="async"
              className="h-[22px] w-auto"
            />
            <span
              className={cn(
                'mt-1 whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.22em] [margin-right:-0.22em]',
                dark ? 'text-gold-soft' : 'text-gold-ink',
              )}
            >
              Co-powered by
            </span>
          </span>
        </span>
      )}
    </div>
  );
}
