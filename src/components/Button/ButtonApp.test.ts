import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import ButtonApp from './ButtonApp.vue';

const RouterLinkStub = defineComponent({
	name: 'RouterLink',
	props: { to: { type: [String, Object], required: true } },
	template: '<a :data-to="typeof to === \'string\' ? to : JSON.stringify(to)"><slot /></a>',
});

describe('ButtonApp', () => {
	it('отображает кнопку со всеми слотами и передаёт событие клика', async () => {
		const wrapper = mount(ButtonApp, {
			slots: {
				default: 'Смотреть',
				icon: '<span class="test-icon">icon</span>',
				textRight: '<span class="right-text">сейчас</span>',
			},
			global: { stubs: { RouterLink: RouterLinkStub } },
		});

		await wrapper.get('button').trigger('click');

		expect(wrapper.text()).toContain('Смотреть');
		expect(wrapper.get('.test-icon').text()).toBe('icon');
		expect(wrapper.get('.right-text').text()).toBe('сейчас');
		expect(wrapper.emitted('click')).toHaveLength(1);
	});

	it('блокирует кнопку и заменяет иконку во время загрузки', () => {
		const wrapper = mount(ButtonApp, {
			props: { loading: true },
			slots: { icon: '<span class="test-icon">icon</span>' },
			global: {
				stubs: {
					RouterLink: RouterLinkStub,
					IconLoading: { template: '<i class="loading-icon" />' },
				},
			},
		});

		expect(wrapper.get('button').attributes('disabled')).toBeDefined();
		expect(wrapper.get('.loading-icon').isVisible()).toBe(true);
		expect(wrapper.find('.test-icon').exists()).toBe(false);
	});

	it('отображает ссылку роутера и применяет пользовательский радиус', () => {
		const wrapper = mount(ButtonApp, {
			props: { href: '/movies', round: '12px' },
			slots: { default: 'Каталог' },
			global: { stubs: { RouterLink: RouterLinkStub } },
		});

		expect(wrapper.get('a').attributes('data-to')).toBe('/movies');
		expect(wrapper.get('a').attributes('style')).toContain('border-radius: 12px');
		expect(wrapper.text()).toBe('Каталог');
	});
});
