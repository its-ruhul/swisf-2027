import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import festivalConcert from '../../assets/images/festival-concert.webp';
import { festival } from '../../data/festival';
import { cssVars } from '../../lib/cssVars';
import ArcFrame from '../ornaments/ArcFrame';
import { FestivalBand } from '../ornaments/Decor';
import Lantern from '../ornaments/Lantern';
import StarField from '../ornaments/StarField';
import { CardWithIcon } from '../ui/Card';
import DividerLabel, { Diamond } from '../ui/DividerLabel';
import Reveal, { RevealItem } from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

const LASERS = [
  { angle: -28, dur: 6.5, delay: 0, colour: 'rgba(196, 160, 255, 0.85)' },
  { angle: -10, dur: 5.2, delay: 1.1, colour: 'rgba(255, 255, 255, 0.8)' },
  { angle: 12, dur: 7.1, delay: 0.5, colour: 'rgba(150, 220, 255, 0.8)' },
  { angle: 30, dur: 5.8, delay: 2, colour: 'rgba(255, 196, 140, 0.8)' },
];

/** Circular concert illustration with a saffron arc frame, slow parallax and a laser shimmer. */
function ConcertCircle() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [28, -28]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.08, 1]);

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-[86%] max-w-[480px]">
      <ArcFrame className="absolute -inset-[9%] h-[118%] w-[118%]" color="#F29A5E" />
      <div className="relative h-full w-full overflow-hidden rounded-full shadow-[0_30px_80px_rgba(0,0,0,0.45)] ring-1 ring-gold/40">
        <motion.img
          src={festivalConcert}
          alt={festival.imageAlt}
          width={900}
          height={900}
          loading="lazy"
          decoding="async"
          style={{ y, scale }}
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
    </div>
  );
}

/** A blurred performer silhouette for the "line-up to be announced" cards. */
function Silhouette({ variant }: { variant: number }) {
  const instrument =
    variant === 0 ? (
      <path d="M70 150l46-34 6 8-42 40z" />
    ) : variant === 1 ? (
      <path d="M100 96v62h6V96z M96 88h14v12H96z" />
    ) : (
      <path d="M58 168h84v18H58z M64 150h72v14H64z" />
    );
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 200 220" className="absolute inset-x-0 bottom-0 h-[82%] w-full blur-[5px]">
      <defs>
        <linearGradient id={`sil-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7A4FB0" />
          <stop offset="1" stopColor="#1A1240" />
        </linearGradient>
      </defs>
      <g fill={`url(#sil-${variant})`}>
        <circle cx="100" cy="62" r="24" />
        <path d="M44 220c0-56 24-108 56-108s56 52 56 108z" />
        {instrument}
      </g>
    </svg>
  );
}

/** Brochure page 6: The Festival by Night. */
export default function FestivalByNight() {
  const { heading, lead, body, highlightsLabel, highlights, closing, lineup } = festival;
  return (
    <section id="festival" aria-labelledby="festival-heading" className="relative overflow-hidden text-cream">
      <FestivalBand position="center 18%" />

      <div
        className="relative"
        style={{ background: 'linear-gradient(180deg, rgba(26,18,64,0) 0%, rgba(42,26,94,0.75) 45%, rgba(26,18,64,0.35) 100%)' }}
      >
        <StarField className="absolute inset-0 h-full w-full" />
        <div className="absolute right-[6%] top-0 hidden gap-6 md:flex" aria-hidden="true">
          <Lantern className="w-10" stringLength={30} />
          <Lantern className="w-14" stringLength={70} delay={0.8} />
          <Lantern className="w-9" stringLength={18} delay={1.6} />
        </div>

        <div className="container-x section-y relative">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <Reveal>
                <SectionHeading id="festival-heading" tone="dark" line1={heading.line1} line2={heading.line2} />
              </Reveal>
              <Reveal delay={0.05}>
                <p className="lead-copy mt-6 text-cream">{lead}</p>
                <p className="body-copy mt-4 max-w-[52ch] text-cream/80">{body}</p>
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <ConcertCircle />
            </div>
          </div>

          <DividerLabel align="left" tone="cream" className="mt-20" as="h3">
            {highlightsLabel}
          </DividerLabel>
          <Reveal stagger className="mt-8 grid gap-5 md:grid-cols-2">
            {highlights.map((item) => (
              <RevealItem key={item.title}>
                <CardWithIcon tone="dark" icon={item.icon} accent={item.accent} title={item.title} text={item.text} className="h-full" />
              </RevealItem>
            ))}
          </Reveal>

          {/* closing line */}
          <Reveal className="mt-20">
            <div className="flex items-center gap-3 sm:gap-5">
              <span aria-hidden="true" className="h-px flex-1 bg-saffron/60" />
              <Diamond className="bg-saffron" />
              <p className="text-center text-base font-medium uppercase tracking-[0.24em] sm:text-xl sm:tracking-[0.3em]">
                <span className="text-royal-bright">{closing.day}</span>
                <Diamond className="mx-3 bg-cream sm:mx-5" />
                <span className="text-saffron-bright">{closing.night}</span>
              </p>
              <Diamond className="bg-saffron" />
              <span aria-hidden="true" className="h-px flex-1 bg-saffron/60" />
            </div>
            <p className="mt-4 text-center text-[15px] tracking-[0.08em] text-cream/75">{closing.caption}</p>
          </Reveal>

          {/* line-up placeholder */}
          <div className="mt-20">
            <div className="text-center">
              <p className="eyebrow text-gold-soft">Line-up</p>
              <h3 className="mt-3 text-2xl font-semibold text-cream sm:text-3xl">{lineup.title}</h3>
              <p className="mt-3 text-cream/75">{lineup.text}</p>
            </div>
            <ul className="mt-10 grid gap-5 sm:grid-cols-3">
              {Array.from({ length: lineup.slots }, (_, i) => (
                <li key={i} className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-gold/30 bg-white/[0.04]">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{ background: 'radial-gradient(circle at 50% 30%, rgba(242,154,94,0.28), transparent 60%)' }}
                  />
                  <Silhouette variant={i} />
                  <span className="eyebrow absolute inset-x-0 bottom-5 text-center text-gold-soft">To be announced</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <FestivalBand position="center 82%" />
    </section>
  );
}
