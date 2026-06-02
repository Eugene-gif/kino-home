const priceWithSymbol = (num: number): string => {
  return Number(num).toLocaleString('ru-RU') + ' $';
}

export { priceWithSymbol };
