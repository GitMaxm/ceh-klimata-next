const formatter = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

export const formatDate = (iso: string) => formatter.format(new Date(`${iso}T12:00:00`));
