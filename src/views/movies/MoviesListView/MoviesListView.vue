<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import { genreMovieList, moviePopularList, discoverMovie } from '@/api/endpoints';
	import type {
		GenreMovieList200GenresItem,
		MoviePopularList200ResultsItem,
		DiscoverMovie200ResultsItem,
	} from '@/api/types';

	const auth = ref('');
	const popularList = ref<MoviePopularList200ResultsItem[]>([]);
	const genresList = ref<GenreMovieList200GenresItem[]>([]);
	const discoverList = ref<DiscoverMovie200ResultsItem[]>([]);
	const isLoading = ref<boolean>(false);

	const getGenres = async () => {
		const { data } = await genreMovieList();
		genresList.value = data.genres ?? [];
	};

	const getPopular = async () => {
		const { data } = await moviePopularList();
		popularList.value = data.results ?? [];
	};

	const getDiscover = async () => {
		const { data } = await discoverMovie();
		discoverList.value = data.results ?? [];
	};

	onMounted(async () => {
		const results = await Promise.allSettled([getGenres(), getPopular(), getDiscover()]);

		results.forEach((result, index) => {
			const names = ['жанров', 'популярных фильмов', 'подборок'];
			if (result.status === 'rejected') {
				console.error(`Ошибка загрузки ${names[index]}:`, result.reason);
			}
		});

		isLoading.value = false;
	});
</script>

<template>
	<div class="movies">
		<h1>Фильмы</h1>
		<div class="home-swiper">
			<div style="color: green">auth: {{ auth }}</div>
			<br />
			<div style="color: blanchedalmond">Жанры: {{ genresList }}</div>
			<br />
			<div style="color: coral">Популярное: {{ popularList }}</div>
			<br />
			<div style="color: darkseagreen">Discover movie: {{ discoverList }}</div>
			<ul class="list">
				<li class="item" v-for="discoverItem in discoverList" :key="discoverItem.id">
					{{ discoverItem }}
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
	@import './MoviesListView.css';
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
