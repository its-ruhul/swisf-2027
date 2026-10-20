import { useRef, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { experience } from '../../data/summit';
import { cn } from '../../lib/cn';

export type DayNight = 'day' | 'night';

type DayNightToggleProps = {
  mode: DayNight;
  onChange: (mode: DayNight) => void;
  /** id of the panel the tabs control */
  panelId: string;
};

const OPTIONS = [
  { value: 'day', label: experience.toggle.day, glyph: '昼', Icon: Sun },
  { value: 'night', label: experience.toggle.night, glyph: '夜', Icon: Moon },
] as const;

/**
 * Day / Night switch built as a two-tab tablist: a gold sun thumb slides to a
 * violet moon thumb. Arrow keys move between the two, as with any tabs.
 */
export default function DayNightToggle({ mode, onChange, panelId }: DayNightToggleProps) {
  const refs = useRef<Record<DayNight, HTMLButtonElement | null>>({ day: null, night: null });
  const night = mode === 'night';

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const next: DayNight = e.key === 'Home' ? 'day' : e.key === 'End' ? 'night' : night ? 'day' : 'night';
    onChange(next);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={experience.toggleLabel}
      onKeyDown={onKeyDown}
      className={cn(
        'relative inline-flex rounded-full border p-1 shadow-card backdrop-blur-md transition-colors duration-700',
        night ? 'border-gold/40 bg-white/[0.07]' : 'border-line bg-white/80',
      )}
    >
      {OPTIONS.map(({ value, label, glyph, Icon }) => {
        const selected = mode === value;
        return (
          <button
            key={value}
            ref={(el) => {
              refs.current[value] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${value}`}
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(value)}
            className={cn(
              'relative inline-flex min-h-[48px] items-center gap-2.5 rounded-full px-5 text-[12.5px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 sm:px-7 sm:text-[13px]',
              selected ? (value === 'day' ? 'text-navy-deep' : 'text-cream') : night ? 'text-cream/70 hover:text-cream' : 'text-navy/70 hover:text-navy',
            )}
          >
            {selected && (
              <motion.span
                layoutId="daynight-thumb"
                aria-hidden="true"
                className={cn(
                  'absolute inset-0 rounded-full',
                  value === 'day'
                    ? 'bg-gradient-to-r from-[#F6C76B] via-[#F29A5E] to-[#F6C76B] shadow-[0_8px_24px_-8px_rgba(224,123,57,0.8)]'
                    : 'bg-gradient-to-r from-night-2 via-violet to-night-2 shadow-[0_8px_24px_-8px_rgba(122,79,176,0.9)] ring-1 ring-gold/40',
                )}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <Icon size={18} strokeWidth={1.8} aria-hidden="true" className="relative" />
            <span className="relative">{label}</span>
            <span aria-hidden="true" className="font-glyph relative text-[15px] normal-case tracking-normal opacity-80">
              {glyph}
            </span>
          </button>
        );
      })}
    </div>
  );
}
