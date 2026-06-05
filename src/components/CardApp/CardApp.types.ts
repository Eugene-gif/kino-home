export interface CardAppType {
  id?: number | string;
  title: string;
  rating: string | number;
  imageUrl: string;
  genreNames: string[];
  mediaType?: string;
  genreIds?: number[];
  date?: string;
}
