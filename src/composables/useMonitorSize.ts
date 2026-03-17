// eslint-disable
// import { onMounted, onUnmounted, ref, type Ref } from 'vue';

// export function useMediaQuery(query: string): Ref<boolean> {
//   const matches = ref(false);

//   // SSR-safe: на сервере просто вернём false, а на клиенте актуализируем в onMounted
//   const isClient = typeof window !== 'undefined';

//   let mql: MediaQueryList | null = null;

//   const update = () => {
//     if (!mql) return;
//     matches.value = mql.matches;
//   };

//   const onChange = () => {
//     update();
//   };

//   onMounted(() => {
//     if (!isClient) return;

//     mql = window.matchMedia(query);
//     update();

//     // Safari < 14 использует addListener/removeListener
//     if ('addEventListener' in mql) {
//       mql.addEventListener('change', onChange);
//     } else {
//       mql.addListener(onChange);
//     }
//   });

//   onUnmounted(() => {
//     if (!mql) return;

//     if ('removeEventListener' in mql) {
//       mql.removeEventListener('change', onChange);
//     } else {
//       mql.removeListener(onChange);
//     }

//     mql = null;
//   });

//   return matches;
// }
// eslint-enable
