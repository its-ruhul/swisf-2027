import { Quote } from 'lucide-react';
import togetherBand from '../../assets/images/who-comes-together.webp';
import { whoComesTogether } from '../../data/summit';
import { rotateAccent } from '../../lib/accents';
import { FlowerOrnament, PeachCloud } from '../ornaments/Decor';
import GoldCloud from '../ornaments/GoldCloud';
import IconCircle from '../ui/IconCircle';
import Reveal, { RevealItem } from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

/** Brochure page 7: Who Comes Together. */
export default function WhoComesTogether() {
  const { heading, intro, groups, quote, note, bandAlt } = whoComesTogether;
  return (
    <section aria-labelledby="together-heading" className="relative overflow-hidden">
      <GoldCloud variant="a" className="-left-24 -top-4 hidden w-56 opacity-80 sm:block lg:w-64" />
      <GoldCloud variant="b" flip className="-right-16 top-[38%] w-56 sm:w-72" />
      <PeachCloud className="absolute -left-28 bottom-[22%] w-80 opacity-60" />

      <div className="container-x section-y relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Reveal className="max-w-2xl">
            <SectionHeading id="together-heading" line1={heading.line1} line2={heading.line2} />
            <p className="body-copy mt-6 max-w-[58ch] md:text-lg">{intro}</p>
          </Reveal>
          <FlowerOrnament className="w-40 shrink-0 self-center sm:w-56 lg:w-64" />
        </div>

        <Reveal as="ul" stagger className="mt-12 grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
          {groups.map((group, i) => (
            <RevealItem
              as="li"
              key={group.title}
              className="group flex flex-col items-center bg-cream px-3 py-8 text-center transition-colors duration-300 hover:bg-white sm:px-6"
            >
              <IconCircle icon={group.icon} accent={rotateAccent(i)} size="lg" fill="white" />
              <p className="mt-4 max-w-[12rem] text-[12.5px] font-medium uppercase leading-relaxed tracking-[0.16em] text-navy sm:text-[13px]">
                {group.title}
              </p>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal>
          <figure className="mx-auto mt-16 max-w-3xl text-center">
            <Quote aria-hidden="true" size={38} strokeWidth={1.5} className="mx-auto text-saffron" />
            <blockquote className="mt-4 text-2xl font-medium leading-snug text-navy sm:text-3xl">
              <p>
                {quote.line1} <span className="block text-saffron-ink-lg">{quote.line2}</span>
              </p>
            </blockquote>
            <figcaption className="body-copy mx-auto mt-5 max-w-xl text-[15px] md:text-base">{note}</figcaption>
          </figure>
        </Reveal>
      </div>

      <img
        src={togetherBand}
        alt={bandAlt}
        width={1600}
        height={497}
        loading="lazy"
        decoding="async"
        className="mx-auto block w-full max-w-[1600px] border-y border-gold/40"
      />
    </section>
  );
}
