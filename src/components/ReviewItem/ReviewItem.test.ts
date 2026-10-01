import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import ReviewItem from './ReviewItem.vue';

const baseProps = {
	name: 'Анна',
	avatar: '/avatar.webp',
	date: '20 сентября 2026',
	rating: 9,
};

describe('ReviewItem', () => {
	it('отображает данные автора, рейтинг и короткий отзыв без раскрывающего блока', () => {
		const wrapper = mount(ReviewItem, {
			props: { ...baseProps, content: 'Короткий и полезный отзыв.' },
		});

		expect(wrapper.get('img').attributes()).toMatchObject({ src: '/avatar.webp', alt: 'avatar' });
		expect(wrapper.text()).toContain('Анна');
		expect(wrapper.text()).toContain('20 сентября 2026');
		expect(wrapper.get('.rating').text()).toBe('9 / 10');
		expect(wrapper.find('details').exists()).toBe(false);
		expect(wrapper.get('.content').text()).toContain('Короткий и полезный отзыв.');
	});

	it('сворачивает текст длиннее 300 символов и сохраняет доступ к полному тексту', () => {
		const content = 'А'.repeat(301);
		const wrapper = mount(ReviewItem, { props: { ...baseProps, content } });

		expect(wrapper.get('summary').text()).toBe(`${content.slice(0, 70)}...`);
		expect(wrapper.get('.spoiler__content').text()).toBe(content);
	});

	it('не сворачивает текст длиной ровно 300 символов', () => {
		const content = 'Б'.repeat(300);
		const wrapper = mount(ReviewItem, { props: { content } });

		expect(wrapper.find('details').exists()).toBe(false);
		expect(wrapper.get('.content').text()).toBe(content);
	});
});
