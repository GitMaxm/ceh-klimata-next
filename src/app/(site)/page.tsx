import { getPosts } from '@/entities/post';
import { getProjectPhoto, getProjects } from '@/entities/project';
import { BeforeAfter } from '@/widgets/before-after';
import { BlogPreview } from '@/widgets/blog-preview';
import { ContactClose } from '@/widgets/contact-close';
import { HomeHero } from '@/widgets/home-hero';
import { PartnersBand } from '@/widgets/partners-band';
import { ProjectsShowcase } from '@/widgets/projects-showcase';
import { ServicesOverview } from '@/widgets/services-overview';
import { WorkProcess } from '@/widgets/work-process';

export default function HomePage() {
  const projects = getProjects();
  const featured = projects[0];
  const before = getProjectPhoto(featured.folder, featured.before);
  const after = featured.after
    .map((name) => getProjectPhoto(featured.folder, name))
    .filter((photo) => photo !== undefined);

  return (
    <>
      <HomeHero />
      {before && <BeforeAfter project={featured} before={before} after={after} />}
      <ProjectsShowcase projects={projects} />
      <ServicesOverview />
      <WorkProcess />
      <PartnersBand />
      <BlogPreview posts={getPosts()} />
      <ContactClose />
    </>
  );
}
