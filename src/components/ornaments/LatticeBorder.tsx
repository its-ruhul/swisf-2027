import latticeTile from '../../assets/images/lattice-tile.webp';
import { cn } from '../../lib/cn';

type LatticeBorderProps = {
  className?: string;
};

/** Gold geometric lattice band that fades in from the section above (repeats horizontally). */
export default function LatticeBorder({ className }: LatticeBorderProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('h-20 w-full bg-repeat-x sm:h-28 lg:h-32', className)}
      style={{ backgroundImage: `url(${latticeTile})`, backgroundSize: 'auto 100%', backgroundPosition: 'center bottom' }}
    />
  );
}
