<script setup lang="ts">
	import { computed } from 'vue';
	import { routePaths } from '@/constants/routesData';
	import { useToast } from 'vue-toastification';
	import { useAuthStore } from '@/stores/auth';
	import { storeToRefs } from 'pinia';
	import FormField from '@/components/Inputs/FormField.vue';
	import InputApp from '@/components/Inputs/InputApp.vue';
	import LabelApp from '@/components/Inputs/LabelApp.vue';
	import InputPassword from '@/components/Inputs/InputPassword.vue';
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
			return;
		}

		await signUp();
	};
</script>

<template>
	<div class="register">
		<h1 class="title">Регистрация</h1>

		<form class="form" @submit.prevent="submitForm">
			<FormField>
				<LabelApp text="Имя" />

				<InputApp v-model="userName" placeholder="Введите ваше имя">
					<template #iconLeft>
						<IconPen />
					</template>
				</InputApp>
			</FormField>

			<FormField>
				<LabelApp text="Почта" />

				<InputApp v-model="email" placeholder="Введите email" autocomplete="email">
					<template #iconLeft>
						<IconMail />
					</template>
				</InputApp>
			</FormField>

			<FormField>
				<LabelApp text="Пароль" />

				<InputPassword
					v-model="password"
					placeholder="Придумайте пароль"
					autocomplete="current-password"
				>
					<template #iconLeft>
						<IconMail />
					</template>
				</InputPassword>
			</FormField>

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
	@import './auth-style.css';
</style>
