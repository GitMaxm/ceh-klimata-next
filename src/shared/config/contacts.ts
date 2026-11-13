export const COMPANY_CONTACTS = {
  phone: '+79670666613',
  phoneWhatsapp: '+79257371272',
  phoneTelegram: '+79257371272',

  formattedPhone: '+7 (967) 066-66-13',
  formattedPhoneWhatsapp: '+7 (925) 737-12-72',
  formattedPhoneTelegram: '+7 (925) 737-12-72',

  email: 'ckvent@yandex.ru',
  emailLink: 'mailto:ckvent@yandex.ru',

  telegramLink: 'https://t.me/+79257371272',
  whatsappLink: 'https://wa.me/79257371272',
} as const;

export type TCompanyContacts = typeof COMPANY_CONTACTS;
