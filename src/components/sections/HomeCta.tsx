import circuitBanner from '../../assets/images/circuit-banner.webp';
import { homeCta } from '../../data/home';
import { cn } from '../../lib/cn';
import GoldCloud from '../ornaments/GoldCloud';
import Lantern from '../ornaments/Lantern';
import { GoldDust } from '../ornaments/Particles';
import Seigaiha from '../ornaments/Seigaiha';
import StarField from '../ornaments/StarField';
import Button from '../ui/Button';
import { Diamond } from '../ui/DividerLabel';
import Reveal from '../ui/Reveal';
import SunrayLockup from '../ui/SunrayLockup';

/** Gold lattice-window bracket for the banner corners (drawn for the top-left; rotate for the others). */
function CornerBracket({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className={cn('pointer-events-none absolute h-10 w-10 sm:h-12 sm:w-12', className)} fill="none">
      <path d="M2 30V2h28" stroke="#C9A24A" strokeWidth="1.5" />
      <path d="M8 22V8h14" stroke="#C9A24A" strokeWidth="1" opacity="0.7" />
      <path d="M8 14h6v-6" stroke="#E6CF94" strokeWidth="1" opacity="0.7" />
      <rect x="12.5" y="12.5" width="4" height="4" transform="rotate(45 14.5 14.5)" fill="#E07B39" />
    </svg>
  );
}

/** Closing call to action on the Home page — a framed banner set apart from the sections above. */
export default function HomeCta() {
  return (
    <section aria-labelledby="home-cta-heading" className="relative overflow-hidden bg-cream py-16 sm:py-20 lg:py-24">
      <Seigaiha background="#FAF6EE" className="opacity-40" />
      <GoldCloud variant="a" className="-left-24 top-2 w-72 opacity-70 sm:w-96" />
      <GoldCloud variant="b" flip className="-right-20 bottom-0 w-64 opacity-70 sm:w-80" />

      <div className="container-x relative">
        <Reveal from="scale" amount={0.3}>
          <div className="relative isolate overflow-hidden rounded-[28px] bg-navy-deep text-cream shadow-[0_40px_90px_-35px_rgba(10,18,48,0.75)] ring-1 ring-gold/50">
            {/* background: circuit board, stars, dust */}
            <img
              src={circuitBanner}
              alt=""
              aria-hidden="true"
              width={1024}
              height={210}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 -z-10 h-full w-full select-none object-cover object-right opacity-60"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10"
              style={{ background: 'linear-gradient(90deg, #0A1230 0%, rgba(10,18,48,0.95) 40%, rgba(10,18,48,0.7) 70%, rgba(26,18,64,0.85) 100%)' }}
            />
            <StarField count={50} seed={77} className="absolute inset-0 -z-10 h-full w-full opacity-60" />
            <GoldDust count={16} seed={19} className="-z-10" />

            {/* double gold frame + lattice corners */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-[20px] border border-gold/45" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-[18px] rounded-[16px] border border-gold/15" />
            <CornerBracket className="left-5 top-5" />
            <CornerBracket className="right-5 top-5 rotate-90" />
            <CornerBracket className="bottom-5 right-5 rotate-180" />
            <CornerBracket className="bottom-5 left-5 -rotate-90" />

            {/* lanterns hanging from the top edge */}
            <div aria-hidden="true" className="absolute right-[6%] top-0 hidden gap-5 md:flex lg:right-[4%]">
              <Lantern className="w-8" stringLength={26} />
              <Lantern className="w-11" stringLength={56} delay={0.9} />
              <Lantern className="w-7" stringLength={14} delay={1.7} />
            </div>

            <div className="relative grid items-center gap-10 px-7 py-14 sm:px-14 sm:py-16 lg:grid-cols-12 lg:gap-8 lg:px-20 lg:py-20">
              <Reveal from="left" delay={0.3} className="lg:col-span-8">
                <p className="flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.3em] text-gold-soft">
                  <Diamond className="bg-saffron" />
                  {homeCta.eyebrow}
                </p>
                <h2 id="home-cta-heading" className="mt-4 max-w-2xl text-3xl font-semibold uppercase leading-tight tracking-[0.06em] sm:text-4xl lg:text-5xl">
                  <span className="text-cream">{homeCta.title.lead} </span>
                  <span className="text-sun">{homeCta.title.highlight}</span>
                </h2>
                <p className="mt-4 max-w-xl text-base text-cream/80 sm:text-lg">{homeCta.text}</p>
                <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
                  {homeCta.links.map((link, i) => (
                    <Button key={link.to} to={link.to} variant={i === 0 ? 'sun' : 'outline-light'}>
                      {link.label}
                    </Button>
                  ))}
                </div>
              </Reveal>
              <Reveal from="turn" delay={0.45} className="relative hidden justify-center lg:col-span-4 lg:flex">
                <span aria-hidden="true" className="absolute inset-0 m-auto h-56 w-56 rounded-full bg-saffron/20 blur-3xl motion-safe:animate-glow-pulse" />
                <SunrayLockup tone="dark" glint className="relative w-56 xl:w-64" />
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
