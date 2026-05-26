import { IMAGE_BASE_URL, PLACEHOLDER_IMAGE, IMAGE_SIZES } from "@/constants/constants";

const onImgError = (evt: Event): void => {
  const img = evt.currentTarget as HTMLImageElement | null;
  if (!img) return;

  img.onerror = null;
  img.src = '/no-image.webp';
};

const buildImagePath = (
  path: string | null | undefined,
  size: keyof typeof IMAGE_SIZES = 'medium'
): string => {
  if (path) return `${IMAGE_BASE_URL}${IMAGE_SIZES[size]}${path}`;

  return PLACEHOLDER_IMAGE;
}

export { onImgError, buildImagePath };
