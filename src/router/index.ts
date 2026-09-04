import { createRouter, createWebHistory } from 'vue-router';
import { routeNames, routePaths } from '@/constants/routesData';
import { routes } from './routes';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const toast = useToast();

router.beforeEach((to) => {
  const authStore = useAuthStore();
  const isAuth = authStore.isAuth;
  const requiresAuth = to.meta.requiresAuth;

  if (!isAuth && to.path === routePaths.auth) {
    return { name: routeNames.login };
  }

  if (requiresAuth && !isAuth && to.name === routeNames.collections) {
    toast.info('Войдите в аккаунт, чтобы получить доступ к коллекциям');
    return { name: routeNames.login };
  }

  // Если мы авторизованы и стучимся на auth то отправляем на home
  if (!requiresAuth && isAuth && (to.path === routePaths.auth || to.path === routePaths.register || to.path === routePaths.login)) {
    return { name: routeNames.home };
  }
})

export default router;
