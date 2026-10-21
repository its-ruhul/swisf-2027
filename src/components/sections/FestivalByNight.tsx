import { motion, useReducedMotion } from 'framer-motion';
import festivalConcert from '../../assets/images/festival-concert.webp';
import { festival } from '../../data/festival';
import { accentTextBright } from '../../lib/accents';
import { cssVars } from '../../lib/cssVars';
import { cn } from '../../lib/cn';
import ArcFrame from '../ornaments/ArcFrame';
import { Diamond } from '../ui/DividerLabel';
import IconCircle from '../ui/IconCircle';
import Reveal, { RevealItem } from '../ui/Reveal';
import Seal from '../ui/Seal';
import SectionHeading from '../ui/SectionHeading';

const LASERS = [
  { angle: -28, dur: 6.5, delay: 0, colour: 'rgba(196, 160, 255, 0.85)' },
  { angle: -10, dur: 5.2, delay: 1.1, colour: 'rgba(255, 255, 255, 0.8)' },
  { angle: 12, dur: 7.1, delay: 0.5, colour: 'rgba(150, 220, 255, 0.8)' },
  { angle: 30, dur: 5.8, delay: 2, colour: 'rgba(255, 196, 140, 0.8)' },
];

/** The jam-session concert illustration in a circle, with a saffron arc frame and sweeping lasers. */
function ConcertCircle() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto aspect-square w-[min(80vw,360px)] sm:w-[min(70vw,420px)] lg:w-[min(100%,50vh,480px)]">
      <ArcFrame className="absolute -inset-[9%] h-[118%] w-[118%] motion-safe:animate-spin-slow" color="#F29A5E" />
      {/* soft stage glow behind */}
      <span aria-hidden="true" className="absolute inset-[-12%] rounded-full bg-violet/30 blur-3xl motion-safe:animate-glow-pulse" />
      <div className="relative h-full w-full overflow-hidden rounded-full shadow-[0_30px_80px_rgba(0,0,0,0.5)] ring-1 ring-gold/50">
        <motion.img
          src={festivalConcert}
          alt={festival.imageAlt}
          width={900}
          height={900}
          decoding="async"
          initial={reduce ? false : { scale: 1.15 }}
          animate={{ scale: 1.03 }}
          transition={{ duration: 6, ease: 'easeOut' }}
          className="h-full w-full object-cover"
        />
        {/* laser-beam shimmer */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {LASERS.map((laser) => (
            <span
              key={laser.angle}
              className="laser-beam absolute bottom-[42%] h-[70%] w-[3px] rounded-full"
              style={cssVars(
                { '--dur': `${laser.dur}s`, '--delay': `${laser.delay}s` },
                {
                  left: `calc(50% + ${laser.angle * 0.6}px)`,
                  rotate: `${laser.angle}deg`,
                  background: `linear-gradient(to top, ${laser.colour}, transparent)`,
                  filter: 'blur(1px)',
                },
              )}
            />
          ))}
        </div>
      </div>
      <Seal motif="lantern" meaning="Festival" size="md" className="absolute -left-1 bottom-[8%]" />
    </div>
  );
}

/** Night half of the Experience page: the festival, its highlights and the jam-session illustration. */
export default function FestivalByNight() {
  const { heading, lead, highlights, highlightsLabel, closing } = festival;
  return (
    <div className="flex flex-1 flex-col text-cream">
      <div className="grid flex-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7 xl:col-span-6">
          <SectionHeading id="festival-heading" tone="dark" line1={heading.line1} line2={heading.line2} />
          <p className="mt-[clamp(12px,2.2vh,22px)] max-w-[34rem] text-[clamp(16px,2.1vh,19px)] font-semibold leading-snug text-cream">{lead}</p>

          <h3 className="sr-only">{highlightsLabel}</h3>
          <Reveal as="ul" stagger amount={0.1} className="mt-[clamp(14px,2.8vh,28px)] grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <RevealItem
                as="li"
                key={item.title}
                className="group flex items-start gap-3 rounded-2xl border border-gold/35 bg-white/[0.05] p-3.5 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-white/[0.09]"
              >
                <IconCircle icon={item.icon} accent={item.accent} size="xs" tone="dark" />
                <div className="min-w-0">
                  <p className={cn('text-[13px] font-semibold uppercase tracking-[0.1em]', accentTextBright[item.accent])}>{item.title}</p>
                  <p className="mt-0.5 text-[13px] leading-snug text-cream/75">{item.text}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>

        <div className="lg:col-span-5 xl:col-span-6">
          <ConcertCircle />
        </div>
      </div>

      {/* closing line */}
      <div className="mt-[clamp(16px,3vh,32px)] flex items-center gap-3 sm:gap-5">
        <span aria-hidden="true" className="h-px flex-1 bg-saffron/50" />
        <p className="text-center text-[12px] font-medium uppercase tracking-[0.24em] sm:text-[14px] sm:tracking-[0.3em]">
          <span className="text-royal-bright">{closing.day}</span>
          <Diamond className="mx-3 bg-saffron sm:mx-5" />
          <span className="text-saffron-bright">{closing.night}</span>
          <span className="mt-1 block text-[10.5px] normal-case tracking-[0.08em] text-cream/60 sm:text-[12px]">{closing.caption}</span>
        </p>
        <span aria-hidden="true" className="h-px flex-1 bg-saffron/50" />
      </div>
    </div>
  );
}
