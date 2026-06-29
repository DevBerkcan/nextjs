import { Hero } from '@/components/sections/Hero';
import { TrustBar } from '@/components/sections/TrustBar';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { ProcessScroll } from '@/components/sections/ProcessScroll';
import { ProjectsPreview } from '@/components/sections/ProjectsPreview';
import { QualitySafety } from '@/components/sections/QualitySafety';
import { ContactCta } from '@/components/sections/ContactCta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesOverview />
      <ProcessScroll />
      <ProjectsPreview />
      <QualitySafety />
      <ContactCta />
    </>
  );
}
