<script setup lang="ts">
	import { ref, watch, computed, nextTick, onMounted } from 'vue';
	import { RouterLink } from 'vue-router';
	import { storeToRefs } from 'pinia';
	import { useDebounceFn, onClickOutside } from '@vueuse/core';
	import { useSearchStore } from '@/stores/search';
	import { buildImagePath } from '@/utils/images';
	import { menuLink } from '@/constants/menu';
	import { routePaths } from '@/constants/routesData';
	import { useAuthStore } from '@/stores/auth';
	import LoaderApp from '@/components/Loader/LoaderApp.vue';
	import ContentModalSearch from './ContentModalSearch.vue';
	import IconLogo from '@/assets/icons/IconLogo.vue';
	import IconSearch from '@/assets/icons/IconSearch.vue';
	import ButtonApp from '@/components/Button/ButtonApp.vue';
	import ButtonBurger from './ButtonBurger.vue';
	import ModalSearch from '@/components/Modals/ModalSearch.vue';
	import InputSearch from '@/components/Inputs/InputSearch.vue';
	import IconUser from '@/assets/icons/IconUser.vue';
	import IconUserDelete from '@/assets/icons/IconUserDelete.vue';
	import IconUserLogin from '@/assets/icons/IconUserLogin.vue';
	import IconUserRegister from '@/assets/icons/IconUserRegister.vue';
	import type { ModalSearchCardItem } from './headerTypes';

	const authStore = useAuthStore();
	const { isAuth, user } = storeToRefs(authStore);
	const { signOut } = authStore;

	const searchStore = useSearchStore();
	const { fetchSearchMulti, fetchHeaderData } = searchStore;
	const { isLoading, isSearchLoading, isSearchLoaded, searchedList, trendingList, personList } =
		storeToRefs(searchStore);

	type InputSearchInstance = {
		focus: () => void;
	};

	const searchText = ref<string>('');
	const isOpenBurgerMenu = ref<boolean>(false);
	const isModalSearch = ref<boolean>(false);
	const inputSearchRef = ref<InputSearchInstance | null>(null);
	const isPopoverAuth = ref<boolean>(false);
	const popoverRef = ref(null);

	onClickOutside(popoverRef, () => {
		isPopoverAuth.value = false;
	});

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

	const clearSearch = () => {
		searchText.value = '';
		searchedList.value = [];
		isSearchLoaded.value = false;
	};

	const closeModalSearch = () => {
		isModalSearch.value = false;
		clearSearch();
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

				<div :class="['header-box-content', isOpenBurgerMenu ? 'open' : '']">
					<nav class="header-nav" aria-label="Основное меню">
						<ul class="nav-list">
							<template
								v-for="link in isAuth ? menuLink : menuLink.filter((el) => !el?.isAuth)"
								:key="link.name"
							>
								<li class="nav-item">
									<RouterLink :to="link.path">{{ link.text }}</RouterLink>
								</li>
							</template>
						</ul>
					</nav>

					<ul class="header-options">
						<li class="options-item">
							<ButtonApp @click="() => (isModalSearch = !isModalSearch)" border="none">
								<template #icon><IconSearch /></template>
								<template #textRight>Поиск</template>
							</ButtonApp>
						</li>

						<li class="options-item options-item-popover">
							<ButtonApp
								:disabled="isPopoverAuth"
								class="button-popover"
								@click="() => (isPopoverAuth = true)"
							>
								<template #icon>
									<IconUser />
								</template>
							</ButtonApp>

							<Transition>
								<div v-if="isPopoverAuth" ref="popoverRef" class="popover">
									<span class="arrow"></span>

									<div class="content">
										<template v-if="!isAuth">
											<ButtonApp :href="routePaths.register">
												<template #icon><IconUserRegister /></template>
												<template #textRight>Регистрация</template>
											</ButtonApp>

											<ButtonApp :href="routePaths.login">
												<template #icon><IconUserLogin /></template>
												<template #textRight>Войти</template>
											</ButtonApp>
										</template>

										<template v-else>
											<div class="block">
												<span class="block__text">Пользователь: </span
												><span class="block__value">{{ user?.name ?? 'Нет имени' }}</span>
											</div>

											<div class="block">
												<span class="block__text">Почта: </span>
												<span class="block__value">{{ user?.email ?? 'Нет почты' }}</span>
											</div>
											<ButtonApp @click="signOut">
												<template #icon><IconUserDelete /></template>
												<template #textRight>Выйти</template>
											</ButtonApp>
										</template>
									</div>
								</div>
							</Transition>
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

	.options-item-popover {
		position: relative;
	}

	.popover {
		position: absolute;
		background-color: var(--color-second-dark);
		border: 1px solid var(--color-btn-base);
		color: #fff;
		padding: 20px;
		border-radius: 10px;
		top: 110%;
		right: 0;

		.arrow {
			content: '';
			position: absolute;
			right: 12px;
			top: -20px;
			width: 0;
			height: 0;
			border-left: 15px solid transparent;
			border-right: 15px solid transparent;
			border-bottom: 20px solid var(--color-btn-base);
			&::after {
				content: '';
				position: absolute;

				left: -14px;
				top: 1px;
				width: 0;
				height: 0;

				border-left: 14px solid transparent;
				border-right: 14px solid transparent;
				border-bottom: 19px solid var(--color-second-dark);
			}
		}

		.content {
			display: flex;
			flex-direction: column;
			gap: 10px;

			.block {
				display: flex;
				flex-direction: column;
				gap: 5px;
				margin-bottom: 15px;
				color: var(--text-color-base);
			}

			.block__value {
				font-size: 24px;
				font-weight: 600;
				color: var(--color-white);
			}
		}
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
