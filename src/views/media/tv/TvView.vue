<script setup lang="ts">
	import { ref, onMounted } from 'vue';

	import LoaderApp from '@/components/Loader/LoaderApp.vue';
	const isLoading = ref<boolean>(true);

	onMounted(() => {
		isLoading.value = false;
	});
</script>

<template>
	<div class="movies">
		<h1>Сериалы</h1>
		<LoaderApp v-if="isLoading" />
	</div>
</template>

<style scoped>
	.list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.item {
		border: 2px solid grey;
		border-radius: 8px;
		padding: 20px;
	}
</style>
