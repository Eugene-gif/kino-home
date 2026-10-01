import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import InputPassword from './InputPassword.vue';

describe('InputPassword', () => {
	it('обновляет v-model и переключает видимость пароля', async () => {
		const wrapper = mount(InputPassword, {
			props: {
				modelValue: '',
				id: 'password',
				placeholder: 'Пароль',
				inputName: 'password',
				autocomplete: 'current-password',
			},
		});

		const password = wrapper.get('input.input');
		expect(password.attributes('type')).toBe('password');

		await password.setValue('secret');
		await wrapper.get('.switch input').setValue(true);

		expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['secret']);
		expect(password.attributes('type')).toBe('text');
		expect(password.attributes('autocomplete')).toBe('current-password');
	});

	it('фокусирует поле пароля по клику на обёртку', async () => {
		const wrapper = mount(InputPassword, {
			props: { id: 'password' },
			attachTo: document.body,
		});

		await wrapper.get('.input-wrapper').trigger('click');

		expect(document.activeElement).toBe(wrapper.get('input.input').element);
	});
});
