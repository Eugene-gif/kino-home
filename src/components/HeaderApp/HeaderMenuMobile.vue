<script setup lang="ts">
	import { computed } from 'vue';
	import { RouterLink } from 'vue-router';
	import { storeToRefs } from 'pinia';
	import { menuLink } from '@/constants/menu';
	import { routePaths } from '@/constants/routesData';
	import { useAuthStore } from '@/stores/auth';
	import ButtonApp from '@/components/Button/ButtonApp.vue';
	import IconUserDelete from '@/assets/icons/IconUserDelete.vue';
	import IconUserLogin from '@/assets/icons/IconUserLogin.vue';
	import IconUserRegister from '@/assets/icons/IconUserRegister.vue';

	const authStore = useAuthStore();
	const { isAuth, user } = storeToRefs(authStore);
	const { signOut } = authStore;

	const emit = defineEmits<{ (e: 'close'): void }>();

	const uiMenuLink = computed(() => {
		return isAuth.value ? menuLink : menuLink.filter((el) => !el?.isAuth);
	});

	const closeMobileMenu = () => {
		emit('close');
	};
</script>

<template>
	<div class="mobile-menu-wrapper">
		<div @click="closeMobileMenu" @touchmove.prevent class="mobile-menu-overlay"></div>

		<div class="header-menu-mobile">
			<nav class="nav" aria-label="Основное меню">
				<slot name="searchButton"></slot>
				<ul class="nav-list">
					<template v-for="link in uiMenuLink" :key="link.name">
						<li class="nav-item">
							<RouterLink @click="closeMobileMenu" :to="link.path">{{ link.text }}</RouterLink>
						</li>
					</template>
				</ul>
			</nav>

			<div class="auth-block">
				<template v-if="isAuth">
					<div class="block" v-tooltip.top="`${user?.name}`">
						<span class="block__text">Пользователь: </span
						><span class="block__value">{{ user?.name ?? 'Нет имени' }}</span>
					</div>

					<div class="block" v-tooltip.top="`${user?.email}`">
						<span class="block__text">Почта: </span>
						<span class="block__value">{{ user?.email ?? 'Нет почты' }}</span>
					</div>

					<div class="block buttons">
						<ButtonApp @click="signOut">
							<template #icon><IconUserDelete /></template>
							<template #textRight>Выйти</template>
						</ButtonApp>
					</div>
				</template>

				<template v-else>
					<div class="block buttons">
						<ButtonApp @click="closeMobileMenu" v-if="!isAuth" :href="routePaths.login">
							<template #icon><IconUserLogin /></template>
							<template #textRight>Войти</template>
						</ButtonApp>

						<ButtonApp @click="closeMobileMenu" v-if="!isAuth" :href="routePaths.register">
							<template #icon><IconUserRegister /></template>
							<template #textRight>Регистрация</template>
						</ButtonApp>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.mobile-menu-wrapper {
		display: none;
	}

	html:has(.mobile-menu-wrapper),
	body:has(.mobile-menu-wrapper) {
		overflow: hidden !important;
		position: fixed;
		width: 100%;
		height: 100%;
	}

	@media (max-width: 800px) {
		.mobile-menu-wrapper {
			display: flex;
			justify-content: flex-end;
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100dvh;
			z-index: 9;
		}

		.mobile-menu-overlay {
			position: absolute;
			top: 0;
			right: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.6);
			cursor: pointer;
		}

		.header-menu-mobile {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			gap: 10px;
			position: relative;
			height: 100dvh;
			background-color: var(--color-blue-dark);
			padding: 10px 20px 20px 20px;
			width: 60%;
			min-width: 240px;
			overflow-y: auto;
			-webkit-overflow-scrolling: touch; /* Плавный скролл на iOS Safari */

			.nav {
				width: 100%; /* Изменено */
			}

			.nav-list {
				margin: 0;
				margin-top: 50px;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				gap: 20px;
			}

			.nav-item {
				font-size: 28px;
				font-weight: 600;
			}

			.auth-block {
				margin-top: auto;
				padding-top: 30px;
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				gap: 10px;
			}

			.block {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 10px;
				color: var(--text-color-base);
				font-size: 18px;
				width: 100%;
			}

			.block__value {
				font-size: 24px;
				font-weight: 600;
				color: var(--color-yellow);
				max-width: 100%;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.block.buttons {
				margin-top: 40px;
				flex-direction: column;
				align-items: normal;
			}
		}
	}

	@media (max-width: 480px) {
		.header-menu-mobile {
			width: 70%;
		}
	}

	.router-link-exact-active {
		color: #fff;
	}
</style>
