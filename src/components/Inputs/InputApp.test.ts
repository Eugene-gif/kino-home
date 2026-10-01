import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { FIELD_ID } from '@/constants/constants';
import InputApp from './InputApp.vue';

describe('InputApp', () => {
	it('отображает атрибуты и обновляет v-model при пользовательском вводе', async () => {
		const wrapper = mount(InputApp, {
			props: {
				modelValue: 'старое',
				type: 'email' as const,
				placeholder: 'Почта',
				inputName: 'email',
				autocomplete: 'email',
				id: 'email',
				'onUpdate:modelValue': (value) => wrapper.setProps({ modelValue: value }),
			},
			slots: {
				iconLeft: '<span class="left-icon" />',
				iconRight: '<span class="right-icon" />',
			},
		});

		const input = wrapper.get('input');
		await input.setValue('new@example.com');

		expect(input.attributes()).toMatchObject({
			type: 'email',
			placeholder: 'Почта',
			name: 'email',
			autocomplete: 'email',
		});
		expect(wrapper.emitted('update:modelValue')?.slice(-1)[0]).toEqual(['new@example.com']);
		expect(wrapper.findAll('.icon')).toHaveLength(2);
	});

	it('использует внедрённый id и фокусирует поле по клику на обёртку', async () => {
		const wrapper = mount(InputApp, {
			global: { provide: { [FIELD_ID]: 'field-email' } },
			attachTo: document.body,
		});

		await wrapper.get('.input-wrapper').trigger('click');

		expect(wrapper.get('input').attributes('id')).toBe('field-email');
		expect(document.activeElement).toBe(wrapper.get('input').element);
	});
});
