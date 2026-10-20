import { Fragment } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCountdown } from '../../hooks/useCountdown';
import { cn } from '../../lib/cn';

type CountdownProps = {
  /** ISO date-time, e.g. 2027-04-25T09:00:00+05:30 */
  target: string;
  targetLabel: string;
  /** Mention that the dates are provisional */
  tba?: boolean;
  className?: string;
};

/** A number that rolls up when it changes. */
function RollingNumber({ value, pad }: { value: number; pad: number }) {
  const reduce = useReducedMotion();
  const text = String(value).padStart(pad, '0');
  return (
    <span className="relative inline-flex overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          className="inline-block"
          initial={reduce ? false : { y: '70%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={reduce ? undefined : { y: '-70%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.3, 0.7, 0.2, 1] }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/**
 * Hero countdown: DAYS / HOURS / MINUTES / SECONDS in a frosted navy panel
 * with a gold hairline and lantern-window corners.
 */
export default function Countdown({ target, targetLabel, tba = false, className }: CountdownProps) {
  const { days, hours, minutes, seconds, done } = useCountdown(target);
  if (done) return null;

  const units = [
    { label: 'Days', value: days, pad: 2 },
    { label: 'Hours', value: hours, pad: 2 },
    { label: 'Minutes', value: minutes, pad: 2 },
    { label: 'Seconds', value: seconds, pad: 2 },
  ];

  return (
    <div className={cn('relative', className)}>
      <div
        role="timer"
        aria-label={`${days} days, ${hours} hours and ${minutes} minutes to ${targetLabel}`}
        className="relative flex items-center rounded-2xl border border-gold-soft/35 bg-navy-deep/55 px-3 pb-3 pt-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md xs:px-4 sm:px-7 sm:pb-[clamp(10px,1.6vh,16px)] sm:pt-[clamp(14px,2vh,20px)]"
      >
        {/* caption sitting on the top border, like a legend */}
        <p className="absolute -top-2 left-5 whitespace-nowrap rounded-full bg-navy-deep px-2.5 text-[9.5px] uppercase leading-4 tracking-[0.2em] text-cream/70 sm:left-7 sm:text-[10px]">
          {tba ? 'Provisional · to ' : 'Counting down to '}
          <span className="text-gold-soft">{targetLabel}</span>
        </p>
        {/* corner brackets, like a lattice window frame */}
        {['left-1.5 top-1.5 border-l border-t', 'right-1.5 top-1.5 border-r border-t', 'left-1.5 bottom-1.5 border-b border-l', 'right-1.5 bottom-1.5 border-b border-r'].map((c) => (
          <span key={c} aria-hidden="true" className={cn('absolute h-3 w-3 border-gold', c)} />
        ))}
        {units.map((unit, i) => (
          <Fragment key={unit.label}>
            {i > 0 && (
              <span aria-hidden="true" className="mx-1 -mt-5 text-xl font-light text-gold/70 xs:mx-1.5 sm:mx-3 sm:text-3xl">
                /
              </span>
            )}
            <span aria-hidden="true" className="flex min-w-[52px] flex-col items-center xs:min-w-[60px] sm:min-w-[84px]">
              <span className="text-[1.75rem] font-bold leading-none tabular-nums text-cream xs:text-[2rem] sm:text-[clamp(2.1rem,4.8vh,3.1rem)]">
                <RollingNumber value={unit.value} pad={unit.pad} />
              </span>
              <span className="mt-2 text-[9px] font-medium uppercase tracking-[0.26em] text-gold-soft [margin-right:-0.26em] sm:text-[11px]">
                {unit.label}
              </span>
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
