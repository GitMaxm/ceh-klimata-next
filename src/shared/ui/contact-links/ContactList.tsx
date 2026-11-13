import { COMPANY_CONTACTS } from '@/shared/config';

import { IconMail, IconPhone, IconTelegram, IconWhatsapp } from '../icons';
import styles from './ContactList.module.css';

const ITEMS = [
  {
    key: 'phone',
    label: 'Телефон',
    value: COMPANY_CONTACTS.formattedPhone,
    href: `tel:${COMPANY_CONTACTS.phone}`,
    icon: <IconPhone />,
    external: false,
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    value: COMPANY_CONTACTS.formattedPhoneWhatsapp,
    href: COMPANY_CONTACTS.whatsappLink,
    icon: <IconWhatsapp />,
    external: true,
  },
  {
    key: 'telegram',
    label: 'Telegram',
    value: COMPANY_CONTACTS.formattedPhoneTelegram,
    href: COMPANY_CONTACTS.telegramLink,
    icon: <IconTelegram />,
    external: true,
  },
  {
    key: 'email',
    label: 'Почта',
    value: COMPANY_CONTACTS.email,
    href: COMPANY_CONTACTS.emailLink,
    icon: <IconMail />,
    external: false,
  },
] as const;

type TContactKey = (typeof ITEMS)[number]['key'];

type TContactListProps = {
  tone?: 'on-dark' | 'on-light';
  size?: 'default' | 'large';
  only?: TContactKey[];
};

export const ContactList = ({ tone = 'on-dark', size = 'default', only }: TContactListProps) => (
  <ul className={styles.list} data-tone={tone} data-size={size} data-primary-actions>
    {ITEMS.filter((item) => !only || only.includes(item.key)).map((item) => (
      <li key={item.label}>
        <a
          href={item.href}
          className={styles.row}
          {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          <span className={styles.label}>
            {item.icon}
            {item.label}
          </span>
          <span className={styles.value}>{item.value}</span>
        </a>
      </li>
    ))}
  </ul>
);
