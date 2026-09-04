<script setup lang="ts">
	import { computed } from 'vue';
	import { useRoute } from 'vue-router';

	const route = useRoute();

	const pathAttempted = computed(() => {
		return (route.query.path as string) || route.fullPath;
	});
</script>

<template>
	<div class="page page-404">
		<h1>Страница {{ pathAttempted }} не найдена</h1>
		<p>Вернуться на <RouterLink to="/">главную страницу</RouterLink></p>
	</div>
</template>

<style scoped></style>
