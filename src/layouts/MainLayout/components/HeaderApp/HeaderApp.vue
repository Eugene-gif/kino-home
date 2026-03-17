<script setup lang="ts">
	import { ref, watch, nextTick } from 'vue';
	import { RouterLink } from 'vue-router';
	import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
	import ButtonApp from '@/components/Button/ButtonApp.vue';
	import ButtonBurger from './ButtonBurger.vue';
	import ModalSearch from '@/components/Modals/ModalSearch.vue';
	import InputSearch from '@/components/Inputs/InputSearch.vue';

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
					<SvgIcon name="logo" width="150px" height="35px" />
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
							<ButtonApp
								@click="() => (isModalSearch = !isModalSearch)"
								iconName="search"
								border="none"
							>
								<template #textRight>Поиск{{ isModalSearch }}</template>
							</ButtonApp>
						</li>
						<li class="options-item">
							<ButtonApp iconName="bell" border="none" iconSize="22px" round />
						</li>
						<li class="options-item">
							<ButtonApp iconName="user" />
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
	@import './HeaderApp.css';
	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.35s ease;
	}

	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}
</style>
