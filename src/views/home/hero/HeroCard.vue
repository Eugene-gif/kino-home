<script setup lang="ts">
	import type { IHeroCard } from './heroTypes';

	interface Props {
		card: IHeroCard;
	}

	const props = withDefaults(defineProps<Props>(), {
		card: () => ({
			id: '',
			name: '',
			image: 'no-image.webp',
			tags: [],
			date: '',
		}),
	});

	const { card } = props;

	const onImgError = (evt: Event) => {
    const img = evt.currentTarget as HTMLImageElement | null;
    if (!img) return;
    console.log('onImgError(evt)');

		img.onerror = null;
		img.src = '/no-image.webp';
	};
</script>

<template>
	<div class="hero-card card">
		<div class="card-content">
			<img class="card-img" :src="'/' + card.image" :alt="card.name" @error="onImgError" />
			<div class="card-text">
				<h4 class="card-title">{{ card.name }}</h4>
				<div class="card-info">
					<div v-for="(tag, idx) in card.tags" :key="idx" class="card-label">
						{{ tag }}
					</div>
					<div class="card-date">{{ card.date }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.card {
		border-radius: 12px;
		max-width: 380px;
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
	}

  .card-img[src='/no-image.webp'] {
    object-fit: contain;
    background-color: black;
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

	@media (min-width: 960px) {
		.card-img {
			height: 480px;
			border-radius: 12px;
			/* object-fit: cover; */
		}
	}
</style>
