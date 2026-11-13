import type { Metadata } from 'next';

import { getProjectPhoto } from '@/entities/project';
import { pageMeta } from '@/shared/lib';
import { PageIntro } from '@/shared/ui';
import { ContactClose } from '@/widgets/contact-close';
import { PartnersBand } from '@/widgets/partners-band';
import { WorkProcess } from '@/widgets/work-process';

import styles from '../../styles/pages/about.module.css';

export const metadata: Metadata = pageMeta({
  title: 'О компании',
  description:
    '«Цех Климата» — инженерная команда в Москве. Более 8 лет проектируем и монтируем вентиляцию и кондиционирование для квартир, домов и коммерческих помещений.',
  path: '/about/',
});

const PRINCIPLES = [
  {
    title: 'Трассы прячем в потолке',
    text: 'Воздуховоды, фреоновые трассы и дренаж проходят над подвесным потолком. В комнате видны только диффузоры и пульт.',
  },
  {
    title: 'Оставляем доступ к узлам',
    text: 'К установкам и блокам ведут ревизионные люки, поэтому фильтры и оборудование обслуживаются без вскрытия отделки.',
  },
  {
    title: 'Монтируем до отделки',
    text: 'Трассы прокладываем на черновой стадии и проверяем до закрытия потолков, чтобы отделку не пришлось переделывать.',
  },
  {
    title: 'Одна команда на всех этапах',
    text: 'Подбор оборудования, проект, монтаж, пусконаладку и сервис ведут одни и те же люди.',
  },
];

const AUDIENCES = [
  {
    title: 'Владельцам квартир и домов',
    text: 'Свежий воздух и прохлада без видимой техники и шума, с учётом стадии ремонта.',
  },
  {
    title: 'Дизайнерам и архитекторам',
    text: 'Инженерный партнёр, который встраивает систему в дизайн-проект и согласует каждую решётку.',
  },
  {
    title: 'Офисам, ресторанам и магазинам',
    text: 'Вентиляция и VRF-системы с раздельным управлением по зонам и аккуратным монтажом.',
  },
];

export default function AboutPage() {
  const photo = getProjectPhoto('capital-towers', '09');

  return (
    <>
      <PageIntro
        crumbs={[{ href: '/about/', label: 'О компании' }]}
        title="Инженерная команда «Цех Климата»"
        lede="Более восьми лет занимаемся вентиляцией и кондиционированием в Москве: квартиры, частные дома, коммерческие помещения."
      />
      <section className={`section ${styles.principles}`}>
        <div className={`wrap ${styles.grid}`}>
          {photo && (
            <div className={styles.media}>
              <img
                src={photo.src}
                alt="Трассы вентиляции под потолком квартиры с панорамным окном до отделки"
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
          <div>
            <h2 className="h2">Как мы работаем на объекте</h2>
            <ul className={styles.list}>
              {PRINCIPLES.map((item) => (
                <li key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className={`section ${styles.audiences}`} data-ground="dark">
        <div className="wrap">
          <h2 className="h2">Для кого мы работаем</h2>
          <ul className={styles.cards}>
            {AUDIENCES.map((item) => (
              <li key={item.title}>
                <span className={styles.pipe} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <WorkProcess />
      <PartnersBand />
      <ContactClose />
    </>
  );
}
