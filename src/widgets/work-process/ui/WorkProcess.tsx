import { Reveal } from '@/shared/ui';

import styles from './WorkProcess.module.css';

const STEPS = [
  { title: 'Подбор оборудования', text: 'Выбираем тип системы под объект, потолки и бюджет.' },
  { title: 'Проектирование', text: 'Считаем воздухообмен и мощность, рисуем трассы и места диффузоров.' },
  { title: 'Монтаж', text: 'Прокладываем воздуховоды, фреоновые трассы и дренаж до отделки.' },
  { title: 'Пусконаладка', text: 'Ставим диффузоры после отделки, запускаем и настраиваем систему.' },
  { title: 'Обслуживание', text: 'Меняем фильтры, проверяем оборудование, настраиваем режимы.' },
];

type TWorkProcessProps = {
  tone?: 'concrete' | 'plaster';
};

export const WorkProcess = ({ tone = 'concrete' }: TWorkProcessProps) => (
  <section className={`section ${styles.section}`} data-tone={tone}>
    <div className="wrap">
      <h2 className="h2">Этапы работы</h2>
      <p className="lede">
        Все этапы ведёт одна команда, поэтому трассы из проекта совпадают с тем, что смонтировано, а
        сервис знает систему изнутри.
      </p>
      <Reveal className={styles.track}>
        <span className={styles.line} aria-hidden="true" />
        <ol className={styles.steps}>
          {STEPS.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={`${styles.num} mono`}>{String(index + 1).padStart(2, '0')}</span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{step.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  </section>
);
