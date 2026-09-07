import { useAuthStore } from "@/stores/auth";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/constants/constants';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

supabase.auth.onAuthStateChange((event, session) => {
  const authStore = useAuthStore();

  if (event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') {
    if (session) {
      authStore.refreshSession(session);
      authStore.refreshUser(session);
    }
  }
})
