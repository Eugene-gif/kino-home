import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import HeroCard from './HeroCard.vue';

const RouterLinkStub = defineComponent({
	name: 'RouterLink',
	props: { to: { type: Object, required: true } },
	template: '<a><slot /></a>',
});

describe('HeroCard', () => {
	it('отображает данные фильма и ссылку на страницу фильма', () => {
		const wrapper = mount(HeroCard, {
			props: {
				id: 11,
				title: 'Интерстеллар',
				imageUrl: '/interstellar.webp',
				genreNames: ['Фантастика', 'Драма'],
				date: '2014',
			},
			global: { stubs: { RouterLink: RouterLinkStub } },
		});

		expect(wrapper.getComponent(RouterLinkStub).props('to')).toEqual({
			name: 'movie-details',
			params: { id: 11 },
		});
		expect(wrapper.get('img').attributes()).toMatchObject({
			src: '/interstellar.webp',
			alt: 'Интерстеллар',
		});
		expect(wrapper.findAll('.card-label').map((label) => label.text())).toEqual([
			'Фантастика',
			'Драма',
		]);
		expect(wrapper.get('.card-date').text()).toBe('2014');
	});

	it('использует запасное изображение после ошибки загрузки', async () => {
		const wrapper = mount(HeroCard, {
			props: { imageUrl: '/broken.webp' },
			global: { stubs: { RouterLink: RouterLinkStub } },
		});

		await wrapper.get('img').trigger('error');

		expect(wrapper.get('img').attributes('src')).toBe('/no-image.webp');
	});
});
