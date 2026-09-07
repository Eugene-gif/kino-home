import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

const formatDateFns = (date: string) => {
  if (!date) return;
  return format(date, 'd MMMM yyyy', { locale: ru });
}

const formatDateFnsWithTime = (isoDate: string) => {
  if (!isoDate) return;
  return format(parseISO(isoDate), "d MMMM yyyy 'в' HH:mm", { locale: ru });
}

const formatDateFnsYear = (date: string) => {
  if (!date) return;
  return format(date, 'yyyy', { locale: ru });
}

const formatMinutesInHours = (runtime: number) => {
  if (!runtime) return 'Нет данных';
  const hours = Math.trunc(runtime / 60);
  const minutes = runtime % 60;

  return hours ? `${hours} ч ${minutes} мин` : `${minutes} мин`;
}

export { formatDateFns, formatDateFnsYear, formatMinutesInHours, formatDateFnsWithTime };
