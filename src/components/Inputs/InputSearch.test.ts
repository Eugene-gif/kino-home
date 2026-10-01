import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import InputSearch from './InputSearch.vue';

describe('InputSearch', () => {
	it('отправляет обновление текста при пользовательском вводе', async () => {
		const wrapper = mount(InputSearch, { props: { text: '', loading: false } });

		await wrapper.get('input').setValue('Дюна');

		expect(wrapper.emitted('update:text')).toEqual([['Дюна']]);
		expect(wrapper.find('.spinner').exists()).toBe(false);
		expect(wrapper.find('.close').exists()).toBe(false);
	});

	it('показывает индикатор при загрузке непустого запроса', () => {
		const wrapper = mount(InputSearch, { props: { text: 'Дюна', loading: true } });

		expect(wrapper.find('.spinner').exists()).toBe(true);
		expect(wrapper.find('.close').exists()).toBe(false);
	});

	it('очищает значение, отправляет событие clear и возвращает фокус', async () => {
		const wrapper = mount(InputSearch, {
			props: { text: 'Дюна', loading: false },
			attachTo: document.body,
		});

		await wrapper.get('.close').trigger('click');

		expect(wrapper.emitted('update:text')).toEqual([['']]);
		expect(wrapper.emitted('clear')).toHaveLength(1);
		expect(document.activeElement).toBe(wrapper.get('input').element);
	});
});
