import type { Metadata } from 'next';

import { projectsContent } from '@/entities/main/project';
import { ProjectList } from '@/features/main/project-list';

export const metadata: Metadata = {
  title: 'Проекты',
  description:
    'Ключевые проекты Цеха Климата: вентиляция, кондиционирование и инженерные системы под ключ для жилых и коммерческих помещений.',
};

const ProjectsPage = () => {
  return (
    <main className="section">
      <div className="container">
        <h2 className="title-1">Проекты</h2>

        <p className="portfolio-description">
          В этом разделе собраны наши ключевые проекты и комплексные решения. Каждый кейс — это
          пример системного подхода к созданию идеального микроклимата для жилых, коммерческих и
          общественных пространств.
        </p>

        <ProjectList projects={projectsContent} />
      </div>
    </main>
  );
};

export default ProjectsPage;
