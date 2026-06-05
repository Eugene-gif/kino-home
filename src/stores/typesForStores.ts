// import { MovieRecommendations200 } from './../api/types/movieRecommendations200';
import type {
  GenreMovieList200GenresItem,
  GenreTvList200GenresItem,
  SearchMulti200ResultsItem,
  TrendingAll200ResultsItem,
  PersonPopularList200ResultsItem,
  MoviePopularList200ResultsItem,
  DiscoverMovie200ResultsItem,
  TvSeriesDetails200,
  TvSeriesDetailsParams,
  MovieDetails200,
  MovieCredits200,
  MovieReviews200,
  MovieSimilar200,
  // MovieRecommendations200,
  MovieImages200,
  ConfigurationCountries200Item,
  // MovieDetails200
} from '@/api/types';

interface GenreWithMovies {
  id?: number;
  name?: string;
  movies?: DiscoverMovie200ResultsItem[];
};

type ExtendedTrendingAll200ResultsItem = TrendingAll200ResultsItem & { name?: string };

type AppendOptions = 'credits' | 'videos' | 'images' | 'keywords' | 'recommendations' | 'similar' | 'reviews' | 'release_dates' | 'external_ids' | 'translations' | 'aggregate_credits' | 'content_ratings';

interface RecommendationItem {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  media_type: 'movie' | 'tv' | 'person';
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  softcore: boolean;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieDetailsRecommendations200 {
  page?: number;
  results: RecommendationItem[] | [];
  total_pages?: number;
  total_results?: number;
}

interface MovieDetailsFull extends MovieDetails200 {
  credits?: MovieCredits200;
  reviews?: MovieReviews200;
  similar?: MovieSimilar200;
  recommendations?: MovieDetailsRecommendations200;
  images?: MovieImages200;
}

export type {
  GenreMovieList200GenresItem,
  GenreTvList200GenresItem,
  SearchMulti200ResultsItem,
  // TrendingAll200ResultsItem,
  PersonPopularList200ResultsItem,
  MoviePopularList200ResultsItem,
  // DiscoverMovie200ResultsItem,
  TvSeriesDetails200,
  TvSeriesDetailsParams,
  MovieDetailsFull,
  ConfigurationCountries200Item,

  GenreWithMovies,
  ExtendedTrendingAll200ResultsItem,
  AppendOptions,
}
