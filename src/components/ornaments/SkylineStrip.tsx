import skylineBlue from '../../assets/images/skyline-blue.webp';
import skylineGold from '../../assets/images/skyline-gold.webp';
import { cn } from '../../lib/cn';

type SkylineStripProps = {
  /** blue-grey line art (light pages) or gold (navy footer) */
  tone?: 'blue' | 'gold';
  /** Faint mirrored reflection below the skyline */
  reflection?: boolean;
  className?: string;
  imgClassName?: string;
};

/**
 * Line-art skyline of Shillong landmarks — church spire, Elephant Falls,
 * sunrise dome, high-rises, stadium arch and pine trees.
 */
export default function SkylineStrip({ tone = 'blue', reflection = true, className, imgClassName }: SkylineStripProps) {
  const src = tone === 'gold' ? skylineGold : skylineBlue;
  return (
    <div aria-hidden="true" className={cn('pointer-events-none select-none', className)}>
      <img
        src={src}
        alt=""
        width={1337}
        height={237}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={cn('block h-auto w-full', imgClassName)}
      />
      {reflection && (
        <img
          src={src}
          alt=""
          width={1337}
          height={237}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={cn(
            'block h-auto w-full -scale-y-100 opacity-[0.18] [mask-image:linear-gradient(to_top,rgba(0,0,0,0.9),transparent_75%)] [-webkit-mask-image:linear-gradient(to_top,rgba(0,0,0,0.9),transparent_75%)]',
            imgClassName,
          )}
        />
      )}
    </div>
  );
}
