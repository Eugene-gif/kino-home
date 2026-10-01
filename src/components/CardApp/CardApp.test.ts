import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import CardApp from './CardApp.vue';

const RouterLinkStub = defineComponent({
	name: 'RouterLink',
	props: { to: { type: Object, required: true } },
	template: '<a><slot /></a>',
});

describe('CardApp', () => {
	it('отображает данные фильма и формирует маршрут к странице фильма', () => {
		const wrapper = mount(CardApp, {
			props: {
				id: 42,
				title: 'Дюна',
				rating: 8.2,
				imageUrl: '/dune.webp',
				genreStringNames: 'Фантастика, драма',
				mediaType: 'movie',
			},
			global: { stubs: { RouterLink: RouterLinkStub } },
		});

		expect(wrapper.getComponent(RouterLinkStub).props('to')).toEqual({
			name: 'movie-details',
			params: { id: 42 },
		});
		expect(wrapper.get('img').attributes()).toMatchObject({ src: '/dune.webp', alt: 'Дюна' });
		expect(wrapper.text()).toContain('8.2');
		expect(wrapper.text()).toContain('Фильм');
		expect(wrapper.text()).toContain('Фантастика, драма');
	});

	it('использует маршрут сериала и запасное изображение после ошибки загрузки', async () => {
		const wrapper = mount(CardApp, {
			props: { id: '7', title: 'Тьма', imageUrl: '/broken.webp', mediaType: 'tv' },
			global: { stubs: { RouterLink: RouterLinkStub } },
		});

		await wrapper.get('img').trigger('error');

		expect(wrapper.getComponent(RouterLinkStub).props('to')).toEqual({
			name: 'tv-details',
			params: { id: '7' },
		});
		expect(wrapper.get('img').attributes('src')).toBe('/no-image.webp');
		expect(wrapper.text()).toContain('Сериал');
	});

	it('отображает слот избранного только когда он передан', () => {
		const wrapper = mount(CardApp, {
			slots: { favorite: '<button class="favorite-action">Удалить</button>' },
			global: { stubs: { RouterLink: RouterLinkStub } },
		});

		expect(wrapper.get('.card').classes()).toContain('favorite-card');
		expect(wrapper.get('.favorite-action').text()).toBe('Удалить');
	});
});
