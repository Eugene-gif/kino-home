const emptyResult = { data: null, error: null };

export const supabase = {
  auth: {
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe: () => undefined } },
    }),
    signInWithPassword: async () => emptyResult,
    signUp: async () => emptyResult,
    signOut: async () => emptyResult,
  },
  from: () => ({
    select: async () => emptyResult,
    insert: async () => emptyResult,
    update: async () => emptyResult,
    delete: async () => emptyResult,
  }),
};
