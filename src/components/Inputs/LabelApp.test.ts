import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { FIELD_ID } from '@/constants/constants';
import LabelApp from './LabelApp.vue';

describe('LabelApp', () => {
	it('отображает текст и явно переданный id', () => {
		const wrapper = mount(LabelApp, { props: { text: 'Почта', id: 'email' } });

		expect(wrapper.text()).toBe('Почта');
		expect(wrapper.get('label').attributes('for')).toBe('email');
	});

	it('использует id поля из совместимого с FormField контекста', () => {
		const wrapper = mount(LabelApp, {
			props: { text: 'Имя' },
			global: { provide: { [FIELD_ID]: 'generated-id' } },
		});

		expect(wrapper.get('label').attributes('for')).toBe('generated-id');
	});
});
