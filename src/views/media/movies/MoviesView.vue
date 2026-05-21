<script setup lang="ts">
	import { ref, onMounted } from 'vue';

  import LoaderApp from '@/components/Loader/LoaderApp.vue';

	// const auth = ref('');
	// const popularList = ref<MoviePopularList200ResultsItem[]>([]);
	// const genresList = ref<GenreMovieList200GenresItem[]>([]);
	// const discoverList = ref<DiscoverMovie200ResultsItem[]>([]);
	const isLoading = ref<boolean>(true);

	// const getGenres = async () => {
	// 	const { data } = await genreMovieList();
	// 	genresList.value = data.genres ?? [];
	// };

	// const getPopular = async () => {
	// 	const { data } = await moviePopularList();
	// 	popularList.value = data.results ?? [];
	// };

	// const getDiscover = async () => {
	// 	const { data } = await discoverMovie();
	// 	discoverList.value = data.results ?? [];
	// };

	onMounted(() => {
    console.log('Page - MoviesView');
    isLoading.value = false;
  });
</script>

<template>
	<div class="movies">
		<h1>Фильмы</h1>
		<LoaderApp  v-if="isLoading"/>
	</div>
</template>

<style scoped>
	.list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.item {
		border: 2px solid grey;
		border-radius: 8px;
		padding: 20px;
	}
</style>
