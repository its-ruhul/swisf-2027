import { useCountdown } from '../../hooks/useCountdown';
import { cn } from '../../lib/cn';

type CountdownProps = {
  /** ISO date-time, e.g. 2027-04-25T09:00:00+05:30 */
  target: string;
  targetLabel: string;
  /** Show the “Dates to be announced” note */
  tba?: boolean;
  className?: string;
};

/** Days / hours / minutes in small outlined boxes. */
export default function Countdown({ target, targetLabel, tba = false, className }: CountdownProps) {
  const { days, hours, minutes, done } = useCountdown(target);
  if (done) return null;

  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
  ];

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-ink-muted">
        {tba ? 'Dates to be announced · counting down to ' : 'Counting down to '}
        <span className="whitespace-nowrap">{targetLabel}</span>
      </p>
      <div
        role="timer"
        aria-label={`${days} days, ${hours} hours and ${minutes} minutes to go`}
        className="flex items-stretch gap-2 sm:gap-3"
      >
        {units.map((unit) => (
          <div
            key={unit.label}
            aria-hidden="true"
            className="flex min-w-[68px] flex-col items-center rounded-xl border border-line bg-white/80 px-3 py-2 shadow-card sm:min-w-[76px]"
          >
            <span className="text-xl font-semibold tabular-nums text-navy sm:text-2xl">{String(unit.value).padStart(2, '0')}</span>
            <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-ink-muted">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
