<script setup lang="ts">
	import { ref, watch, computed, nextTick, onMounted } from 'vue';
	import { RouterLink } from 'vue-router';
	import { storeToRefs } from 'pinia';
	import { useScrollLock, useDebounceFn } from '@vueuse/core';
	import { useDevice } from '@/composables/useDevice.ts';
	import { useSearchStore } from '@/stores/search';
	import { buildImagePath } from '@/utils/images';
	import { routePaths } from '@/constants/routesData';
	import HeaderMenuDesktop from './HeaderMenuDesktop.vue';
	import HeaderMenuMobile from './HeaderMenuMobile.vue';
	import LoaderApp from '@/components/Loader/LoaderApp.vue';
	import ContentModalSearch from './ContentModalSearch.vue';
	import IconLogo from '@/assets/icons/IconLogo.vue';
	import IconSearch from '@/assets/icons/IconSearch.vue';
	import ButtonApp from '@/components/Button/ButtonApp.vue';
	import ButtonBurger from './ButtonBurger.vue';
	import ModalSearch from '@/components/Modals/ModalSearch.vue';
	import InputSearch from '@/components/Inputs/InputSearch.vue';
	import type { ModalSearchCardItem } from './headerTypes.ts';

	const searchStore = useSearchStore();
	const { fetchSearchMulti, fetchHeaderData } = searchStore;
	const { isLoading, isSearchLoading, isSearchLoaded, searchedList, trendingList, personList } =
		storeToRefs(searchStore);

	const { isMobile } = useDevice();

	type InputSearchInstance = {
		focus: () => void;
	};

	const searchText = ref<string>('');
	const isOpenMobileMenu = ref<boolean>(false);
	const isModalSearch = ref<boolean>(false);
	const inputSearchRef = ref<InputSearchInstance | null>(null);

	const isLocked = useScrollLock(document.documentElement);

	const uiTrendingList = computed<ModalSearchCardItem[] | []>(() => {
		return trendingList.value.map((movie) => ({
			id: movie.id,
			title: movie.name ? movie.name : (movie.title ?? 'Без имени'),
			imageUrl: buildImagePath(movie.poster_path),
			mediaType: movie.media_type,
		}));
	});

	const uiSearchedList = computed<ModalSearchCardItem[] | []>(() => {
		return searchedList.value.map((movie) => ({
			id: movie.id,
			title: movie.name ? movie.name : (movie.title ?? 'Без имени'),
			imageUrl: buildImagePath(movie.poster_path),
			mediaType: movie.media_type,
		}));
	});

	const uiPersonList = computed(() => {
		return personList.value.map((person) => ({
			id: person.id,
			name: person.name,
			profession: person.known_for_department,
		}));
	});

	const debouncedSearch = useDebounceFn((query: string) => {
		if (!query.trim()) return;
		fetchSearchMulti(query);
	}, 500);

	watch(isModalSearch, async (value: boolean): Promise<void> => {
		if (value) {
			await nextTick();
			inputSearchRef.value?.focus();
		}
	});

	watch(searchText, () => {
		if (!searchText.value) clearSearch();
	});

	watch(isOpenMobileMenu, (val) => {
		isLocked.value = val;
	});

	const clearSearch = () => {
		searchText.value = '';
		searchedList.value = [];
		isSearchLoaded.value = false;
	};

	const closeModalSearch = () => {
		isModalSearch.value = false;
		clearSearch();
	};

	const closeMobileMenu = () => {
		isOpenMobileMenu.value = false;
	};

	onMounted(fetchHeaderData);
</script>

<template>
	<header class="header">
		<div class="header-wrapper">
			<div class="header-content">
				<RouterLink class="header-logo" :to="routePaths.home">
					<IconLogo />
				</RouterLink>

				<HeaderMenuDesktop v-if="!isMobile">
					<template #searchButton>
						<ButtonApp
							@click="
								() => {
									closeMobileMenu();
									isModalSearch = true;
								}
							"
							class="no-border"
						>
							<template #icon><IconSearch /></template>
							<template #textRight>Поиск</template>
						</ButtonApp>
					</template>
				</HeaderMenuDesktop>

				<template v-else>
					<ButtonBurger class="header-burger" v-model:isOpen="isOpenMobileMenu" />

					<Transition name="slide-right">
						<HeaderMenuMobile
							v-if="isOpenMobileMenu"
							:isOpen="isOpenMobileMenu"
							@close="closeMobileMenu"
						>
							<template #searchButton>
								<ButtonApp
									class="mobile-search-button sm no-border"
									@click="
										() => {
											closeMobileMenu();
											isModalSearch = true;
										}
									"
								>
									<template #icon><IconSearch /></template>
									<template #textRight>Поиск</template>
								</ButtonApp>
							</template>
						</HeaderMenuMobile>
					</Transition>
				</template>
			</div>
		</div>

		<Teleport to="#app">
			<Transition>
				<ModalSearch v-show="isModalSearch" :isOpen="isModalSearch" @close="closeModalSearch">
					<template #search>
						<div class="modal-search-field">
							<InputSearch
								ref="inputSearchRef"
								v-model:text="searchText"
								:loading="isSearchLoading"
								@input="debouncedSearch(searchText)"
								@clear="clearSearch"
							/>
						</div>
					</template>

					<template #content>
						<ContentModalSearch
							v-if="!isLoading"
							:lenSearchedList="uiSearchedList.length"
							:isLoadedSearch="isSearchLoaded"
							:uiTrendingList="uiTrendingList"
							:uiPersonList="uiPersonList"
							:uiSearchedList="uiSearchedList"
							@closeModal="closeModalSearch"
						/>
						<LoaderApp v-else style="min-height: 160px" />
					</template>
				</ModalSearch>
			</Transition>
		</Teleport>
	</header>
</template>

<style scoped>
	.header {
		position: sticky;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		z-index: 10;
		background-color: transparent;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}

	.header-wrapper {
		max-width: 1400px;
		margin: 0 auto;
		padding: 20px 20px 0 20px;
	}

	.header-content {
		display: flex;
		align-items: center;
		gap: 16px;
		border-bottom: 1px solid #3a354d;
		padding-bottom: 20px;
	}

	.header-logo {
		max-width: 150px;
		min-width: 150px;
		max-height: 35px;
		width: 100%;
		height: 100%;
	}

	.modal-search-field {
		display: flex;
		align-items: center;
		gap: 15px;
	}

	@media (max-width: 800px) {
		.header-wrapper {
			padding-top: 10px;
		}

		.header-content {
			padding-bottom: 10px;
		}

		.header-burger {
			display: flex;
			margin-left: auto;
			z-index: 12;
		}

		.mobile-search-button {
			font-size: 20px;
		}
	}

	/* ========================================== */
	/* Анимации                                   */
	/* ========================================== */
	.slide-right-enter-active,
	.slide-right-leave-active {
		transition: opacity 0.3s ease;
	}

	.slide-right-enter-from :deep(.mobile-menu-overlay),
	.slide-right-leave-to :deep(.mobile-menu-overlay) {
		opacity: 0;
	}

	.slide-right-enter-active :deep(.header-menu-mobile),
	.slide-right-leave-active :deep(.header-menu-mobile) {
		transition: transform 0.3s cubic-bezier(0.3, 0.8, 0.3, 1);
	}

	.slide-right-enter-from :deep(.header-menu-mobile),
	.slide-right-leave-to :deep(.header-menu-mobile) {
		transform: translateX(100%);
	}
</style>
