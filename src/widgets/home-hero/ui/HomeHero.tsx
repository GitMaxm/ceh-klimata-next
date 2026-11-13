import { SITE_CITY, SITE_EXPERIENCE } from '@/shared/config';
import { photoSrc } from '@/shared/lib';
import { ContactActions } from '@/shared/ui';

import styles from './HomeHero.module.css';

export const HomeHero = () => (
  <section className={styles.hero} data-ground="dark">
    <img
      className={styles.photo}
      src={photoSrc('capital-towers', '04')}
      alt="Гибкие воздуховоды и трассы кондиционеров под бетонным потолком до отделки"
      width={1200}
      height={1600}
      fetchPriority="high"
    />
    <div className={`wrap ${styles.content}`} data-enter>
      <h1 className={styles.title}>Вентиляция и кондиционирование, спрятанные в&nbsp;потолке</h1>
      <div className={styles.row}>
        <p className={styles.lede}>
          Проектируем, монтируем и обслуживаем системы для квартир, домов и офисов в Москве. В готовом
          интерьере остаются только щели диффузоров.
        </p>
        <ContactActions />
      </div>
      <ul className={`${styles.facts} mono`}>
        <li>
          <b>{SITE_EXPERIENCE}</b> в вентиляции и кондиционировании
        </li>
        <li>
          <b>Полный цикл:</b> проект, монтаж, сервис
        </li>
        <li>
          <b>{SITE_CITY}:</b> квартиры, дома, офисы
        </li>
      </ul>
    </div>
  </section>
);
