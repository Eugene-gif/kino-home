import '@/assets/styles/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { SENTRY_DSN } from '@/constants/constants';
import { init } from "@sentry/vue";
import Toast, { POSITION } from 'vue-toastification';
import "vue-toastification/dist/index.css";
import { useGenresStore } from '@/stores/genres';
import { useCountriesStore } from '@/stores/countries';
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();

init({
  app,
  dsn: SENTRY_DSN,
  enabled: import.meta.env.PROD,
});

app.use(pinia);
app.use(router);
app.use(Toast, {
  position: POSITION.TOP_CENTER,
  timeout: 3000,
  maxToasts: 3,
  newestOnTop: true,
  closeOnClick: true,
  pauseOnHover: true,
});
app.use(FloatingVue);

(async () => {
  try {
    const genresStore = useGenresStore(pinia);
    const countriesStore = useCountriesStore(pinia);
    Promise.allSettled([genresStore.initGenres(), countriesStore.initCountries()]);
  } catch (err) {
    console.error('Critical init error:', err);
  } finally {
    app.mount('#app');
  }
})();

