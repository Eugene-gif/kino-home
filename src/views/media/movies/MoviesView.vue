<!-- TODO: Доработать кнопку показа/сокрытия полного списка -->
<script setup lang="ts">
	import { storeToRefs } from 'pinia';
	import { ref, useId, onMounted } from 'vue';
	import { useMoviesStore } from '@/stores/movies/movies';
	import SectionCatalog from '@/views/home/components/SectionCatalog.vue';
	import SingleSliderList from '@/components/SingleSliderList/SingleSliderList.vue';
	import ButtonApp from '@/components/Button/ButtonApp.vue';
	import LoaderApp from '@/components/Loader/LoaderApp.vue';

	const moviesStore = useMoviesStore();
	const { fetchMoviesByAllGenres, hideAndScrollGenreWithMovies } = moviesStore;
	const { uiGenreWithMovies, isError, isLoadingGenreWithMovies } = storeToRefs(moviesStore);
	const isLoading = ref(false);

	const blockId = useId();

	const loadFullList = async () => {
		await fetchMoviesByAllGenres();
	};

	const loadMoviesData = async () => {
		isLoading.value = true;
		await fetchMoviesByAllGenres(3);
		isLoading.value = false;
	};

	onMounted(async () => {
		await loadMoviesData();
	});
</script>

<template>
	<div class="page-movies">
		<h1 class="title" :id="blockId">Фильмы</h1>
		<LoaderApp v-if="isLoadingGenreWithMovies" />

		<SectionCatalog v-if="!isLoading && !isError">
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
</template>

<style scoped>
	.page-movies {
		.title {
			margin-bottom: 60px;
		}
	}
</style>
