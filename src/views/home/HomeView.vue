<script setup lang="ts">
	import { ref } from 'vue';
	import type { IHeroCard } from './hero/heroTypes';
	import ButtonApp from '@/components/Button/ButtonApp.vue';
	import HeroSlider from '@/views/home/hero/HeroSlider.vue';

	const cards = ref<IHeroCard[]>([
		{
			name: 'Бесстыжие. 11 сезон. Финал',
			image: 'poster1.1.png',
			tags: ['Премьера'],
			date: '13 мая',
			id: 1,
		},
		{
			name: 'Дом в лесу. 1 сезон. Финал',
			image: 'poster1.2.png',
			tags: ['Премьера'],
			date: '12 декабря',
			id: 2,
		},
		{
			name: 'Мегамозг',
			image: 'poster1.3.png',
			tags: ['Мультфильм'],
			date: '18 апреля',
			id: 3,
		},
		{
			name: 'Спасатели Малибу',
			image: 'poster1.4.png',
			tags: ['Фильм', 'Комедия'],
			date: '8 февраля',
			id: 4,
		},
		{
			name: 'День Сурка',
			image: 'poster1.5.png',
			tags: ['Фильм', 'Мелодрама', 'Фэнтези'],
			date: '30 июня',
			id: 5,
		},
	]);
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
				<ButtonApp class="hero-btn" text="Смотреть бесплатно" />
			</div>

			<div class="hero-slider">
				<HeroSlider :cards="cards" />
			</div>
		</div>
	</div>
</template>

<style scoped>
	@import './HomeView.css';
</style>
