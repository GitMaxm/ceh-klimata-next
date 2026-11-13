import type { Metadata } from 'next';

import { getProjects, ProjectCard } from '@/entities/project';
import { PageIntro } from '@/shared/ui';
import { ContactClose } from '@/widgets/contact-close';

import styles from '../../styles/pages/projects.module.css';

export const metadata: Metadata = {
  title: 'Проекты',
  description: 'Объекты «Цеха Климата» в Москве: вентиляция и кондиционирование квартир с фотоотчётом монтажа и готового интерьера.',
  alternates: { canonical: '/projects/' },
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <PageIntro
        crumbs={[{ href: '/projects/', label: 'Проекты' }]}
        title="Проекты по вентиляции и кондиционированию"
        lede="Объекты, где мы проектировали и монтировали системы. В каждом — характеристики, оборудование и фотоотчёт от черновой стадии до готового интерьера."
      />
      <section className={`section ${styles.section}`}>
        <div className={`wrap ${styles.list}`} data-count={Math.min(projects.length, 3)}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} layout={projects.length === 1 ? 'wide' : 'grid'} headingLevel="h2" />
          ))}
        </div>
      </section>
      <ContactClose />
    </>
  );
}
