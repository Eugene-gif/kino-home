import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/api/supabase';
import { useToast } from 'vue-toastification';
import { STORAGE_KEYS, getFromStorage, saveToStorage, removeFromStorage } from '@/utils/storage';
import router from '@/router';
import { routePaths } from '@/constants/routesData';
import type { Session } from '@supabase/supabase-js';

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
      toast.error((err as Error).message ?? 'Ошибка входа в профиль. Попробуйте позже.');
    } finally {
      isLoading.value = false;
    }
  };


  const signUp = async () => {
    if (password.value.length < 6) {
      toast.error('Пароль не может быть меньше 6 символов');
      return;
    }

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
      toast.error((err as Error).message ?? 'Ошибка регистрации. Попробуйте позже.');
    } finally {
      isLoading.value = false;
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    removeFromStorage(STORAGE_KEYS.USER);
    removeFromStorage(STORAGE_KEYS.SESSION);
    session.value = null;
    user.value = null;
    router.push(routePaths.login);
    toast.info('Вы вышли из профиля');
  }

  return { signUp, signIn, signOut, refreshSession, refreshUser, userName, email, password, isLoading, user, accessToken, isAuth };
})
