// Пример auth стора
import { defineStore } from 'pinia';
import { ref } from 'vue';
// import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const sessionId = ref<string | null>(localStorage.getItem('tmdb_session_id'));

  const login = async () => {
    // const { data } = await axios.get('/authentication/token/new');
    // const redirectUrl = encodeURIComponent(`${window.location.origin}/auth/callback`);
    // window.location.href =
    //   `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=${redirectUrl}`;
  };

  const handleCallback = async (/* requestToken: string */) => {
    // const { data } = await axios.post('/authentication/session/new', {
    //   request_token: requestToken
    // });
    // sessionId.value = data.session_id;
    // localStorage.setItem('tmdb_session_id', data.session_id);
  };

  const logout = async () => {
    // if (!sessionId.value) return;
    // await axios.delete('/authentication/session', {
    //   data: { session_id: sessionId.value }
    // });
    // sessionId.value = null;
    // localStorage.removeItem('tmdb_session_id');
  };

  return { sessionId, login, handleCallback, logout };
});
