<script setup lang="ts">
	import { computed } from 'vue';
	import { routePaths } from '@/constants/routesData';
	import { useAuthStore } from '@/stores/auth';
	import { storeToRefs } from 'pinia';
	import { useToast } from 'vue-toastification';
	import InputApp from '@/components/Inputs/InputApp.vue';
	import InputPassword from '@/components/Inputs/InputPassword.vue';
	import LabelApp from '@/components/Inputs/LabelApp.vue';
	import ButtonApp from '@/components/Button/ButtonApp.vue';
	import IconMail from '@/assets/icons/IconMail.vue';
	import IconArrowRight from '@/assets/icons/IconArrowRight.vue';

	const authStore = useAuthStore();
	const { email, password, isLoading } = storeToRefs(authStore);
	const { signIn } = authStore;

	const toast = useToast();

	const isDisabled = computed(() => {
		return !email.value || !password.value;
	});

	const submitForm = async () => {
		if (password.value.length < 6) {
			toast.error('Пароль не может быть меньше 6 символов');
			return;
		}

		await signIn();
	};
</script>

<template>
	<div class="login">
		<h1 class="title">Войти</h1>

		<form class="form" @submit.prevent="submitForm">
			<div class="form-input">
				<LabelApp text="Почта" id="login-email" />

				<InputApp v-model="email" id="login-email" placeholder="Введите email" autocomplete="email">
					<template #iconLeft>
						<IconMail />
					</template>
				</InputApp>
			</div>

			<div class="form-input">
				<LabelApp text="Пароль" id="login-password" />

				<InputPassword
					v-model="password"
					id="login-password"
					placeholder="Введите пароль"
					autocomplete="current-password"
				>
					<template #iconLeft>
						<IconMail />
					</template>
				</InputPassword>
			</div>

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
		gap: 20px;
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

	.form-input {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
</style>
