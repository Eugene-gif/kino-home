<!-- Slider.vue -->
<script setup lang="ts">
	import { nextTick } from 'vue';
	import { Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay } from 'swiper/modules';
	import { Swiper, SwiperSlide } from 'swiper/vue';
	import HeroCard from '@/views/home/hero/HeroCard.vue';

	import type { Swiper as SwiperType } from 'swiper';
	import 'swiper/css';
	import type { IHeroCard } from './heroTypes';

	const modules = [Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay];

	interface Props {
		cards: IHeroCard[];
	}

	const props = withDefaults(defineProps<Props>(), {
		cards: () => [],
	});

	const { cards } = props;

	const onSwiper = async (swiper: SwiperType) => {
		await nextTick();

		swiper.navigation.destroy();
		swiper.navigation.init();
		swiper.navigation.update();
	};

	const onSlideChange = () => {
		console.log('slide change'); // Оставляем для отладки
	};
</script>

<template>
	<div class="home-swiper">
		<Swiper
			:modules="modules"
			:slides-per-view="3"
			:space-between="0"
			:navigation="{
				nextEl: '.btn-next',
				prevEl: '.btn-prev',
			}"
			:loop="true"
			:autoplay="{
				delay: 5000,
				disableOnInteraction: false,
			}"
			:pagination="{ clickable: true }"
			:scrollbar="{ draggable: true }"
			@swiper="onSwiper"
			@slideChange="onSlideChange"
		>
			<SwiperSlide v-for="card in cards" :key="card.id">
				<HeroCard :card="card" />
			</SwiperSlide>
		</Swiper>

		<!-- <button class="btn-prev" ref="prevEl">←</button> -->
		<button class="btn-next">←</button>
	</div>
</template>

<style scoped>
	.home-swiper {
		position: relative;
		--transition: transform 0.5s ease, opacity 0.5s ease, filter 0.5s ease;

		.btn-prev,
		.btn-next {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			z-index: 1;
			width: 40px;
			height: 40px;
			cursor: pointer;
			color: lightcoral;
			border: 1px solid lightcoral;
		}

		.btn-next {
			left: 50px;
		}

		.swiper-slide {
			padding: 0;
			border-radius: 12px;
			color: #000;
			font-size: 18px;
			font-weight: 500;
			transition: var(--transition);
			margin: 0;
			opacity: 0;
		}

		.swiper-slide-prev {
			opacity: 0;
		}

		.swiper-slide-active {
			transition: var(--transition);
			filter: blur(0);
			transform: translateX(40%) scale(1);
			z-index: 4;
			opacity: 1;
			width: 300px;
		}

		.swiper-slide-next {
			transform: translateX(15%) translateY(-4%) scale(0.9);
			filter: blur(2px);
			z-index: 3;
			opacity: 1;
		}

		.swiper-slide-next + .swiper-slide {
			transform: translateX(-20%) translateY(-8%) scale(0.8);
			filter: blur(3px);
			z-index: 2;
			opacity: 1;
		}
	}
</style>
