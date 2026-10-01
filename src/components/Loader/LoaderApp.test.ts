import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LoaderApp from './LoaderApp.vue';

describe('LoaderApp', () => {
	it('отображает три анимированных элемента загрузчика', () => {
		const wrapper = mount(LoaderApp);

		expect(wrapper.find('.loader').exists()).toBe(true);
		expect(wrapper.findAll('.loader-square')).toHaveLength(3);
	});
});
