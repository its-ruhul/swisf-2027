import { summit } from '../../data/summit';
import { accentText, rotateAccent } from '../../lib/accents';
import { cn } from '../../lib/cn';
import IconCircle from '../ui/IconCircle';
import Marquee from '../ui/Marquee';
import Reveal, { RevealItem } from '../ui/Reveal';
import Seal from '../ui/Seal';
import SectionHeading from '../ui/SectionHeading';

/** Day half of the Experience page: what happens at the summit, then a ticker of conversation topics. */
export default function SummitByDay() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="grid items-end gap-5 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading id="summit-heading" line1={summit.heading.line1} line2={summit.heading.line2} />
        </div>
        <div className="flex items-end gap-5 lg:col-span-7">
          <p className="panel-copy max-w-[36rem]">{summit.intro}</p>
          <Seal motif="sun" meaning="Day" size="md" className="hidden shrink-0 sm:inline-flex" />
        </div>
      </div>

      <h3 className="sr-only">{summit.gridLabel}</h3>
      <Reveal as="ul" stagger className="mt-[clamp(12px,1.9vh,32px)] grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-[clamp(10px,1.6vh,16px)]">
        {summit.activities.map((activity, i) => {
          const accent = rotateAccent(i);
          return (
            <RevealItem
              as="li"
              key={activity.number}
              className="group relative overflow-hidden rounded-2xl border border-line bg-white/85 p-3.5 shadow-card backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lift sm:p-4 lg:px-5 lg:py-[clamp(10px,1.6vh,20px)]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-saffron to-gold transition-transform duration-500 group-hover:scale-x-100"
              />
              <div className="flex items-center justify-between">
                <IconCircle icon={activity.icon} accent={accent} size="sm" fill="white" />
                <span className={cn('text-[12px] font-semibold tracking-[0.2em]', accentText[accent])}>{activity.number}</span>
              </div>
              <h4 className="card-title mt-[clamp(6px,1vh,14px)] text-[12.5px] sm:text-[13.5px] lg:text-[12.5px] xl:text-[13.5px]">{activity.title}</h4>
              <p className="mt-1 text-[12.5px] leading-snug text-ink-muted sm:text-[13.5px] lg:text-[12.5px] xl:text-[13.5px]">{activity.text}</p>
            </RevealItem>
          );
        })}
      </Reveal>

      <div className="mt-[clamp(10px,1.8vh,32px)]">
        <h3 className="flex justify-center">
          <span className="eyebrow rounded-full bg-cream/90 px-4 py-1 text-[11px] text-saffron-ink">{summit.conversationsLabel}</span>
        </h3>
        <Marquee
          items={summit.conversations}
          label={summit.conversationsLabel}
          duration={36}
          className="mt-3 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
          itemClassName="!mx-2 rounded-full border border-gold/50 bg-white/90 py-2 text-[13px] text-navy"
          diamondClassName="bg-gold"
        />
      </div>
    </div>
  );
}
