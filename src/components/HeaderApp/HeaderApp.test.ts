import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { useSearchStore } from '@/stores/search';
import HeaderApp from './HeaderApp.vue';

type SearchStore = ReturnType<typeof useSearchStore>;

const { ref, computed, defineComponent, nextTick } = await vi.hoisted(() => import('vue'));

const mocks = vi.hoisted(() => {
	return {
		mobile: ref(false),
		inputFocus: vi.fn(),
		store: {
			isLoading: ref(false),
			isSearchLoading: ref(false),
			isSearchLoaded: ref(false),
			searchedList: ref<SearchStore['searchedList']>([]),
			trendingList: ref<SearchStore['trendingList']>([]),
			personList: ref<SearchStore['personList']>([]),
			fetchSearchMulti: vi.fn<SearchStore['fetchSearchMulti']>(),
			fetchHeaderData: vi.fn<SearchStore['fetchHeaderData']>(),
		},
	};
});

vi.mock('pinia', () => ({ storeToRefs: (store: typeof mocks.store) => store }));

vi.mock('@/composables/useDevice.ts', () => ({
	useDevice: () => ({ isMobile: mocks.mobile }),
}));

vi.mock('@/stores/search', () => ({ useSearchStore: () => mocks.store }));

vi.mock('@/stores/auth', () => {
	const user = ref(null);
	return {
		useAuthStore: () => ({
			isAuth: computed(() => false),
			user,
			signOut: vi.fn(),
		}),
	};
});

vi.mock('@/utils/images', () => ({ buildImagePath: (path?: string) => `image:${path ?? ''}` }));

const RouterLinkStub = defineComponent({
	name: 'RouterLink',
	props: { to: { type: [String, Object], required: true } },
	template: '<a class="router-link-stub"><slot /></a>',
});

const DesktopStub = defineComponent({
	name: 'HeaderMenuDesktop',
	template: '<div class="desktop-stub"><slot name="searchButton" /></div>',
});

const MobileStub = defineComponent({
	name: 'HeaderMenuMobile',
	props: { isOpen: Boolean },
	emits: ['close'],
	template: `
    <div class="mobile-stub" :data-open="isOpen">
      <slot name="searchButton" />
      <button v-if="isOpen" class="mobile-close" @click="$emit('close')">Закрыть</button>
    </div>
  `,
});

const ButtonStub = defineComponent({
	name: 'ButtonApp',
	props: { disabled: Boolean },
	template:
		'<button class="button-stub" :disabled="disabled"><slot /><slot name="icon" /><slot name="textRight" /></button>',
});

const ModalStub = defineComponent({
	name: 'ModalSearch',
	props: { isOpen: Boolean },
	emits: ['close'],
	template: `
    <div v-if="isOpen" class="modal-stub">
      <slot name="search" />
      <slot name="content" />
      <button class="modal-close" @click="$emit('close')">Закрыть</button>
    </div>
  `,
});

const InputSearchStub = defineComponent({
	name: 'InputSearch',
	props: { text: { type: String, required: true }, loading: Boolean },
	emits: ['update:text', 'input', 'clear'],
	setup(_, { emit, expose }) {
		expose({ focus: mocks.inputFocus });
		const onInput = (event: Event) => {
			emit('update:text', (event.target as HTMLInputElement).value);
			emit('input');
		};
		return { onInput };
	},
	template: `
    <div>
      <input class="search-input" :value="text" @input="onInput" />
      <button class="clear-search" @click="$emit('clear')">Очистить</button>
    </div>
  `,
});

const ContentStub = defineComponent({
	name: 'ContentModalSearch',
	props: ['uiTrendingList', 'uiSearchedList', 'uiPersonList', 'lenSearchedList', 'isLoadedSearch'],
	emits: ['closeModal'],
	template: '<button class="content-close" @click="$emit(\'closeModal\')">Результаты</button>',
});

const global = {
	stubs: {
		RouterLink: RouterLinkStub,
		HeaderMenuDesktop: DesktopStub,
		HeaderMenuMobile: MobileStub,
		ButtonApp: ButtonStub,
		ModalSearch: ModalStub,
		InputSearch: InputSearchStub,
		ContentModalSearch: ContentStub,
		LoaderApp: { template: '<div class="loader-stub" />' },
		IconLogo: { template: '<i />' },
		IconSearch: { template: '<i />' },
		IconMenu: { template: '<i />' },
	},
};

