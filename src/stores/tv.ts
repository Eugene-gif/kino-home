import { ref } from 'vue';
import { defineStore } from 'pinia';
import { /*genreMovieList, moviePopularList,*/ tvSeriesDetails } from '@/api/endpoints';
import type { TvSeriesDetails200, GenreMovieList200GenresItem, AppendOptions } from '@/stores/typesForStores';

export const useTvStore = defineStore('tv', () => {
  const genresTvList = ref<GenreMovieList200GenresItem[] | []>([]);
  const singleTvDetails = ref<TvSeriesDetails200 | null>(null);

  const fetchTvDetails = async (id: number, append: AppendOptions[] = ['credits', 'aggregate_credits', 'reviews', 'similar', 'recommendations', 'images']) => {
    try {
      const { data } = await tvSeriesDetails(id, { append_to_response: append.join(',') });
      console.log(`fetchTvDetails(id: ${id}): `, data);
      singleTvDetails.value = data;
    } catch (err) {
      console.error(`Failed to fetch movie details(id: ${id})`);
      throw err;
    }
  }

  return {
    genresTvList,
    singleTvDetails,
    fetchTvDetails
  }
});
