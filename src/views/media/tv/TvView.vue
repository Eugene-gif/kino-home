<!-- TODO: Доработать кнопку показа/сокрытия полного списка -->
<script setup lang="ts">
	import { storeToRefs } from 'pinia';
	import { ref, useId, onMounted } from 'vue';
	import { useTvStore } from '@/stores/tv';
	import SectionCatalog from '@/views/home/components/SectionCatalog.vue';
	import SingleSliderList from '@/components/SingleSliderList/SingleSliderList.vue';
	import ButtonApp from '@/components/Button/ButtonApp.vue';
	import LoaderApp from '@/components/Loader/LoaderApp.vue';

	const tvStore = useTvStore();
	const { fetchTvByAllGenres, hideAndScrollGenreWithTvs } = tvStore;
	const { uiGenreWithTvs, isLoadingGenreWithTvs, isError } = storeToRefs(tvStore);
	const isLoading = ref(false);

	const blockId = useId();

	const loadFullList = async () => {
		await fetchTvByAllGenres();
	};

	const loadMoviesData = async () => {
		isLoading.value = true;
		await fetchTvByAllGenres(3);
		isLoading.value = false;
	};

	onMounted(async () => {
		await loadMoviesData();
	});
</script>

<template>
	<div class="page-movies">
		<h1 class="title" :id="blockId">Сериалы</h1>
		<LoaderApp v-if="isLoadingGenreWithTvs" />

		<SectionCatalog v-if="!isLoading && !isError">
			<template #genres>
				<SingleSliderList
					v-for="genre in uiGenreWithTvs"
					:key="genre.id"
					:title="genre.name"
					:items="genre.tvs"
				/>
				<LoaderApp v-if="isLoadingGenreWithTvs" />
			</template>

			<template v-if="!isLoadingGenreWithTvs" #button>
				<ButtonApp v-if="uiGenreWithTvs.length < 6" @click="loadFullList">
					Посмотреть всё
				</ButtonApp>

				<ButtonApp v-else @click="hideAndScrollGenreWithTvs(blockId)">Скрыть</ButtonApp>
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
