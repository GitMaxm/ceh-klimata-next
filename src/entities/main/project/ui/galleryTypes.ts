import { Swiper as SwiperCore } from 'swiper';

import type { IGalleryImage } from '../model/types';

export interface IProjectGalleryProps {
  images: IGalleryImage[];
}

export type TThumbsSwiper = SwiperCore | null;
