import { defineComponent, nextTick } from 'vue';
import { DOMWrapper, mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import ModalVideoPlayer from './ModalVideoPlayer.vue';

vi.mock('@/composables/useDevice', async () => {
	const { ref } = await import('vue');
	return { useDevice: () => ({ isMobile: ref(false) }) };
});

const ButtonStub = defineComponent({
	name: 'ButtonApp',
	template: '<button class="button-stub"><slot name="icon" /></button>',
});

const PlayerStub = defineComponent({
	name: 'VueYtframe',
	props: {
		videoId: { type: String, required: true },
		playerVars: { type: Object, required: true },
	},
	template: '<div class="player-stub" />',
});

const mountModal = (videoKey?: string) =>
	mount(ModalVideoPlayer, {
		props: { isOpen: true, videoKey },
		global: {
			stubs: {
				ButtonApp: ButtonStub,
				VueYtframe: PlayerStub,
				IconLogo: { template: '<div />' },
				IconClose: { template: '<i />' },
			},
		},
	});

describe('ModalVideoPlayer', () => {
	it('передаёт выбранное видео и настройки в интерфейс проигрывателя', () => {
		const wrapper = mountModal('video-123');
		const player = wrapper.getComponent(PlayerStub);

		expect(player.props('videoId')).toBe('video-123');
		expect(player.props('playerVars')).toEqual({ autoplay: 1, rel: 0 });
	});

	it('использует запасное видео, когда ключ не передан', () => {
		const wrapper = mountModal();

		expect(wrapper.getComponent(PlayerStub).props('videoId')).toBe('O-b2VfmmbyA');
	});

	it('закрывается по кнопке, клику на оверлей и клавише Escape', async () => {
		const wrapper = mountModal('video-123');
		const body = new DOMWrapper(document.body);

		await body.get('.button-stub').trigger('click');
		await body.get('.modal-overlay').trigger('click');
		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', cancelable: true }));
		await nextTick();

		expect(wrapper.emitted('close')).toHaveLength(3);
	});
});
