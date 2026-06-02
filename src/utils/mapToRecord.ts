interface HasIdAndName {
  id?: number | string | null;
  name?: string | null;
}

interface Country {
  iso_3166_1?: string | null;
  english_name?: string;
  native_name?: string;
}

const mapToRecord = <T extends HasIdAndName>(items: T[]): Record<string, string> => {
  return items.reduce<Record<string, string>>((acc, item) => {
    if (item.id != null && item.name) acc[String(item.id)] = item.name;
    return acc;
  }, {});
}

const mapToRecordCountries = <T extends Country>(items: T[]) => {
  return items.reduce<Record<string, T>>((acc, item) => {
    if (item.iso_3166_1 != null && item) acc[String(item.iso_3166_1)] = item;
    return acc;
  }, {});
}

export { mapToRecord, mapToRecordCountries };
