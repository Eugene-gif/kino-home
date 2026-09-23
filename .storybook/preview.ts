import type { Preview } from '@storybook/vue3-vite';
import { setup } from '@storybook/vue3-vite';
import { createPinia, setActivePinia } from 'pinia';
import { createMemoryHistory, createRouter } from 'vue-router';
import Toast, { POSITION } from 'vue-toastification';
import FloatingVue from 'floating-vue';
import '@/assets/styles/main.css';
import '@/assets/icons/icon.css';
import 'vue-toastification/dist/index.css';
import 'floating-vue/dist/style.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const EmptyRoute = { template: '<div />' };
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'home', component: EmptyRoute },
    { path: '/favorite', name: 'favorite', component: EmptyRoute },
    { path: '/movies', name: 'movies', component: EmptyRoute },
    { path: '/movies/:id', name: 'movie-details', component: EmptyRoute },
    { path: '/tv', name: 'tv', component: EmptyRoute },
    { path: '/tv/:id', name: 'tv-details', component: EmptyRoute },
    { path: '/auth/login', name: 'login', component: EmptyRoute },
    { path: '/auth/register', name: 'register', component: EmptyRoute },
  ],
});

const pinia = createPinia();
pinia.use(({ store }) => {
  const storyStore = store as unknown as Record<string, unknown>;

  if (store.$id === 'search') {
    storyStore.fetchHeaderData = async () => undefined;
    storyStore.fetchSearchMulti = async () => undefined;
  }

  if (store.$id === 'favorite') {
    storyStore.deleteFavoriteItem = async () => undefined;
    storyStore.updateFavoriteItem = async () => undefined;
  }

  if (store.$id === 'auth') {
    storyStore.signOut = async () => undefined;
  }
});
setActivePinia(pinia);

setup((app) => {
  app.use(pinia);
  app.use(router);
  app.use(Toast, {
    position: POSITION.TOP_CENTER,
    timeout: 3000,
    maxToasts: 3,
  });
  app.use(FloatingVue);
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'app',
      values: [{ name: 'app', value: '#141025' }],
    },
    layout: 'centered',
  },
};

export default preview;
