import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import MainLayout from '@/layouts/MainLayout/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout/AuthLayout.vue';

const HomeView = () => import('@/views/home/HomeView.vue');
const IconsView = () => import('@/views/icons/IconsView.vue');
const TvListView = () => import('@/views/media/tv/TvView.vue');
const MoviesListView = () => import('@/views/media/movies/MoviesView.vue');
const MovieDetails = () => import ('@/views/media/movies/MovieDetails.vue');
const TvDetails = () => import ('@/views/media/tv/TvDetails.vue');
const LoginView = () => import('@/views/auth/LoginView/LoginView.vue');
const RegisterView = () => import('@/views/auth/RegisterView/RegisterView.vue');

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: MainLayout,
		meta: { requiresAuth: true },
		children: [
			{
				path: '/',
				name: 'home',
				component: HomeView,
			},
			{
				path: 'icons',
				name: 'icons',
				component: IconsView,
			},
			{
				path: 'movies',
				name: 'movies',
				component: MoviesListView,
			},
      {
				path: 'tv',
				name: 'tv',
				component: TvListView,
			},
      {
				path: 'movies/:id',
				name: 'movie-details',
				component: MovieDetails,
				props: true, // опционально: прокидываем params.id как props (удобнее типизировать/тестировать)
			},
      {
				path: 'tv/:id',
				name: 'tv-details',
				component: TvDetails,
				props: true,
			},
		],
	},
	{
		path: '/auth',
		component: AuthLayout,
		children: [
			{ path: 'login', name: 'login', component: LoginView },
			{ path: 'register', name: 'register', component: RegisterView },
		],
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

// Далее будем брать из pinia + localStorage
function getIsAuth(): boolean {
	return true;
}

router.beforeEach((to, from, next) => {
	const isAuth = getIsAuth(); // Есть ключ
	const isAuthRequired = to.meta.requiresAuth === true; // Требуется ли авторизация для роута

	const params = { to, from, next };

	console.log(isAuthRequired, isAuth, params);

	if (isAuthRequired && !isAuth) {
		// Требуется авторизация и нет ключа
		console.log('Требуется авторизация и нет ключа направляем на логин');
		next({ name: 'login' });
	} else if (!isAuthRequired && isAuth && ['login', 'register'].includes(to.name as string)) {
		console.log('Уже вошёл, но лезет на login, направляем на главную');
		next({ name: 'home' });
	} else {
		next();
	}
});

export default router;
