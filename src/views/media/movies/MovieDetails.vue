<script setup lang="ts">
	import { computed, watch, onMounted, onUnmounted } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useMoviesStore } from '@/stores/movies';
	import LoaderApp from '@/components/Loader/LoaderApp.vue';

	const props = defineProps<{
		id: string;
	}>();

	const moviesStore = useMoviesStore();
	const { fetchMovieDetails } = moviesStore;
	const { singleMovieDetails, isLoadingMovieDetails, isError } = storeToRefs(moviesStore);

	const movieId = computed(() => Number(props.id));
	const movieTitle = computed(() => singleMovieDetails.value?.title);

	watch(movieId, async () => {
		await fetchMovieDetails(movieId.value);
	});

	onMounted(async () => {
		fetchMovieDetails(movieId.value);
	});

	onUnmounted(() => {
		singleMovieDetails.value = null;
	});
</script>

<template>
	<div class="tv-details">
		<template v-if="!isLoadingMovieDetails && !isError">
			<h1 class="title">
				{{ movieTitle }}
			</h1>
			<div class="info-line"></div>
			<div>{{ singleMovieDetails }}</div>
		</template>

		<div v-else-if="isError" class="error-block">Данные не загружены, попробуйте позже</div>

		<LoaderApp v-else />
	</div>
</template>

<style scoped>
	.title {
		font-weight: 800;
		font-size: 72px;
		line-height: 100%;
		letter-spacing: 0.01em;
		color: #fff;
	}

	.error-block {
		font-size: 32px;
	}

	@media (width <= 1080px) {
		.title {
			font-size: 48px;
		}
	}

	@media (width <= 860px) {
		.title {
			font-size: 36px;
		}
	}
</style>
