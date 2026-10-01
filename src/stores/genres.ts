import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { mapToRecord } from '@/utils/mapToRecord';
import { getCachedItem, setCachedItem } from '@/utils/storage';
import { genreMovieList, genreTvList } from '@/api/endpoints';
import { STORAGE_KEYS } from '@/constants/constants';
import { reportError } from '@/utils/reportError';
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
      reportError(err, {
        operation: 'fetchGenresMovies',
        service: 'tmdb',
      });
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
      reportError(err, {
        operation: 'fetchGenresTv',
        service: 'tmdb',
      });
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
