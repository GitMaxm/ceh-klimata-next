export { getProjectById, projectsContent } from './api/projectsContent';
export { getProjectImages } from './lib/getProjectImages';
export type {
  IGalleryImage,
  IProject,
  IProjectCta,
  IProjectSolutionItem,
  IProjectStats,
  TProjectId,
} from './model/types';
export type { IProjectGalleryProps, TThumbsSwiper } from './ui/galleryTypes';
export { ProjectCard } from './ui/ProjectCard';
export { ProjectGallery } from './ui/ProjectGallery';
export type { IProjectCardProps } from './ui/types';
