import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import VisibilitySwitch from './VisibilitySwitch.vue';

describe('VisibilitySwitch', () => {
	it('включён по умолчанию и отправляет следующее значение модели', async () => {
		const wrapper = mount(VisibilitySwitch, {
			global: {
				stubs: {
					IconEyeOpen: { template: '<i class="eye-open" />' },
					IconEyeClose: { template: '<i class="eye-close" />' },
				},
			},
		});

		const checkbox = wrapper.get('input');
		expect((checkbox.element as HTMLInputElement).checked).toBe(true);
		expect(wrapper.get('.eye-open').isVisible()).toBe(true);

		await checkbox.setValue(false);

		expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
		expect(wrapper.get('.eye-close').isVisible()).toBe(true);
	});
});
