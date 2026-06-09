import { ref } from 'vue';
import { defineStore } from 'pinia';
import { tvSeriesDetails } from '@/api/endpoints';
import { APPEND_TO_RESPONSE_TV } from '@/constants/constants';
import { useToast } from 'vue-toastification';
import type { TvDetailsFull } from '@/stores/typesForStores';


export const useTvStore = defineStore('tv', () => {
  const toast = useToast();
  // const genresTvList = ref<GenreMovieList200GenresItem[] | []>([]);
  const isLoadingTvDetails = ref(false);
  const isError = ref(false);
  const detailsTv = ref<TvDetailsFull | null>(null);

  // Получаем детали сериала по id
  const fetchTvDetails = async (id: number, append: string = APPEND_TO_RESPONSE_TV) => {
    isLoadingTvDetails.value = true;
    isError.value = false;
    detailsTv.value = null;
    try {
      const { data } = await tvSeriesDetails(id, { append_to_response: append });
      detailsTv.value = data;
    } catch {
      isError.value = true;
      toast.error(`Не удалось загрузить сериал: ${id}`);
    } finally {
      isLoadingTvDetails.value = false;
    }
  }

  return {
    isLoadingTvDetails,
    isError,
    detailsTv,
    fetchTvDetails
  }
});
