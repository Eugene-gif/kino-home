<script setup lang="ts">
	import { onImgError } from '@/utils/images';
	import type { CatalogCardItem } from '@/views/home/homeTypes';

	const props = withDefaults(defineProps<CatalogCardItem>(), {
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
				name: props.mediaType === 'movie' ? 'movie-details' : 'tv-details',
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
			/>
			<div class="card-text">
				<div class="card-info">
					<span class="card-rating">{{ props.rating }}</span>
					<span class="card-type">{{ props.mediaType === 'movie' ? 'Фильм' : 'Сериал' }}</span>
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
			position: relative;
			font-weight: 700;
			padding: 0 15px;

			&::before,
			&::after {
				content: '•';
				position: absolute;
				top: 0;
			}

			&::before {
				left: 0;
				transform: translateX(75%);
			}

			&::after {
				right: 0;
				transform: translateX(-75%);
			}
		}

		.card-title {
			margin-top: 2px;
			font-weight: 600;
			font-size: 20px;
			color: #fff;
		}
	}
</style>
