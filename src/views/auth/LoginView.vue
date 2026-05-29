<script setup lang="ts">
	import { routePaths } from '@/constants/routesData';
</script>

<template>
	<div class="login">
		<h1>Вход</h1>
		<RouterLink :to="routePaths.register" class="nav-link">На страницу регистрации</RouterLink>
	</div>
</template>

<style scoped>
	.login {
		background-color: pink;
	}
</style>
