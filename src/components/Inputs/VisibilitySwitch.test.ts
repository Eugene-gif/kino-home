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
		const openIcon = wrapper.get('.eye-open').element as HTMLElement;
		const closeIcon = wrapper.get('.eye-close').element as HTMLElement;

		expect((checkbox.element as HTMLInputElement).checked).toBe(true);
		expect(openIcon.style.display).not.toBe('none');
		expect(closeIcon.style.display).toBe('none');

		await checkbox.setValue(false);

		expect(wrapper.emitted('update:modelValue')).toEqual([[false]]);
		expect(openIcon.style.display).toBe('none');
		expect(closeIcon.style.display).not.toBe('none');
	});
});
