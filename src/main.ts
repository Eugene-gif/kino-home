import '@/assets/styles/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast, { POSITION } from 'vue-toastification';
import "vue-toastification/dist/index.css";
import { useGenresStore } from '@/stores/genres';

import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(Toast, {
  position: POSITION.TOP_CENTER,
  timeout: 5000,
  maxToasts: 5,
  newestOnTop: true,
  closeOnClick: true,
  pauseOnHover: true,
});

(async () => {
  try {
    const genresStore = useGenresStore(pinia);
    await genresStore.initGenres();
  } catch (err) {
    console.error('Critical init error:', err);
  } finally {
    app.mount('#app');
  }
})();

