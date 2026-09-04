<script setup lang="ts">
	import { computed } from 'vue';
	import { routePaths } from '@/constants/routesData';
	import { useToast } from 'vue-toastification';
	import { useAuthStore } from '@/stores/auth';
	import { storeToRefs } from 'pinia';
	import InputApp from '@/components/Inputs/InputApp.vue';
	import IconPen from '@/assets/icons/IconPen.vue';
	import IconMail from '@/assets/icons/IconMail.vue';
	import IconArrowRight from '@/assets/icons/IconArrowRight.vue';
	import ButtonApp from '@/components/Button/ButtonApp.vue';

	const authStore = useAuthStore();
	const { userName, email, password, isLoading } = storeToRefs(authStore);
	const { signUp } = authStore;

	const toast = useToast();

	const isDisabled = computed(() => {
		return !userName.value || !email.value || !password.value;
	});

	const submitForm = async () => {
		if (password.value.length < 6) {
			toast.error('Пароль должен быть более 6 символов');
		}

		await signUp();
		console.log('Отправка формы: ', {
			name: userName.value,
			email: email.value,
			password: password.value,
		});
	};
</script>

<template>
	<div class="register">
		<h1 class="title">Регистрация</h1>

		<form class="form" @submit.prevent="submitForm">
			<InputApp v-model="userName" label="Имя" placeholder="Введите ваше имя">
				<template #iconLeft>
					<IconPen />
				</template>
			</InputApp>

			<InputApp v-model="email" label="Почта" placeholder="Введите email" autocomplete="email">
				<template #iconLeft>
					<IconMail />
				</template>
			</InputApp>

			<InputApp
				v-model="password"
				label="Пароль"
				placeholder="Придумайте пароль"
				password
				autocomplete="current-password"
			/>

			<p class="form-text">
				Уже есть аккаунт?
				<RouterLink :to="routePaths.login" v-tooltip="'На страницу входа'" class="form-nav-link"
					>Войдите</RouterLink
				>
			</p>

			<ButtonApp class="form-button green" :disabled="isDisabled" :loading="isLoading"
				>Зарегистрироваться</ButtonApp
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
	.register {
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
