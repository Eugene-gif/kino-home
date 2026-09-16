import { watch, onUnmounted, type Ref } from 'vue';

export function useBodyScrollLock(isLocked: Ref<boolean>) {
  let scrollY = 0;

  const lock = () => {
    if (typeof window === 'undefined') return;

    // Текущая позиция скролла
    scrollY = window.scrollY;

    const isScrollbarGutterSupported =
      typeof CSS !== 'undefined' && CSS.supports && CSS.supports('scrollbar-gutter', 'stable');

    // Ширина скроллбара
    const scrollbarWidth = isScrollbarGutterSupported ? 0 : window.innerWidth - document.documentElement.clientWidth;

    // Фиксация body
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    // Компенсация скроллбара
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  };

  const unlock = () => {
    if (typeof window === 'undefined') return;

    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';

    // Возврат скролла на прежнее место
    window.scrollTo({
      top: scrollY,
      left: 0,
      behavior: 'instant',
    });
  };

  watch(
    isLocked,
    (val) => {
      if (val) {
        lock();
      } else {
        unlock();
      }
    },
    { immediate: true },
  );

  onUnmounted(() => {
    unlock();
  });
}
