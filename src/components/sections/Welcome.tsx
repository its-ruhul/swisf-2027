import dragonWaves from '../../assets/images/dragon-waves.webp';
import sunriseBanner from '../../assets/images/sunrise-banner.webp';
import { welcome } from '../../data/home';
import { accentText } from '../../lib/accents';
import { cn } from '../../lib/cn';
import { PeachCloud } from '../ornaments/Decor';
import GoldCloud from '../ornaments/GoldCloud';
import Card from '../ui/Card';
import IconCircle from '../ui/IconCircle';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

/** Brochure page 2: sunrise banner, welcome letter and the three pillars. */
export default function Welcome() {
  return (
    <section aria-labelledby="welcome-heading" className="relative overflow-hidden bg-cream-2">
      <div className="relative h-[260px] sm:h-[340px] lg:h-[420px]">
        <img
          src={sunriseBanner}
          alt={welcome.bannerAlt}
          width={1588}
          height={584}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-[50%_42%]"
        />
      </div>
      <div aria-hidden="true" className="h-1 bg-saffron" />

      <div className="relative">
        <PeachCloud className="absolute -left-24 bottom-0 w-72 opacity-60 sm:w-96" />
        <div className="container-x section-y relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionHeading id="welcome-heading" line1={welcome.heading.line1} line2={welcome.heading.line2} />
              </Reveal>
              <Reveal className="mt-8 max-w-prose" delay={0.05}>
                <p className="text-lg font-medium text-navy">{welcome.salutation}</p>
                <div className="body-copy mt-4 space-y-4">
                  {welcome.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <div className="mt-8">
                  <p className="body-copy">{welcome.signOff.regards}</p>
                  <p className="mt-1 text-lg font-bold text-navy">{welcome.signOff.name}</p>
                  <p className="eyebrow mt-1 text-saffron-ink">{welcome.signOff.org}</p>
                </div>
              </Reveal>
            </div>

            <div className="relative lg:col-span-5 lg:pt-28">
              {/* gold cloud overlapping the card's top-right corner */}
              <GoldCloud variant="b" className="-right-10 -top-14 z-10 w-56 sm:-right-16 sm:w-72 lg:-right-24 lg:top-4" />
              <Reveal>
                <Card as="aside" className="relative px-6 py-7 sm:px-8 sm:py-8">
                  <h3 className="eyebrow text-navy">{welcome.pillarsTitle}</h3>
                  <ul className="mt-6">
                    {welcome.pillars.map((pillar, i) => (
                      <li key={pillar.title} className={cn('group py-6', i > 0 && 'border-t border-line', i === 0 && 'pt-0', i === welcome.pillars.length - 1 && 'pb-0')}>
                        <div className="flex items-center gap-4">
                          <IconCircle icon={pillar.icon} accent={pillar.accent} size="md" />
                          <p className={cn('text-lg font-medium uppercase tracking-[0.22em]', accentText[pillar.accent])}>{pillar.title}</p>
                        </div>
                        <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{pillar.text}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* closing strip: dragon and waves artwork */}
      <div className="relative h-[170px] border-t border-gold/60 sm:h-[220px] lg:h-[280px]">
        <img
          src={dragonWaves}
          alt="Painted dragon coiling through sunlit clouds and ocean waves"
          width={1600}
          height={619}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-[50%_40%]"
        />
      </div>
    </section>
  );
}
