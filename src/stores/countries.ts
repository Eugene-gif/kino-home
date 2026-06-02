import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { STORAGE_KEYS } from '@/constants/constants';
import { getCachedItem, setCachedItem } from '@/utils/storage';
import { mapToRecordCountries } from '@/utils/mapToRecord';
import { configurationCountries } from '@/api/endpoints';
import type { ConfigurationCountries200Item } from '@/stores/typesForStores';

export const useCountriesStore = defineStore('countries', () => {
  const toast = useToast();
  const countries = ref<ConfigurationCountries200Item[]>([]);
  const countriesMap = computed(() => mapToRecordCountries(countries.value));

  const initCountries = async () => {
    const cachedCountries = getCachedItem<ConfigurationCountries200Item[]>(STORAGE_KEYS.COUNTRIES);

    if (cachedCountries) {
      countries.value = cachedCountries;
      console.log('✅ Countries loaded from cache (valid)');
      return;
    }

    await fetchCountries();
  };

  const fetchCountries = async () => {
    try {
      const { data } = await configurationCountries();

      if (Array.isArray(data)) {
        countries.value = data ?? [];
        setCachedItem(STORAGE_KEYS.COUNTRIES, countries.value);
      }
    } catch (err) {
      toast.error('Ошибка загрузки стран');
      throw err;
    }
  }

  return {
    countriesMap,
    countries,
    initCountries,
    fetchCountries,
  }
});