describe('HeaderApp', () => {
	beforeEach(() => {
		mocks.mobile.value = false;
		mocks.store.isLoading.value = false;
		mocks.store.isSearchLoading.value = false;
		mocks.store.isSearchLoaded.value = false;
		mocks.store.searchedList.value = [];
		mocks.store.trendingList.value = [];
		mocks.store.personList.value = [];
	});

	it('загружает данные шапки при монтировании и отображает десктопное меню', () => {
		const wrapper = mount(HeaderApp, { global });

		expect(mocks.store.fetchHeaderData).toHaveBeenCalledOnce();
		expect(wrapper.find('.desktop-stub').exists()).toBe(true);
		expect(wrapper.find('.mobile-stub').exists()).toBe(false);
		expect(wrapper.getComponent(RouterLinkStub).props('to')).toBe('/');
	});

	it('открывает поиск, фокусирует поле и преобразует данные хранилища для контента', async () => {
		mocks.store.trendingList.value = [
			{ id: 1, name: 'Тьма', poster_path: '/dark.webp', media_type: 'tv' },
		];
		mocks.store.searchedList.value = [
			{ id: 2, title: 'Дюна', poster_path: '/dune.webp', media_type: 'movie' },
		];
		mocks.store.personList.value = [
			{ id: 3, name: 'Дени Вильнёв', known_for_department: 'Directing' },
		];
		const wrapper = mount(HeaderApp, { global });

		await wrapper.get('.desktop-stub .button-stub').trigger('click');
		await nextTick();

		expect(wrapper.getComponent(ModalStub).props('isOpen')).toBe(true);
		expect(mocks.inputFocus).toHaveBeenCalledOnce();
		expect(wrapper.getComponent(ContentStub).props()).toMatchObject({
			uiTrendingList: [{ id: 1, title: 'Тьма', imageUrl: 'image:/dark.webp', mediaType: 'tv' }],
			uiSearchedList: [{ id: 2, title: 'Дюна', imageUrl: 'image:/dune.webp', mediaType: 'movie' }],
			uiPersonList: [{ id: 3, name: 'Дени Вильнёв', profession: 'Directing' }],
			lenSearchedList: 1,
			isLoadedSearch: false,
		});
	});

	it('откладывает непустой поисковый запрос и очищает состояние поиска', async () => {
		vi.useFakeTimers();
		const wrapper = mount(HeaderApp, { global });
		await wrapper.get('.desktop-stub .button-stub').trigger('click');

		await wrapper.get('.search-input').setValue('Матрица');
		expect(mocks.store.fetchSearchMulti).not.toHaveBeenCalled();
		await vi.advanceTimersByTimeAsync(500);
		expect(mocks.store.fetchSearchMulti).toHaveBeenCalledWith('Матрица');

		mocks.store.searchedList.value = [{ id: 1 }];
		mocks.store.isSearchLoaded.value = true;
		await wrapper.get('.clear-search').trigger('click');

		expect(mocks.store.searchedList.value).toEqual([]);
		expect(mocks.store.isSearchLoaded.value).toBe(false);
		expect(wrapper.getComponent(InputSearchStub).props('text')).toBe('');
	});

	it('закрывает и очищает поиск из его контента', async () => {
		mocks.store.searchedList.value = [{ id: 1 }];
		mocks.store.isSearchLoaded.value = true;
		const wrapper = mount(HeaderApp, { global });
		await wrapper.get('.desktop-stub .button-stub').trigger('click');

		await wrapper.get('.content-close').trigger('click');

		expect(wrapper.getComponent(ModalStub).props('isOpen')).toBe(false);
		expect(mocks.store.searchedList.value).toEqual([]);
		expect(mocks.store.isSearchLoaded.value).toBe(false);
	});

	it('открывает и закрывает мобильное меню и закрывает его при открытии поиска', async () => {
		mocks.mobile.value = true;
		const wrapper = mount(HeaderApp, { global });
		const mobileMenu = wrapper.getComponent(MobileStub);

		expect(wrapper.find('.desktop-stub').exists()).toBe(false);
		expect(mobileMenu.props('isOpen')).toBe(false);

		await wrapper.get('.header-burger').trigger('click');
		expect(mobileMenu.props('isOpen')).toBe(true);

		await wrapper.get('.mobile-stub .button-stub').trigger('click');
		expect(mobileMenu.props('isOpen')).toBe(false);
		expect(wrapper.getComponent(ModalStub).props('isOpen')).toBe(true);
	});
});
