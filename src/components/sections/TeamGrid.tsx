import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { departments, team, teamPage, type TeamMember } from '../../data/team';
import { accentBg, accentRing, accentSoftBg, accentText, type Accent } from '../../lib/accents';
import { cn } from '../../lib/cn';
import { Diamond } from '../ui/DividerLabel';
import { InstagramIcon, LinkedinIcon } from '../ui/icons';

type CardSize = 'xl' | 'lg' | 'md' | 'sm';

const byOrder = (a: TeamMember, b: TeamMember) => (a.order ?? 99) - (b.order ?? 99);

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const photoSize: Record<CardSize, string> = {
  xl: 'h-36 w-36 text-4xl',
  lg: 'h-28 w-28 text-3xl',
  md: 'h-24 w-24 text-2xl',
  sm: 'h-16 w-16 text-lg sm:h-20 sm:w-20 sm:text-xl',
};

type MemberCardProps = { member: TeamMember; accent: Accent; size: CardSize; className?: string };

function MemberCard({ member, accent, size, className }: MemberCardProps) {
  const { linkedin, instagram, email } = member.socials ?? {};
  const hasSocials = Boolean(linkedin || instagram || email);
  const ring = size === 'xl' ? 'ring-gold ring-[3px]' : cn(accentRing[accent], 'ring-[1.5px]');
  const role = member.title ?? member.role;

  const socialLink = 'inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-navy transition hover:border-gold hover:text-saffron-ink';

  return (
    <motion.article
      layout
      className={cn(
        'group relative flex flex-col items-center rounded-2xl border border-line bg-white text-center shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift focus-within:-translate-y-1',
        size === 'sm' ? 'px-3 py-5 sm:px-5 sm:py-6' : 'px-6 py-7 sm:px-8',
        className,
      )}
    >
      <div className={cn('relative shrink-0 rounded-full ring-offset-4 ring-offset-white', ring, photoSize[size])}>
        {member.photo ? (
          <img src={member.photo} alt={`Portrait of ${member.name}`} loading="lazy" className="h-full w-full rounded-full object-cover" />
        ) : (
          <span
            aria-hidden="true"
            className={cn('flex h-full w-full items-center justify-center rounded-full font-semibold', accentSoftBg[accent], accentText[accent])}
          >
            {initialsOf(member.name)}
          </span>
        )}
      </div>
      <h3 className={cn('font-semibold text-navy', size === 'sm' ? 'mt-4 text-[15px]' : 'mt-5 text-lg')}>{member.name}</h3>
      <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-saffron-ink">{role}</p>
      {member.department && size !== 'sm' && <p className="mt-1 text-[13px] text-ink-muted">{member.department}</p>}

      {hasSocials && (
        <ul
          className={cn(
            'mt-4 flex justify-center gap-2 transition duration-300',
            'sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100',
          )}
        >
          {linkedin && (
            <li>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`} className={socialLink}>
                <LinkedinIcon size={17} strokeWidth={1.6} aria-hidden="true" />
              </a>
            </li>
          )}
          {instagram && (
            <li>
              <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on Instagram`} className={socialLink}>
                <InstagramIcon size={17} strokeWidth={1.6} aria-hidden="true" />
              </a>
            </li>
          )}
          {email && (
            <li>
              <a href={`mailto:${email}`} aria-label={`Email ${member.name}`} className={socialLink}>
                <Mail size={17} strokeWidth={1.6} aria-hidden="true" />
              </a>
            </li>
          )}
        </ul>
      )}
    </motion.article>
  );
}

function GroupTitle({ id, label, accent }: { id: string; label: string; accent: Accent }) {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      <Diamond className={accentBg[accent]} />
      <span aria-hidden="true" className={cn('h-px w-8 shrink-0 sm:w-14', accentBg[accent])} />
      <h2 id={id} className={cn('eyebrow text-center font-semibold [margin-right:-0.35em]', accentText[accent])}>
        {label}
      </h2>
      <span aria-hidden="true" className={cn('h-px w-8 shrink-0 sm:w-14', accentBg[accent])} />
      <Diamond className={accentBg[accent]} />
    </div>
  );
}

