import { northeast } from '../../data/home';
import { accentBg, accentText, type Accent } from '../../lib/accents';
import { cn } from '../../lib/cn';
import type { LucideIcon } from 'lucide-react';
import CircuitTraces from '../ornaments/CircuitTraces';
import { CrimsonCloud, KnotCorner, PeachCloud } from '../ornaments/Decor';
import LatticeBorder from '../ornaments/LatticeBorder';
import Card from '../ui/Card';
import DividerLabel from '../ui/DividerLabel';
import IconCircle from '../ui/IconCircle';
import Reveal, { RevealItem } from '../ui/Reveal';
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
    <div>
      <h3 id={id} className={cn('eyebrow mb-4 text-center font-semibold md:text-left', accentText[accent])}>
        {title}
      </h3>
      <Card className="h-full">
        <ul aria-labelledby={id} className="space-y-4">
          {items.map((item) => (
            <li key={item.text} className="group flex items-center gap-4">
              <IconCircle icon={item.icon} accent={accent} size="sm" fill="white" />
              <span className="text-[15.5px] text-navy sm:text-base">{item.text}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

/** Brochure page 4: Why the Northeast + "One stage for eight states". */
export default function WhyNortheast() {
  const { regionHolds, swisfBrings } = northeast;
  return (
    <section aria-labelledby="northeast-heading" className="relative overflow-hidden bg-cream-2">
      <KnotCorner className="absolute left-0 top-0 w-24 sm:w-32 lg:w-40" />
      <CrimsonCloud className="absolute -right-6 top-6 w-[46%] max-w-[400px] sm:top-10 lg:right-[6%]" />
      <CircuitTraces flip="x" density="light" animated={false} terminalFill="#F4EDE0" className="absolute -right-3 top-0 hidden w-28 opacity-60 lg:block" />
      <PeachCloud variant="b" className="absolute -left-32 top-[42%] w-72 opacity-60 sm:w-96" />

      <div className="container-x section-y relative pt-32 sm:pt-36 lg:pt-32">
        <div className="lg:pl-10">
          <Reveal>
            <SectionHeading id="northeast-heading" line1={northeast.heading.line1} line2={northeast.heading.line2} />
          </Reveal>
          <Reveal delay={0.05}>
            <p className="lead-copy mt-6 max-w-[54rem]">{northeast.lead}</p>
            <p className="body-copy mt-4 max-w-[62ch]">{northeast.body}</p>
          </Reveal>
        </div>

        <DividerLabel className="mt-16" as="h3">
          {northeast.diagramLabel}
        </DividerLabel>

        <Reveal className="mx-auto mt-6 w-full max-w-[540px]">
          <StatesRing states={northeast.states} />
        </Reveal>

        {/* Small screens: state chips (labels on the ring are hidden) */}
        <ul className="mx-auto mt-4 grid max-w-sm grid-cols-2 gap-2 sm:hidden">
          {northeast.states.map((state) => (
            <li
              key={state.name}
              className={cn(
                'flex min-h-[44px] items-center gap-2 rounded-2xl border px-3 py-2 text-[12.5px] leading-tight',
                state.host ? 'border-saffron bg-saffron/10 font-semibold text-navy' : 'border-line bg-white text-navy',
              )}
            >
              <span aria-hidden="true" className={cn('h-2.5 w-2.5 shrink-0 rounded-full', accentBg[state.accent])} />
              <span>
                {state.name}
                {state.host && <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted">Host state</span>}
              </span>
            </li>
          ))}
        </ul>

        <Reveal stagger className="mt-16 grid gap-10 md:grid-cols-2 md:gap-8">
          <RevealItem>
            <ListCard title={regionHolds.title} accent={regionHolds.accent} items={regionHolds.items} />
          </RevealItem>
          <RevealItem>
            <ListCard title={swisfBrings.title} accent={swisfBrings.accent} items={swisfBrings.items} />
          </RevealItem>
        </Reveal>
      </div>

      <LatticeBorder />
      <div aria-hidden="true" className="h-3 bg-navy" />
    </section>
  );
}
