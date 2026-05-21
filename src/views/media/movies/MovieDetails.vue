<script setup lang="ts">
	import { computed, ref, watch, onMounted, onUnmounted } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useMoviesStore } from '@/stores/movies';
	import { useToast } from 'vue-toastification';
	import LoaderApp from '@/components/Loader/LoaderApp.vue';

	const props = defineProps<{
		id: string;
	}>();

	const toast = useToast();
	const moviesStore = useMoviesStore();
	const { fetchMovieDetails } = moviesStore;
	const { singleMovieDetails } = storeToRefs(moviesStore);

	const isLoading = ref<boolean>(true);
	const error = ref<string>('');

	const movieId = computed(() => Number(props.id));
	const movieTitle = computed(() => singleMovieDetails.value?.title);

	const loadMovieDetails = async (id: number) => {
		isLoading.value = true;
		error.value = '';
		singleMovieDetails.value = null;
		try {
			await fetchMovieDetails(id);
		} catch {
			error.value = 'Не удалось загрузить фильм';
			toast.error(error.value);
		} finally {
			isLoading.value = false;
		}
	};

	watch(movieId, async () => {
		await loadMovieDetails(movieId.value);
	});

	onMounted(async () => {
		loadMovieDetails(movieId.value);
	});

  onUnmounted(() => {
    singleMovieDetails.value = null;
  });
</script>

<template>
	<div class="tv-details">
		<template v-if="!isLoading && !error">
			<h1 class="title">
				{{ movieTitle }}
			</h1>
			<div class="info-line"></div>
			<div>{{ singleMovieDetails }}</div>
		</template>

		<div v-else-if="error" class="error-block">Данные не загружены, попробуйте позже</div>

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
