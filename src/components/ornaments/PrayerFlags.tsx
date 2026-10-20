import { cssVars } from '../../lib/cssVars';
import { cn } from '../../lib/cn';

/** Traditional order: sky, air, fire, water, earth. */
const COLOURS = ['#3B5BB5', '#FAF6EE', '#B5122B', '#1F7A6A', '#E9B954'];

type PrayerFlagsProps = {
  /** Number of flags along the string */
  count?: number;
  /** How far the string sags in the middle, in px */
  sag?: number;
  className?: string;
};

/**
 * A string of Tibetan prayer flags (lung ta) fluttering in the wind — seen
 * across Sikkim and Arunachal Pradesh. Each flag carries a tiny wind-horse
 * roundel and moves on its own rhythm.
 */
export default function PrayerFlags({ count = 22, sag = 34, className }: PrayerFlagsProps) {
  const flags = Array.from({ length: count }, (_, i) => {
    const t = (i + 0.5) / count;
    return {
      i,
      left: t * 100,
      top: 2 + sag * 4 * t * (1 - t),
      colour: COLOURS[i % COLOURS.length],
      dur: 2.4 + ((i * 7) % 5) * 0.35,
      delay: -((i * 3) % 7) * 0.4,
    };
  });

  return (
    <div aria-hidden="true" className={cn('pointer-events-none relative select-none', className)} style={{ height: sag + 46 }}>
      <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 1000 ${sag + 46}`} preserveAspectRatio="none" fill="none">
        <path d={`M0 2Q500 ${2 + sag * 2} 1000 2`} stroke="#8A652C" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      </svg>
      {flags.map((f) => (
        <span
          key={f.i}
          className={cn('flag absolute block -translate-x-1/2', f.i % 2 === 1 && 'hidden sm:block')}
          style={cssVars({ '--dur': `${f.dur}s`, '--delay': `${f.delay}s` }, { left: `${f.left}%`, top: f.top })}
        >
          <span
            className="flex h-[30px] w-[24px] items-center justify-center rounded-b-[2px] shadow-[0_2px_4px_rgba(14,26,61,0.18)] sm:h-[36px] sm:w-[28px]"
            style={{ backgroundColor: f.colour, opacity: 0.92 }}
          >
            <span
              className="h-2.5 w-2.5 rounded-full border"
              style={{ borderColor: f.colour === '#FAF6EE' ? '#C9A24A' : 'rgba(250,246,238,0.7)' }}
            />
          </span>
        </span>
      ))}
    </div>
  );
}
