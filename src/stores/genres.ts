import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { mapToRecord } from '@/utils/mapToRecord';
import { getCachedItem, setCachedItem } from '@/utils/storage';
import { genreMovieList, genreTvList } from '@/api/endpoints';
import { STORAGE_KEYS } from '@/constants/constants';
import type { GenreMovieList200GenresItem, GenreTvList200GenresItem } from '@/stores/typesForStores';

export const useGenresStore = defineStore('genres', () => {
  const movies = ref<GenreMovieList200GenresItem[]>([]);
  const tv = ref<GenreTvList200GenresItem[]>([]);
  const moviesMap = computed(() => mapToRecord(movies.value));
  const tvMap = computed(() => mapToRecord(tv.value));

  const initGenres = async () => {
    const cachedMovies = getCachedItem<GenreMovieList200GenresItem[]>(STORAGE_KEYS.MOVIES);
    const cachedTv = getCachedItem<GenreTvList200GenresItem[]>(STORAGE_KEYS.TV);

    if (cachedMovies && cachedTv) {
      movies.value = cachedMovies;
      tv.value = cachedTv;
      console.log('✅ Genres loaded from cache (valid)');
      // console.log(tv.value);
      return;
    }

    await Promise.all([fetchGenresMovies(), fetchGenresTv()]);
  };

  const fetchGenresMovies = async () => {
    try {
      const { data } = await genreMovieList();

      if (Array.isArray(data?.genres)) {
        movies.value = data.genres ?? [];
        setCachedItem(STORAGE_KEYS.MOVIES, movies.value);
      }
    } catch (err) {
      console.error('Failed to fetch genres movies', err);
      throw err;
    }
  }

  const fetchGenresTv = async () => {
    try {
      const { data } = await genreTvList();

      if (Array.isArray(data?.genres)) {
        tv.value = data.genres ?? [];
        setCachedItem(STORAGE_KEYS.TV, tv.value);
      }
    } catch (err) {
      console.error('Failed to fetch genres TV', err);
      throw err;
    }
  }

  const getGenreNamesByIds = (ids: number[], mediaType: 'tv' | 'movie' = 'movie'): string[] => {
    if (!ids?.length) return [];
    const listMap = mediaType === 'tv' ? tvMap : moviesMap;

    return ids
      .map((id) => listMap.value[String(id)])
      .filter(Boolean) as string[];
  };

  return {
    movies,
    tv,
    tvMap,
    moviesMap,
    initGenres,
    fetchGenresMovies,
    fetchGenresTv,
    getGenreNamesByIds
  }
});
