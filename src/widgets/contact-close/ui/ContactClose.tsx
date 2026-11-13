import { COMPANY_CONTACTS } from '@/shared/config';
import { Button, IconTelegram, IconWhatsapp } from '@/shared/ui';

import styles from './ContactClose.module.css';

export const ContactClose = () => (
  <section className={`section ${styles.section}`} data-ground="dark">
    <div className={`wrap ${styles.grid}`}>
      <div>
        <h2 className={styles.title}>Обсудить ваш объект</h2>
        <p className={styles.lede}>
          Расскажите, что за объект и на какой стадии ремонт. Подскажем, какая система подойдёт и что
          нужно подготовить.
        </p>
      </div>
      <div className={styles.contacts} data-primary-actions>
        <a href={`tel:${COMPANY_CONTACTS.phone}`} className={`${styles.phone} mono`}>
          {COMPANY_CONTACTS.formattedPhone}
        </a>
        <div className={styles.messengers}>
          <Button href={COMPANY_CONTACTS.whatsappLink} variant="outline-light" icon={<IconWhatsapp />} external>
            WhatsApp
          </Button>
          <Button href={COMPANY_CONTACTS.telegramLink} variant="outline-light" icon={<IconTelegram />} external>
            Telegram
          </Button>
        </div>
        <a href={COMPANY_CONTACTS.emailLink} className={`${styles.email} mono`}>
          {COMPANY_CONTACTS.email}
        </a>
      </div>
    </div>
  </section>
);
