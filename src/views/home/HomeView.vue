<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useToast } from 'vue-toastification';
	import { useGenresStore } from '@/stores/genres';
	import { useMoviesStore } from '@/stores/movies';
	import { buildImagePath } from '@/utils/images';
	import { formatDateFns } from '@/utils/date';

	import LoaderApp from '@/components/Loader/LoaderApp.vue';
	import HeroSlider from '@/views/home/components/SectionHero/HeroSlider.vue';
	import SectionHero from '@/views/home/components/SectionHero/SectionHero.vue';
	import SectionAdvantages from '@/views/home/components/SectionAdvantages.vue';
	import SectionTariffs from '@/views/home/components/SectionTariffs.vue';
	import SectionDiscounts from '@/views/home/components/SectionDiscounts.vue';
	import SectionCatalog from '@/views/home/components/SectionCatalog.vue';
	import SectionCatalogGenre from '@/views/home/components/SectionCatalogGenre.vue';

	import type { CatalogGenreWithMovies } from '@/views/home/homeTypes';
	import type { CardAppType } from '@/components/CardApp/CardApp.types';
	import ButtonApp from '@/components/Button/ButtonApp.vue';

	const toast = useToast();

	const genresStore = useGenresStore();
	const { getMovieGenreNamesByIds } = genresStore;

	const moviesStore = useMoviesStore();
	const { fetchMoviesByAllGenres, fetchHomeData } = moviesStore;
	const { popularMovies, moviesByAllGenres } = storeToRefs(moviesStore);

	const isLoading = ref(true);
	const isLoadingMoviesByAllGenres = ref(false);
	const isError = ref(false);

	const heroSliderItems = computed<CardAppType[]>(() => {
		return popularMovies.value.map((movie) => ({
			id: movie.id,
			title: movie.title ?? 'Без имени',
			rating: movie.vote_average ?? 0,
			imageUrl: buildImagePath(movie.poster_path),
			genreIds: movie.genre_ids ?? [],
			genreNames: getMovieGenreNamesByIds(movie.genre_ids ?? []),
			date: formatDateFns(movie.release_date ?? ''),
		}));
	});

	const catalogSlidersList = computed<CatalogGenreWithMovies[]>(() => {
		return moviesByAllGenres.value.map((genre) => {
			return {
				id: genre.id,
				name: genre.name ?? 'Без имени жанра',
				movies:
					genre.movies?.map((film) => {
						return {
							id: film.id,
							title: film.title ?? 'Без имени',
							rating: film.vote_average?.toFixed(1) ?? '0.0',
							imageUrl: buildImagePath(film.poster_path),
							genreNames: getMovieGenreNamesByIds(film.genre_ids ?? []),
							mediaType: 'movie',
						};
					}) ?? [],
			};
		});
	});

	const loadHomeData = async () => {
		try {
			const results = await fetchHomeData();

			const labels = ['популярных фильмов', 'фильмов по жанрам'];

			const failed = results
				.map((r, i) => (r.status === 'rejected' ? labels[i] : null))
				.filter((x): x is string => x !== null);

			if (failed.length) {
				toast.error(`Ошибка загрузки данных`);
				isError.value = true;
			}
		} finally {
			isLoading.value = false;
		}
	};

	const loadMoviesByAllGenre = async () => {
		isLoadingMoviesByAllGenres.value = true;
		await fetchMoviesByAllGenres();
		isLoadingMoviesByAllGenres.value = false;
	};

	onMounted(loadHomeData);
</script>

<template>
	<div class="home">
		<h1 class="visually-hidden title">Главная страница</h1>

		<SectionHero v-if="!isLoading && !isError">
			<template #heroSlider>
				<HeroSlider :heroItems="heroSliderItems" />
			</template>
		</SectionHero>
		<div v-else-if="isError">Данные не загружены, попробуйте позже</div>
		<LoaderApp v-else />

		<SectionAdvantages />

		<SectionCatalog v-if="!isLoading && !isError">
			<template #genres>
				<SectionCatalogGenre
					v-for="genre in catalogSlidersList"
					:key="genre.id"
					:genreTitle="genre.name"
					:movies="genre.movies"
				/>
				<LoaderApp v-if="isLoadingMoviesByAllGenres" />
			</template>
			<template #button>
				<ButtonApp v-if="catalogSlidersList.length < 6" @click="loadMoviesByAllGenre">
					Посмотреть всё
				</ButtonApp>
			</template>
		</SectionCatalog>

		<div v-else-if="isError">Данные не загружены, попробуйте позже</div>
		<LoaderApp v-else />

		<SectionTariffs />
		<SectionDiscounts />
	</div>
</template>

<style scoped></style>
