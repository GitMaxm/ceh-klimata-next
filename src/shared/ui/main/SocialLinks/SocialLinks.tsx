import './style.css';

import type { IconType } from 'react-icons';
import { HiOutlineMail } from 'react-icons/hi';
import { IoCallOutline } from 'react-icons/io5';
import { SiTelegram, SiWhatsapp } from 'react-icons/si';

import { COMPANY_CONTACTS } from '@/shared/config';

interface ISocialLink {
  title: string;
  url: string;
  Icon: IconType;
}

const socialLinks: ISocialLink[] = [
  { title: 'Telegram', url: COMPANY_CONTACTS.telegramLink, Icon: SiTelegram },
  { title: 'WhatsApp', url: COMPANY_CONTACTS.whatsappLink, Icon: SiWhatsapp },
  { title: 'E-mail', url: COMPANY_CONTACTS.emailLink, Icon: HiOutlineMail },
  { title: 'Телефон', url: `tel:${COMPANY_CONTACTS.phone}`, Icon: IoCallOutline },
];

const SocialLinks = () => {
  return (
    <ul className="social">
      {socialLinks.map(({ title, url, Icon }) => (
        <li className="social__item" key={title}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Открыть ${title}`}
            className="social-link"
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
};

export { SocialLinks };
