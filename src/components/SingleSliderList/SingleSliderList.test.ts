import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SingleSliderList from './SingleSliderList.vue';

const SwiperStub = defineComponent({
	name: 'SwiperStub',
	props: [
		'modules',
		'slidesPerView',
		'breakpoints',
		'spaceBetween',
		'navigation',
		'loop',
		'pagination',
		'scrollbar',
		'mousewheel',
		'freeMode',
	],
	template: '<div class="swiper-stub"><slot /></div>',
});

const SwiperSlideStub = defineComponent({
	name: 'SwiperSlide',
	template: '<div class="slide-stub"><slot /></div>',
});

const CardStub = defineComponent({
	name: 'CardApp',
	props: ['id', 'title', 'rating', 'imageUrl', 'genreStringNames', 'mediaType'],
	template: '<article class="card-stub">{{ title }}</article>',
});

const SkeletonStub = defineComponent({
	name: 'CardAppSkeleton',
	template: '<div class="skeleton-stub" />',
});

const global = {
	stubs: {
		Swiper: SwiperStub,
		SwiperSlide: SwiperSlideStub,
		CardApp: CardStub,
		CardAppSkeleton: SkeletonStub,
	},
};

describe('SingleSliderList', () => {
	it('отображает заголовок и по одной карточке на элемент с публичными props', () => {
		const items = [
			{
				id: 1,
				title: 'Дюна',
				rating: '8.2',
				imageUrl: '/dune.webp',
				genreStringNames: 'Фантастика',
				mediaType: 'movie',
			},
			{ id: 2, title: 'Тьма', mediaType: 'tv' },
		];
		const wrapper = mount(SingleSliderList, {
			props: { title: 'Популярное', items },
			global,
		});

		expect(wrapper.get('.slider-title').text()).toBe('Популярное');
		const cards = wrapper.findAllComponents(CardStub);
		expect(cards).toHaveLength(2);
		expect(cards[0]?.props()).toMatchObject(items[0]!);
		expect(cards[1]?.props()).toMatchObject(items[1]!);
	});

	it('отображает четыре слайда-скелетона для пустого незагружающегося списка', () => {
		const wrapper = mount(SingleSliderList, {
			props: { items: [], loading: false },
			global,
		});

		expect(wrapper.findAllComponents(SkeletonStub)).toHaveLength(4);
		expect(wrapper.findAllComponents(CardStub)).toHaveLength(0);
	});

	it('передаёт настройки навигации и взаимодействия в Swiper', () => {
		const wrapper = mount(SingleSliderList, { props: { items: [] }, global });
		const swiper = wrapper.getComponent(SwiperStub);

		expect(swiper.props('slidesPerView')).toBe(4);
		expect(swiper.props('navigation')).toMatchObject({ disabledClass: 'is-disabled' });
		expect(swiper.props('mousewheel')).toMatchObject({ enabled: true, forceToAxis: true });
		expect(swiper.props('freeMode')).toMatchObject({ enabled: true, sticky: true });
		expect(wrapper.get('.btn-prev').text()).toBe('←');
		expect(wrapper.get('.btn-next').text()).toBe('→');
	});
});
