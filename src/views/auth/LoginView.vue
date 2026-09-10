<script setup lang="ts">
	import { computed } from 'vue';
	import { routePaths } from '@/constants/routesData';
	import { useAuthStore } from '@/stores/auth';
	import { storeToRefs } from 'pinia';
	import { useToast } from 'vue-toastification';
	import FormField from '@/components/Inputs/FormField.vue';
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
					placeholder="Введите пароль"
					autocomplete="current-password"
				>
					<template #iconLeft>
						<IconMail />
					</template>
				</InputPassword>
			</FormField>

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
	@import './auth-style.css';
</style>
