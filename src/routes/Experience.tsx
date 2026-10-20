import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import valleyBand from '../assets/images/valley-band.webp';
import PageShell from '../components/layout/PageShell';
import { FestivalBand, LanternFrame, MedallionStrip } from '../components/ornaments/Decor';
import Fireworks from '../components/ornaments/Fireworks';
import GoldCloud from '../components/ornaments/GoldCloud';
import Lantern, { HangingLanterns } from '../components/ornaments/Lantern';
import { GoldDust, SkyLanterns } from '../components/ornaments/Particles';
import Seigaiha from '../components/ornaments/Seigaiha';
import StarField from '../components/ornaments/StarField';
import DayNightToggle, { type DayNight } from '../components/sections/DayNightToggle';
import FestivalByNight from '../components/sections/FestivalByNight';
import SummitByDay from '../components/sections/SummitByDay';
import { Diamond } from '../components/ui/DividerLabel';
import { seo } from '../data/site';
import { experience } from '../data/summit';
import { cn } from '../lib/cn';

const PANEL_ID = 'experience-panel';
const fade = { duration: 0.9, ease: 'easeInOut' } as const;

/** Day sky: cream paper, seigaiha waves, a warm sun, clouds, lanterns and the valley along the bottom. */
function DaySky() {
  return (
    <motion.div aria-hidden="true" className="absolute inset-0 bg-cream" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fade}>
      <Seigaiha background="#FAF6EE" className="opacity-30" />
      <MedallionStrip className="absolute inset-x-0 top-0 !h-6 sm:!h-7" />
      <div
        className="absolute -right-[8%] -top-[18%] aspect-square w-[46%] max-w-[620px] rounded-full motion-safe:animate-glow-pulse"
        style={{ background: 'radial-gradient(circle, rgba(246,199,107,0.55) 0%, rgba(242,154,94,0.22) 35%, transparent 68%)' }}
      />
      <div className="god-rays absolute -right-[14%] -top-[30%] aspect-square w-[60%] max-w-[820px] opacity-70 motion-safe:animate-spin-slower" />
      <GoldCloud variant="a" className="-left-20 top-[30%] w-72 opacity-60 sm:w-96" />
      <GoldCloud variant="b" flip className="right-[10%] top-[12%] hidden w-64 opacity-70 lg:block" />
      <LanternFrame className="absolute right-1 top-10 hidden w-8 opacity-90 xl:block" />
      <HangingLanterns variant="pair" className="absolute -left-4 top-5 hidden w-48 -scale-x-100 sm:block lg:w-56" />
      <img
        src={valleyBand}
        alt=""
        width={1600}
        height={405}
        decoding="async"
        className="absolute inset-x-0 bottom-0 w-full select-none opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black_60%)]"
      />
    </motion.div>
  );
}

/** Night sky: deep violet, stars, fireworks, rising sky lanterns, a moon and the festival band. */
function NightSky() {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0"
      style={{ background: 'linear-gradient(180deg, #0A1230 0%, #1A1240 48%, #2A1A5E 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={fade}
    >
      <StarField count={140} className="absolute inset-0 h-full w-full" />
      <Fireworks className="absolute inset-x-0 top-0 h-[70%] w-full opacity-80" />
      <SkyLanterns count={11} />
      <GoldDust count={18} seed={3} />
      <div className="absolute left-[3%] top-0 hidden gap-5 md:flex">
        <Lantern className="w-9" stringLength={22} />
        <Lantern className="w-12" stringLength={60} delay={0.8} />
        <Lantern className="w-8" stringLength={10} delay={1.6} />
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <FestivalBand position="center 82%" className="!h-10 sm:!h-12" />
      </div>
    </motion.div>
  );
}

/** The sun sets as the moon rises (top-right corner). */
function Celestial({ night }: { night: boolean }) {
  const reduce = useReducedMotion();
  const travel = reduce ? 0 : 160;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute right-[5%] top-[6%] hidden h-24 w-24 lg:block xl:h-28 xl:w-28">
      <AnimatePresence initial={false}>
        {night ? (
          <motion.div
            key="moon"
            className="absolute inset-0"
            initial={{ y: travel, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: travel, opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.3, 0.7, 0.2, 1] }}
          >
            <span className="absolute inset-[-40%] rounded-full bg-[radial-gradient(circle,rgba(230,207,148,0.35),transparent_65%)]" />
            <span className="absolute inset-[18%] rounded-full bg-[#F4E7C2] shadow-[inset_-10px_-6px_0_0_rgba(201,162,74,0.45)]" />
            <span className="absolute left-[34%] top-[36%] h-3 w-3 rounded-full bg-[#E3D19E]" />
            <span className="absolute left-[54%] top-[56%] h-2 w-2 rounded-full bg-[#E3D19E]" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            className="absolute inset-0"
            initial={{ y: travel, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: travel, opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.3, 0.7, 0.2, 1] }}
          >
            <span className="absolute inset-[-30%] rounded-full bg-[radial-gradient(circle,rgba(246,199,107,0.5),transparent_65%)] motion-safe:animate-glow-pulse" />
            <span className="absolute inset-[14%] rounded-full bg-gradient-to-b from-[#F9DE8F] via-[#E9B954] to-[#E07B39] shadow-[0_0_40px_rgba(242,154,94,0.6)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * /experience — one screen with a Day / Night switch.
 * Day shows the summit; night shows the festival (and the sky changes with it).
 * Links to /experience#festival open straight into night.
 */
export default function Experience() {
  const { hash } = useLocation();
  const [mode, setMode] = useState<DayNight>(hash === '#festival' ? 'night' : 'day');
  const night = mode === 'night';

  useEffect(() => {
    if (hash === '#festival') setMode('night');
    else if (hash === '#summit') setMode('day');
  }, [hash]);

  return (
    <PageShell title={seo.experience.title} description={seo.experience.description}>
      <section
        aria-labelledby="experience-heading"
        className={cn('panel relative isolate flex min-h-panel flex-col overflow-hidden transition-colors duration-700', night ? 'bg-night' : 'bg-cream')}
      >
        <div className="absolute inset-0 -z-10">
          <AnimatePresence initial={false}>{night ? <NightSky key="night" /> : <DaySky key="day" />}</AnimatePresence>
          <Celestial night={night} />
        </div>

        <div
          className={cn(
            'container-x relative flex w-full flex-1 flex-col pt-[clamp(32px,4.4vh,52px)]',
            night ? 'pb-[clamp(56px,8vh,76px)]' : 'pb-[clamp(20px,3.5vh,40px)]',
          )}
        >
          <header className="flex flex-col items-center gap-[clamp(10px,1.8vh,16px)] text-center">
            <h1
              id="experience-heading"
              className={cn(
                'flex flex-wrap items-center justify-center gap-x-3 text-[11px] font-medium uppercase tracking-[0.34em] transition-colors duration-700 sm:text-[12px]',
                night ? 'text-gold-soft' : 'text-navy',
              )}
            >
              {experience.title}
              <Diamond className="bg-saffron" />
              <span className={night ? 'text-cream/70' : 'text-saffron-ink'}>{night ? experience.subline[1] : experience.subline[0]}</span>
            </h1>
            <DayNightToggle mode={mode} onChange={setMode} panelId={PANEL_ID} />
          </header>

          <div id={PANEL_ID} role="tabpanel" aria-labelledby={`tab-${mode}`} className="mt-[clamp(12px,2.2vh,40px)] flex flex-1 flex-col">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode}
                className="flex flex-1 flex-col"
                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -24, filter: 'blur(6px)' }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                {night ? <FestivalByNight /> : <SummitByDay />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
