import PageShell from '../components/layout/PageShell';
import CircuitTraces from '../components/ornaments/CircuitTraces';
import GoldCloud from '../components/ornaments/GoldCloud';
import TeamGrid from '../components/sections/TeamGrid';
import Button from '../components/ui/Button';
import { InstagramIcon } from '../components/ui/icons';
import SectionHeading from '../components/ui/SectionHeading';
import { seo, site } from '../data/site';
import { teamPage } from '../data/team';

/** /team — the people behind WISF 2027. */
export default function Team() {
  return (
    <PageShell title={seo.team.title} description={seo.team.description}>
      <section aria-labelledby="team-heading" className="relative overflow-hidden bg-cream-2">
        <CircuitTraces density="light" terminalFill="#F4EDE0" className="absolute -left-3 top-0 w-24 opacity-60 sm:w-32" />
        <CircuitTraces flip="x" density="light" terminalFill="#F4EDE0" className="absolute -right-3 top-0 w-24 opacity-60 sm:w-32" />
        <GoldCloud variant="a" eager className="-left-16 bottom-0 w-60 opacity-80 sm:w-80" />
        <GoldCloud variant="b" eager flip className="-right-12 top-10 w-52 opacity-90 sm:w-72" />
        <div className="container-x relative py-20 text-center sm:py-24">
          <SectionHeading as="h1" id="team-heading" align="center" line1={teamPage.heading.line1} line2={teamPage.heading.line2} />
          <p className="eyebrow mt-6 text-navy">{teamPage.subline}</p>
        </div>
      </section>

      <TeamGrid />

      <section aria-labelledby="join-heading" className="container-x pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-white px-6 py-10 text-center shadow-card sm:px-10">
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-saffron" />
          <h2 id="join-heading" className="text-2xl font-semibold text-navy sm:text-3xl">
            {teamPage.join.title}
          </h2>
          <p className="body-copy mx-auto mt-3 max-w-xl">{teamPage.join.text}</p>
          <Button
            href={site.socials.instagram.url}
            target="_blank"
            icon={InstagramIcon}
            iconPosition="left"
            className="mt-7"
            aria-label={`${teamPage.join.linkLabel} (@${site.socials.instagram.handle}, opens in a new tab)`}
          >
            {teamPage.join.linkLabel}
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
