import projectsData from '@content/projects.json';

import type { TProject } from '../model/types';

const projects = projectsData as TProject[];

export const getProjects = (): TProject[] => projects;

export const getProject = (slug: string): TProject | undefined =>
  projects.find((project) => project.slug === slug);
