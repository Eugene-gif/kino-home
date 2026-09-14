<script setup lang="ts">
	import { ref, computed } from 'vue';
	import { RouterLink } from 'vue-router';
	import { storeToRefs } from 'pinia';
	import { onClickOutside } from '@vueuse/core';
	import { menuLink } from '@/constants/menu';
	import { routePaths } from '@/constants/routesData';
	import { useAuthStore } from '@/stores/auth';
	import UserAvatar from '@/components/HeaderApp/UserAvatar.vue';
	import ButtonApp from '@/components/Button/ButtonApp.vue';
	import IconUser from '@/assets/icons/IconUser.vue';
	import IconUserDelete from '@/assets/icons/IconUserDelete.vue';
	import IconUserLogin from '@/assets/icons/IconUserLogin.vue';
	import IconUserRegister from '@/assets/icons/IconUserRegister.vue';

	const authStore = useAuthStore();
	const { isAuth, user } = storeToRefs(authStore);
	const { signOut } = authStore;

	const isPopoverAuth = ref<boolean>(false);
	const popoverRef = ref(null);
	const buttonRef = ref(null);

	onClickOutside(
		popoverRef,
		() => {
			isPopoverAuth.value = false;
		},
		{
			ignore: [buttonRef],
		},
	);

	const togglePopover = () => {
		isPopoverAuth.value = !isPopoverAuth.value;
	};

	const uiMenuLink = computed(() => {
		return isAuth.value ? menuLink : menuLink.filter((el) => !el?.isAuth);
	});
</script>

<template>
	<div class="header-menu-desktop">
		<nav class="nav" aria-label="Основное меню">
			<ul class="nav-list">
				<template v-for="link in uiMenuLink" :key="link.name">
					<li class="nav-item">
						<RouterLink :to="link.path">{{ link.text }}</RouterLink>
					</li>
				</template>
			</ul>
		</nav>

		<ul class="options">
			<li class="options-item options-item-search">
				<slot name="searchButton"></slot>
			</li>

			<li class="options-item options-item-popover">
				<ButtonApp v-if="!isAuth" ref="buttonRef" class="button-popover" @click="togglePopover">
					<template #icon>
						<IconUser />
					</template>
				</ButtonApp>

				<UserAvatar v-else ref="buttonRef" :name="user?.name ?? ''" @click="togglePopover" />

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
</template>

<style scoped>
	.header-menu-desktop {
		display: flex;
		align-items: center;
		gap: 16px;
		justify-content: space-between;
		width: 100%;
		margin-left: 4.5%;
	}

	.nav {
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

		.nav-item a {
			font-size: inherit;
			font-weight: inherit;
		}

		.nav-item.search {
			flex: 1;
			min-width: 0;
		}
	}

	.options {
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
				color: var(--color-yellow);
			}
		}
	}

	.router-link-exact-active {
		color: #fff;
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
