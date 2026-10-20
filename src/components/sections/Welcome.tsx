import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import dragonWaves from '../../assets/images/dragon-waves.webp';
import { welcome } from '../../data/home';
import { accentText } from '../../lib/accents';
import { cn } from '../../lib/cn';
import { PeachCloud } from '../ornaments/Decor';
import GoldCloud from '../ornaments/GoldCloud';
import { FallingPetals } from '../ornaments/Particles';
import Seigaiha from '../ornaments/Seigaiha';
import { Diamond } from '../ui/DividerLabel';
import IconCircle from '../ui/IconCircle';
import Reveal, { RevealItem } from '../ui/Reveal';
import Seal from '../ui/Seal';
import SectionHeading from '../ui/SectionHeading';

/** Circular "moon gate" window onto the painted dragon, with turning rings. */
function MoonGate() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '6%']);

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-[min(78vw,340px)] sm:w-[min(60vw,400px)] lg:w-[min(100%,48vh,460px)]">
      {/* outer rings */}
      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute -inset-[9%] h-[118%] w-[118%] overflow-visible">
        <circle cx="50" cy="50" r="49" fill="none" stroke="#C9A24A" strokeWidth="0.35" strokeDasharray="1 2.2" className="ring-spin" />
        <circle cx="50" cy="50" r="45.5" fill="none" stroke="#E07B39" strokeWidth="0.3" />
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return <circle key={i} cx={50 + Math.cos(a) * 45.5} cy={50 + Math.sin(a) * 45.5} r="0.9" fill="#C9A24A" />;
        })}
      </svg>
      <div className="relative h-full w-full overflow-hidden rounded-full border-[3px] border-cream shadow-[0_24px_60px_-18px_rgba(14,26,61,0.45)] ring-1 ring-gold">
        <motion.img
          src={dragonWaves}
          alt="Painted dragon coiling through sunlit clouds and ocean waves"
          width={1600}
          height={619}
          loading="lazy"
          decoding="async"
          style={{ y: imgY, scale: 1.18 }}
          className="h-full w-full object-cover object-[60%_35%]"
        />
        <div aria-hidden="true" className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(10,18,48,0.35)]" />
      </div>
      <GoldCloud variant="b" className="-bottom-[6%] -left-[22%] w-[62%]" />
      <Seal glyphs="歓迎" meaning="Welcome" size="md" className="absolute -right-[2%] top-[4%]" />
    </div>
  );
}

/** Welcome letter, the dragon moon-gate and the three pillars — one screen tall on desktop. */
export default function Welcome() {
  return (
    <section id="welcome" aria-labelledby="welcome-heading" className="panel relative flex min-h-panel items-center overflow-hidden bg-cream-2">
      <Seigaiha background="#F4EDE0" className="opacity-[0.35]" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-cream-2 via-cream-2/90 to-cream-2/40" />
      <PeachCloud className="absolute -left-24 bottom-0 w-72 opacity-60 sm:w-96" />
      <GoldCloud variant="a" className="-right-24 -top-10 w-72 opacity-70 sm:w-96" />
      <FallingPetals count={10} seed={5} />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-saffron" />

      <div className="container-x relative w-full py-14 lg:py-[clamp(20px,3.4vh,64px)]">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading id="welcome-heading" line1={welcome.heading.line1} line2={welcome.heading.line2} />
            </Reveal>
            <Reveal className="mt-[clamp(16px,3vh,32px)] max-w-[62ch]" delay={0.05}>
              <p className="text-[clamp(16px,2.1vh,18px)] font-medium text-navy">{welcome.salutation}</p>
              <div className="panel-copy mt-3 space-y-[clamp(8px,1.4vh,14px)]">
                {welcome.paragraphs.map((p, i) => (
                  <p key={p} className={cn(i === welcome.paragraphs.length - 1 && 'font-medium text-saffron-ink')}>
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-[clamp(14px,2.6vh,28px)] flex items-center gap-4">
                <span aria-hidden="true" className="h-10 w-px bg-gold" />
                <div>
                  <p className="text-[14px] text-ink-muted">{welcome.signOff.regards}</p>
                  <p className="font-bold text-navy">{welcome.signOff.name}</p>
                  <p className="eyebrow text-[11px] text-saffron-ink">{welcome.signOff.org}</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <MoonGate />
          </div>
        </div>

        {/* Three pillars */}
        <div className="mt-12 lg:mt-[clamp(20px,4vh,48px)]">
          <h3 className="sr-only">{welcome.pillarsTitle}</h3>
          <Reveal as="ul" stagger className="grid gap-4 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-line sm:rounded-2xl sm:border sm:border-line sm:bg-white/80 sm:shadow-card sm:backdrop-blur">
            {welcome.pillars.map((pillar, i) => (
              <RevealItem
                as="li"
                key={pillar.title}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-white/80 px-5 py-4 sm:rounded-none sm:border-0 sm:bg-transparent lg:px-7 lg:py-[clamp(12px,2.2vh,22px)]"
              >
                <IconCircle icon={pillar.icon} accent={pillar.accent} size="md" fill="white" />
                <div className="min-w-0">
                  <p className={cn('flex items-center gap-2 text-[15px] font-semibold uppercase tracking-[0.22em]', accentText[pillar.accent])}>
                    <span className="text-[11px] tracking-normal text-ink-muted/70">0{i + 1}</span>
                    <Diamond className="bg-gold" />
                    {pillar.title}
                  </p>
                  <p className="mt-1 text-[14px] leading-snug text-ink-muted">{pillar.text}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
