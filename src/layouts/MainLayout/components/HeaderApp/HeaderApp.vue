<script setup lang="ts">
	import { ref, watch, nextTick } from 'vue';
	import { RouterLink } from 'vue-router';
	import IconLogo from '@/assets/icons/IconLogo.vue';
	import IconSearch from '@/assets/icons/IconSearch.vue';
	import ButtonApp from '@/components/Button/ButtonApp.vue';
	import ButtonBurger from './ButtonBurger.vue';
	import ModalSearch from '@/components/Modals/ModalSearch.vue';
	import InputSearch from '@/components/Inputs/InputSearch.vue';
	import IconBell from '@/assets/icons/IconBell.vue';
	import IconUser from '@/assets/icons/IconUser.vue';

	type InputSearchInstance = {
		focus: () => void;
	};

	const searchText = ref<string>('');
	const isOpenBurgerMenu = ref<boolean>(false);
	const isModalSearch = ref<boolean>(false);
	const inputSearchRef = ref<InputSearchInstance | null>(null);

	watch(isModalSearch, async (value: boolean): Promise<void> => {
		if (value) {
			await nextTick();
			inputSearchRef.value?.focus();
		}
	});

	const closeModalSearch = () => {
		isModalSearch.value = false;
	};
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
							<li class="nav-item"><RouterLink to="/icons">Иконки</RouterLink></li>
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
							<ButtonApp border="none" iconSize="22px" round>
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
				{{ searchText }}
			</div>
		</div>

		<Teleport to="#app">
			<Transition>
				<ModalSearch v-show="isModalSearch" :isOpen="isModalSearch" @close="closeModalSearch">
					<template #main>
						<div class="panel">
							<InputSearch ref="inputSearchRef" v-model:text="searchText" />
							{{ searchText }}
						</div>
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
