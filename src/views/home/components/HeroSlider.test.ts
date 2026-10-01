import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import HeroSlider from './HeroSlider.vue';

const SwiperStub = defineComponent({
	name: 'SwiperStub',
	props: [
		'modules',
		'slidesPerView',
		'spaceBetween',
		'navigation',
		'pagination',
		'loop',
		'scrollbar',
		'autoplay',
		'freeMode',
	],
	template: '<div class="swiper-stub"><slot /></div>',
});

const SwiperSlideStub = defineComponent({
	name: 'SwiperSlide',
	template: '<div class="slide-stub"><slot /></div>',
});

const HeroCardStub = defineComponent({
	name: 'HeroCard',
	props: ['id', 'title', 'rating', 'imageUrl', 'genreIds', 'genreNames', 'date'],
	template: '<article class="hero-card-stub">{{ title }}</article>',
});

const ButtonStub = defineComponent({
	name: 'ButtonApp',
	template: '<button class="button-stub"><slot name="icon" /></button>',
});

const global = {
	stubs: {
		Swiper: SwiperStub,
		SwiperSlide: SwiperSlideStub,
		HeroCard: HeroCardStub,
		ButtonApp: ButtonStub,
	},
};

describe('HeroSlider', () => {
	it('отображает каждый элемент слайдера и передаёт props карточке', () => {
		const heroItems = [
			{
				id: 1,
				title: 'Интерстеллар',
				rating: 8.7,
				imageUrl: '/one.webp',
				genreIds: [1],
				genreNames: ['Драма'],
				date: '2014',
			},
			{
				id: 2,
				title: 'Дюна',
				rating: 8,
				imageUrl: '/two.webp',
				genreIds: [2],
				genreNames: ['Фантастика'],
				date: '2021',
			},
		];
		const wrapper = mount(HeroSlider, { props: { heroItems }, global });
		const cards = wrapper.findAllComponents(HeroCardStub);

		expect(cards).toHaveLength(2);
		expect(cards[0]?.props()).toMatchObject(heroItems[0]!);
		expect(cards[1]?.props()).toMatchObject(heroItems[1]!);
	});

	it.each([
		[3, false],
		[4, true],
	])(
		'устанавливает loop=%s только при наличии хотя бы четырёх элементов',
		(count, expectedLoop) => {
			const heroItems = Array.from({ length: count }, (_, id) => ({ id, title: `Фильм ${id}` }));
			const wrapper = mount(HeroSlider, { props: { heroItems }, global });

			expect(wrapper.getComponent(SwiperStub).props('loop')).toBe(expectedLoop);
		},
	);

	it('настраивает автопрокрутку и навигацию и отображает кнопку переключения', () => {
		const wrapper = mount(HeroSlider, { props: { heroItems: [] }, global });
		const swiper = wrapper.getComponent(SwiperStub);

		expect(swiper.props('autoplay')).toEqual({ delay: 5000 });
		expect(swiper.props('navigation')).toEqual({ nextEl: '.btn-next', prevEl: '.btn-prev' });
		expect(wrapper.get('.btn-next-icon').text()).toBe('←');
	});
});
