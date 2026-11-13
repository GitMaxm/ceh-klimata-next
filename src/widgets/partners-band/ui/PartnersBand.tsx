import { COMPANY_CONTACTS } from '@/shared/config';
import { photoSrc } from '@/shared/lib';
import { Button, IconTelegram } from '@/shared/ui';

import styles from './PartnersBand.module.css';

const POINTS = [
  'Подключаемся на стадии дизайн-проекта',
  'Показываем, где нужны опуски потолка и ревизионные люки',
  'Согласуем положение диффузоров со светом и мебелью',
  'Ведём монтаж так, чтобы отделка не переделывалась',
];

export const PartnersBand = () => (
  <section className={`section ${styles.section}`}>
    <div className={`wrap ${styles.grid}`}>
      <div className={styles.media}>
        <img
          src={photoSrc('capital-towers', '32')}
          alt="Щелевой диффузор над панорамным окном, встроенный в потолок"
          width={1200}
          height={1600}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className={styles.text}>
        <h2 className="h2">Дизайнерам и архитекторам</h2>
        <p className="lede">
          Встраиваем вентиляцию и кондиционирование в ваш проект так, чтобы в интерьере не появилось
          ничего лишнего.
        </p>
        <ul className={styles.points}>
          {POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <Button href={COMPANY_CONTACTS.telegramLink} variant="dark" icon={<IconTelegram />} external>
          Написать в Telegram
        </Button>
      </div>
    </div>
  </section>
);