type FilterChipProps = { label: string; active: boolean; onClick: () => void; accent?: Accent };

function FilterChip({ label, active, onClick, accent }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-full border-[1.5px] px-4 text-[13px] font-medium transition duration-200',
        active ? 'border-navy bg-navy text-cream' : 'border-line bg-white text-navy hover:border-gold',
      )}
    >
      {accent && <span aria-hidden="true" className={cn('h-2 w-2 rounded-full', accentBg[accent])} />}
      {label}
    </button>
  );
}

/** Team page body: sticky department filter, leadership tier and department sections. */
export default function TeamGrid() {
  const [filter, setFilter] = useState<string>('all');
  const reduce = useReducedMotion();

  const { president, secondRow } = useMemo(() => {
    const leaders = team.filter((m) => m.role === 'President' || m.role === 'Vice President' || m.role === 'Secretary').sort(byOrder);
    return {
      president: leaders.filter((m) => m.role === 'President'),
      secondRow: leaders.filter((m) => m.role !== 'President'),
    };
  }, []);

  const visible = filter === 'all' ? departments : departments.filter((d) => d.slug === filter);

  const sectionMotion = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.35, ease: 'easeOut' as const },
      };

  return (
    <div>
      {/* Sticky department filter */}
      <div className="sticky top-[76px] z-30 border-y border-line bg-cream/90 backdrop-blur-md">
        <div className="container-x">
          <div role="group" aria-label={teamPage.filterLabel} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-3 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:justify-center lg:px-0">
            <FilterChip label={teamPage.allLabel} active={filter === 'all'} onClick={() => setFilter('all')} />
            {departments.map((d) => (
              <FilterChip key={d.slug} label={d.name} accent={d.accent} active={filter === d.slug} onClick={() => setFilter(d.slug)} />
            ))}
          </div>
        </div>
      </div>

      <div className="container-x py-16 sm:py-20">
        <LayoutGroup>
          <AnimatePresence mode="popLayout" initial={false}>
            {filter === 'all' && (
              <motion.section key="leadership" layout aria-labelledby="team-leadership" className="pb-20" {...sectionMotion}>
                <GroupTitle id="team-leadership" label={teamPage.leadershipLabel} accent="gold" />
                <div className="mt-10 flex justify-center">
                  {president.map((m) => (
                    <MemberCard key={m.id} member={m} accent="gold" size="xl" className="w-full max-w-sm" />
                  ))}
                </div>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:mx-auto lg:max-w-5xl lg:grid-cols-3">
                  {secondRow.map((m) => (
                    <MemberCard key={m.id} member={m} accent="saffron" size="lg" />
                  ))}
                </div>
              </motion.section>
            )}

            {visible.map((dept) => {
              const members = team.filter((m) => m.department === dept.name);
              const heads = members.filter((m) => m.role === 'Head').sort(byOrder);
              const crew = members.filter((m) => m.role === 'Member').sort(byOrder);
              return (
                <motion.section key={dept.slug} layout aria-labelledby={`team-${dept.slug}`} className="pb-20 last:pb-0" {...sectionMotion}>
                  <GroupTitle id={`team-${dept.slug}`} label={dept.name} accent={dept.accent} />
                  {heads.length > 0 && (
                    <>
                      <h3 className="sr-only">{teamPage.headsLabel}</h3>
                      <div className="mt-10 flex flex-wrap justify-center gap-6">
                        {heads.map((m) => (
                          <MemberCard key={m.id} member={m} accent={dept.accent} size="md" className="w-full max-w-[19rem]" />
                        ))}
                      </div>
                    </>
                  )}
                  {crew.length > 0 && (
                    <>
                      <h3 className="sr-only">{teamPage.membersLabel}</h3>
                      <div className="mx-auto mt-6 flex max-w-5xl flex-wrap justify-center gap-4 sm:gap-5">
                        {crew.map((m) => (
                          <MemberCard
                            key={m.id}
                            member={m}
                            accent={dept.accent}
                            size="sm"
                            className="w-[calc(50%-0.5rem)] sm:w-[12.5rem] lg:w-[13.5rem]"
                          />
                        ))}
                      </div>
                    </>
                  )}
                </motion.section>
              );
            })}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </div>
  );
}
