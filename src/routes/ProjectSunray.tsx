import PageShell from '../components/layout/PageShell';
import NextGeneration from '../components/sections/NextGeneration';
import { seo } from '../data/site';

/** /project-sunray — The Next Generation (E-Cell's Project Centre). */
export default function ProjectSunray() {
  return (
    <PageShell title={seo.sunray.title} description={seo.sunray.description}>
      <NextGeneration />
    </PageShell>
  );
}
