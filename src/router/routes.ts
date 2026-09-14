import type { RouteRecordRaw } from 'vue-router';
import { routeNames, routePaths } from '@/constants/routesData';
import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
const HomeView = () => import('@/views/home/HomeView.vue');
const FavoriteView = () => import('@/views/favorite/FavoriteView.vue');
const TvListView = () => import('@/views/tv/TvView.vue');
const MoviesListView = () => import('@/views/movies/MoviesView.vue');
const MovieDetails = () => import('@/views/movies/MovieDetails.vue');
const TvDetails = () => import('@/views/tv/TvDetails.vue');
const LoginView = () => import('@/views/auth/LoginView.vue');
const RegisterView = () => import('@/views/auth/RegisterView.vue');
const NotFound = () => import('@/views/NotFound.vue');


export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: routePaths.home,
        name: routeNames.home,
        component: HomeView,
      },
      {
        path: routePaths.favorite,
        name: routeNames.favorite,
        component: FavoriteView,
        meta: { requiresAuth: true },
      },
      {
        path: routePaths.movies,
        name: routeNames.movies,
        component: MoviesListView,
      },
      {
        path: routePaths.tv,
        name: routeNames.tv,
        component: TvListView,
      },
      {
        path: routePaths.movieDetails,
        name: routeNames.movieDetails,
        component: MovieDetails,
        props: true,
      },
      {
        path: routePaths.tvDetails,
        name: routeNames.tvDetails,
        component: TvDetails,
        props: true,
      },
      {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: NotFound,
      },
    ],
  },
  {
    path: routePaths.auth,
    component: AuthLayout,
    meta: { requiresAuth: false },
    children: [
      {
        path: routePaths.login,
        name: routeNames.login,
        component: LoginView
      },
      {
        path: routePaths.register,
        name: routeNames.register,
        component: RegisterView
      },
    ],
  },
];
