import type {
  GenreMovieList200GenresItem,
  GenreTvList200GenresItem,
  SearchMulti200ResultsItem,
  TrendingAll200ResultsItem,
  PersonPopularList200ResultsItem,
  MoviePopularList200ResultsItem,
  DiscoverMovie200ResultsItem,
  TvSeriesDetails200,
  MovieDetails200,
} from '@/api/types';

interface GenreWithMovies {
  id?: number;
  name?: string;
  movies?: DiscoverMovie200ResultsItem[];
};

type ExtendedTrendingAll200ResultsItem = TrendingAll200ResultsItem & { name?: string };

type AppendOptions = 'credits' | 'videos' | 'images' | 'keywords' | 'recommendations' | 'similar' | 'reviews' | 'release_dates' | 'external_ids' | 'translations' | 'aggregate_credits' | 'content_ratings';

export type {
  GenreMovieList200GenresItem,
  GenreTvList200GenresItem,
  SearchMulti200ResultsItem,
  // TrendingAll200ResultsItem,
  PersonPopularList200ResultsItem,
  MoviePopularList200ResultsItem,
  // DiscoverMovie200ResultsItem,
  TvSeriesDetails200,
  MovieDetails200,

  GenreWithMovies,
  ExtendedTrendingAll200ResultsItem,
  AppendOptions,
}
