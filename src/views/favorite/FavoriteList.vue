<script setup lang="ts">
	import { useFavoriteStore } from '@/stores/favorite';
	import type { FavoriteItem } from '@/stores/typesForStores';
	import { storeToRefs } from 'pinia';
	import IconTrash from '@/assets/icons/IconTrash.vue';
	import IconEyeCheck from '@/assets/icons/IconEyeCheck.vue';
	import IconEyeRemove from '@/assets/icons/IconEyeRemove.vue';
	import ButtonApp from '@/components/Button/ButtonApp.vue';
	import CardApp from '@/components/CardApp/CardApp.vue';

	const { items } = defineProps<{
		items: FavoriteItem[];
	}>();

	const favoriteStore = useFavoriteStore();
	const { isLoadingUpdateItem, isLoadingDeleteItem, currentItemId } = storeToRefs(favoriteStore);
	const { deleteFavoriteItem, updateFavoriteItem } = favoriteStore;
</script>

<template>
	<TransitionGroup v-if="items.length" name="transition-list" tag="div" class="favorite-list">
		<CardApp
			v-for="item in items"
			:key="item.content.id"
			:id="item.content.id"
			:title="item.content.title"
			:rating="item.content.rating"
			:imageUrl="item.content.backdropPath"
			:genreStringNames="item.content.genres"
			:mediaType="item.content.mediaType"
		>
			<template #favorite>
				<ButtonApp
					class="sm blur bg-none"
					:class="item.has_watched ? 'green' : 'yellow'"
					:loading="isLoadingUpdateItem && currentItemId === item.content_id"
					@click="updateFavoriteItem(item.content_id, item.has_watched)"
					v-tooltip.top="`${item.has_watched ? 'Статус: Просмотрен' : 'Статус: Не просмотрен'}`"
				>
					<template #icon>
						<IconEyeCheck v-if="item.has_watched" />
						<IconEyeRemove v-else />
					</template>
				</ButtonApp>

				<ButtonApp
					class="sm blur favorite-delete"
					:loading="isLoadingDeleteItem && currentItemId === item.content_id"
					@click="deleteFavoriteItem(item.content_id)"
					v-tooltip.top="'Удалить из избранного'"
				>
					<template #icon>
						<IconTrash />
					</template>
				</ButtonApp>
			</template>
		</CardApp>
	</TransitionGroup>

	<div class="empty-block" v-else>Список пуст</div>
</template>

<style scoped>
	.favorite-list {
		display: grid;
		grid-template-columns: repeat(4, minmax(300px, 1fr));
		gap: 20px;
		width: 100%;
		position: relative;
		--max-width: 325px;

		@media (max-width: 1300px) {
			grid-template-columns: repeat(3, minmax(300px, 1fr));
		}

		@media (max-width: 980px) {
			grid-template-columns: repeat(3, minmax(260px, 1fr));
		}

		@media (max-width: 860px) {
			grid-template-columns: repeat(2, minmax(260px, 1fr));
		}

		@media (max-width: 580px) {
			grid-template-columns: repeat(1, minmax(260px, 1fr));
			gap: 30px;
		}
	}

	:deep(.favorite-card) {
		@media (max-width: 1300px) {
			--max-width: 400px;
		}

		@media (max-width: 580px) {
			--max-width: 560px;
		}
	}

	.favorite-delete {
		@media (hover: hover) {
			&:hover:not([disabled]),
			&:focus-visible {
				color: var(--color-red);
			}
		}

		&:active:not([disabled]) {
			color: var(--color-red);
		}
	}

	.empty-block {
		font-size: 32px;
		font-weight: 700;
		text-align: center;
		margin-top: 15vh;
	}

	/* ========================================== */
	/* анимации для TransitionGroup               */
	/* ========================================== */
	.transition-list-enter-from,
	.transition-list-leave-to {
		opacity: 0;
		transform: scale(0.9) translateY(20px);
	}

  .transition-list-move,
	.transition-list-enter-active,
	.transition-list-leave-active {
		transition: all 0.35s ease;
	}

	.transition-list-move {
		transition: transform 0.35s ease;
	}

	.transition-list-leave-active {
		position: absolute;
		width: 100%;
		max-width: var(--max-width);
		pointer-events: none;
	}
</style>
