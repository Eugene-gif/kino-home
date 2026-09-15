<script setup lang="ts">
	import HeaderApp from '@/components/HeaderApp/HeaderApp.vue';
	import FooterApp from '@/components/FooterApp/FooterApp.vue';
</script>

<template>
	<div class="layout">
		<HeaderApp />

		<main class="main">
			<RouterView v-slot="{ Component }">
				<Transition name="route-transition" mode="out-in">
					<component :is="Component" :key="$route.path" />
				</Transition>
			</RouterView>
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

			@media screen and (max-width: 800px),
				screen and (orientation: landscape) and (max-height: 480px) {
				--header-ident-base: 20px;
			}
		}
	}

	.route-transition-enter-from,
	.route-transition-leave-to {
		opacity: 0;
	}

	.route-transition-enter-active,
	.route-transition-leave-active {
		transition:
			opacity 0.3s ease,
			transform 0.3s ease;
	}
</style>
