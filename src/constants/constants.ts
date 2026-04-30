import placeholderImg from '@/assets/images/no-image.webp';

export const APP_PREFIX = 'kino_app__';
export const DEFAULT_TTL = 24 * 60 * 60 * 1000;

export const PLACEHOLDER_IMAGE = placeholderImg;
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
export const IMAGE_SIZES: { small: string, medium: string, large: string } = {
  small: 'w300',
  medium: 'w780',
  large: 'w1280',
} as const;
