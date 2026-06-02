import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const formatDateFns = (date: string) => {
  if (!date) return;
  return format(date, 'd MMMM yyyy', { locale: ru });
}

const formatDateFnsYear = (date: string) => {
  if (!date) return;
  return format(date, 'yyyy', { locale: ru });
}

const formatMinutesInHours = (runtime: number) => {
  if (!runtime) return 'Не известно';
  const hours = Math.trunc(runtime / 60);
  const minutes = runtime % 60;

  return hours ? `${hours} ч ${minutes} мин` : `${minutes} мин`;
}

export { formatDateFns, formatDateFnsYear, formatMinutesInHours };
