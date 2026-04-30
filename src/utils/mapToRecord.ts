interface HasIdAndName {
  id?: number | string | null;
  name?: string | null;
}

export const mapToRecord = <T extends HasIdAndName>(items: T[]): Record<string, string> => {
  return items.reduce<Record<string, string>>((acc, item) => {
    if (item.id != null && item.name) acc[String(item.id)] = item.name;
    return acc;
  }, {});
}
