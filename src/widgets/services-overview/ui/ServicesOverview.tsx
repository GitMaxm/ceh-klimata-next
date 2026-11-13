import Link from 'next/link';

import { SERVICES } from '@/entities/service';
import { typograph } from '@/shared/lib';
import { IconArrowRight } from '@/shared/ui';

import styles from './ServicesOverview.module.css';

export const ServicesOverview = () => (
  <section className={`section ${styles.section}`} data-ground="dark">
    <div className="wrap">
      <div className={styles.head}>
        <h2 className="h2">Вентиляция, кондиционирование и&nbsp;сервис</h2>
        <Link href="/services/" className={styles.all}>
          Смотреть все услуги
          <IconArrowRight />
        </Link>
      </div>
      <ul className={styles.grid}>
        {SERVICES.map((service) => (
          <li key={service.slug}>
            <Link href={`/services/#${service.slug}`} className={styles.cell}>
              <span className={styles.pipe} data-route={service.route} aria-hidden="true" />
              <h3 className={styles.title}>{typograph(service.title)}</h3>
              <p className={styles.text}>{typograph(service.short)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
