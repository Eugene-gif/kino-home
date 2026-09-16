const routeNames = {
  home: 'home',
  favorite: 'favorite',
  movies: 'movies',
  movieDetails: 'movie-details',
  tv: 'tv',
  tvDetails: 'tv-details',

  auth: 'auth',
  login: 'login',
  register: 'register',
} as const;

const routePaths = {
  home: '/',
  favorite: '/favorite',
  movies: '/movies',
  tv: '/tv',
  movieDetails: 'movies/:id',
  tvDetails: 'tv/:id',

  auth: '/auth',
  login: '/auth/login',
  register: '/auth/register',
} as const;

const AUTH_PATHES: string[] = [routePaths.auth, routePaths.register, routePaths.login];

export {
  AUTH_PATHES,
  routeNames,
  routePaths,
};
