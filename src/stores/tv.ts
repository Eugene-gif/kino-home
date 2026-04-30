import { ref } from 'vue';
import { defineStore } from 'pinia';
// import { genreMovieList, moviePopularList } from '@/api/endpoints';
import type { GenreMovieList200GenresItem } from '@/api/types'; 

export const useTvStore = defineStore('tv', () => {
  const genresTvList = ref<GenreMovieList200GenresItem[] | []>([]);

  // const fetchGenresMovies = async () => {
  //   const response = await genreMovieList();
  //   const { data } = response;
  //   if (response.status >= 200 && response.status < 300) {
  //     genresMoviesList.value = data.genres ?? [];
  //   }
  // }

  // const fetchPopularMovies = async () => {
  //   const response = await moviePopularList();
  //   console.log(response);
  // }

  return {
    genresTvList,
  }
});
