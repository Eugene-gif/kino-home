import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Далее будем брать из pinia + localStorage
function getIsAuth(): boolean {
  return true;
}

router.beforeEach((to, from, next) => {
  const isAuth = getIsAuth(); // Есть ключ
  const isAuthRequired = to.meta.requiresAuth === true; // Требуется ли авторизация для роута

  const params = { to, from, next };

  console.log(isAuthRequired, isAuth, params);

  if (isAuthRequired && !isAuth) {
    // Требуется авторизация и нет ключа
    console.log('Требуется авторизация и нет ключа направляем на логин');
    next({ name: 'login' });
  } else if (!isAuthRequired && isAuth && ['login', 'register'].includes(to.name as string)) {
    console.log('Уже вошёл, но лезет на login, направляем на главную');
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
