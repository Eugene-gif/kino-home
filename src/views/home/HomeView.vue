<script setup lang="ts">
	import { ref, computed, onMounted, useId } from 'vue';
	import { storeToRefs } from 'pinia';
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
	import SingleSliderList from '@/components/SingleSliderList/SingleSliderList.vue';

	import type { GenreWithMoviesType } from '@/stores/typesForStores';
	import ButtonApp from '@/components/Button/ButtonApp.vue';

	const genresStore = useGenresStore();
	const { getGenreNamesByIds } = genresStore;

	const moviesStore = useMoviesStore();
	const { fetchMoviesByAllGenres, fetchHomeData, hideAndScrollGenreWithMovies } = moviesStore;
	const {
		popularMovies,
		uiGenreWithMovies,
		isLoadingGenreWithMovies,
		isLoadingPopularMovies,
		isError,
	} = storeToRefs(moviesStore);

	const isLoading = ref(true);
	const blockId = useId();

	const heroSliderItems = computed<GenreWithMoviesType[]>(() => {
		return popularMovies.value.map((movie) => ({
			id: movie.id,
			title: movie.title ?? 'Без имени',
			rating: movie.vote_average ?? 0,
			imageUrl: buildImagePath(movie.poster_path),
			genreIds: movie.genre_ids ?? [],
			genreNames: getGenreNamesByIds(movie.genre_ids ?? []),
			date: formatDateFns(movie.release_date ?? ''),
		}));
	});

	const loadHomeData = async () => {
		isLoading.value = true;
		await fetchHomeData();
		isLoading.value = false;
	};

	const loadFullList = async () => {
		await fetchMoviesByAllGenres();
	};

	onMounted(loadHomeData);
</script>

<template>
	<div class="home">
		<h1 class="visually-hidden title">Главная страница</h1>

		<SectionHero>
			<template #heroSlider>
				<HeroSlider v-if="!isLoadingPopularMovies && !isError" :heroItems="heroSliderItems" />
				<div v-else-if="isError" class="hero-error">Данные не загружены, попробуйте позже</div>
				<LoaderApp v-else class="hero-loader" />
			</template>
		</SectionHero>

		<SectionAdvantages />

		<div v-if="!isLoading && !isError" :id="blockId" class="section-wrapper">
			<SectionCatalog :title="'Каталог фильмов и сериалов'">
				<template #genres>
					<SingleSliderList
						v-for="genre in uiGenreWithMovies"
						:key="genre.id"
						:title="genre.name"
						:items="genre.movies"
					/>
					<LoaderApp v-if="isLoadingGenreWithMovies" />
				</template>

				<template v-if="!isLoadingGenreWithMovies" #button>
					<ButtonApp v-if="uiGenreWithMovies.length < 6" @click="loadFullList">
						Посмотреть всё
					</ButtonApp>

					<ButtonApp v-else @click="hideAndScrollGenreWithMovies(blockId)">Скрыть</ButtonApp>
				</template>
			</SectionCatalog>
		</div>

		<div v-else-if="isError">Данные не загружены, попробуйте позже</div>
		<LoaderApp v-else />

		<SectionTariffs />
		<SectionDiscounts />
	</div>
</template>

<style scoped>
	.section-wrapper {
		margin-bottom: 80px;
	}

	.hero-loader {
		height: 578px;
	}

	.hero-error {
		margin: 80px auto;
		text-align: center;
		font-size: 36px;
		font-weight: 700;
		max-width: 400px;
	}
</style>
