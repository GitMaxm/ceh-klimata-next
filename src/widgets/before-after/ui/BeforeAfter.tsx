import Link from 'next/link';

import type { TPhoto, TProject } from '@/entities/project';
import { IconArrowRight, Reveal } from '@/shared/ui';

import styles from './BeforeAfter.module.css';

type TBeforeAfterProps = {
  project: TProject;
  before: TPhoto;
  after: TPhoto[];
};

export const BeforeAfter = ({ project, before, after }: TBeforeAfterProps) => (
  <section className={`section ${styles.section}`}>
    <div className="wrap">
      <div className={styles.head}>
        <h2 className="h2">Вся инженерия уходит в&nbsp;потолок</h2>
        <p className="lede">
          Воздуховоды и фреоновые трассы ведём ровно и закрываем отделкой. В комнате остаются щелевые
          диффузоры и пульт на стене, а к узлам сохраняется доступ для обслуживания.
        </p>
      </div>
      <Reveal className={styles.grid}>
        <div className={styles.col} data-reveal-item>
          <h3 className={styles.colTitle}>Монтаж до отделки</h3>
          <div className={`${styles.frame} ${styles.tall}`}>
            <img src={before.src} alt="Воздуховоды, фреоновые трассы и спринклерные трубы под бетонным потолком" width={before.width} height={before.height} loading="lazy" decoding="async" />
          </div>
        </div>
        <div className={styles.col} data-reveal-item>
          <h3 className={styles.colTitle}>Готовая квартира</h3>
          <div className={styles.stack}>
            {after.map((photo, index) => (
              <div key={photo.name} className={styles.frame}>
                <img
                  src={photo.src}
                  alt={index === 0 ? 'Два щелевых диффузора в белом потолке готовой комнаты' : 'Щелевой диффузор, встроенный в белый потолок'}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
      <Link href={`/projects/${project.slug}/`} className={styles.link}>
        Смотреть фотоотчёт {project.title}
        <IconArrowRight />
      </Link>
    </div>
  </section>
);
