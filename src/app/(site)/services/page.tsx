import type { Metadata } from 'next';

import { getProjectFile } from '@/entities/project';
import { SERVICES } from '@/entities/service';
import { photoSrc, typograph } from '@/shared/lib';
import { PageIntro } from '@/shared/ui';
import { ContactClose } from '@/widgets/contact-close';
import { WorkProcess } from '@/widgets/work-process';

import styles from '../../styles/pages/services.module.css';

export const metadata: Metadata = {
  title: 'Услуги: вентиляция, кондиционирование, проектирование и сервис',
  description:
    'Приточно-вытяжная вентиляция с рекуперацией, канальные кондиционеры, мультисплит и VRF, очистка и увлажнение воздуха, проектирование, монтаж и обслуживание в Москве.',
  alternates: { canonical: '/services/' },
};

export default function ServicesPage() {
  const plan = getProjectFile('capital-towers', 'plan.webp');

  return (
    <>
      <PageIntro
        crumbs={[{ href: '/services/', label: 'Услуги' }]}
        title="Услуги по вентиляции и кондиционированию"
        lede="Подбираем оборудование, проектируем, монтируем, запускаем и обслуживаем. Можно заказать весь цикл или отдельный этап."
      />
      <div className={styles.list}>
        {SERVICES.map((service) => {
          const image =
            service.slug === 'design'
              ? { src: plan.src, width: plan.width, height: plan.height, alt: 'Схема трасс вентиляции и кондиционирования квартиры' }
              : service.photo
                ? { src: photoSrc('capital-towers', service.photo), width: 1200, height: 1600, alt: `${service.title}: фото с объекта` }
                : null;

          return (
            <section key={service.slug} id={service.slug} className={styles.service} data-has-image={Boolean(image)}>
              <div className={`wrap ${styles.grid}`}>
                <div className={styles.text}>
                  <span className={styles.pipe} data-route={service.route} aria-hidden="true" />
                  <h2 className={styles.title}>{typograph(service.title)}</h2>
                  <p className={styles.body}>{typograph(service.text)}</p>
                  <ul className={styles.points}>
                    {service.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
                {image && (
                  <div className={styles.media} data-kind={service.slug === 'design' ? 'plan' : 'photo'}>
                    <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
      <WorkProcess tone="plaster" />
      <ContactClose />
    </>
  );
}
