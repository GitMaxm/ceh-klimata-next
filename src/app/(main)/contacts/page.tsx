import type { Metadata } from 'next';

import { COMPANY_CONTACTS } from '@/shared/config';

export const metadata: Metadata = {
  title: 'Контакты',
  description:
    'Свяжитесь с Цехом Климата: телефон, WhatsApp, Telegram и e-mail. Москва и Московская область.',
};

const ContactsPage = () => {
  return (
    <main className="section">
      <div className="container">
        <h1 className="title-1">Контакты</h1>

        <ul className="content-list">
          <li className="content-list__item">
            <h2 className="title-2">Локация</h2>
            <p>Москва, Россия</p>
          </li>

          <li className="content-list__item">
            <h2 className="title-2">Телефон</h2>
            <p>
              <a href={`tel:${COMPANY_CONTACTS.phone}`}>{COMPANY_CONTACTS.formattedPhone}</a>
            </p>
          </li>

          <li className="content-list__item">
            <h2 className="title-2">WhatsApp</h2>
            <p>
              <a
                href={COMPANY_CONTACTS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Написать нам в WhatsApp"
              >
                Написать нам
              </a>
            </p>
          </li>

          <li className="content-list__item">
            <h2 className="title-2">Telegram</h2>
            <p>
              <a
                href={COMPANY_CONTACTS.telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Написать нам в Telegram"
              >
                Написать нам
              </a>
            </p>
          </li>

          <li className="content-list__item">
            <h2 className="title-2">E-mail</h2>
            <p>
              <a href={COMPANY_CONTACTS.emailLink} aria-label="Написать нам на email">
                {COMPANY_CONTACTS.email}
              </a>
            </p>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default ContactsPage;
