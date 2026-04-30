import type { MoviePopularList200ResultsItem, DiscoverMovie200ResultsItem } from '@/api/types';

export type { MoviePopularList200ResultsItem };

export interface GenreWithMovies {
  id?: number;
  name?: string;
  movies?: DiscoverMovie200ResultsItem[];
};
