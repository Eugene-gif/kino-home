<script setup lang="ts">
	import HeaderApp from './components/HeaderApp/HeaderApp.vue';
	import FooterApp from './components/FooterApp/FooterApp.vue';
</script>

<template>
	<div class="layout">
		<HeaderApp />

		<main class="main">
			<RouterView />
		</main>

		<FooterApp />
	</div>
</template>

<style scoped>
	@import './MainLayout.css';
</style>
