<script setup lang="ts">
	import ButtonC from '@/components/Button/ButtonC.vue';
  import HomeSlider from './HomeSlider/HomeSlider.vue';
</script>

<template>
	<div class="home">
		<h1 class="visually-hidden title">Главная страница</h1>
		<div class="hero">
			<div class="hero-content">
				<h2 class="hero-title">Самые сочные премьеры кино — у вас дома</h2>
				<p class="hero-text">
					Ежедневно пополняемая библиотека с лучшими фильмами и сериалами — в дубляже и
					оригинале.Целый месяц бесплатно!
				</p>
				<ButtonC class="hero-btn" text="Смотреть бесплатно" />
			</div>
			<div class="hero-slider">
        <HomeSlider />
				<!-- <div class="test-block">
					<ButtonC
						text="Смотреть фильм"
						iconName="play"
						iconSize="18px"
						bgColor="var(--color-red)"
						color="var(--color-white)"
						border="1px solid var(--color-red)"
					/>
					<ButtonC text="Трейлер" />
					<ButtonC iconName="copy" />
					<ButtonC iconName="heart" />
				</div> -->
			</div>
		</div>
	</div>
</template>

<style scoped>
	@import './HomeView.css';
</style>
