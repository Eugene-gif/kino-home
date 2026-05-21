import { ref } from 'vue';
import { defineStore } from 'pinia';
import { searchMulti, trendingAll, personPopularList } from '@/api/endpoints';

import type { SearchMulti200ResultsItem, PersonPopularList200ResultsItem, ExtendedTrendingAll200ResultsItem } from '@/stores/typesForStores';

export const useSearchStore = defineStore('search', () => {
  const searchedList = ref<SearchMulti200ResultsItem[] | []>([]);
  const trendingList = ref<ExtendedTrendingAll200ResultsItem[] | []>([]);
  const personList = ref<PersonPopularList200ResultsItem[] | []>([]);

  const fetchSearchMulti = async (searchStr: string) => {
    try {
      const { data } = await searchMulti({ query: searchStr });
      searchedList.value = data.results ?? [];
    } catch (err) {
      console.error('Failed to fetch searchMulti');
      throw err;
    }
  }

  const clearSearchedList = () => {
    searchedList.value = [];
  }

  const fetchTrendingAll = async () => {
    try {
      const { data } = await trendingAll();
      trendingList.value = data.results ?? [];
      console.log('trendingList.value: ', trendingList.value);
    } catch (err) {
      console.error('Failed to fetch trendingAll');
      throw err;
    }
  }

  const fetchPersonPopularList = async () => {
    try {
      const { data } = await personPopularList();
      personList.value = data.results ?? [];
    } catch (err) {
      console.error('Failed to fetch personPopularList');
      throw err;
    }
  }

  return {
    searchedList,
    trendingList,
    personList,
    fetchSearchMulti,
    clearSearchedList,
    fetchTrendingAll,
    fetchPersonPopularList,
  }
});
