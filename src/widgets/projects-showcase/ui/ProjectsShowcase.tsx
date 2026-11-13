import Link from 'next/link';

import { ProjectCard, type TProject } from '@/entities/project';
import { IconArrowRight } from '@/shared/ui';

import styles from './ProjectsShowcase.module.css';

type TProjectsShowcaseProps = {
  projects: TProject[];
};

export const ProjectsShowcase = ({ projects }: TProjectsShowcaseProps) => {
  const shown = projects.slice(0, 3);

  return (
    <section className={`section ${styles.section}`}>
      <div className="wrap">
        <div className={styles.head}>
          <h2 className="h2">Объекты</h2>
          <Link href="/projects/" className={styles.all}>
            Смотреть все проекты
            <IconArrowRight />
          </Link>
        </div>
        <div className={styles.list} data-count={shown.length}>
          {shown.map((project) => (
            <ProjectCard key={project.slug} project={project} layout={shown.length === 1 ? 'wide' : 'grid'} />
          ))}
        </div>
      </div>
    </section>
  );
};
