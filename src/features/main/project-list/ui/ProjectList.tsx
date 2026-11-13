import type { IProject } from '@/entities/main/project';
import { ProjectCard } from '@/entities/main/project';

import type { IProjectListProps } from './types';

const ProjectList = ({ projects }: { projects: IProject[] }) => {
  return (
    <ul className="projects" aria-label="Список проектов">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </ul>
  );
};

export { ProjectList };
export type { IProjectListProps } from './types';
