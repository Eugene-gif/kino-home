import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const formatDateFns = (date: string) => {
  return format(date, 'd MMMM yyyy', { locale: ru });
}

export { formatDateFns };
