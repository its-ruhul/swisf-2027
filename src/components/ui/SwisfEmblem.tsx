import emblemLarge from '../../assets/logos/swisf-emblem.webp';
import emblemSmall from '../../assets/logos/swisf-emblem-sm.webp';
import { cssVars } from '../../lib/cssVars';
import { cn } from '../../lib/cn';

/** Intrinsic sizes of the cropped emblem files (aspect 1.94 : 1). */
const SOURCES = {
  sm: { src: emblemSmall, width: 360, height: 186 },
  lg: { src: emblemLarge, width: 960, height: 495 },
} as const;

type SwisfEmblemProps = {
  /** sm for anything up to ~180px wide, lg above that */
  source?: 'sm' | 'lg';
  /** A soft glint of light sweeping across the gold */
  glint?: boolean;
  /** Accessible name; omit when the emblem is decorative */
  alt?: string;
  eager?: boolean;
  /** Size the emblem with a height (h-10) or width (w-64) class — the other side follows the artwork */
  className?: string;
  glintDelay?: number;
};

/**
 * The WISF sunrise emblem (rays, arcs, star, gold sun and crimson diamond),
 * cropped from the official logo without the wordmark. Always rendered at its
 * true aspect ratio.
 */
export default function SwisfEmblem({ source = 'sm', glint = false, alt = '', eager = false, className, glintDelay = 1.2 }: SwisfEmblemProps) {
  const s = SOURCES[source];
  return (
    <span className={cn('relative inline-block shrink-0', className)} style={{ aspectRatio: `${s.width} / ${s.height}` }}>
      <img
        src={s.src}
        alt={alt}
        aria-hidden={alt ? undefined : true}
        width={s.width}
        height={s.height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        className="block h-full w-full select-none"
      />
      {glint && (
        <span
          aria-hidden="true"
          className="glint pointer-events-none absolute inset-0"
          style={cssVars(
            { '--delay': `${glintDelay}s` },
            { WebkitMaskImage: `url(${s.src})`, maskImage: `url(${s.src})` },
          )}
        />
      )}
    </span>
  );
}
