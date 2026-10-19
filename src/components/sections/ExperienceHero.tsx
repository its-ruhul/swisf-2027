import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { experienceHero } from '../../data/summit';
import { cn } from '../../lib/cn';
import GoldCloud from '../ornaments/GoldCloud';
import { Diamond } from '../ui/DividerLabel';
import SectionHeading from '../ui/SectionHeading';

type ExperienceHeroProps = {
  /** Which half of the page is currently on screen */
  active: 'summit' | 'festival';
};

const segment =
  'inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 text-[12.5px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 sm:px-6 sm:text-[13px]';

/** Short page hero with a Day / Night segmented control that jumps to each half. */
export default function ExperienceHero({ active }: ExperienceHeroProps) {
  const { heading, subline, intro, toggle } = experienceHero;
  return (
    <section aria-labelledby="experience-heading" className="relative flex min-h-[50vh] items-center overflow-hidden">
      <GoldCloud variant="a" eager className="-left-24 top-4 hidden w-72 opacity-80 sm:block sm:w-96" />
      <GoldCloud variant="b" eager flip className="-right-20 bottom-2 w-64 opacity-90 sm:w-80" />

      <div className="container-x relative w-full py-16 text-center sm:py-20">
        <SectionHeading as="h1" id="experience-heading" align="center" line1={heading.line1} line2={heading.line2} />
        <p className="eyebrow mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-navy">
          <span>{subline[0]}</span>
          <Diamond className="bg-saffron" />
          <span>{subline[1]}</span>
        </p>
        <p className="body-copy mx-auto mt-5 max-w-xl">{intro}</p>

        <nav aria-label="Jump to the summit or the festival" className="mt-9 inline-flex rounded-full border border-line bg-white p-1 shadow-card">
          <Link
            to={{ hash: '#summit' }}
            aria-current={active === 'summit' ? 'location' : undefined}
            className={cn(segment, active === 'summit' ? 'bg-navy text-cream' : 'text-navy hover:bg-cream-2')}
          >
            <Sun size={17} strokeWidth={1.75} aria-hidden="true" className={active === 'summit' ? 'text-gold-soft' : 'text-saffron'} />
            {toggle.day}
          </Link>
          <Link
            to={{ hash: '#festival' }}
            aria-current={active === 'festival' ? 'location' : undefined}
            className={cn(segment, active === 'festival' ? 'bg-night text-cream' : 'text-navy hover:bg-cream-2')}
          >
            <Moon size={17} strokeWidth={1.75} aria-hidden="true" className={active === 'festival' ? 'text-gold-soft' : 'text-violet'} />
            {toggle.night}
          </Link>
        </nav>
      </div>
    </section>
  );
}
