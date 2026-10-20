/**
 * Raster ornaments cut from the brochure artwork (crimson knots, clouds,
 * borders, blossoms). All decorative: empty alt text and aria-hidden.
 */
import chineseKnot from '../../assets/images/chinese-knot.webp';
import crimsonCloud from '../../assets/images/crimson-cloud.webp';
import festivalPattern from '../../assets/images/festival-pattern.webp';
import knotCorner from '../../assets/images/knot-corner.webp';
import lanternFrame from '../../assets/images/lantern-frame.webp';
import medallionStrip from '../../assets/images/medallion-strip.webp';
import patternBorder from '../../assets/images/pattern-border.webp';
import peachCloudA from '../../assets/images/peach-cloud-a.webp';
import peachCloudB from '../../assets/images/peach-cloud-b.webp';
import plumBlossom from '../../assets/images/plum-blossom.webp';
import swirlBorder from '../../assets/images/swirl-border.webp';
import { cn } from '../../lib/cn';

type DecorImageProps = {
  src: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
};

function DecorImage({ src, width, height, className, imgClassName, eager }: DecorImageProps) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none select-none', className)}>
      <img
        src={src}
        alt=""
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        className={cn('block h-auto w-full', imgClassName)}
      />
    </div>
  );
}

type OrnamentProps = { className?: string; eager?: boolean };

/** Crimson Tibetan-knot corner ornament (top-left of a section). */
export function KnotCorner({ className, eager }: OrnamentProps) {
  return <DecorImage src={knotCorner} width={380} height={395} className={className} eager={eager} />;
}

/** Crimson auspicious cloud with scale pattern. */
export function CrimsonCloud({ className, eager }: OrnamentProps) {
  return (
    <DecorImage
      src={crimsonCloud}
      width={760}
      height={287}
      className={className}
      imgClassName="motion-safe:animate-drift-slow"
      eager={eager}
    />
  );
}

/** Hanging red Chinese knot (sways gently). */
export function ChineseKnot({ className, eager }: OrnamentProps) {
  return (
    <DecorImage
      src={chineseKnot}
      width={260}
      height={545}
      className={className}
      imgClassName="origin-top-center motion-safe:animate-sway"
      eager={eager}
    />
  );
}

/** Tall red frame with a lantern (left edge of the Summit page). */
export function LanternFrame({ className, eager }: OrnamentProps) {
  return <DecorImage src={lanternFrame} width={160} height={758} className={className} eager={eager} />;
}

/** Red plum-blossom branch (flip for the right-hand corner). */
export function PlumBlossom({ className, flip = false }: OrnamentProps & { flip?: boolean }) {
  return (
    <DecorImage src={plumBlossom} width={640} height={393} className={className} imgClassName={flip ? '-scale-x-100' : undefined} />
  );
}

/** Soft watercolour peach cloud used at section edges. */
export function PeachCloud({ className, variant = 'a' }: OrnamentProps & { variant?: 'a' | 'b' }) {
  return variant === 'a' ? (
    <DecorImage src={peachCloudA} width={560} height={530} className={className} />
  ) : (
    <DecorImage src={peachCloudB} width={600} height={568} className={className} />
  );
}

type BandProps = { className?: string };

function RepeatBand({ src, className }: { src: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('w-full bg-repeat-x', className)}
      style={{ backgroundImage: `url(${src})`, backgroundSize: 'auto 100%', backgroundPosition: 'left center' }}
    />
  );
}

/** Red medallion pattern strip (top of the Summit section). */
export function MedallionStrip({ className }: BandProps) {
  return <RepeatBand src={medallionStrip} className={cn('h-8 sm:h-10', className)} />;
}

/** Red-and-cream swirl cloud border (top of the Next Generation section). */
export function SwirlBorder({ className }: BandProps) {
  return <RepeatBand src={swirlBorder} className={cn('h-12 sm:h-16 lg:h-20', className)} />;
}

/** Small orange floral pattern border (bottom of the Partners section). */
export function PatternBorder({ className }: BandProps) {
  return <RepeatBand src={patternBorder} className={cn('h-5 sm:h-6', className)} />;
}

/** Deep red band with gold peonies, dragons, coins and clouds (festival borders). */
export function FestivalBand({ className, position = 'center 30%' }: BandProps & { position?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('relative h-20 w-full bg-festival sm:h-24 lg:h-28', className)}
      style={{
        backgroundImage: `url(${festivalPattern})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: position,
      }}
    >
      <span className="absolute inset-x-0 bottom-0 h-px bg-gold/70" />
      <span className="absolute inset-x-0 top-0 h-px bg-gold/70" />
    </div>
  );
}
