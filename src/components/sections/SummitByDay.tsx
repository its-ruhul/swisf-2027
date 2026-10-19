import valleyBand from '../../assets/images/valley-band.webp';
import { summit } from '../../data/summit';
import { accentText, rotateAccent } from '../../lib/accents';
import { cn } from '../../lib/cn';
import { LanternFrame, MedallionStrip } from '../ornaments/Decor';
import GoldCloud from '../ornaments/GoldCloud';
import { HangingLanterns } from '../ornaments/Lantern';
import DividerLabel from '../ui/DividerLabel';
import IconCircle from '../ui/IconCircle';
import Pill from '../ui/Pill';
import Reveal, { RevealItem } from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

/** Brochure page 5: The Summit by Day. */
export default function SummitByDay() {
  return (
    <section id="summit" aria-labelledby="summit-heading" className="relative overflow-hidden">
      <MedallionStrip />
      <LanternFrame className="absolute left-1 top-12 hidden w-9 sm:block lg:left-3 lg:w-12" />
      <HangingLanterns variant="pair" className="absolute -right-4 top-6 w-40 sm:w-64 lg:right-4 lg:w-[360px]" />
      <GoldCloud variant="a" className="-right-12 top-[300px] hidden w-64 sm:block lg:right-0 lg:top-[340px] lg:w-80" />

      <div className="container-x section-y relative pt-28 sm:pt-24">
        <div className="max-w-3xl sm:pl-10 lg:pl-6">
          <Reveal>
            <SectionHeading id="summit-heading" line1={summit.heading.line1} line2={summit.heading.line2} />
          </Reveal>
          <Reveal delay={0.05}>
            <p className="body-copy mt-6 max-w-[56ch] md:text-lg">{summit.intro}</p>
          </Reveal>
        </div>

        <DividerLabel className="mt-16" as="h3">
          {summit.gridLabel}
        </DividerLabel>

        {/* 4×2 grid with hairline dividers, no card boxes */}
        <Reveal as="ul" stagger className="mt-10 grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {summit.activities.map((activity, i) => {
            const accent = rotateAccent(i);
            return (
              <RevealItem
                as="li"
                key={activity.number}
                className="group flex flex-col items-center bg-cream px-6 py-9 text-center transition-colors duration-300 hover:bg-white"
              >
                <IconCircle icon={activity.icon} accent={accent} size="lg" fill="white" />
                <p className={cn('mt-5 text-[13px] font-semibold tracking-[0.2em]', accentText[accent])}>{activity.number}</p>
                <h4 className="card-title mt-2 max-w-[15rem]">{activity.title}</h4>
                <p className="mt-2 max-w-[16rem] text-[14.5px] leading-relaxed text-ink-muted">{activity.text}</p>
              </RevealItem>
            );
          })}
        </Reveal>

        <DividerLabel tone="saffron" line="saffron" className="mt-20" as="h3">
          {summit.conversationsLabel}
        </DividerLabel>
        <Reveal as="ul" stagger className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
          {summit.conversations.map((topic, i) => (
            <RevealItem as="li" key={topic}>
              <Pill accent={rotateAccent(i)}>{topic}</Pill>
            </RevealItem>
          ))}
        </Reveal>
      </div>

      {/* closing strip: Meghalaya valley */}
      <img
        src={valleyBand}
        alt={summit.valleyAlt}
        width={1600}
        height={405}
        loading="lazy"
        decoding="async"
        className="mx-auto block w-full max-w-[1600px] [mask-image:linear-gradient(to_bottom,transparent,black_20%)]"
      />
    </section>
  );
}
