<script setup lang="ts">
	import { computed, watch, onMounted, onUnmounted } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useTvStore } from '@/stores/tv';
	import LoaderApp from '@/components/Loader/LoaderApp.vue';

	const props = defineProps<{
		id: string; // из URL всегда приходит строкой
	}>();

	const tvStore = useTvStore();
	const { fetchTvDetails } = tvStore;
	const { singleTvDetails, isLoadingTvDetails, isError } = storeToRefs(tvStore);

	const tvId = computed(() => Number(props.id));
	const tvTitle = computed(() => singleTvDetails.value?.name);

	watch(tvId, async () => {
		await fetchTvDetails(tvId.value);
	});

  onMounted(() => fetchTvDetails(tvId.value));

  onUnmounted(() => singleTvDetails.value = null);
</script>

<template>
	<div class="tv-details">
		<template v-if="!isLoadingTvDetails && !isError">
			<h1 class="title">
				{{ tvTitle }}
			</h1>
			<div class="info-line"></div>
			<div>{{ singleTvDetails }}</div>
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
