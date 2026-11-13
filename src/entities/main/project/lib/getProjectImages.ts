import fs from 'fs';
import path from 'path';

import type { IGalleryImage } from '../model/types';

// Читает файлы галереи проекта из public/img/projects/<folder> на этапе сборки
export const getProjectImages = (projectFolder: string): IGalleryImage[] => {
  try {
    const galleryPath = path.join(process.cwd(), 'public', 'img', 'projects', projectFolder);

    if (!fs.existsSync(galleryPath)) {
      return [];
    }

    const files = fs.readdirSync(galleryPath);

    return files
      .filter((file) => {
        const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(file);
        const fileName = path.parse(file).name.toLowerCase();

        return isImage && fileName !== 'main';
      })
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');

        return numA - numB;
      })
      .map((file, index) => ({
        src: `${projectFolder}/${file}`,
        alt: `Фото проекта ${index + 1}`,
        caption: null,
      }));
  } catch (error) {
    console.error('Error reading gallery folder:', error);
    return [];
  }
};
