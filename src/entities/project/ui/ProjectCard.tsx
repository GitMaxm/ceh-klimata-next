import Link from 'next/link';

import { photoSrc, typograph } from '@/shared/lib';
import { IconArrowRight } from '@/shared/ui';

import type { TProject } from '../model/types';
import styles from './ProjectCard.module.css';
import { ProjectSpecs } from './ProjectSpecs';

type TProjectCardProps = {
  project: TProject;
  layout?: 'wide' | 'grid';
  headingLevel?: 'h2' | 'h3';
};

export const ProjectCard = ({ project, layout = 'grid', headingLevel: Heading = 'h3' }: TProjectCardProps) => (
  <Link href={`/projects/${project.slug}/`} className={styles.card} data-layout={layout} data-ground="dark">
    <div className={styles.media}>
      <img
        src={photoSrc(project.folder, project.cover)}
        alt={`${project.title}: готовый интерьер`}
        width={1600}
        height={1200}
        loading="lazy"
        decoding="async"
      />
    </div>
    <div className={styles.body}>
      <Heading className={styles.title}>{project.title}</Heading>
      <p className={styles.meta}>
        {typograph(`${project.objectType}. ${project.location}`)}
      </p>
      <div className={styles.specs}>
        <ProjectSpecs specs={project.specs.slice(0, 3)} />
      </div>
      <span className={styles.go}>
        Смотреть объект
        <IconArrowRight />
      </span>
    </div>
  </Link>
);
