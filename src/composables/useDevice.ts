import { computed } from 'vue';
import { useBreakpoints, useMediaQuery } from '@vueuse/core';

export function useDevice() {
  const breakpoints = useBreakpoints(
    {
      mobileMax: 800,
    },
    {
      ssrWidth: 375, // Default для SSR
    }
  );

  const isMobileWidth = breakpoints.smaller('mobileMax');

  const isLandscapeMobile = useMediaQuery('screen and (orientation: landscape) and (max-height: 480px)');

  const isMobile = computed(() => isMobileWidth.value || isLandscapeMobile.value);

  return {
    isMobile
  }
}
