const routeNames = {
  home: 'home',
  collections: 'collections',
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
  collections: '/collections',
  movies: '/movies',
  tv: '/tv',
  movieDetails: 'movies/:id',
  tvDetails: 'tv/:id',

  auth: '/auth',
  login: '/auth/login',
  register: '/auth/register',
} as const;

const route = {
  home: {
    path: '/',
    name: 'home',
  },
  collections: {
    path: '/collections',
    name: 'collections',
  },
  movies: {
    path: '/movies',
    name: 'movies',
  },
  tv: {
    path: '/tv',
    name: 'tv',
  },
  movieDetails: {
    path: 'movies/:id',
    name: 'movie-details',
  },
  tvDetails: {
    path: 'tv/:id',
    name: 'tv-details'
  },
  auth: {
    path: '/auth',
    name: 'auth',
  },
  login: {
    path: '/auth/login',
    name: 'login',
  },
  register: {
    path: '/auth/register',
    name: 'register',
  }
} as const;

const AUTH_PATHES: string[] = [routePaths.auth, routePaths.register, routePaths.login];

export {
  AUTH_PATHES,
  routeNames,
  routePaths,
  route
};
