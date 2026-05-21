<script setup lang="ts">
	import { computed, ref, watch, onMounted, onUnmounted } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useTvStore } from '@/stores/tv';
	import { useToast } from 'vue-toastification';
	import LoaderApp from '@/components/Loader/LoaderApp.vue';

	const props = defineProps<{
		id: string; // из URL всегда приходит строкой
	}>();

	const toast = useToast();
	const tvStore = useTvStore();
	const { fetchTvDetails } = tvStore;
	const { singleTvDetails } = storeToRefs(tvStore);

	const isLoading = ref<boolean>(true);
	const error = ref<string>('');

	const tvId = computed(() => Number(props.id));
	const tvTitle = computed(() => singleTvDetails.value?.name);

	const loadTvDetails = async (id: number) => {
		isLoading.value = true;
		error.value = '';
		singleTvDetails.value = null;
		try {
			await fetchTvDetails(id);
		} catch (err) {
			error.value = 'Не удалось загрузить сериал';
			toast.error(error.value);
			console.error(err);
		} finally {
			isLoading.value = false;
		}
	};

	watch(tvId, async () => {
		await loadTvDetails(tvId.value);
	});

	onMounted(async () => {
		loadTvDetails(tvId.value);
	});

  onUnmounted(() => {
    singleTvDetails.value = null;
  });
</script>

<template>
	<div class="tv-details">
		<template v-if="!isLoading && !error">
			<h1 class="title">
				{{ tvTitle }}
			</h1>
			<div class="info-line"></div>
			<div>{{ singleTvDetails }}</div>
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
