<!-- Slider.vue -->
<script setup lang="ts">
	import { computed, ref } from 'vue';

	interface Slide {
		id: number | string;
		title: string;
		posterUrl: string;
		tags?: string[];
	}

	const slides = ref<Slide[]>([
		{
			id: 1,
			title: 'Бесстыжие, 11 сезон, Финал',
			posterUrl: '/poster1.png',
			tags: ['комедия', '18+'],
		},
		{
			id: 2,
			title: 'Название фильма 2',
			posterUrl: '/poster2.png',
			tags: ['боевик', '16+'],
		},
		{
			id: 3,
			title: 'Название фильма 3',
			posterUrl: '/poster3.png',
			tags: ['фантастика'],
		},
		{
			id: 4,
			title: 'Название фильма 4',
			posterUrl: '/poster4.png',
			tags: ['драма'],
		},
		{
			id: 5,
			title: 'Название фильма 5',
			posterUrl: '/poster5.png',
			tags: ['драма'],
		},
		{
			id: 6,
			title: 'Название фильма 6',
			posterUrl: '/poster6.png',
			tags: ['драма'],
		},
	]);

	const currentIndex = ref(0);
	const len = computed(() => slides.value.length);

	function mod(n: number, m: number) {
		return ((n % m) + m) % m;
	}

	function next() {
		if (len.value <= 1) return;
		currentIndex.value = mod(currentIndex.value + 1, len.value);
	}

	function prev() {
		if (len.value <= 1) return;
		currentIndex.value = mod(currentIndex.value - 1, len.value);
	}

	function slideClass(i: number) {
		if (len.value === 0) return '';

		const active = currentIndex.value;
		const prevIdx = mod(active - 1, len.value);
		const nextIdx = mod(active + 1, len.value);

		if (i === active) return 'slide--active';
		if (i === prevIdx) return 'slide--prev';
		if (i === nextIdx) return 'slide--next';
		return 'slide--far';
	}
</script>

<template>
	<div class="slider">
		<button
			class="slider__arrow slider__arrow--prev"
			type="button"
			aria-label="Предыдущий слайд"
			@click="next"
		>
			‹
		</button>

		<div class="slider__viewport">
			<article v-for="(s, i) in slides" :key="s.id" class="slide" :class="slideClass(i)">
				<img :src="s.posterUrl" :alt="s.title" class="slide__poster" />
				<div class="slide__info">
					<div class="slide__meta">{{ s.title }}</div>

					<div v-if="s.tags?.length" class="slide__tags">
						<span v-for="tag in s.tags" :key="tag" class="tag">{{ tag }}</span>
					</div>
				</div>
			</article>
		</div>

		<button
			class="slider__arrow slider__arrow--next"
			type="button"
			aria-label="Следующий слайд"
			@click="prev"
		>
			›
		</button>
	</div>
</template>

<style scoped>
	@import './HomeSlider.css';
</style>
