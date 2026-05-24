<script setup lang="ts">
	import { nextTick } from 'vue';
	import {
		Navigation,
		Pagination,
		Scrollbar,
		A11y,
		Thumbs,
		Autoplay,
		Keyboard,
		Mousewheel,
	} from 'swiper/modules';
	import { Swiper, SwiperSlide } from 'swiper/vue';
	import ButtonApp from '@/components/Button/ButtonApp.vue';
	import IconArrowLeft from '@/assets/icons/IconArrowLeft.vue';
	import HeroCard from './HeroCard.vue';

	import type { Swiper as SwiperType } from 'swiper';
	import type { HeroSliderItem } from '@/views/home/homeTypes';

	interface Props {
		heroItems: HeroSliderItem[];
	}

	const modules = [Navigation, Pagination, Scrollbar, A11y, Thumbs, Autoplay, Keyboard, Mousewheel];

	const props = withDefaults(defineProps<Props>(), {
		heroItems: () => [],
	});

	const { heroItems } = props;

	const onSwiper = async (swiper: SwiperType) => {
		await nextTick();

		swiper.navigation.destroy();
		swiper.navigation.init();
		swiper.navigation.update();
	};
</script>

<template>
	<div class="hero-swiper">
		<Swiper
			:modules="modules"
			:slides-per-view="3"
			:space-between="0"
			:navigation="{
				nextEl: '.btn-next',
				prevEl: '.btn-prev',
			}"
			:loop="true"
			:pagination="{ clickable: true }"
			:scrollbar="{ draggable: true }"
			:keyboard="{
				enabled: true,
			}"
			@swiper="onSwiper"
		>
			<SwiperSlide v-for="item in heroItems" :key="item.id">
				<HeroCard
					:id="item.id"
					:title="item.title"
					:rating="item.rating"
					:imageUrl="item.imageUrl"
					:genreIds="item.genreIds"
					:genreNames="item.genreNames"
					:date="item.date"
				/>
			</SwiperSlide>
		</Swiper>

		<ButtonApp class="btn-next" border="none">
			<template #icon>
				<IconArrowLeft style="width: 40px" />
			</template>
		</ButtonApp>
	</div>
</template>

<style scoped>
	.hero-swiper {
		position: relative;
		--transition: transform 0.5s ease, opacity 0.5s ease, filter 0.5s ease;

		.btn-prev,
		.btn-next {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			z-index: 1;
			width: 50px;
			height: 50px;
			cursor: pointer;
		}

		.btn-next {
			left: 15%;
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
			max-width: 380px;
			flex-shrink: 0;
		}

		.swiper-slide-prev {
			opacity: 0;
		}

		.swiper-slide-active {
			transition: var(--transition);
			filter: blur(0);
			transform: translateX(70%) scale(1);
			z-index: 4;
			opacity: 1;
		}

		.swiper-slide-next {
			transform: translateX(55%) scale(0.8);
			filter: blur(2px);
			z-index: 3;
			opacity: 1;
		}

		.swiper-slide-next + .swiper-slide {
			transform: translateX(20%) scale(0.6);
			filter: blur(3px);
			z-index: 2;
			opacity: 1;
		}

		@media (width <= 1380px) {
			.swiper-slide {
				width: 100%;
			}
		}

		@media (width <= 860px) {
			.swiper-slide-active,
			.swiper-slide-next,
			.swiper-slide-next + .swiper-slide {
				transform: translateX(0%) scale(1);
				filter: blur(0);
			}

			.swiper-slide:not(.swiper-slide-next) {
				filter: blur(3px);
				z-index: 1;
				transform: scale(0.8);
			}

			.swiper-slide-next {
				filter: blur(0);
				z-index: 2;
				width: 100%;
			}

			.btn-next {
				display: none;
			}
		}
	}
</style>
