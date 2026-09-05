<script setup lang="ts">
	import HeaderApp from '@/components/HeaderApp/HeaderApp.vue';
	import FooterApp from '@/components/FooterApp/FooterApp.vue';
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
	.layout {
		display: flex;
		min-height: 100dvh;
		flex-direction: column;

		.main {
			max-width: 1400px;
			width: 100%;
			flex: 1 0 auto;
			padding: 20px 20px 0 20px;
			margin: var(--header-ident-base) auto 0 auto;
		}
	}
</style>
