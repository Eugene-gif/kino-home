<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue';
	import { useFavoriteStore } from '@/stores/favorite';
	import { storeToRefs } from 'pinia';
	import LoaderApp from '@/components/Loader/LoaderApp.vue';
	import ButtonApp from '@/components/Button/ButtonApp.vue';
	import FavoriteList from './FavoriteList.vue';

	const favoriteStore = useFavoriteStore();
	const { favoriteList, isLoading } = storeToRefs(favoriteStore);
	const { getFavoriteList } = favoriteStore;

	const currentTab = ref('allList');

	const tabs = [
		{ text: 'Все фильмы', name: 'allList', id: 1 },
		{ text: 'Непросмотренные', name: 'unviewedList', id: 2 },
		{ text: 'Просмотренные', name: 'viewedList', id: 3 },
	];

	const unviewedList = computed(() => {
		return favoriteList.value.filter((el) => !el.has_watched);
	});

	const viewedList = computed(() => {
		return favoriteList.value.filter((el) => el.has_watched);
	});

	onMounted(getFavoriteList);
</script>

<template>
	<div class="favorite">
		<h1 class="title">Избранное</h1>

		<div v-if="!isLoading" class="content">
			<div class="tabs">
				<template v-for="tab in tabs" :key="tab.id">
					<ButtonApp
						:class="currentTab === tab.name ? 'violet' : ''"
						@click="currentTab = tab.name"
					>
						{{ tab.text }}
					</ButtonApp>
				</template>
			</div>

			<template v-if="favoriteList.length">
				<Transition name="transition-tab" mode="out-in">
					<FavoriteList v-if="currentTab === 'allList'" :key="'allList'" :items="favoriteList" />
					<FavoriteList
						v-else-if="currentTab === 'unviewedList'"
						:key="'unviewedList'"
						:items="unviewedList"
					/>
					<FavoriteList
						v-else-if="currentTab === 'viewedList'"
						:key="'viewedList'"
						:items="viewedList"
					/>
				</Transition>
			</template>

			<template v-else>
				<div class="empty-block">Список избранного пуст</div>
			</template>
		</div>

		<LoaderApp v-else-if="isLoading" />
	</div>
</template>

<style scoped>
	.favorite {
		width: 100%;
	}

	.tabs {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 30px;
	}

	/* ========================================== */
	/* анимации для Transition                    */
	/* ========================================== */
	.transition-tab-enter-active,
	.transition-tab-leave-active {
		transition:
			opacity 0.25s ease,
			transform 0.25s ease;
	}

	.transition-tab-enter-from,
	.transition-tab-leave-to {
		opacity: 0;
		transform: translateY(10px);
	}
</style>
