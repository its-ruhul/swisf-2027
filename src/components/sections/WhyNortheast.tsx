import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { northeast } from '../../data/home';
import { accentBg, accentText, type Accent } from '../../lib/accents';
import { cn } from '../../lib/cn';
import CircuitTraces from '../ornaments/CircuitTraces';
import { CrimsonCloud, KnotCorner, PeachCloud } from '../ornaments/Decor';
import LatticeBorder from '../ornaments/LatticeBorder';
import PrayerFlags from '../ornaments/PrayerFlags';
import DividerLabel from '../ui/DividerLabel';
import IconCircle from '../ui/IconCircle';
import Reveal, { RevealItem } from '../ui/Reveal';
import { MotifWatermark } from '../ui/Seal';
import SectionHeading from '../ui/SectionHeading';
import StatesRing from './StatesRing';

type ListCardProps = {
  title: string;
  accent: Accent;
  items: { icon: LucideIcon; text: string }[];
};

function ListCard({ title, accent, items }: ListCardProps) {
  const id = `list-${title.toLowerCase().replace(/[^a-z]+/g, '-')}`;
  return (
    <div className="relative rounded-2xl border border-line bg-white/85 px-4 py-[clamp(12px,1.8vh,18px)] shadow-card backdrop-blur-sm sm:px-5">
      <span aria-hidden="true" className={cn('absolute inset-y-4 left-0 w-[3px] rounded-r-full', accentBg[accent])} />
      <h3 id={id} className={cn('eyebrow text-[11px] font-semibold', accentText[accent])}>
        {title}
      </h3>
      <ul aria-labelledby={id} className="mt-[clamp(8px,1.2vh,12px)] space-y-[clamp(4px,0.9vh,9px)]">
        {items.map((item) => (
          <li key={item.text} className="group flex items-center gap-3">
            <IconCircle icon={item.icon} accent={accent} size="2xs" fill="white" />
            <span className="text-[14px] leading-snug text-navy lg:text-[13px] xl:text-[14px]">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Why the Northeast + "One stage for eight states" — one screen tall on desktop. */
export default function WhyNortheast() {
  const { regionHolds, swisfBrings } = northeast;
  // the highlighted state, shared by the wheel and (on phones) the state chips
  const [active, setActive] = useState<number | null>(null);
  return (
    <section aria-labelledby="northeast-heading" className="panel relative flex min-h-panel flex-col overflow-hidden bg-cream-2">
      <KnotCorner className="absolute left-0 top-0 w-20 sm:w-24 lg:w-28" />
      <CrimsonCloud className="absolute -right-10 top-36 w-[36%] max-w-[360px] opacity-90 sm:top-[18%] sm:w-[40%] lg:right-[1%] lg:top-[10%] lg:w-[24%]" />
      <CircuitTraces flip="x" density="light" animated={false} terminalFill="#F4EDE0" className="absolute -right-3 top-0 hidden w-24 opacity-50 lg:block" />
      <PeachCloud variant="b" className="absolute -left-32 top-[40%] w-72 opacity-60 sm:w-96" />
      <MotifWatermark motif="mountains" className="bottom-[12%] right-[2%] hidden w-[clamp(7rem,18vh,12rem)] text-crimson/[0.09] xl:block" />

      {/* prayer flags strung across the top */}
      <PrayerFlags count={28} sag={22} className="relative ml-[64px] sm:ml-[84px] lg:ml-[104px]" />

      <div className="container-x relative flex w-full flex-1 items-center py-10 lg:py-[clamp(8px,2vh,28px)]">
        <div className="grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-6 xl:gap-8">
          <div className="lg:col-span-4 lg:pl-4 2xl:col-span-5">
            <SectionHeading id="northeast-heading" reveal line1={northeast.heading.line1} line2={northeast.heading.line2} />
            <Reveal from="blur" delay={0.25}>
              <p className="mt-[clamp(14px,2.4vh,24px)] max-w-[34rem] text-[clamp(16px,2.15vh,19px)] font-semibold leading-snug text-navy">
                {northeast.lead}
              </p>
              <p className="panel-copy mt-3 max-w-[34rem]">{northeast.body}</p>
            </Reveal>
          </div>

          <div className="lg:col-span-4">
            <Reveal from="blur" amount={0.8}>
              <DividerLabel as="h3" labelClassName="max-sm:tracking-[0.2em] max-sm:[margin-right:-0.2em]">
                {northeast.diagramLabel}
              </DividerLabel>
            </Reveal>
            <Reveal from="turn" className="mx-auto mt-2 w-full max-w-[min(100%,52vh,440px)] max-lg:max-w-[480px] max-sm:mt-4 max-sm:max-w-[280px]">
              <StatesRing states={northeast.states} active={active} onActiveChange={setActive} />
            </Reveal>

            {/* Phones: the ring's labels are hidden, so the states are chips that light up their dot on the wheel */}
            <p className="mt-4 text-center text-[12px] text-ink-muted sm:hidden">Tap a state to find it on the wheel</p>
            <Reveal as="ul" stagger amount={0.1} className="mx-auto mt-3 grid max-w-sm grid-cols-2 gap-2 sm:hidden">
              {northeast.states.map((state, i) => {
                const selected = active === i;
                return (
                  <RevealItem as="li" key={state.name}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setActive(selected ? null : i)}
                      className={cn(
                        'flex min-h-[44px] w-full items-center gap-2 rounded-2xl border px-3 py-2 text-left text-[12.5px] leading-tight transition-colors duration-200',
                        selected
                          ? 'border-navy bg-navy text-cream shadow-card'
                          : state.host
                            ? 'border-saffron bg-saffron/10 font-semibold text-navy'
                            : 'border-line bg-white text-navy',
                      )}
                    >
                      <span aria-hidden="true" className={cn('h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-white/80', accentBg[state.accent])} />
                      <span>
                        {state.name}
                        {state.host && (
                          <span className={cn('block text-[10px] font-medium uppercase tracking-[0.18em]', selected ? 'text-cream/70' : 'text-ink-muted')}>
                            Host state
                          </span>
                        )}
                      </span>
                    </button>
                  </RevealItem>
                );
              })}
            </Reveal>
          </div>

          <Reveal stagger delay={0.2} className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:gap-[clamp(10px,1.8vh,18px)] 2xl:col-span-3">
            <RevealItem from="right">
              <ListCard title={regionHolds.title} accent={regionHolds.accent} items={regionHolds.items} />
            </RevealItem>
            <RevealItem from="right">
              <ListCard title={swisfBrings.title} accent={swisfBrings.accent} items={swisfBrings.items} />
            </RevealItem>
          </Reveal>
        </div>
      </div>

      <LatticeBorder className="!h-12 sm:!h-14" />
      <div aria-hidden="true" className="h-2 bg-navy" />
    </section>
  );
}
