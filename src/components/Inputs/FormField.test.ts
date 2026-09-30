import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import FormField from './FormField.vue';
import InputApp from './InputApp.vue';
import LabelApp from './LabelApp.vue';

const FieldHarness = defineComponent({
	components: { FormField, InputApp, LabelApp },
	template: `
    <FormField>
      <LabelApp text="Почта" />
      <InputApp />
    </FormField>
  `,
});

describe('FormField', () => {
	it('отображает содержимое слота и связывает label с полем ввода', () => {
		const wrapper = mount(FieldHarness);
		const labelId = wrapper.get('label').attributes('for');

		expect(labelId).toBeTruthy();
		expect(wrapper.get('input').attributes('id')).toBe(labelId);
		expect(wrapper.get('.form-field').text()).toContain('Почта');
	});
});
