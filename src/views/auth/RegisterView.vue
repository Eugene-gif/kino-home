<script setup lang="ts">
	import { routePaths } from '@/constants/routesData';
</script>

<template>
	<div class="register">
		<h1>Регистрация</h1>
		<RouterLink :to="routePaths.auth" class="nav-link">На страницу входа</RouterLink>
	</div>
</template>

<style scoped>
	.register {
		background-color: lightblue;
	}
</style>
