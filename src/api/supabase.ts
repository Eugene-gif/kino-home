import { useAuthStore } from "@/stores/auth";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/constants/constants';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

supabase.auth.onAuthStateChange((event, session) => {
  const authStore = useAuthStore();

  if (event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') {
    if (session) {
      authStore.refreshSession(session);
      authStore.refreshUser(session);
    }
  }

  if (event === 'SIGNED_OUT' || (event === 'INITIAL_SESSION' && !session)) {
    authStore.clearAuth();
  }
})
