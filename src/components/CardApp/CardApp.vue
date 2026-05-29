<script setup lang="ts">
	import { onImgError } from '@/utils/images';
	import { routeNames } from '@/constants/routesData';
	import type { CardApp } from './CardApp.types';

	const props = withDefaults(defineProps<CardApp>(), {
		id: '',
		title: '',
		rating: '0.0',
		imageUrl: '',
		genreNames: () => [],
		mediaType: '',
	});
</script>

<template>
	<div class="card">
		<RouterLink
			:to="{
				name: props.mediaType === 'movie' ? routeNames.movieDetails : routeNames.tvDetails,
				params: { id: props.id },
			}"
		>
			<img
				class="card-img"
				:src="props.imageUrl"
				:alt="props.title"
				loading="lazy"
				decoding="async"
				@error="onImgError"
				width="325"
				height="270"
			/>
			<div class="card-text">
				<div class="card-info">
					<span class="card-rating">{{ props.rating }}</span>
					<span class="card-type">• {{ props.mediaType === 'movie' ? 'Фильм' : 'Сериал' }} •</span>
					<span class="card-genres">
						<template v-for="(genre, idx) in genreNames" :key="genre + idx">
							{{ genre && genreNames[idx + 1] ? genre + ', ' : genre }}
						</template>
					</span>
				</div>
				<div class="card-title">{{ props.title }}</div>
			</div>
		</RouterLink>
	</div>
</template>

<style scoped>
	.card a {
		display: flex;
		flex-direction: column;
		max-width: 335px;
		gap: 10px;

		.card-img {
			max-width: 100%;
			max-height: 270px;
			object-fit: cover;
			user-select: none;
			aspect-ratio: 2 / 3;
			border-radius: 10px;
			background-color: #363434;
			background: url('no-image.webp') center/cover no-repeat;
		}

		.card-info {
			font-weight: 400;
			font-size: 16px;
		}

		.card-rating {
			font-weight: 700;
			color: #ff0000;
		}

		.card-type {
			font-weight: 700;
			margin: 0 10px;
		}

		.card-title {
			margin-top: 2px;
			font-weight: 600;
			font-size: 20px;
			color: #fff;
		}

		&:hover {
			.card-title,
			.card-rating {
				filter: drop-shadow(0px 1px 10px var(--color-white));
			}
		}
	}
</style>
