import fs from 'node:fs';
import path from 'node:path';

import { photoSrc, PROJECTS_IMG_ROOT } from '@/shared/lib';

import type { TPhoto } from '../model/types';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

const readWebpSize = (file: string): { width: number; height: number } => {
  const buffer = fs.readFileSync(file);
  const chunk = buffer.toString('ascii', 12, 16);

  if (chunk === 'VP8X') {
    return { width: buffer.readUIntLE(24, 3) + 1, height: buffer.readUIntLE(27, 3) + 1 };
  }

  if (chunk === 'VP8L') {
    const bits = buffer.readUInt32LE(21);

    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }

  return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
};

export const getProjectPhotos = (folder: string): TPhoto[] => {
  const dir = path.join(PUBLIC_DIR, PROJECTS_IMG_ROOT, folder, 'full');

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.webp'))
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
    .map((file) => {
      const name = path.parse(file).name;

      return {
        name,
        src: photoSrc(folder, name),
        thumb: photoSrc(folder, name, 'thumb'),
        ...readWebpSize(path.join(dir, file)),
      };
    });
};

export const getProjectPhoto = (folder: string, name: string): TPhoto | undefined =>
  getProjectPhotos(folder).find((photo) => photo.name === name.padStart(2, '0'));

export const getProjectFile = (folder: string, file: string) => {
  const abs = path.join(PUBLIC_DIR, PROJECTS_IMG_ROOT, folder, file);

  return { src: `${PROJECTS_IMG_ROOT}/${folder}/${file}`, ...readWebpSize(abs) };
};

export const getProjectOg = (folder: string) => {
  const file = path.join(PUBLIC_DIR, PROJECTS_IMG_ROOT, folder, 'og.jpg');

  return fs.existsSync(file)
    ? { url: `${PROJECTS_IMG_ROOT}/${folder}/og.jpg`, width: 1200, height: 630 }
    : undefined;
};
