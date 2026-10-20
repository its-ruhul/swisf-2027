import { ArrowLeft } from 'lucide-react';
import PageShell from '../components/layout/PageShell';
import GoldCloud from '../components/ornaments/GoldCloud';
import Button from '../components/ui/Button';
import { GlyphWatermark } from '../components/ui/Seal';
import SectionHeading from '../components/ui/SectionHeading';
import SwisfEmblem from '../components/ui/SwisfEmblem';
import { seo } from '../data/site';

/** 404 — "The sun hasn't risen here". */
export default function NotFound() {
  return (
    <PageShell title={seo.notFound.title} description={seo.notFound.description}>
      <section aria-labelledby="not-found-heading" className="relative flex min-h-[72vh] items-center overflow-hidden bg-cream">
        <GoldCloud variant="a" eager className="-left-20 top-10 w-72 opacity-80 sm:w-96" />
        <GoldCloud variant="b" eager flip className="-right-16 bottom-10 w-64 opacity-90 sm:w-80" />
        <GlyphWatermark glyphs="無" className="right-[6%] top-1/2 hidden -translate-y-1/2 text-[12rem] text-navy/[0.05] md:block" />
        <div className="container-x relative py-20 text-center">
          {/* the sun still below the horizon */}
          <div className="mx-auto w-56 overflow-hidden sm:w-72">
            <SwisfEmblem source="lg" glint className="w-full translate-y-[38%] opacity-80" />
          </div>
          <span aria-hidden="true" className="mx-auto block h-px w-64 bg-gradient-to-r from-transparent via-gold to-transparent sm:w-80" />
          <SectionHeading
            as="h1"
            id="not-found-heading"
            align="center"
            line1="The sun hasn’t risen here"
            line2="Page not found"
            className="mt-6"
          />
          <p className="body-copy mx-auto mt-6 max-w-md">
            The page you were looking for doesn’t exist or has moved. Head back to the home page to explore SWISF 2027.
          </p>
          <Button to="/" icon={ArrowLeft} iconPosition="left" className="mt-8">
            Back to home
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
