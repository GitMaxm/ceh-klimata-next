export type TProjectSpec = {
  label: string;
  value: string;
};

export type TProject = {
  slug: string;
  title: string;
  objectType: string;
  location: string;
  summary: string;
  specs: TProjectSpec[];
  equipment: string[];
  task: string;
  solution: { title: string; text: string; route: 'air' | 'cold' | 'work' }[];
  cover: string;
  before: string;
  after: string[];
  plan?: string;
  folder: string;
};

export type TPhoto = {
  name: string;
  src: string;
  thumb: string;
  width: number;
  height: number;
};
