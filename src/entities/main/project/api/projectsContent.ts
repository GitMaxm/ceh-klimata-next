import projectsJson from '@content/projects.json';

import type { IProject, TProjectId } from '../model/types';

export const projectsContent = projectsJson as IProject[];

export const getProjectById = (id: string): IProject | undefined =>
  projectsContent.find((project) => project.id.toString() === id);

export type { IProject, TProjectId };
