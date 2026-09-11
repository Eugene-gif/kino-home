import { ref, computed } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useGenresStore } from '@/stores/genres';
import { APPEND_TO_RESPONSE_MOVIE } from '@/constants/constants';
import { useToast } from 'vue-toastification';
import { moviePopularList, discoverMovie, movieDetails, movieVideos } from '@/api/endpoints';
import { transformArrayInString } from '@/utils/transformArrayInString';
import { buildImagePath } from '@/utils/images';
import type { MoviePopularList200ResultsItem, MovieDetailsFull } from '@/stores/typesForStores';
import type { GenreWithMoviesType } from '@/stores/typesForStores';

export const useMoviesStore = defineStore('movies', () => {
  const toast = useToast();
  const genresStore = useGenresStore();
  const { movies } = storeToRefs(genresStore);
  const { getGenreNamesByIds } = genresStore;

  const popularMovies = ref<MoviePopularList200ResultsItem[] | []>([]);
  const genreWithMovies = ref<GenreWithMoviesType[] | []>([]);
  const detailsMovie = ref<MovieDetailsFull | null>(null);
  const isLoadingMovieDetails = ref(false);
  const isLoadingGenreWithMovies = ref(false);
  const isLoadingPopularMovies = ref(false);
  const isError = ref(false);

  const uiGenreWithMovies = computed(() => {
    return genreWithMovies.value.map((genre) => {
      return {
        id: genre.id,
        name: genre.name ?? 'Без имени жанра',
        movies:
          genre.movies?.map((film) => {
            return {
              id: film.id,
              title: film.title ?? 'Без имени',
              rating: Number(film?.vote_average ?? 0).toFixed(1),
              imageUrl: buildImagePath(film.poster_path),
              genreNames: getGenreNamesByIds(film.genre_ids ?? []),
              genreStringNames: transformArrayInString(getGenreNamesByIds(film.genre_ids ?? [])),
              mediaType: 'movie',
            };
          }) ?? [],
      };
    });
  });

  const hideAndScrollGenreWithMovies = (blockId: string) => {
    genreWithMovies.value = genreWithMovies.value.slice(0, 3);
    const el = document.getElementById(blockId);

    el?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // Получаем детали фильма по id
  const fetchMovieDetails = async (id: number, append: string = APPEND_TO_RESPONSE_MOVIE) => {
    isLoadingMovieDetails.value = true;
    isError.value = false;
    detailsMovie.value = null;
    try {
      const { data } = await movieDetails(id, { append_to_response: append });
      detailsMovie.value = data;

      if (!data?.videos?.results?.length) {
        await fetchMovieVideos(id);
      }
    } catch (err) {
      toast.error(`Не удалось загрузить фильм: ${id}`);
      isError.value = true;
      throw err;
    } finally {
      isLoadingMovieDetails.value = false;
    }
  }

  const fetchMovieVideos = async (id: number) => {
    isLoadingMovieDetails.value = true;
    isError.value = false;

    try {
      const { data } = await movieVideos(id, { language: 'en-En' });

      if (detailsMovie.value) {
        detailsMovie.value.videos = data;
      }
    } catch (err) {
      toast.error(`Не удалось загрузить трейлер`);
      isError.value = true;
      throw err;
    } finally {
      isLoadingMovieDetails.value = false;
    }
  }

  // Список популярных фильмов
  const fetchPopularMovies = async () => {
    isLoadingPopularMovies.value = true;
    try {
      const { data } = await moviePopularList();
      popularMovies.value = data.results ?? [];
      isError.value = false;
    } catch {
      toast.error('Ошибка загрузки популярных фильмов.');
      isError.value = true;
    } finally {
      isLoadingPopularMovies.value = false;
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
    isLoadingGenreWithMovies.value = true;
    isError.value = false;

    try {
      const genres = limit ? movies.value.slice(0, limit) : movies.value;
      const results = await Promise.allSettled(genres.map((genre) => fetchMoviesByGenre(genre.id)));

      genreWithMovies.value = genres.map((genre, i) => {
        const result = results[i];

        if (result?.status === 'fulfilled') {
          return { ...genre, movies: result.value };
        }

        console.error(`Failed to fetchMoviesByAllGenres: "${genre.name}(id: ${genre.id})":`, result?.reason);
        return { ...genre, movies: [] };
      });
    } catch {
      toast.error('Ошибка загрузки фильмов. Попробуйте позже.');
      isError.value = true;
    } finally {
      isLoadingGenreWithMovies.value = false;
    }
  }

  // единая точка входа для HomeView
  const fetchHomeData = async () => {
    return Promise.allSettled([
      fetchPopularMovies(),
      fetchMoviesByAllGenres(3),
    ]);
  };

  return {
    isError,
    popularMovies,
    genreWithMovies,
    uiGenreWithMovies,
    isLoadingMovieDetails,
    isLoadingGenreWithMovies,
    isLoadingPopularMovies,
    detailsMovie,
    hideAndScrollGenreWithMovies,
    fetchMovieDetails,
    fetchPopularMovies,
    fetchMoviesByGenre,
    fetchMoviesByAllGenres,
    fetchHomeData,
  }
});
