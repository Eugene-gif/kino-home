import { defineComponent, nextTick } from 'vue';
import { DOMWrapper, mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ModalSearch from './ModalSearch.vue';

const device = vi.hoisted(() => ({ isMobile: false }));

vi.mock('@/composables/useDevice', async () => {
	const { computed } = await import('vue');
	return { useDevice: () => ({ isMobile: computed(() => device.isMobile) }) };
});

const ButtonStub = defineComponent({
	name: 'ButtonApp',
	template: '<button class="button-stub"><slot name="icon" /></button>',
});

const mountModal = (isOpen = true) =>
	mount(ModalSearch, {
		props: { isOpen },
		slots: {
			search: '<input class="search-slot" />',
			content: '<div class="content-slot">Результаты</div>',
		},
		global: {
			stubs: {
				ButtonApp: ButtonStub,
				IconLogo: { template: '<div class="logo-stub" />' },
				IconClose: { template: '<i class="close-icon" />' },
			},
		},
	});

describe('ModalSearch', () => {
	beforeEach(() => {
		device.isMobile = false;
	});

	it('не отображает содержимое диалога в закрытом состоянии', () => {
		mountModal(false);

		expect(document.body.querySelector('[role="dialog"]')).toBeNull();
	});

	it('телепортирует слоты, блокирует прокрутку body и закрывается по кнопке', async () => {
		const wrapper = mountModal();
		const body = new DOMWrapper(document.body);

		expect(body.get('[role="dialog"]').attributes('aria-modal')).toBe('true');
		expect(document.body.querySelector('.search-slot')).not.toBeNull();
		expect(body.get('.content-slot').text()).toBe('Результаты');
		expect(document.body.style.position).toBe('fixed');

		await body.get('.button-stub').trigger('click');

		expect(wrapper.emitted('close')).toHaveLength(1);
	});

	it('закрывается по клику на оверлей и Escape, но не по клику на панель', async () => {
		const wrapper = mountModal();
		const body = new DOMWrapper(document.body);

		await body.get('.modal-panel').trigger('click');
		expect(wrapper.emitted('close')).toBeUndefined();

		await body.get('.modal-overlay').trigger('click');
		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', cancelable: true }));
		await nextTick();

		expect(wrapper.emitted('close')).toHaveLength(2);
	});

	it('использует компактную кнопку закрытия на мобильном устройстве', () => {
		device.isMobile = true;
		mountModal();

		expect(new DOMWrapper(document.body).get('.button-stub').classes()).toContain('sm');
	});
});
