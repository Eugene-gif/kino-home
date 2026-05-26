import type { RouteRecordRaw } from 'vue-router';
import { routeNames, routePaths } from '@/constants/routesData';
import MainLayout from '@/layouts/MainLayout/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout/AuthLayout.vue';
const HomeView = () => import('@/views/home/HomeView.vue');
const CollectionsView = () => import('@/views/collections/CollectionsView.vue');
const TvListView = () => import('@/views/media/tv/TvView.vue');
const MoviesListView = () => import('@/views/media/movies/MoviesView.vue');
const MovieDetails = () => import('@/views/media/movies/MovieDetails.vue');
const TvDetails = () => import('@/views/media/tv/TvDetails.vue');
const LoginView = () => import('@/views/auth/LoginView.vue');
const RegisterView = () => import('@/views/auth/RegisterView.vue');


export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: MainLayout,
		meta: { requiresAuth: true },
		children: [
			{
				path: routePaths.home,
				name: routeNames.home,
				component: HomeView,
			},
			{
				path: routePaths.collections,
				name: routeNames.collections,
				component: CollectionsView,
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
		],
	},
	{
		path: routePaths.auth,
		component: AuthLayout,
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
