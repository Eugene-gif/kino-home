<script setup lang="ts">
	import { ref, watch, computed, nextTick, onMounted } from 'vue';
	import { RouterLink } from 'vue-router';
	import { storeToRefs } from 'pinia';
	import { useToast } from 'vue-toastification';
	import { useSearchStore } from '@/stores/search';
	import { buildImagePath } from '@/utils/images';

	import LoaderApp from '@/components/Loader/LoaderApp.vue';
	import ContentModalSearch from './ContentModalSearch.vue';
	import IconLogo from '@/assets/icons/IconLogo.vue';
	import IconSearch from '@/assets/icons/IconSearch.vue';
	import ButtonApp from '@/components/Button/ButtonApp.vue';
	import ButtonBurger from './ButtonBurger.vue';
	import ModalSearch from '@/components/Modals/ModalSearch.vue';
	import InputSearch from '@/components/Inputs/InputSearch.vue';
	import IconBell from '@/assets/icons/IconBell.vue';
	import IconUser from '@/assets/icons/IconUser.vue';

	import type { ModalSearchCardItem } from './headerTypes';

	const toast = useToast();
	const searchStore = useSearchStore();
	const { fetchSearchMulti, fetchTrendingAll, fetchPersonPopularList, clearSearchedList } =
		searchStore;
	const { searchedList, trendingList, personList } = storeToRefs(searchStore);

	type InputSearchInstance = {
		focus: () => void;
	};

	const isLoading = ref(true);
	const isLoadedSearch = ref<boolean>(false);
	const searchText = ref<string>('');
	const isOpenBurgerMenu = ref<boolean>(false);
	const isModalSearch = ref<boolean>(false);
	const inputSearchRef = ref<InputSearchInstance | null>(null);

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

	watch(isModalSearch, async (value: boolean): Promise<void> => {
		if (value) {
			await nextTick();
			inputSearchRef.value?.focus();
		}
	});

	const clearSearch = () => {
		searchText.value = '';
		clearSearchedList();
		isLoadedSearch.value = false;
	};

	const closeModalSearch = () => {
		isModalSearch.value = false;
		isLoadedSearch.value = false;
	};

	const loadSearch = async (str: string) => {
		if (!str.trim()) return;

		try {
			isLoading.value = true;
			await fetchSearchMulti(str);
		} finally {
			isLoading.value = false;
			isLoadedSearch.value = true;
		}
	};

	const loadHeaderData = async () => {
		const results = await Promise.allSettled([fetchTrendingAll(), fetchPersonPopularList()]);

		results.forEach((result, index) => {
			const names = ['трендов', 'популярных персон'];

			if (result.status === 'rejected') {
				toast.error(`Ошибка загрузки ${names[index]}`);
				console.error(`Ошибка загрузки ${names[index]}:`, result.reason);
			}
		});

		isLoading.value = false;
	};

	onMounted(loadHeaderData);
</script>

<template>
	<header class="header">
		<div class="header-wrapper">
			<div class="header-content">
				<RouterLink class="header-logo" to="/">
					<IconLogo />
				</RouterLink>

				<div :class="['header-box-content', isOpenBurgerMenu ? 'open' : '']">
					<nav class="header-nav" aria-label="Основное меню">
						<ul class="nav-list">
							<li class="nav-item"><RouterLink to="/">Главная</RouterLink></li>
							<li class="nav-item"><RouterLink to="/movies">Фильмы</RouterLink></li>
							<li class="nav-item"><RouterLink to="/tv">Сериалы</RouterLink></li>
							<li class="nav-item"><RouterLink to="/collections">Коллекции</RouterLink></li>
						</ul>
					</nav>

					<ul class="header-options">
						<li class="options-item">
							<ButtonApp @click="() => (isModalSearch = !isModalSearch)" border="none">
								<template #icon><IconSearch /></template>
								<template #textRight>Поиск</template>
							</ButtonApp>
						</li>
						<li class="options-item">
							<ButtonApp border="none" iconSize="22px">
								<template #icon><IconBell /></template>
							</ButtonApp>
						</li>
						<li class="options-item">
							<ButtonApp>
								<template #icon>
									<IconUser />
								</template>
							</ButtonApp>
						</li>
					</ul>
				</div>
				<ButtonBurger class="header-burger" v-model:isOpen="isOpenBurgerMenu" />
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
								@keyup.enter="loadSearch(searchText)"
							/>
							<ButtonApp @click="loadSearch(searchText)" blue>Поиск</ButtonApp>
							<ButtonApp v-if="searchedList.length" @click="clearSearch" red
								>Очистить поиск</ButtonApp
							>
						</div>
					</template>

					<template #content>
						<ContentModalSearch
							v-if="!isLoading"
							:lenSearchedList="uiSearchedList.length"
							:isLoadedSearch="isLoadedSearch"
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
		position: fixed;
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

	.header-burger {
		display: none;
	}

	.header-box-content {
		display: contents;
	}

	.header-logo {
		max-width: 150px;
		min-width: 150px;
		max-height: 35px;
		width: 100%;
		height: 100%;
	}

	.header-nav {
		margin-left: 4.5%;
		flex: 1;

		.nav-list {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			gap: 16px;
		}

		.nav-item {
			color: #898792;
		}

		.nav-item.search {
			flex: 1;
			min-width: 0;
		}
	}

	.header-options {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 16px;
		margin-left: auto;
	}

	.router-link-exact-active {
		color: #fff;
	}

	.modal-search-field {
		display: flex;
		align-items: center;
		gap: 15px;
	}

	@media (width <= 790px) {
		.header-box-content {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			gap: 10px;
			position: fixed;
			top: 0;
			bottom: 0;
			right: 0;
			height: 100dvh;
			background-color: #3a354d;
			translate: 100% 0;
			transition: translate 0.35s ease-in-out;
			padding: 20px;
			min-width: 180px;
			width: 50%;
			z-index: 8;

			.header-nav {
				flex: 0;
			}

			.header-nav,
			.header-options {
				margin: 0;
			}

			.header-nav .nav-list,
			.header-options {
				display: flex;
				flex-direction: column;
			}
			&.open {
				translate: 0 0;
			}
		}

		.header-content {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.header-burger {
			display: flex;
			z-index: 10;
		}
	}

	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.35s ease;
	}

	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}
</style>
