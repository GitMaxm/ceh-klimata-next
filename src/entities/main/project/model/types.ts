export type TProjectId = number;

export interface IProjectStats {
  area: string;
  duration: string;
  design: string;
}

export interface IProjectSolutionItem {
  title: string;
  description: string;
}

export interface IProjectCta {
  title: string;
  text: string;
}

export interface IGalleryImage {
  src: string;
  alt: string;
  caption: string | null;
}

export interface IProject {
  id: TProjectId;
  title: string;
  location: string;
  subtitle: string;
  category: string;
  mainImage: string;
  stats?: IProjectStats;
  technologies?: string[];
  task?: string;
  solution?: IProjectSolutionItem[];
  details?: string[];
  result?: string;
  cta?: IProjectCta;
  galleryFolder?: string;
  gallery?: IGalleryImage[];
}
