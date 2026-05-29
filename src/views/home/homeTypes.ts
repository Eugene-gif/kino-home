export interface HeroSliderItem {
  id?: number | string;
  title: string;
  rating: number;
  imageUrl: string;
  genreIds: number[];
  genreNames: Array<string | undefined>;
  date: string | undefined;
}

export interface CatalogCardItem {
  id?: number | string;
  title: string;
  rating: string;
  imageUrl: string;
  genreNames: string[];
  mediaType: string;
}

export interface CatalogGenreWithMovies {
  id?: number | string;
  name: string;
  movies: CatalogCardItem[] | [];
}
