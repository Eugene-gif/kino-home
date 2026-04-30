
const formatDate = (date: string | undefined): string => {
  if (!date) return '';

  const d = new Date(date);

  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).replace(' г.', '');
};

export { formatDate };
