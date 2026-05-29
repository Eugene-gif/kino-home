import { ref } from 'vue';
import { defineStore } from 'pinia';
import { searchMulti, trendingAll, personPopularList } from '@/api/endpoints';
import { useToast } from 'vue-toastification';

import type { SearchMulti200ResultsItem, PersonPopularList200ResultsItem, ExtendedTrendingAll200ResultsItem } from '@/stores/typesForStores';

export const useSearchStore = defineStore('search', () => {
  const toast = useToast();

  const trendingList = ref<ExtendedTrendingAll200ResultsItem[] | []>([]);
  const personList = ref<PersonPopularList200ResultsItem[] | []>([]);

  const searchedList = ref<SearchMulti200ResultsItem[] | []>([]);
  const isLoading = ref<boolean>(false);
  const isSearchLoading = ref<boolean>(false);
  const isSearchLoaded = ref<boolean>(false);

  const fetchSearchMulti = async (searchStr: string) => {
    isSearchLoading.value = true;
    isLoading.value = true;
    try {
      const { data } = await searchMulti({ query: searchStr });
      searchedList.value = data.results ?? [];
    } catch (err) {
      toast.error('Ошибка поиска, попробуйте позже');
      throw err;
    } finally {
      isLoading.value = false;
      isSearchLoading.value = false;
      isSearchLoaded.value = true;
    }
  }

  const fetchTrendingAll = async () => {
    try {
      const { data } = await trendingAll();
      trendingList.value = data.results ?? [];
    } catch (err) {
      toast.error('Ошибка загрузки трендов');
      throw err;
    }
  }

  const fetchPersonPopularList = async () => {
    try {
      const { data } = await personPopularList();
      personList.value = data.results ?? [];
    } catch (err) {
      toast.error('Ошибка загрузки популярных персон');
      throw err;
    }
  }

  const fetchHeaderData = async () => {
    isLoading.value = true;
    await Promise.allSettled([fetchTrendingAll(), fetchPersonPopularList()]);
    isLoading.value = false;
  }

  return {
    trendingList,
    personList,
    searchedList,
    isLoading,
    isSearchLoading,
    isSearchLoaded,
    fetchSearchMulti,
    fetchTrendingAll,
    fetchPersonPopularList,
    fetchHeaderData
  }
});
