<script setup lang="ts">
	import ButtonApp from '@/components/Button/ButtonApp.vue';
</script>

<template>
	<section class="hero">
		<div class="hero-content">
			<h2 class="hero-title">Самые сочные премьеры кино — у вас дома</h2>
			<p class="hero-text">
				Ежедневно пополняемая библиотека с лучшими фильмами и сериалами — в дубляже и
				оригинале.Целый месяц бесплатно!
			</p>
			<ButtonApp class="hero-btn"> Смотреть бесплатно </ButtonApp>
		</div>

		<div class="hero-slider">
			<slot name="heroSlider"></slot>
		</div>
	</section>
</template>

<style scoped>
	.hero {
		display: flex;
		margin-bottom: 80px;

		.hero-content {
			max-width: 425px;
			display: flex;
			justify-content: center;
			align-items: flex-start;
			flex-direction: column;
			flex-shrink: 0;
		}

		.hero-title {
			font-size: 48px;
			font-weight: 800;
			line-height: 1.2;
			margin-bottom: 20px;
		}

		.hero-text {
			font-weight: 400;
			line-height: 1.4;
			margin-bottom: 30px;
		}

		.hero-btn {
			color: var(--color-white);
			background-color: var(--color-red);
			border: 1px solid var(--color-red);
		}

		.test-block {
			display: flex;
			justify-content: start;
			align-items: center;
			gap: 15px;
		}

		.hero-slider {
			flex-grow: 1;
			min-width: 0;
		}

		@media (width <= 1180px) {
			.hero-content {
				max-width: 375px;
			}
		}

		@media (width <= 1000px) {
			.hero-content {
				max-width: 325px;
			}
		}

		@media (max-width: 860px) {
			& {
				flex-direction: column;
        gap: 20px;
			}

			.hero-content {
				max-width: 700px;
        align-self: center;
			}
		}
	}
</style>
