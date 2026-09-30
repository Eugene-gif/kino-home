import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { FavoriteItem } from '@/stores/typesForStores';
import FavoriteList from './FavoriteList.vue';

const favoriteMock = vi.hoisted(() => ({
	store: undefined as
		| {
				isLoadingUpdateItem: { value: boolean };
				isLoadingDeleteItem: { value: boolean };
				currentItemId: { value: number | null };
				deleteFavoriteItem: ReturnType<typeof vi.fn>;
				updateFavoriteItem: ReturnType<typeof vi.fn>;
		  }
		| undefined,
}));

vi.mock('pinia', () => ({ storeToRefs: (store: unknown) => store }));

vi.mock('@/stores/favorite', async () => {
	const { ref } = await import('vue');
	favoriteMock.store = {
		isLoadingUpdateItem: ref(false),
		isLoadingDeleteItem: ref(false),
		currentItemId: ref<number | null>(null),
		deleteFavoriteItem: vi.fn(),
		updateFavoriteItem: vi.fn(),
	};
	return { useFavoriteStore: () => favoriteMock.store };
});

const CardStub = defineComponent({
	name: 'CardApp',
	props: ['id', 'title', 'rating', 'imageUrl', 'genreStringNames', 'mediaType'],
	template: '<article class="card-stub"><span>{{ title }}</span><slot name="favorite" /></article>',
});

const ButtonStub = defineComponent({
	name: 'ButtonApp',
	props: { loading: Boolean },
	template: '<button class="button-stub" :disabled="loading"><slot name="icon" /></button>',
});

const global = {
	stubs: {
		CardApp: CardStub,
		ButtonApp: ButtonStub,
		IconTrash: { template: '<i class="trash-icon" />' },
		IconEyeCheck: { template: '<i class="watched-icon" />' },
		IconEyeRemove: { template: '<i class="unwatched-icon" />' },
	},
	directives: { tooltip: () => undefined },
};

const item = (id: number, hasWatched: boolean): FavoriteItem => ({
	content_id: id,
	has_watched: hasWatched,
	content: {
		id,
		title: `Фильм ${id}`,
		overview: '',
		rating: '8.0',
		backdropPath: `/movie-${id}.webp`,
		genres: 'Драма',
		countries: 'США',
		director: 'Режиссёр',
		actors: 'Актёр',
		mediaType: 'movie',
	},
});

describe('FavoriteList', () => {
	beforeEach(() => {
		favoriteMock.store!.isLoadingUpdateItem.value = false;
		favoriteMock.store!.isLoadingDeleteItem.value = false;
		favoriteMock.store!.currentItemId.value = null;
	});

	it('показывает пустое состояние без карточек', () => {
		const wrapper = mount(FavoriteList, { props: { items: [] }, global });

		expect(wrapper.get('.empty-block').text()).toBe('Список пуст');
		expect(wrapper.findComponent(CardStub).exists()).toBe(false);
	});

	it('отображает карточки и элементы управления статусом просмотра для каждого элемента', () => {
		const wrapper = mount(FavoriteList, {
			props: { items: [item(1, true), item(2, false)] },
			global,
		});
		const cards = wrapper.findAllComponents(CardStub);

		expect(cards).toHaveLength(2);
		expect(cards[0]?.props()).toMatchObject({
			id: 1,
			title: 'Фильм 1',
			imageUrl: '/movie-1.webp',
			genreStringNames: 'Драма',
			mediaType: 'movie',
		});
		expect(wrapper.findAll('.watched-icon')).toHaveLength(1);
		expect(wrapper.findAll('.unwatched-icon')).toHaveLength(1);
	});

	it('обновляет статус просмотра и удаляет через публичные действия хранилища', async () => {
		const wrapper = mount(FavoriteList, { props: { items: [item(7, true)] }, global });
		const buttons = wrapper.findAllComponents(ButtonStub);

		await buttons[0]!.trigger('click');
		await buttons[1]!.trigger('click');

		expect(favoriteMock.store!.updateFavoriteItem).toHaveBeenCalledWith(7, true);
		expect(favoriteMock.store!.deleteFavoriteItem).toHaveBeenCalledWith(7);
	});

	it('показывает загрузку только для действия соответствующего элемента', () => {
		favoriteMock.store!.isLoadingDeleteItem.value = true;
		favoriteMock.store!.currentItemId.value = 2;

		const wrapper = mount(FavoriteList, {
			props: { items: [item(1, false), item(2, false)] },
			global,
		});
		const buttons = wrapper.findAllComponents(ButtonStub);

		expect(buttons[1]?.props('loading')).toBe(false);
		expect(buttons[3]?.props('loading')).toBe(true);
	});
});
