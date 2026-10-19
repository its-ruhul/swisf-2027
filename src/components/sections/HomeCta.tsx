import circuitBanner from '../../assets/images/circuit-banner.webp';
import { homeCta } from '../../data/home';
import Button from '../ui/Button';
import { Diamond } from '../ui/DividerLabel';

/** Closing banner on the Home page. */
export default function HomeCta() {
  return (
    <section aria-labelledby="home-cta-heading" className="relative overflow-hidden bg-navy-deep text-cream">
      <img
        src={circuitBanner}
        alt=""
        aria-hidden="true"
        width={1024}
        height={210}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full select-none object-cover object-right opacity-80"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'linear-gradient(90deg, #0A1230 0%, rgba(10,18,48,0.94) 45%, rgba(10,18,48,0.55) 100%)' }}
      />
      <div className="container-x relative py-16 sm:py-20 lg:py-24">
        <p className="flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.3em] text-gold-soft">
          <Diamond className="bg-saffron" />
          {homeCta.eyebrow}
        </p>
        <h2 id="home-cta-heading" className="mt-4 max-w-2xl text-3xl font-semibold leading-tight text-cream sm:text-4xl lg:text-5xl">
          {homeCta.title}
        </h2>
        <p className="mt-4 max-w-xl text-base text-cream/80 sm:text-lg">{homeCta.text}</p>
        <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
          {homeCta.links.map((link) => (
            <Button key={link.to} to={link.to} variant={link.variant}>
              {link.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
