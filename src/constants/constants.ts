import placeholderImg from '@/assets/images/no-image.webp';

const APP_PREFIX = 'kino_app__';
const DEFAULT_TTL = 24 * 60 * 60 * 1000;
const STORAGE_KEYS = {
  MOVIES: 'genres_movies',
  TV: 'genres_tv',
  COUNTRIES: 'countries',
  USER: 'user',
  SESSION: 'session'
} as const;

const PLACEHOLDER_IMAGE = placeholderImg;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const IMAGE_SIZES: { small: string, medium: string, large: string } = {
  small: 'w300',
  medium: 'w780',
  large: 'w1280',
} as const;

const APPEND_TO_RESPONSE_TV: string = ['credits', 'aggregate_credits', 'reviews', 'similar', 'recommendations', 'images'].join(',');
const APPEND_TO_RESPONSE_MOVIE: string = ['credits', 'aggregate_credits', 'reviews', 'similar', 'recommendations', 'images'].join(',');

// for API
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN as string;
const API_BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL as string;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
const DEFAULT_LANGUAGE = 'ru-RU';

export {
  APP_PREFIX,
  DEFAULT_TTL,
  STORAGE_KEYS,
  PLACEHOLDER_IMAGE,
  IMAGE_BASE_URL,
  IMAGE_SIZES,
  APPEND_TO_RESPONSE_TV,
  APPEND_TO_RESPONSE_MOVIE,
  ACCESS_TOKEN,
  DEFAULT_LANGUAGE,
  API_BASE_URL,
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
}

