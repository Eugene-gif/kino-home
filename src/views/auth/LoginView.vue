<script setup lang="ts">
	import { computed } from 'vue';
	import { routePaths } from '@/constants/routesData';
	import { useAuthStore } from '@/stores/auth';
	import { storeToRefs } from 'pinia';
	import InputApp from '@/components/Inputs/InputApp.vue';
	import ButtonApp from '@/components/Button/ButtonApp.vue';
	import IconMail from '@/assets/icons/IconMail.vue';
	import IconArrowRight from '@/assets/icons/IconArrowRight.vue';

	const authStore = useAuthStore();
	const { email, password, isLoading } = storeToRefs(authStore);
	const { signIn } = authStore;

	const isDisabled = computed(() => {
		return !email.value || !password.value;
	});

	const submitForm = async () => {
		await signIn();
	};
</script>

<template>
	<div class="login">
		<h1 class="title">Войти</h1>

		<form class="form" @submit.prevent="submitForm">
			<InputApp v-model="email" label="Почта" placeholder="Введите email" autocomplete="email">
				<template #iconLeft>
					<IconMail />
				</template>
			</InputApp>

			<InputApp
				v-model="password"
				label="Пароль"
				placeholder="Введите пароль"
				password
				autocomplete="current-password"
			/>

			<p class="form-text">
				Ещё нет аккаунта?
				<RouterLink
					:to="routePaths.register"
					v-tooltip="'На страницу регистрации'"
					class="form-nav-link"
					>Зарегистрируйтесь</RouterLink
				>
			</p>

			<ButtonApp class="form-button green" :disabled="isDisabled" :loading="isLoading"
				>Войти</ButtonApp
			>
		</form>

		<ButtonApp v-tooltip.left="'На главную'" class="nav-link" :href="routePaths.home">
			<template #icon>
				<IconArrowRight />
			</template>
		</ButtonApp>
	</div>
</template>

<style scoped>
	.login {
		max-width: 500px;
		width: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;

		.nav-link {
			position: absolute;
			top: 20px;
			right: 20px;
		}
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.form-text {
		margin: 20px 0;
		font-size: 20px;
		font-weight: 400;
	}

	.form-nav-link {
		font-weight: 500;
		color: white;
		text-decoration: underline;
	}

	.form-button {
		width: 100%;
	}
</style>
