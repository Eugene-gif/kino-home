import { ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useGenresStore } from '@/stores/genres';
import { moviePopularList, discoverMovie } from '@/api/endpoints';
import type { MoviePopularList200ResultsItem, GenreWithMovies } from '@/stores/movies/moviesTypes';

export const useMoviesStore = defineStore('movies', () => {
  const genresStore = useGenresStore();
  const { movies } = storeToRefs(genresStore);

  const popularMovies = ref<MoviePopularList200ResultsItem[] | []>([]);
  const moviesByAllGenres = ref<GenreWithMovies[] | []>([]);

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
    console.log('genres: ', movies.value);
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
    fetchPopularMovies,
    fetchMoviesByGenre,
    fetchMoviesByAllGenres,
    fetchHomeData
  }
});
