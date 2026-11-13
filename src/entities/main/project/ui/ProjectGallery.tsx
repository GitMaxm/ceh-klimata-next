'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import './style.css';

import Image from 'next/image';
import { useState } from 'react';
import { FreeMode, Navigation, Pagination, Thumbs, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { IProjectGalleryProps, TThumbsSwiper } from './galleryTypes';

const ProjectGallery = ({ images }: IProjectGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<TThumbsSwiper>(null);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="project-gallery">
      <h2 className="section-title">
        Фотоотчет – качество, которое видно
        <span className="gallery-count"> ({images.length} фото)</span>
      </h2>

      {/* Основной слайдер */}
      <div className="gallery-main-slider">
        <Swiper
          modules={[Navigation, Pagination, Zoom, Thumbs]}
          spaceBetween={10}
          navigation
          pagination={{
            type: 'fraction',
            clickable: true,
          }}
          zoom
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          className="main-swiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.src}>
              <div className="swiper-zoom-container">
                <div className="swiper-image-wrapper">
                  <Image
                    src={`/img/projects/${image.src}`}
                    alt={image.alt || `Фото ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                    className="gallery-img-full"
                    style={{ objectFit: 'contain' }}
                    quality={90}
                    priority={index === 0}
                  />
                </div>
              </div>
              {image.caption && <div className="swiper-caption">{image.caption}</div>}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Миниатюры */}
      <div className="gallery-thumbs-slider">
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Thumbs]}
          spaceBetween={10}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          className="thumbs-swiper"
          breakpoints={{
            320: {
              slidesPerView: 3,
              spaceBetween: 8,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
          }}
        >
          {images.map((image) => (
            <SwiperSlide key={image.src}>
              <div className="thumb-wrapper">
                <Image
                  src={`/img/projects/${image.src}`}
                  alt={`Миниатюра: ${image.alt}`}
                  width={200}
                  height={150}
                  className="gallery-thumb"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="gallery-hint">
        💡 Нажмите на изображение два раза для увеличения • Используйте стрелки для навигации
      </div>
    </div>
  );
};

export { ProjectGallery };
