import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/api/supabase';
import { useToast } from 'vue-toastification';
import { STORAGE_KEYS, getFromStorage, saveToStorage, removeFromStorage } from '@/utils/storage';
import router from '@/router';
import { routePaths } from '@/constants/routesData';
import type { Session } from '@supabase/supabase-js';
import { isAuthError } from '@supabase/supabase-js';
import { reportError } from '@/utils/reportError';
import { SUPABASE_EXPECTED_AUTH_ERRORS } from '@/constants/constants';

const reportUnexpectedAuthError = (error: unknown, operation: string) => {
  if (isAuthError(error) && error.code && SUPABASE_EXPECTED_AUTH_ERRORS.has(error.code)) return;
  reportError(error, { operation, service: 'supabase' });
};

interface SessionApp {
  access_token?: string | null;
  refresh_token?: string | null;
};

interface UserApp {
  id?: string;
  user_id?: string;
  email?: string;
  name?: string;
}

export const useAuthStore = defineStore('auth', () => {
  const toast = useToast();
  const userName = ref<string>('');
  const email = ref<string>('');
  const password = ref<string>('');
  const isLoading = ref<boolean>(false);

  const user = ref<UserApp | null>(getFromStorage(STORAGE_KEYS.USER) ?? null);
  const session = ref<SessionApp | null>(getFromStorage(STORAGE_KEYS.SESSION) ?? null);

  const isAuth = computed(() => !!user.value?.id);
  const accessToken = computed(() => session.value?.access_token ?? '');

  const refreshUser = (data: Session | null) => {
    if (!data?.user) return;

    user.value = {
      id: data.user.id,
      user_id: data.user?.identities?.[0]?.user_id,
      email: data.user.email,
      name: data.user.user_metadata.name,
    }

    saveToStorage(STORAGE_KEYS.USER, user.value);
  }

  const refreshSession = (data: Session | null) => {
    if (!data) return;

    session.value = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    }

    saveToStorage(STORAGE_KEYS.SESSION, session.value);
  }

  const clearAuth = () => {
    const hadAuthData = !!user.value || !!session.value;
    removeFromStorage(STORAGE_KEYS.USER);
    removeFromStorage(STORAGE_KEYS.SESSION);
    session.value = null;
    user.value = null;
    if (hadAuthData) router.push(routePaths.home);
  }

  const signIn = async () => {
    try {
      isLoading.value = true;

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      });

      if (error) throw error;

      refreshUser(data.session);
      refreshSession(data.session);
      router.push('/');
      userName.value = '';
      email.value = '';
      password.value = '';
      toast.success('Вы вошли в профиль!');
    } catch (err) {
      reportUnexpectedAuthError(err, 'signIn');
      toast.error(err instanceof Error ? err.message : 'Ошибка входа в профиль. Попробуйте позже.');
    } finally {
      isLoading.value = false;
    }
  };


  const signUp = async () => {
    try {
      isLoading.value = true;

      const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          data: {
            name: userName.value,
          },
        },
      });

      if (error) throw error;

      refreshUser(data.session);
      refreshSession(data.session);
      router.push('/');
      userName.value = '';
      email.value = '';
      password.value = '';
      toast.success('Вы успешно зарегестрировались и вошли в профиль!');
    } catch (err) {
      reportUnexpectedAuthError(err, 'signUp');
      toast.error(err instanceof Error ? err.message : 'Ошибка регистрации. Попробуйте позже.');
    } finally {
      isLoading.value = false;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.info('Вы вышли из профиля');
    } catch (err) {
      reportError(err, { operation: 'signOut', service: 'supabase' });
      toast.error('Не удалось завершить выход на сервере');
    } finally {
      clearAuth();
    }
  }

  return { signUp, signIn, signOut, refreshSession, refreshUser, clearAuth, userName, email, password, isLoading, user, accessToken, isAuth };
})
