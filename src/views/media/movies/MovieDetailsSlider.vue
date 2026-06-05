<script setup lang="ts">
	import { ref } from 'vue';
	import {
		Navigation,
		Pagination,
		Scrollbar,
		A11y,
		Thumbs,
		Mousewheel,
		FreeMode,
	} from 'swiper/modules';
	import { Swiper, SwiperSlide } from 'swiper/vue';
	import CardApp from '@/components/CardApp/CardApp.vue';
	import CardAppSkeleton from '@/components/CardApp/CardAppSkeleton.vue';
  import type { CardAppType } from '@/components/CardApp/CardApp.types';

	const props = defineProps<{
		title?: string;
		movies?: CardAppType[];
	}>();

	const modules = [Navigation, Pagination, Scrollbar, A11y, Thumbs, Mousewheel, FreeMode];

	const breakpoints = {
		320: {
			slidesPerView: 1,
		},
		480: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
		800: {
			slidesPerView: 3,
			spaceBetween: 16,
		},
		1080: {
			slidesPerView: 4,
			spaceBetween: 20,
		},
	};

	const prevEl = ref<HTMLElement | null>(null);
	const nextEl = ref<HTMLElement | null>(null);
</script>

<template>
	<section class="slider">
		<h3 v-if="props.title" class="slider-title">{{ props.title }}</h3>
		<Swiper
			:modules="modules"
			:slides-per-view="4"
			:breakpoints="breakpoints"
			:space-between="20"
			:navigation="{
				nextEl,
				prevEl,
				disabledClass: 'is-disabled',
			}"
			:loop="false"
			:pagination="{ clickable: true }"
			:scrollbar="{ draggable: true }"
			:mousewheel="{
				enabled: true,
				releaseOnEdges: true,
				sensitivity: 1.5,
				forceToAxis: true,
			}"
			:free-mode="{
				enabled: true,
				momentum: true,
				momentumRatio: 0.4,
				momentumVelocityRatio: 1,
				momentumBounce: false,
				sticky: true,
				minimumVelocity: 0.02,
			}"
		>
			<template v-if="!props.movies?.length">
				<SwiperSlide v-for="num in 4" :key="num">
					<CardAppSkeleton />
				</SwiperSlide>
			</template>

			<template v-else>
				<SwiperSlide v-for="movie in props.movies" :key="movie.id">
					<CardApp
						class="swiper-slide-inner"
						:id="movie.id"
						:title="movie.title"
						:rating="movie.rating"
						:imageUrl="movie.imageUrl"
						:genreNames="movie.genreNames"
						:mediaType="movie.mediaType"
					/>
				</SwiperSlide>
			</template>
		</Swiper>
		<button ref="prevEl" class="btn-prev">←</button>
		<button ref="nextEl" class="btn-next">→</button>
	</section>
</template>

<style scoped>
	.slider {
		position: relative;

		.slider-title {
			font-weight: 600;
			font-size: 24px;
			color: #fff;

			&::first-letter {
				text-transform: uppercase;
			}
		}

		.swiper-slide {
			user-select: none;
		}

		.btn-prev,
		.btn-next {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			z-index: 1;
			width: 40px;
			height: 40px;
			cursor: pointer;
			font-size: 20px;
			font-weight: 700;
			font-size: 40px;
			line-height: 1;
			user-select: none;

			@media (hover: hover) {
				&:not(.is-disabled):hover {
					color: #fff;
				}
			}
		}

		.btn-next {
			right: -4%;
		}

		.btn-prev {
			left: -4%;
		}

		.is-disabled {
			opacity: 0.4;
			cursor: default;
		}

		@media (width <= 1500px) {
			.btn-next {
				right: 0%;
			}

			.btn-prev {
				left: 0%;
			}

			.swiper-slide-inner {
				max-width: 400px;
			}
		}

		@media (width <= 480px) {
			.swiper-slide-inner {
				max-width: 100%;
			}
		}
	}
</style>
