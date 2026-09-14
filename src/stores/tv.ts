import { ref, computed } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useGenresStore } from '@/stores/genres';
import { tvSeriesDetails, discoverTv, tvSeriesVideos } from '@/api/endpoints';
import { APPEND_TO_RESPONSE_TV } from '@/constants/constants';
import { useToast } from 'vue-toastification';
import { buildImagePath } from '@/utils/images';
import { transformArrayInString } from '@/utils/transformArrayInString';
import type { TvDetailsFull } from '@/stores/typesForStores';
import type { GenreWithTvType } from '@/stores/typesForStores';

export const useTvStore = defineStore('tv', () => {
  const toast = useToast();
  const genresStore = useGenresStore();
  const { tv } = storeToRefs(genresStore);
  const { getGenreNamesByIds } = genresStore;

  const genreWithTvs = ref<GenreWithTvType[] | []>([]);
  const isLoadingGenreWithTvs = ref(false);
  const isLoadingTvDetails = ref(false);
  const isError = ref(false);
  const detailsTv = ref<TvDetailsFull | null>(null);

  const uiGenreWithTvs = computed(() => {
    return genreWithTvs.value.map((genre) => {
      return {
        id: genre.id,
        name: genre.name ?? 'Без имени жанра',
        tvs:
          genre.tvs?.map((tv) => {
            return {
              id: tv.id,
              title: tv.name ?? 'Без имени',
              rating: Number(tv?.vote_average ?? 0).toFixed(1),
              imageUrl: buildImagePath(tv.poster_path),
              genreNames: getGenreNamesByIds(tv.genre_ids ?? []),
              genreStringNames: transformArrayInString(getGenreNamesByIds(tv.genre_ids ?? [])),
              mediaType: 'tv',
            };
          }) ?? [],
      };
    });
  });

  const hideAndScrollGenreWithTvs = (blockId: string) => {
    genreWithTvs.value = genreWithTvs.value.slice(0, 3);
    const el = document.getElementById(blockId);

    el?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // Получаем детали сериала по id
  const fetchTvDetails = async (id: number, append: string = APPEND_TO_RESPONSE_TV) => {
    isLoadingTvDetails.value = true;
    isError.value = false;
    detailsTv.value = null;
    try {
      const { data } = await tvSeriesDetails(id, { append_to_response: append });
      detailsTv.value = data;

      if (!data?.videos?.results?.length) {
        await fetchTvVideos(id);
      }
    } catch {
      isError.value = true;
      toast.error(`Не удалось загрузить сериал: ${id}`);
    } finally {
      isLoadingTvDetails.value = false;
    }
  }

  const fetchTvVideos = async (id: number) => {
    isLoadingTvDetails.value = true;
    isError.value = false;

    try {
      const { data } = await tvSeriesVideos(id, { language: 'en-En' });

      if (detailsTv.value) {
        detailsTv.value.videos = data;
      }
    } catch (err) {
      toast.error(`Не удалось загрузить трейлер`);
      isError.value = true;
      throw err;
    } finally {
      isLoadingTvDetails.value = false;
    }
  }

  // Список сериалов по жанру
  const fetchTvByGenre = async (genreId: string | number | undefined) => {
    const id = typeof genreId === 'number' ? String(genreId) : genreId;
    const { data } = await discoverTv({ with_genres: id });
    return data.results;
  }

  // Списки сериалов по всем жанрам
  const fetchTvByAllGenres = async (limit?: number) => {
    isLoadingGenreWithTvs.value = true;
    isError.value = false;

    try {
      const genres = limit ? tv.value.slice(0, limit) : tv.value;
      const results = await Promise.allSettled(genres.map((genre) => fetchTvByGenre(genre.id)));

      genreWithTvs.value = genres.map((genre, i) => {
        const result = results[i];

        if (result?.status === 'fulfilled') {
          return { ...genre, tvs: result.value };
        }

        console.error(`Failed to fetchTvByAllGenres: "${genre.name}(id: ${genre.id})":`, result?.reason);
        return { ...genre, tvs: [] };
      });
    } catch {
      toast.error('Ошибка загрузки фильмов. Попробуйте позже.');
      isError.value = true;
    } finally {
      isLoadingGenreWithTvs.value = false;
    }
  }

  return {
    isError,
    genreWithTvs,
    uiGenreWithTvs,
    isLoadingTvDetails,
    isLoadingGenreWithTvs,
    detailsTv,
    hideAndScrollGenreWithTvs,
    fetchTvDetails,
    fetchTvByAllGenres
  }
});
