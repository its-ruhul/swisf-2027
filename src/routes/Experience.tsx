import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { CalendarDays, Mail } from 'lucide-react';
import PageShell from '../components/layout/PageShell';
import ExperienceHero from '../components/sections/ExperienceHero';
import FestivalByNight from '../components/sections/FestivalByNight';
import SummitByDay from '../components/sections/SummitByDay';
import WhoComesTogether from '../components/sections/WhoComesTogether';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import IconCircle from '../components/ui/IconCircle';
import { seo, site } from '../data/site';
import { agenda } from '../data/summit';

function AgendaTeaser() {
  return (
    <section aria-labelledby="agenda-heading" className="container-x relative pb-20 pt-4 sm:pb-24">
      <Card className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="group flex items-start gap-4 sm:gap-5">
          <IconCircle icon={CalendarDays} accent="royal" size="md" fill="white" />
          <div>
            <h2 id="agenda-heading" className="card-title text-[15px] sm:text-base">
              {agenda.title}
            </h2>
            <p className="mt-1.5 max-w-xl text-[15px] leading-relaxed text-ink-muted">{agenda.text}</p>
          </div>
        </div>
        <Button
          href={`mailto:${site.contact.email}?subject=${encodeURIComponent(agenda.subject)}`}
          variant="secondary"
          icon={Mail}
          iconPosition="left"
          className="self-start md:self-auto"
        >
          {agenda.linkLabel}
        </Button>
      </Card>
    </section>
  );
}

/**
 * /experience — The Summit by Day and The Festival by Night.
 * The page background shifts from cream to deep navy-violet as the festival scrolls in.
 */
export default function Experience() {
  const festivalRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<'summit' | 'festival'>('summit');

  // The colour shifts while the festival's red border crosses the middle of the screen,
  // after the summit's text has scrolled away.
  const { scrollYProgress } = useScroll({ target: festivalRef, offset: ['start 75%', 'start 25%'] });
  const backgroundColor = useTransform(scrollYProgress, [0, 1], ['#FAF6EE', '#1A1240']);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setActive(value > 0.6 ? 'festival' : 'summit');
  });

  return (
    <PageShell title={seo.experience.title} description={seo.experience.description}>
      <motion.div style={{ backgroundColor }}>
        <ExperienceHero active={active} />
        <SummitByDay />
        <WhoComesTogether />
        <AgendaTeaser />
        <div ref={festivalRef}>
          <FestivalByNight />
        </div>
      </motion.div>
    </PageShell>
  );
}
