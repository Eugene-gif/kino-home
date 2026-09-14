import { useBreakpoints } from '@vueuse/core'

export function useDevice() {
  const breakpoints = useBreakpoints(
    {
      mobileMax: 800,
    },
    {
      ssrWidth: 375, // Default для SSR
    }
  )

  const isMobile = breakpoints.smaller('mobileMax')

  return {
    isMobile,
  }
}
