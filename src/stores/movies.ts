import { ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useGenresStore } from '@/stores/genres';
import { APPEND_TO_RESPONSE_MOVIE } from '@/constants/constants';
import { useToast } from 'vue-toastification';
import { moviePopularList, discoverMovie, movieDetails } from '@/api/endpoints';
import type { MoviePopularList200ResultsItem, MovieDetails200, GenreWithMovies } from '@/stores/typesForStores';

export const useMoviesStore = defineStore('movies', () => {
  const toast = useToast();
  const genresStore = useGenresStore();
  const { movies } = storeToRefs(genresStore);

  const popularMovies = ref<MoviePopularList200ResultsItem[] | []>([]);
  const moviesByAllGenres = ref<GenreWithMovies[] | []>([]);
  const isLoadingMovieDetails = ref(false);
  const isError = ref(false);
  const singleMovieDetails = ref<MovieDetails200 | null>(null);

  // Получаем детали фильма по id
  const fetchMovieDetails = async (id: number, append: string = APPEND_TO_RESPONSE_MOVIE) => {
    isLoadingMovieDetails.value = true;
    isError.value = false;
    singleMovieDetails.value = null;
    try {
      const { data } = await movieDetails(id, { append_to_response: append });
      singleMovieDetails.value = data;
    } catch {
      isError.value = true;
      toast.error(`Не удалось загрузить фильм: ${id}`);
    } finally {
      isLoadingMovieDetails.value = false;
    }
  }

  // Список популярных фильмов
  const fetchPopularMovies = async () => {
    const { data, status } = await moviePopularList();

    if (status >= 200 && status < 300) {
      popularMovies.value = data.results ?? [];
    }
  }

  // Список фильмов по жанру
  const fetchMoviesByGenre = async (genreId: string | number | undefined) => {
    const id = typeof genreId === 'number' ? String(genreId) : genreId;
    const { data } = await discoverMovie({ with_genres: id });
    return data.results;
  }

  // Списки фильмов по всем жанрам
  const fetchMoviesByAllGenres = async (limit?: number) => {
    const genres = limit ? movies.value.slice(0, limit) : movies.value;
    const results = await Promise.allSettled(genres.map((genre) => fetchMoviesByGenre(genre.id)));

    moviesByAllGenres.value = genres.map((genre, i) => {
      const result = results[i];

      if (result?.status === 'fulfilled') {
        return { ...genre, movies: result.value };
      }

      console.error(`Failed to fetch movies by all genres "${genre.name}(id: ${genre.id})":`, result?.reason);
      return { ...genre, movies: [] };
    });
  }

  // единая точка входа для HomeView
  const fetchHomeData = async () => {
    return Promise.allSettled([
      fetchPopularMovies(),
      fetchMoviesByAllGenres(3),
    ]);
  };


  return {
    popularMovies,
    moviesByAllGenres,
    isLoadingMovieDetails,
    isError,
    singleMovieDetails,
    fetchMovieDetails,
    fetchPopularMovies,
    fetchMoviesByGenre,
    fetchMoviesByAllGenres,
    fetchHomeData,
  }
});
