import { Link } from 'react-router-dom';
import bseLogo from '../../assets/logos/bse-logo.webp';
import ecellCrest from '../../assets/logos/ecell-crest.webp';
import { cn } from '../../lib/cn';

type LockupSize = 'nav' | 'hero' | 'drawer';

const sizes: Record<LockupSize, { crest: string; title: string; sub: string; divider: string; bse: string; gap: string }> = {
  nav: {
    crest: 'h-10 w-auto',
    title: 'text-[15px]',
    sub: 'text-[10.5px]',
    divider: 'h-9',
    bse: 'h-7 w-auto',
    gap: 'gap-3',
  },
  hero: {
    crest: 'h-12 w-auto xs:h-14 sm:h-16',
    title: 'text-lg sm:text-xl',
    sub: 'text-[10px] tracking-[0.16em] xs:text-[11px] xs:tracking-[0.22em] sm:text-xs',
    divider: 'h-12 sm:h-14',
    bse: 'h-8 w-auto xs:h-9 sm:h-11',
    gap: 'gap-3 sm:gap-4',
  },
  drawer: {
    crest: 'h-11 w-auto',
    title: 'text-base',
    sub: 'text-[10.5px]',
    divider: 'h-9',
    bse: 'h-7 w-auto',
    gap: 'gap-3',
  },
};

type LogoLockupProps = {
  size?: LockupSize;
  /** light = on cream, dark = on navy */
  tone?: 'light' | 'dark';
  showBse?: boolean;
  /** Hide the BSE half between `lg` and `xl` to keep the desktop navbar on one line */
  compactBse?: boolean;
  /** Wrap the E-Cell half in a link to the home page */
  homeLink?: boolean;
  className?: string;
};

/** E-Cell crest + "E-CELL / NIT MEGHALAYA" | gold divider | BSE logo. */
export default function LogoLockup({
  size = 'nav',
  tone = 'light',
  showBse = true,
  compactBse = false,
  homeLink = false,
  className,
}: LogoLockupProps) {
  const s = sizes[size];

  const ecell = (
    <span className={cn('flex items-center', s.gap)}>
      <img src={ecellCrest} alt="E-Cell NIT Meghalaya crest" width={320} height={255} decoding="async" className={s.crest} />
      <span className="flex flex-col leading-none">
        <span className={cn('font-bold tracking-[0.06em]', s.title, tone === 'dark' ? 'text-cream' : 'text-navy')}>E-CELL</span>
        <span
          className={cn(
            'mt-1 whitespace-nowrap font-medium uppercase',
            size === 'hero' ? '' : 'tracking-[0.22em]',
            s.sub,
            tone === 'dark' ? 'text-saffron-bright' : 'text-saffron-ink',
          )}
        >
          NIT Meghalaya
        </span>
      </span>
    </span>
  );

  const bseVisibility = compactBse ? 'hidden xl:flex' : 'flex';

  return (
    <div className={cn('flex items-center', s.gap, className)}>
      {homeLink ? (
        <Link to="/" aria-label="SWISF 2027 — home" className="flex min-h-[44px] items-center rounded-lg">
          {ecell}
        </Link>
      ) : (
        ecell
      )}
      {showBse && (
        <span className={cn('items-center', s.gap, bseVisibility)}>
          <span aria-hidden="true" className={cn('w-px bg-gold', s.divider)} />
          <span className={cn('inline-flex items-center', tone === 'dark' && 'rounded-lg bg-cream px-2 py-1')}>
            <img src={bseLogo} alt="BSE — Bombay Stock Exchange" width={450} height={246} decoding="async" className={s.bse} />
          </span>
        </span>
      )}
    </div>
  );
}
