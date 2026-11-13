import { COMPANY_CONTACTS } from '@/shared/config';

import { Button } from '../button';
import { IconPhone, IconTelegram, IconWhatsapp } from '../icons';
import styles from './ContactActions.module.css';

type TContactActionsProps = {
  tone?: 'on-dark' | 'on-light';
  withTelegram?: boolean;
};

export const ContactActions = ({ tone = 'on-dark', withTelegram = false }: TContactActionsProps) => {
  const outline = tone === 'on-dark' ? 'outline-light' : 'outline-dark';

  return (
    <div className={styles.actions} data-primary-actions>
      <Button href={`tel:${COMPANY_CONTACTS.phone}`} icon={<IconPhone />}>
        Позвонить
      </Button>
      <Button href={COMPANY_CONTACTS.whatsappLink} variant={outline} icon={<IconWhatsapp />} external>
        Написать в WhatsApp
      </Button>
      {withTelegram && (
        <Button href={COMPANY_CONTACTS.telegramLink} variant={outline} icon={<IconTelegram />} external>
          Написать в Telegram
        </Button>
      )}
    </div>
  );
};
