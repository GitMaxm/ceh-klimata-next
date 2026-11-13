import type { Metadata } from 'next';

import { pageMeta } from '@/shared/lib';
import { ContactList, PageIntro } from '@/shared/ui';

import styles from '../../styles/pages/contacts.module.css';

export const metadata: Metadata = pageMeta({
  title: 'Контакты',
  description:
    'Телефон, WhatsApp, Telegram и почта «Цеха Климата». Вентиляция и кондиционирование в Москве.',
  path: '/contacts/',
});

const PREPARE = [
  'Планировку или дизайн-проект, если он есть',
  'Высоту потолков и стадию ремонта',
  'Фото объекта и места под наружный блок',
  'Какие комнаты охлаждать и нужна ли приточная вентиляция',
];

export default function ContactsPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ href: '/contacts/', label: 'Контакты' }]}
        title="Контакты"
        lede="«Цех Климата» работает в Москве. Позвоните или напишите в WhatsApp или Telegram — обсудим объект."
      />
      <section className={`section ${styles.section}`}>
        <div className={`wrap ${styles.grid}`}>
          <div>
            <h2 className="h2">Телефон, мессенджеры и почта</h2>
            <div className={styles.list}>
              <ContactList tone="on-light" size="large" />
            </div>
          </div>
          <div>
            <h2 className={styles.subTitle}>Что пригодится для первого разговора</h2>
            <ul className={styles.prepare}>
              {PREPARE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
