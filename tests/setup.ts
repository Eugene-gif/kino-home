import { afterEach, vi } from 'vitest';
import { enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

Object.defineProperty(window, 'scrollTo', {
	configurable: true,
	value: vi.fn(),
});

afterEach(() => {
	vi.useRealTimers();
	document.body.innerHTML = '';
	document.body.removeAttribute('style');
});
