import type { CardAppType } from '@/components/CardApp/CardApp.types';

export interface CatalogGenreWithMovies {
  id?: number | string;
  name: string;
  movies: CardAppType[] | [];
}
