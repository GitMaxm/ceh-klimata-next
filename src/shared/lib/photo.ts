export const PROJECTS_IMG_ROOT = '/img/projects';

export const photoSrc = (folder: string, name: string, size: 'full' | 'thumb' = 'full') =>
  `${PROJECTS_IMG_ROOT}/${folder}/${size}/${name.padStart(2, '0')}.webp`;
