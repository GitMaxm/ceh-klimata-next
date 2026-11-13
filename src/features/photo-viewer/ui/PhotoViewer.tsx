'use client';

import { type MouseEvent, type PointerEvent, useCallback, useEffect, useRef, useState } from 'react';

import type { TPhoto } from '@/entities/project';
import { IconArrowLeft, IconArrowRight, IconClose, IconZoomIn, IconZoomOut } from '@/shared/ui';

import styles from './PhotoViewer.module.css';

type TPhotoViewerProps = {
  photos: TPhoto[];
  title: string;
  initialCount?: number;
};

type TView = { scale: number; x: number; y: number };

const SWIPE_DISTANCE = 48;
const TAP_DISTANCE = 6;
const DOUBLE_TAP_MS = 300;
const ZOOM_STEP = 2.5;
const MAX_SCALE = 5;
const IDLE: TView = { scale: 1, x: 0, y: 0 };

const lockPageScroll = (locked: boolean) => {
  document.documentElement.style.overflow = locked ? 'hidden' : '';
};

const clampView = (view: TView, img: HTMLImageElement | null): TView => {
  if (!img || view.scale <= 1) {
    return IDLE;
  }

  const maxX = ((view.scale - 1) * img.offsetWidth) / 2;
  const maxY = ((view.scale - 1) * img.offsetHeight) / 2;

  return {
    scale: Math.min(view.scale, MAX_SCALE),
    x: Math.max(-maxX, Math.min(maxX, view.x)),
    y: Math.max(-maxY, Math.min(maxY, view.y)),
  };
};

export const PhotoViewer = ({ photos, title, initialCount = 12 }: TPhotoViewerProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef({ startX: 0, startY: 0, moved: false, pinchDistance: 0, pinchScale: 1, base: IDLE });
  const lastTap = useRef(0);
  const pointerType = useRef('mouse');
  const viewRef = useRef<TView>(IDLE);

  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [view, setView] = useState<TView>(IDLE);
  const [dragging, setDragging] = useState(false);

  const visible = expanded ? photos : photos.slice(0, initialCount);
  const total = photos.length;
  const zoomed = view.scale > 1;

  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  const open = (index: number) => {
    setCurrent(index);
    setView(IDLE);
    dialogRef.current?.showModal();
    lockPageScroll(true);
  };

  const close = () => dialogRef.current?.close();

  const step = useCallback(
    (delta: number) => {
      setView(IDLE);
      setCurrent((index) => (index + delta + total) % total);
    },
    [total],
  );

  const zoomAt = useCallback((scale: number, clientX?: number, clientY?: number) => {
    const img = imgRef.current;

    setView((prev) => {
      if (!img || scale <= 1) {
        return IDLE;
      }

      const rect = img.getBoundingClientRect();
      const px = (clientX ?? rect.left + rect.width / 2) - (rect.left + rect.width / 2);
      const py = (clientY ?? rect.top + rect.height / 2) - (rect.top + rect.height / 2);
      const ratio = scale / prev.scale;

      return clampView({ scale, x: prev.x * ratio - px * (ratio - 1), y: prev.y * ratio - py * (ratio - 1) }, img);
    });
  }, []);

  const toggleZoom = (clientX?: number, clientY?: number) => zoomAt(zoomed ? 1 : ZOOM_STEP, clientX, clientY);

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

      if (event.key === '+' || event.key === '=') {
        zoomAt(ZOOM_STEP);
      }

      if (event.key === '-') {
        zoomAt(1);
      }
    };

    const onClose = () => {
      lockPageScroll(false);
      setView(IDLE);
    };

    const onWheel = (event: globalThis.WheelEvent) => {
      if (!event.ctrlKey && viewRef.current.scale <= 1) {
        return;
      }

      event.preventDefault();

      const factor = Math.exp(-event.deltaY * (event.ctrlKey ? 0.01 : 0.002));

      zoomAt(Math.max(1, viewRef.current.scale * factor), event.clientX, event.clientY);
    };

    dialog.addEventListener('keydown', onKey);
    dialog.addEventListener('close', onClose);
    dialog.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      dialog.removeEventListener('keydown', onKey);
      dialog.removeEventListener('close', onClose);
      dialog.removeEventListener('wheel', onWheel);
      lockPageScroll(false);
    };
  }, [step, zoomAt]);

  useEffect(() => {
    const next = photos[(current + 1) % total];

    if (next && dialogRef.current?.open) {
      const preload = new Image();

      preload.src = next.src;
    }
  }, [current, photos, total]);

  const distance = () => {
    const [a, b] = [...pointers.current.values()];

    return a && b ? Math.hypot(a.x - b.x, a.y - b.y) : 0;
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerType.current = event.pointerType;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    gesture.current = {
      ...gesture.current,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
      base: view,
    };

    if (pointers.current.size === 2) {
      gesture.current.pinchDistance = distance();
      gesture.current.pinchScale = view.scale;
    }

    setDragging(true);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) {
      return;
    }

    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    const dx = event.clientX - gesture.current.startX;
    const dy = event.clientY - gesture.current.startY;

    if (Math.hypot(dx, dy) > TAP_DISTANCE) {
      gesture.current.moved = true;
    }

    if (pointers.current.size === 2 && gesture.current.pinchDistance > 0) {
      const scale = Math.max(1, gesture.current.pinchScale * (distance() / gesture.current.pinchDistance));

      setView((prev) => clampView({ ...prev, scale }, imgRef.current));

      return;
    }

    if (gesture.current.base.scale > 1) {
      const { base } = gesture.current;

      setView(clampView({ scale: base.scale, x: base.x + dx, y: base.y + dy }, imgRef.current));
    }
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const wasPinch = pointers.current.size > 1;

    pointers.current.delete(event.pointerId);

    if (pointers.current.size > 0) {
      return;
    }

    setDragging(false);

    const dx = event.clientX - gesture.current.startX;
    const onPhoto = event.target === imgRef.current;

    if (wasPinch || gesture.current.base.scale > 1) {
      if (!gesture.current.moved && !onPhoto) {
        close();
      }

      return;
    }

    if (Math.abs(dx) > SWIPE_DISTANCE) {
      step(dx < 0 ? 1 : -1);

      return;
    }

    if (gesture.current.moved) {
      return;
    }

    if (!onPhoto) {
      close();

      return;
    }

    const now = performance.now();

    if (event.pointerType !== 'mouse' && now - lastTap.current < DOUBLE_TAP_MS) {
      toggleZoom(event.clientX, event.clientY);
      lastTap.current = 0;
    } else {
      lastTap.current = now;
    }
  };

  const onDoubleClick = (event: MouseEvent<HTMLImageElement>) => {
    if (pointerType.current === 'mouse') {
      toggleZoom(event.clientX, event.clientY);
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
          <div
            className={styles.stage}
            data-zoomed={zoomed}
            data-dragging={dragging}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <img
              ref={imgRef}
              key={photo.name}
              src={photo.src}
              alt={`${title}, фото ${current + 1} из ${total}`}
              width={photo.width}
              height={photo.height}
              className={styles.full}
              style={{ transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})` }}
              draggable={false}
              onDoubleClick={onDoubleClick}
            />
          </div>
        )}
        <div className={styles.bar}>
          <span className="mono" aria-live="polite">
            {current + 1} / {total}
          </span>
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.control}
              onClick={() => toggleZoom()}
              aria-label={zoomed ? 'Уменьшить фото' : 'Увеличить фото'}
              aria-pressed={zoomed}
            >
              {zoomed ? <IconZoomOut /> : <IconZoomIn />}
            </button>
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
