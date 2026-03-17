const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN as string;
const DEFAULT_LANGUAGE = 'ru-RU';
const API_BASE_URL = 'https://api.themoviedb.org/3';

const getBody = <T>(c: Response | Request): Promise<T> => {
  const contentType = c.headers.get('content-type');

  if (contentType && contentType?.includes('application/json')) {
    return c.json() as Promise<T>;
  }

  if (contentType && contentType?.includes('application/pdf')) {
    return c.blob() as Promise<T>;
  }

  return c.text() as Promise<T>;
};

const getUrl = (contextUrl: string): string => {
  const url = new URL(contextUrl, API_BASE_URL);

  if (!url.searchParams.has('language')) {
    url.searchParams.set('language', DEFAULT_LANGUAGE);
  }

  return url.toString();
};

const getHeaders = (headers?: HeadersInit): HeadersInit => ({
  Accept: 'application/json',
  Authorization: `Bearer ${ACCESS_TOKEN}`,
  ...headers,
});

export const appFetch = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  if (!ACCESS_TOKEN) {
    throw new Error('ACCESS_TOKEN is missing');
  }

  const requestUrl = getUrl(url);
  const response = await fetch(requestUrl, {
    ...options,
    headers: getHeaders(options.headers),
  });

  const data = await getBody<T>(response);

  if (!response.ok) {
    console.error('TMDB request failed:', {
      url: requestUrl,
      status: response.status,
      statusText: response.statusText,
      data,
    });

    throw {
      status: response.status,
      data,
      headers: response.headers,
    }
  }

  return { status: response.status, data, headers: response.headers } as T;
};
