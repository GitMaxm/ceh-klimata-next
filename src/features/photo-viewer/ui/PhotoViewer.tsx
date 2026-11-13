'use client';

import { type PointerEvent, useCallback, useEffect, useRef, useState } from 'react';

import type { TPhoto } from '@/entities/project';
import { IconArrowLeft, IconArrowRight, IconClose } from '@/shared/ui';

import styles from './PhotoViewer.module.css';

type TPhotoViewerProps = {
  photos: TPhoto[];
  title: string;
  initialCount?: number;
};

const SWIPE_DISTANCE = 48;

export const PhotoViewer = ({ photos, title, initialCount = 12 }: TPhotoViewerProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const swipeStart = useRef<number | null>(null);
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? photos : photos.slice(0, initialCount);
  const total = photos.length;

  const open = (index: number) => {
    setCurrent(index);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  const step = useCallback(
    (delta: number) => setCurrent((index) => (index + delta + total) % total),
    [total],
  );

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        step(1);
      }

      if (event.key === 'ArrowLeft') {
        step(-1);
      }
    };

    dialog.addEventListener('keydown', onKey);

    return () => dialog.removeEventListener('keydown', onKey);
  }, [step]);

  useEffect(() => {
    const next = photos[(current + 1) % total];

    if (next && dialogRef.current?.open) {
      const preload = new Image();

      preload.src = next.src;
    }
  }, [current, photos, total]);

  const onPointerDown = (event: PointerEvent) => {
    swipeStart.current = event.clientX;
  };

  const onPointerUp = (event: PointerEvent) => {
    if (swipeStart.current === null) {
      return;
    }

    const distance = event.clientX - swipeStart.current;

    swipeStart.current = null;

    if (Math.abs(distance) > SWIPE_DISTANCE) {
      step(distance < 0 ? 1 : -1);
    }
  };

  const photo = photos[current];

  return (
    <>
      <ul className={styles.grid}>
        {visible.map((item, index) => (
          <li key={item.name}>
            <button
              type="button"
              className={styles.thumb}
              onClick={() => open(index)}
              aria-label={`Открыть фото ${index + 1} из ${total}`}
            >
              <img src={item.thumb} alt="" width={item.width} height={item.height} loading="lazy" decoding="async" />
            </button>
          </li>
        ))}
      </ul>

      {!expanded && total > initialCount && (
        <button type="button" className={styles.more} onClick={() => setExpanded(true)}>
          Показать все {total} фото
        </button>
      )}

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        data-ground="dark"
        aria-label={`Фотоотчёт: ${title}`}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            close();
          }
        }}
      >
        {photo && (
          <div className={styles.stage} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
            <img
              key={photo.name}
              src={photo.src}
              alt={`${title}, фото ${current + 1} из ${total}`}
              width={photo.width}
              height={photo.height}
              className={styles.full}
              draggable={false}
            />
          </div>
        )}
        <div className={styles.bar}>
          <span className="mono" aria-live="polite">
            {current + 1} / {total}
          </span>
          <div className={styles.controls}>
            <button type="button" className={styles.control} onClick={() => step(-1)} aria-label="Предыдущее фото">
              <IconArrowLeft />
            </button>
            <button type="button" className={styles.control} onClick={() => step(1)} aria-label="Следующее фото">
              <IconArrowRight />
            </button>
            <button type="button" className={styles.control} onClick={close} aria-label="Закрыть просмотр">
              <IconClose />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
