<script setup lang="ts">
	import { computed } from 'vue';
	import { onImgError } from '@/utils/images';
	import { routeNames } from '@/constants/routesData';
	import type { CardAppType } from '@/components/CardApp/CardApp.types';

	const props = withDefaults(defineProps<CardAppType>(), {
		id: '',
		title: '',
		rating: '0.0',
		imageUrl: '',
		genreIds: () => [],
		genreNames: () => [],
		date: '',
	});

	const linkName = computed(() => {
		return routeNames.movieDetails;
	});
</script>

<template>
	<div class="hero-card card">
		<RouterLink :to="{ name: linkName, params: { id: props.id } }">
			<div class="card-content">
				<img class="card-img" :src="props.imageUrl" :alt="props.title" @error="onImgError" />
				<div class="card-text">
					<h4 class="card-title">{{ props.title }}</h4>
					<div class="card-info">
						<div v-for="genre in props.genreNames" :key="genre" class="card-label">
							{{ genre }}
						</div>
						<div class="card-date">{{ props.date }}</div>
					</div>
				</div>
			</div>
		</RouterLink>
	</div>
</template>

<style scoped>
	.card a {
		border-radius: 12px;
		max-width: 380px;
		width: 380px;
	}

	.card-content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 10px;
	}

	.card-img {
		max-height: 480px;
		max-width: 380px;
		width: 100%;
		height: 480px;
		object-fit: cover;
		border-radius: 12px;
		min-width: 220px;
		background-color: #363434;
		background: url('no-image.webp') center/cover no-repeat;
	}

	.card-text {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.card-title {
		font-weight: 400;
		font-size: 16px;
		line-height: 1.4;
		color: #fff;
	}

	.card-info {
		display: flex;
		align-items: center;
		gap: 10px;
		color: var(--color-red);
		font-weight: 400;
		font-size: 12px;
		line-height: 1.4;
		flex-wrap: wrap;
	}

	.card-label {
		padding: 2px 6px;
		border-radius: 6px;
		border: 1.15px solid var(--color-red);
	}

	@media (width <= 1380px) {
		.card {
			width: 300px;
		}

		.card-img {
			height: 430px;
		}
	}

	@media (width <= 960px) {
		.card {
			width: 260px;
		}

		.card-img {
			height: 370px;
		}
	}

	@media (width <= 760px) {
		.card {
			width: 100%;
		}

		.card-img {
			height: 350px;
			width: 100%;
		}
	}
</style>
