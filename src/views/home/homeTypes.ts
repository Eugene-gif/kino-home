import type { CardAppType } from '@/components/CardApp/CardApp.types';

export interface HeroSliderItem {
  id?: number | string;
  title: string;
  rating: number;
  imageUrl: string;
  genreIds: number[];
  genreNames: Array<string | undefined>;
  date: string;
}

export interface CatalogGenreWithMovies {
  id?: number | string;
  name: string;
  movies: CardAppType[] | [];
}
