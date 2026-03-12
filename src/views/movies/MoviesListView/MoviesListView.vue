<script setup lang="ts">
	import { ref, onMounted } from 'vue';

	const auth = ref('');

	const getAuth = async () => {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
			},
		};

		try {
			const response = await fetch('https://api.themoviedb.org/3/authentication', options);

			if (!response.ok) throw new Error(`Status: ${response.status}; Message: ${response.message}`);

			const result = await response.json();
			auth.value = result;
			console.log(result);
		} catch (error) {
			console.error(error);
		}
	};
	onMounted(async () => {
		await getAuth();
	});
</script>

<template>
	<div class="movies">
		<h1>Фильмы</h1>
		<div class="home-swiper">
			<div>auth: {{ auth }}</div>
		</div>
	</div>
</template>

<style scoped>
	@import './MoviesListView.css';
</style>
