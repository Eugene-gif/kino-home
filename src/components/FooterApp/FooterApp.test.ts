import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { FooterData } from './FooterData';
import FooterApp from './FooterApp.vue';

vi.mock('@/stores/auth', async () => {
	const { ref } = await import('vue');
	return { useAuthStore: () => ({ isAuth: ref(false) }) };
});

const FooterSectionStub = defineComponent({
	name: 'FooterSection',
	props: { props: { type: Object, required: true } },
	template: '<section class="footer-section-stub">{{ props.title }}</section>',
});

describe('FooterApp', () => {
	it('отображает все настроенные разделы подвала и копирайт', () => {
		const wrapper = mount(FooterApp, {
			global: {
				stubs: {
					FooterSection: FooterSectionStub,
					IconLogo: { template: '<div class="logo-stub" />' },
				},
			},
		});

		const sections = wrapper.findAllComponents(FooterSectionStub);
		expect(sections).toHaveLength(FooterData.length);
		expect(sections.map((section) => section.props('props'))).toEqual(FooterData);
		expect(wrapper.find('.logo-stub').exists()).toBe(true);
		expect(wrapper.get('.footer-copyright').text()).toBe('© КиноДом 2026');
	});
});
