import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mascotEyebrow, type Mascot } from '../../data/mascots';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { accentText, accentTextBright } from '../../lib/accents';
import { cn } from '../../lib/cn';
import type { MotifName } from '../ornaments/Motif';
import { Diamond } from '../ui/DividerLabel';
import IconCircle from '../ui/IconCircle';
import Reveal, { RevealItem } from '../ui/Reveal';
import Seal from '../ui/Seal';
import SectionHeading from '../ui/SectionHeading';

function Highlighted({ text, words, className }: { text: string; words: string[]; className: string }) {
  const parts = text.split(new RegExp(`(${words.join('|')})`));
  return (
    <>
      {parts.map((part, i) =>
        words.includes(part) ? (
          <strong key={i} className={className}>
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

type MascotCopyProps = {
  mascot: Mascot;
  tone: 'light' | 'dark';
  motif: MotifName;
  className?: string;
};

/** A mascot's text column: name, tagline, story, what they stand for and where to see them. */
export default function MascotCopy({ mascot, tone, motif, className }: MascotCopyProps) {
  const dark = tone === 'dark';
  return (
    <div className={className}>
      <Reveal from="left">
        <p className={cn('eyebrow flex items-center gap-3 text-[11px]', dark ? 'text-gold-soft' : 'text-saffron-ink')}>
          <Diamond className="bg-saffron" />
          {mascotEyebrow}
        </p>
      </Reveal>

      <div className="mt-[clamp(8px,1.4vh,14px)] flex items-center gap-5">
        <SectionHeading id={`${mascot.id}-heading`} reveal tone={tone} line1="Meet" line2={mascot.name} />
        <Seal motif={motif} meaning={mascot.name} size="md" />
      </div>

      <Reveal from="left" delay={0.2}>
        <p className={cn('mt-[clamp(8px,1.4vh,14px)] text-[clamp(17px,2.5vh,23px)] font-medium uppercase leading-snug tracking-[0.08em]', dark ? 'text-sun [animation:none]' : 'text-saffron-ink')}>
          {mascot.tagline}
        </p>
      </Reveal>

      <Reveal delay={0.3} className="mt-[clamp(12px,2.2vh,22px)] max-w-[33rem]">
        <p className={cn('text-[clamp(16px,2.15vh,19px)] font-semibold leading-snug', dark ? 'text-cream' : 'text-navy')}>{mascot.lead}</p>
        <p className={cn('panel-copy mt-2', dark && '!text-cream/80')}>
          <Highlighted text={mascot.body} words={mascot.highlights} className={dark ? 'font-semibold text-gold-soft' : 'font-semibold text-navy'} />
        </p>
      </Reveal>

      <h3 className={cn('eyebrow mt-[clamp(14px,2.6vh,28px)] text-[11px]', dark ? 'text-gold-soft' : 'text-navy')}>{mascot.standsForLabel}</h3>
      <Reveal stagger delay={0.1}>
        <ul className="mt-[clamp(8px,1.3vh,14px)] grid max-w-[32rem] grid-cols-3 gap-2.5 sm:gap-3">
          {mascot.standsFor.map((item) => (
            <RevealItem as="li" key={item.label}>
              <div
                className={cn(
                  'group flex h-full flex-col items-center gap-2 rounded-2xl border px-2 py-[clamp(8px,1.4vh,14px)] text-center transition duration-300 hover:-translate-y-1 sm:px-3',
                  dark ? 'border-gold/35 bg-white/[0.06] hover:border-gold hover:bg-white/[0.1]' : 'border-line bg-white/85 shadow-card hover:border-gold hover:shadow-lift',
                )}
              >
                <IconCircle icon={item.icon} accent={item.accent} size="xs" tone={tone} fill={dark ? 'transparent' : 'white'} />
                <span className={cn('text-[12px] font-semibold uppercase leading-tight tracking-[0.06em] sm:text-[12.5px]', dark ? accentTextBright[item.accent] : accentText[item.accent])}>
                  {item.label}
                </span>
              </div>
            </RevealItem>
          ))}
        </ul>

        <RevealItem className="mt-[clamp(10px,2vh,22px)]">
          <Link
            to={mascot.link.to}
            className={cn(
              'group inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 text-[12px] font-semibold uppercase tracking-[0.16em] ring-1 transition duration-300',
              dark ? 'bg-white/[0.06] text-saffron-bright ring-gold/40 hover:bg-white/[0.12] hover:ring-gold' : 'bg-white/90 text-saffron-ink ring-line hover:ring-gold',
            )}
          >
            {mascot.link.label}
            <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </RevealItem>
      </Reveal>
    </div>
  );
}

type CalloutProps = {
  callout: Mascot['callouts'][number];
  tone: 'light' | 'dark';
  delay: number;
};

/** A pulsing marker on the artwork with a line drawing out to a small label (wide screens only). */
export function MascotCallout({ callout, tone, delay }: CalloutProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const shown = useScrollReveal(ref, 0.2);
  const dark = tone === 'dark';
  const right = callout.side === 'right';
  const visible = shown || Boolean(reduce);
  return (
    <div ref={ref} aria-hidden="true" className="absolute hidden xl:block" style={{ left: `${callout.x}%`, top: `${callout.y}%` }}>
      <span className={cn('absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full ring-2', dark ? 'bg-saffron-bright ring-cream/80' : 'bg-saffron ring-white')} />
      <span className={cn('absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full motion-safe:animate-pulse-ring', dark ? 'bg-saffron-bright' : 'bg-saffron')} />
      <motion.span
        className={cn('absolute top-0 h-px w-10', right ? 'left-1.5 origin-left' : 'right-1.5 origin-right', dark ? 'bg-gold-soft' : 'bg-gold-ink')}
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: visible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: visible ? delay : 0 }}
      />
      <span className={cn('absolute top-0 block w-max -translate-y-1/2', right ? 'left-[46px] max-w-[9.5rem]' : 'right-[46px] max-w-[8.5rem]')}>
        <motion.span
          className={cn('block rounded-xl border border-gold/50 px-3 py-1.5 text-left', dark ? 'bg-navy-deep/85' : 'bg-white/95 shadow-card')}
          initial={reduce ? false : { opacity: 0, x: right ? -10 : 10 }}
          animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: right ? -10 : 10 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: visible ? delay + 0.3 : 0 }}
        >
          <span className={cn('block text-[10.5px] font-semibold uppercase tracking-[0.16em]', dark ? 'text-saffron-bright' : 'text-saffron-ink')}>{callout.title}</span>
          <span className={cn('block text-[12px] leading-snug', dark ? 'text-cream/85' : 'text-navy')}>{callout.text}</span>
        </motion.span>
      </span>
    </div>
  );
}
