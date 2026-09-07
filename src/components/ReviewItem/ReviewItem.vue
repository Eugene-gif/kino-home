<script setup lang="ts">
	import { computed } from 'vue';
  import type { ReviewItemType } from './ReviewItem.type';

	const { name, avatar, content, date, rating } = defineProps<ReviewItemType>();

	const isLongText = computed(() => Number(content?.length) > 300);
	const summary = computed(() => (content?.slice(0, 70) ?? 'Читать полностью') + '...');
</script>

<template>
	<li class="review-card card">
		<div class="author">
			<div class="author__info">
				<img :src="avatar" alt="avatar" class="author__img" width="50" height="50" />

				<div class="author__text">
					<div class="author__name">{{ name }}</div>
					<div class="author__date">{{ date }}</div>
				</div>
			</div>
		</div>

		<div class="rating">{{ rating }} / 10</div>

		<div class="content">
			<template v-if="!isLongText">
				{{ content }}
			</template>

			<details v-else class="spoiler">
				<summary class="spoiler__toggle">{{ summary }}</summary>
				<div class="spoiler__content">
					{{ content }}
				</div>
			</details>
		</div>
	</li>
</template>

<style scoped>
	.review-card {
		display: flex;
		flex-direction: column;
		gap: 25px;
	}

	.author__info {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.author__img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		object-fit: cover;
	}

	.author__text {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.author__name {
		font-size: 18px;
		font-weight: 600;
		line-height: 1.4;
		color: var(--color-white);
	}

	.author__date {
		font-size: 14px;
		line-height: 1.4;
		color: var(--text-color-base);
	}

	.rating {
		font-size: 16px;
		font-weight: 600;
		color: var(--color-red);
	}

	.content {
		font-size: 16px;
		font-weight: 500;
		line-height: 1.4;
		color: var(--text-color-base);
	}

	.spoiler::details-content {
		block-size: 0;
		overflow: hidden;
		opacity: 0;
		transition:
			block-size 0.3s ease,
			opacity 0.3s ease,
			content-visibility 0.3s allow-discrete;
	}

	.spoiler[open]::details-content {
		block-size: auto;
		opacity: 1;
	}

	.spoiler__toggle {
		cursor: pointer;
		user-select: none;
		font-weight: 700;
		font-size: 18px;
		list-style: none;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.spoiler__toggle::-webkit-details-marker {
		display: none;
	}

	.spoiler__toggle::before {
		content: '▶';
		font-size: 0.7em;
		transition: transform 0.3s ease;
	}

	.spoiler[open] .spoiler__toggle::before {
		transform: rotate(90deg);
	}

	.spoiler__content {
		padding-block-start: 10px;
	}
</style>
